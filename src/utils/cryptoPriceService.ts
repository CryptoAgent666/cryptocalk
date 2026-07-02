/**
 * Crypto Price Service with Fallback Chain
 * Static (pre-baked) → Binance → CoinGecko
 *
 * Static: /data/price-history/<SYM>.json — daily closes pre-baked at build time by
 * scripts/bake-price-history.mjs (Binance full listing history + one-off CryptoCompare
 * backfill for pre-listing years: BTC→2010, ETH→2015, and KAS/STETH which Binance
 * doesn't list). Covers any date up to the last bake with ZERO runtime API calls.
 * Binance (data-api.binance.vision — public market-data mirror, no key, no geo-block)
 * provides full daily-candle history back to each pair's listing date, for free.
 * CoinGecko free API limits historical data to 365 days.
 * CryptoCompare/CoinDesk Data REMOVED from the client (2026-07-02): its free tier is
 * 100 calls/month, anonymous access returns 401, and the PUBLIC_ key shipped in the
 * bundle — visitors exhausted the whole monthly quota. The key now lives server-side
 * only (CRYPTOCOMPARE_API_KEY) for the bake script's rare pre-listing backfills.
 * CoinCap (api.coincap.io) removed — domain is down as of 2026-03.
 */

const COINGECKO_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || '';
const BINANCE_BASE = 'https://data-api.binance.vision/api/v3';

// ═══════════════════════════════════════════════
// ID Mapping: CoinGecko ID → CryptoCompare symbol
// ═══════════════════════════════════════════════
const GECKO_TO_CC_SYMBOL: Record<string, string> = {
    bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL',
    binancecoin: 'BNB', dogecoin: 'DOGE', cardano: 'ADA',
    ripple: 'XRP', polkadot: 'DOT', chainlink: 'LINK',
    'avalanche-2': 'AVAX', 'matic-network': 'MATIC', toncoin: 'TON',
    litecoin: 'LTC', tron: 'TRX', uniswap: 'UNI',
    'shiba-inu': 'SHIB', 'stacked-eth': 'STETH',
    'wrapped-bitcoin': 'WBTC', 'bitcoin-cash': 'BCH',
    stellar: 'XLM', monero: 'XMR', cosmos: 'ATOM',
    'near-protocol': 'NEAR', aptos: 'APT', sui: 'SUI',
    'internet-computer': 'ICP', filecoin: 'FIL', arbitrum: 'ARB',
    optimism: 'OP', render: 'RNDR', injective: 'INJ',
    'the-graph': 'GRT', aave: 'AAVE',
    'maker': 'MKR', 'pepe': 'PEPE', kaspa: 'KAS',
};

function getCCSymbol(geckoId: string): string | null {
    return GECKO_TO_CC_SYMBOL[geckoId] || null;
}

// Binance reuses the same symbol map (its pairs are SYMBOL+USDT). Unlisted
// symbols (currently KAS, STETH) simply 404/400 and the caller falls through
// to the next provider in the chain — no separate exclusion list needed.
function getBinancePair(geckoId: string): string | null {
    const symbol = getCCSymbol(geckoId);
    return symbol ? `${symbol}USDT` : null;
}

// ═══════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════

function isDateOlderThan365Days(dateStr: string): boolean {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    return diff > 365 * 24 * 60 * 60 * 1000;
}

async function fetchWithTimeout(url: string, timeoutMs = 10000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal });
        return res;
    } finally {
        clearTimeout(id);
    }
}

// ═══════════════════════════════════════════════
// Static pre-baked daily history (public/data/price-history/<SYM>.json)
// ═══════════════════════════════════════════════

type StaticHistory = { symbol: string; updated: string; prices: [number, number][] };
const staticHistoryCache = new Map<string, Promise<StaticHistory | null>>();

function loadStaticHistory(geckoId: string): Promise<StaticHistory | null> {
    const symbol = getCCSymbol(geckoId);
    if (!symbol) return Promise.resolve(null);
    if (!staticHistoryCache.has(symbol)) {
        staticHistoryCache.set(symbol, (async () => {
            try {
                const res = await fetchWithTimeout(`/data/price-history/${symbol}.json`, 6000);
                if (!res.ok) return null;
                const data = await res.json();
                return data && Array.isArray(data.prices) && data.prices.length > 0
                    ? (data as StaticHistory) : null;
            } catch {
                return null;
            }
        })());
    }
    return staticHistoryCache.get(symbol)!;
}

async function getHistoricalPriceStatic(geckoId: string, dateStr: string): Promise<number> {
    const hist = await loadStaticHistory(geckoId);
    if (!hist) throw new Error('No static history file');
    const target = Math.floor(new Date(`${dateStr}T00:00:00Z`).getTime() / 1000);
    let best: [number, number] | null = null;
    for (const p of hist.prices) {
        if (!best || Math.abs(p[0] - target) < Math.abs(best[0] - target)) best = p;
        if (p[0] > target + 3 * 86400) break; // sorted — nothing closer further on
    }
    // daily candles: accept only a candle within 2 days of the requested date
    if (!best || Math.abs(best[0] - target) > 2 * 86400) {
        throw new Error(`Static history has no candle near ${dateStr}`);
    }
    if (!best[1]) throw new Error('Static price is 0');
    return best[1];
}

async function getPriceChartStatic(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const hist = await loadStaticHistory(geckoId);
    if (!hist) throw new Error('No static history file');
    const first = hist.prices[0][0];
    const last = hist.prices[hist.prices.length - 1][0];
    // serve only ranges the bake fully covers (a fresh bake ends yesterday, so
    // "to today" passes; a stale bake declines and live providers take over)
    if (fromTs < first - 3 * 86400 || toTs > last + 3 * 86400) {
        throw new Error('Static history does not cover the requested range');
    }
    const pts = hist.prices
        .filter(([t]) => t >= fromTs - 86400 && t <= toTs + 86400)
        .map(([t, c]) => [t * 1000, c] as [number, number]);
    if (pts.length === 0) throw new Error('No static points in range');
    return pts;
}

// ═══════════════════════════════════════════════
// Historical Price on a Specific Date
// ═══════════════════════════════════════════════

async function getHistoricalPriceCoinGecko(geckoId: string, dateStr: string): Promise<number> {
    const [yyyy, mm, dd] = dateStr.split('-');
    const formatted = `${dd}-${mm}-${yyyy}`;
    const url = `https://api.coingecko.com/api/v3/coins/${geckoId}/history?date=${formatted}&localization=false&x_cg_demo_api_key=${COINGECKO_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CoinGecko history ${res.status}`);
    const data = await res.json();
    const price = data.market_data?.current_price?.usd;
    if (!price) throw new Error('No CoinGecko price data');
    return price;
}

async function getHistoricalPriceBinance(geckoId: string, dateStr: string): Promise<number> {
    const pair = getBinancePair(geckoId);
    if (!pair) throw new Error(`No Binance mapping for ${geckoId}`);
    const startTime = new Date(dateStr).getTime();
    const url = `${BINANCE_BASE}/klines?symbol=${pair}&interval=1d&startTime=${startTime}&limit=1`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`Binance history ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('No Binance data');
    // Binance doesn't error when startTime predates the pair's listing — it
    // silently returns the earliest available candle instead. Reject a candle
    // that's far from the requested date so the chain falls through to a
    // provider with real history that far back, instead of misreporting a
    // much-later price as the requested date's price.
    const candleTime = data[0][0];
    if (Math.abs(candleTime - startTime) > 2 * 24 * 60 * 60 * 1000) {
        throw new Error(`Binance has no data for ${dateStr} on ${pair} (earliest candle is ${new Date(candleTime).toISOString()})`);
    }
    const price = parseFloat(data[0][4]); // close price
    if (!price || price === 0) throw new Error('Binance price is 0');
    return price;
}

/** Get the historical price with automatic fallback */
export async function getHistoricalPrice(geckoId: string, dateStr: string): Promise<number> {
    const isOld = isDateOlderThan365Days(dateStr);
    // Static first in both branches: any date up to the last bake costs zero API calls.
    const providers = isOld
        ? [ // For old dates, skip CoinGecko (free tier can't reach that far back)
            { name: 'Static', fn: () => getHistoricalPriceStatic(geckoId, dateStr) },
            { name: 'Binance', fn: () => getHistoricalPriceBinance(geckoId, dateStr) },
            { name: 'CoinGecko', fn: () => getHistoricalPriceCoinGecko(geckoId, dateStr) },
        ]
        : [ // For recent dates, prefer CoinGecko after static
            { name: 'Static', fn: () => getHistoricalPriceStatic(geckoId, dateStr) },
            { name: 'CoinGecko', fn: () => getHistoricalPriceCoinGecko(geckoId, dateStr) },
            { name: 'Binance', fn: () => getHistoricalPriceBinance(geckoId, dateStr) },
        ];

    let lastError: Error | null = null;
    for (const provider of providers) {
        try {
            const price = await provider.fn();
            return price;
        } catch (e) {
            lastError = e instanceof Error ? e : new Error(String(e));
            console.warn(`[CryptoPrice] ${provider.name} failed for ${geckoId} on ${dateStr}:`, lastError.message);
        }
    }
    throw new Error(lastError?.message || 'No price data available for this date. Try a more recent date.');
}

// ═══════════════════════════════════════════════
// Current Price
// ═══════════════════════════════════════════════

async function getCurrentPriceCoinGecko(geckoId: string): Promise<number> {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${geckoId}&vs_currencies=usd&x_cg_demo_api_key=${COINGECKO_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CoinGecko current ${res.status}`);
    const data = await res.json();
    const price = data[geckoId]?.usd;
    if (!price) throw new Error('No CoinGecko current price');
    return price;
}

async function getCurrentPriceBinance(geckoId: string): Promise<number> {
    const pair = getBinancePair(geckoId);
    if (!pair) throw new Error(`No Binance mapping for ${geckoId}`);
    const url = `${BINANCE_BASE}/ticker/price?symbol=${pair}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`Binance current ${res.status}`);
    const data = await res.json();
    const price = parseFloat(data.price);
    if (!price || price === 0) throw new Error('No Binance current price');
    return price;
}

/** Get the current price with automatic fallback */
export async function getCurrentPrice(geckoId: string): Promise<number> {
    const providers = [
        { name: 'CoinGecko', fn: () => getCurrentPriceCoinGecko(geckoId) },
        { name: 'Binance', fn: () => getCurrentPriceBinance(geckoId) },
    ];

    let lastError: Error | null = null;
    for (const provider of providers) {
        try {
            return await provider.fn();
        } catch (e) {
            lastError = e instanceof Error ? e : new Error(String(e));
            console.warn(`[CryptoPrice] ${provider.name} current price failed for ${geckoId}:`, lastError.message);
        }
    }
    throw new Error(lastError?.message || 'Current price not available.');
}

// ═══════════════════════════════════════════════
// Price Chart (historical range)
// ═══════════════════════════════════════════════

async function getPriceChartCoinGecko(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const url = `https://api.coingecko.com/api/v3/coins/${geckoId}/market_chart/range?vs_currency=usd&from=${fromTs}&to=${toTs}&x_cg_demo_api_key=${COINGECKO_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CoinGecko chart ${res.status}`);
    const data = await res.json();
    if (!data.prices || data.prices.length === 0) throw new Error('No CoinGecko chart data');
    return data.prices;
}

async function getPriceChartBinance(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const pair = getBinancePair(geckoId);
    if (!pair) throw new Error(`No Binance mapping for ${geckoId}`);
    const dayMs = 24 * 60 * 60 * 1000;
    const endMs = toTs * 1000;
    let cursor = fromTs * 1000;
    const results: [number, number][] = [];
    // Binance caps klines at 1000 candles/request; page through long ranges
    // (20 pages = ~54 years of daily candles, far beyond any real request).
    for (let page = 0; page < 20 && cursor < endMs; page++) {
        const url = `${BINANCE_BASE}/klines?symbol=${pair}&interval=1d&startTime=${cursor}&endTime=${endMs}&limit=1000`;
        const res = await fetchWithTimeout(url);
        if (!res.ok) throw new Error(`Binance chart ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) break;
        for (const k of data) {
            const close = parseFloat(k[4]);
            if (close > 0) results.push([k[0], close]);
        }
        if (data.length < 1000) break; // reached the end of available candles
        cursor = data[data.length - 1][0] + dayMs;
    }
    if (results.length === 0) throw new Error('No Binance chart data');
    return results;
}

/** Get price chart data with automatic fallback */
export async function getPriceChart(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const isOld = (Date.now() / 1000 - fromTs) > 365 * 24 * 60 * 60;
    const providers = isOld
        ? [
            { name: 'Static', fn: () => getPriceChartStatic(geckoId, fromTs, toTs) },
            { name: 'Binance', fn: () => getPriceChartBinance(geckoId, fromTs, toTs) },
            { name: 'CoinGecko', fn: () => getPriceChartCoinGecko(geckoId, fromTs, toTs) },
        ]
        : [
            { name: 'Static', fn: () => getPriceChartStatic(geckoId, fromTs, toTs) },
            { name: 'CoinGecko', fn: () => getPriceChartCoinGecko(geckoId, fromTs, toTs) },
            { name: 'Binance', fn: () => getPriceChartBinance(geckoId, fromTs, toTs) },
        ];

    let lastError: Error | null = null;
    for (const provider of providers) {
        try {
            return await provider.fn();
        } catch (e) {
            lastError = e instanceof Error ? e : new Error(String(e));
            console.warn(`[CryptoPrice] ${provider.name} chart failed for ${geckoId}:`, lastError.message);
        }
    }
    // Chart is optional — return empty array instead of throwing
    console.warn('[CryptoPrice] All chart providers failed, returning empty chart');
    return [];
}
