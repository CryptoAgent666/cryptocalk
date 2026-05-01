/**
 * Crypto Price Service with Fallback Chain
 * CoinGecko → CryptoCompare
 *
 * CoinGecko free API limits historical data to 365 days.
 * CryptoCompare provides full historical data going back 10+ years.
 * CoinCap (api.coincap.io) removed — domain is down as of 2026-03.
 */

const COINGECKO_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || '';
const CRYPTOCOMPARE_KEY = import.meta.env.PUBLIC_CRYPTOCOMPARE_API_KEY || '';

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

async function getHistoricalPriceCryptoCompare(geckoId: string, dateStr: string): Promise<number> {
    const symbol = getCCSymbol(geckoId);
    if (!symbol) throw new Error(`No CryptoCompare mapping for ${geckoId}`);
    const ts = Math.floor(new Date(dateStr).getTime() / 1000);
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=1&toTs=${ts}&api_key=${CRYPTOCOMPARE_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CryptoCompare history ${res.status}`);
    const data = await res.json();
    const entries = data.Data?.Data;
    if (!entries || entries.length === 0) throw new Error('No CryptoCompare data');
    // Use the close price of the last entry (closest to target date)
    const price = entries[entries.length - 1]?.close;
    if (!price || price === 0) throw new Error('CryptoCompare price is 0');
    return price;
}

/** Get the historical price with automatic fallback */
export async function getHistoricalPrice(geckoId: string, dateStr: string): Promise<number> {
    const isOld = isDateOlderThan365Days(dateStr);
    const providers = isOld
        ? [ // For old dates, skip CoinGecko (will fail anyway)
            { name: 'CryptoCompare', fn: () => getHistoricalPriceCryptoCompare(geckoId, dateStr) },
            { name: 'CoinGecko', fn: () => getHistoricalPriceCoinGecko(geckoId, dateStr) },
        ]
        : [ // For recent dates, prefer CoinGecko
            { name: 'CoinGecko', fn: () => getHistoricalPriceCoinGecko(geckoId, dateStr) },
            { name: 'CryptoCompare', fn: () => getHistoricalPriceCryptoCompare(geckoId, dateStr) },
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

async function getCurrentPriceCryptoCompare(geckoId: string): Promise<number> {
    const symbol = getCCSymbol(geckoId);
    if (!symbol) throw new Error(`No CryptoCompare mapping for ${geckoId}`);
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${CRYPTOCOMPARE_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CryptoCompare current ${res.status}`);
    const data = await res.json();
    if (!data.USD) throw new Error('No CryptoCompare current price');
    return data.USD;
}

/** Get the current price with automatic fallback */
export async function getCurrentPrice(geckoId: string): Promise<number> {
    const providers = [
        { name: 'CoinGecko', fn: () => getCurrentPriceCoinGecko(geckoId) },
        { name: 'CryptoCompare', fn: () => getCurrentPriceCryptoCompare(geckoId) },
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

async function getPriceChartCryptoCompare(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const symbol = getCCSymbol(geckoId);
    if (!symbol) throw new Error(`No CryptoCompare mapping for ${geckoId}`);
    const days = Math.ceil((toTs - fromTs) / 86400);
    const limit = Math.min(days, 2000); // CryptoCompare max limit
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=${limit}&toTs=${toTs}&api_key=${CRYPTOCOMPARE_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error(`CryptoCompare chart ${res.status}`);
    const data = await res.json();
    const entries = data.Data?.Data;
    if (!entries || entries.length === 0) throw new Error('No CryptoCompare chart data');
    // Convert to [timestamp_ms, price] format (same as CoinGecko)
    return entries
        .filter((e: { close: number; time: number }) => e.close > 0)
        .map((e: { close: number; time: number }) => [e.time * 1000, e.close] as [number, number]);
}

/** Get price chart data with automatic fallback */
export async function getPriceChart(geckoId: string, fromTs: number, toTs: number): Promise<[number, number][]> {
    const isOld = (Date.now() / 1000 - fromTs) > 365 * 24 * 60 * 60;
    const providers = isOld
        ? [
            { name: 'CryptoCompare', fn: () => getPriceChartCryptoCompare(geckoId, fromTs, toTs) },
            { name: 'CoinGecko', fn: () => getPriceChartCoinGecko(geckoId, fromTs, toTs) },
        ]
        : [
            { name: 'CoinGecko', fn: () => getPriceChartCoinGecko(geckoId, fromTs, toTs) },
            { name: 'CryptoCompare', fn: () => getPriceChartCryptoCompare(geckoId, fromTs, toTs) },
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
