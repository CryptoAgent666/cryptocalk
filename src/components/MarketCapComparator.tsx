import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    DollarSign,
    Info,
    RotateCcw,
    Search,
    X,
    BarChart3,
    ArrowRightLeft,
    Share2,
    Loader2,
    Zap,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
    circulatingSupply: number;
}

interface ComparisonRow {
    name: string;
    symbol: string;
    marketCap: number;
    hypotheticalPrice: number;
    multiplier: number;
}

const TOP_COINS = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'matic-network', name: 'Polygon', symbol: 'MATIC' },
];

const QUICK_SCENARIOS = [
    { targetId: 'dogecoin', targetLabel: 'DOGE', refId: 'ethereum', refLabel: 'ETH' },
    { targetId: 'solana', targetLabel: 'SOL', refId: 'bitcoin', refLabel: 'BTC' },
    { targetId: 'shiba-inu', targetLabel: 'SHIB', refId: 'binancecoin', refLabel: 'BNB' },
    { targetId: 'cardano', targetLabel: 'ADA', refId: 'ethereum', refLabel: 'ETH' },
    { targetId: 'ripple', targetLabel: 'XRP', refId: 'bitcoin', refLabel: 'BTC' },
];

export default function MarketCapComparator({ lang = 'en' }: { lang?: string }) {
    // Target coin (A) state
    const [targetSearch, setTargetSearch] = useState('');
    const [targetCoin, setTargetCoin] = useState<CoinSuggestion | null>(null);
    const [targetData, setTargetData] = useState<CoinData | null>(null);
    const [targetSuggestions, setTargetSuggestions] = useState<CoinSuggestion[]>([]);
    const [showTargetSuggestions, setShowTargetSuggestions] = useState(false);

    // Reference coin (B) state
    const [refSearch, setRefSearch] = useState('');
    const [refCoin, setRefCoin] = useState<CoinSuggestion | null>(null);
    const [refData, setRefData] = useState<CoinData | null>(null);
    const [refSuggestions, setRefSuggestions] = useState<CoinSuggestion[]>([]);
    const [showRefSuggestions, setShowRefSuggestions] = useState(false);

    const [loading, setLoading] = useState(false);
    const [fetchingTarget, setFetchingTarget] = useState(false);
    const [fetchingRef, setFetchingRef] = useState(false);
    const [topCoinCaps, setTopCoinCaps] = useState<Record<string, number>>({});

    const targetSearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const refSearchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const targetSuggestionsRef = useRef<HTMLDivElement>(null);
    const refSuggestionsRef = useRef<HTMLDivElement>(null);

    // Fetch top coin market caps on mount
    useEffect(() => {
        const fetchTopCoinCaps = async () => {
            try {
                const ids = TOP_COINS.map(c => c.id).join(',');
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
                );
                if (!res.ok) return;
                const data = await res.json();
                const caps: Record<string, number> = {};
                TOP_COINS.forEach(coin => {
                    caps[coin.id] = data[coin.id]?.usd_market_cap || 0;
                });
                setTopCoinCaps(caps);
            } catch {
                // Silently fail
            }
        };
        fetchTopCoinCaps();
    }, []);

    // Click outside handlers
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (targetSuggestionsRef.current && !targetSuggestionsRef.current.contains(e.target as Node))
                setShowTargetSuggestions(false);
            if (refSuggestionsRef.current && !refSuggestionsRef.current.contains(e.target as Node))
                setShowRefSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Coin search (shared pattern)
    const searchCoins = useCallback(async (query: string, setSuggestions: (s: CoinSuggestion[]) => void, setShow: (b: boolean) => void) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setLoading(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSuggestions((data.coins || []).slice(0, 8).map((c: any) => ({
                id: c.id, name: c.name, symbol: c.symbol, thumb: c.thumb,
            })));
            setShow(true);
        } catch { setSuggestions([]); }
        setLoading(false);
    }, []);

    const handleTargetSearch = (v: string) => {
        setTargetSearch(v);
        if (targetSearchTimeout.current) clearTimeout(targetSearchTimeout.current);
        targetSearchTimeout.current = setTimeout(() => searchCoins(v, setTargetSuggestions, setShowTargetSuggestions), 400);
    };

    const handleRefSearch = (v: string) => {
        setRefSearch(v);
        if (refSearchTimeout.current) clearTimeout(refSearchTimeout.current);
        refSearchTimeout.current = setTimeout(() => searchCoins(v, setRefSuggestions, setShowRefSuggestions), 400);
    };

    const fetchCoinData = async (coinId: string): Promise<CoinData | null> => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`);
            if (!res.ok) throw new Error('Failed to fetch coin data');
            const data = await res.json();
            const price = data.market_data?.current_price?.usd || 0;
            const marketCap = data.market_data?.market_cap?.usd || 0;
            const circulatingSupply = data.market_data?.circulating_supply || 0;
            return {
                id: data.id,
                name: data.name,
                symbol: data.symbol,
                price,
                marketCap,
                circulatingSupply,
            };
        } catch {
            return null;
        }
    };

    const selectTargetCoin = async (coin: CoinSuggestion) => {
        setTargetCoin(coin);
        setTargetSearch(coin.name);
        setShowTargetSuggestions(false);
        setFetchingTarget(true);
        const data = await fetchCoinData(coin.id);
        if (data) setTargetData(data);
        setFetchingTarget(false);
    };

    const selectRefCoin = async (coin: CoinSuggestion) => {
        setRefCoin(coin);
        setRefSearch(coin.name);
        setShowRefSuggestions(false);
        setFetchingRef(true);
        const data = await fetchCoinData(coin.id);
        if (data) setRefData(data);
        setFetchingRef(false);
    };

    const clearTargetCoin = () => {
        setTargetCoin(null); setTargetSearch(''); setTargetSuggestions([]); setTargetData(null);
    };

    const clearRefCoin = () => {
        setRefCoin(null); setRefSearch(''); setRefSuggestions([]); setRefData(null);
    };

    const handleQuickScenario = async (scenario: typeof QUICK_SCENARIOS[0]) => {
        setTargetCoin({ id: scenario.targetId, name: scenario.targetLabel, symbol: scenario.targetLabel });
        setTargetSearch(scenario.targetLabel);
        setRefCoin({ id: scenario.refId, name: scenario.refLabel, symbol: scenario.refLabel });
        setRefSearch(scenario.refLabel);
        setShowTargetSuggestions(false);
        setShowRefSuggestions(false);
        setFetchingTarget(true);
        setFetchingRef(true);

        const [tData, rData] = await Promise.all([
            fetchCoinData(scenario.targetId),
            fetchCoinData(scenario.refId),
        ]);

        if (tData) {
            setTargetCoin({ id: tData.id, name: tData.name, symbol: tData.symbol });
            setTargetSearch(tData.name);
            setTargetData(tData);
        }
        if (rData) {
            setRefCoin({ id: rData.id, name: rData.name, symbol: rData.symbol });
            setRefSearch(rData.name);
            setRefData(rData);
        }
        setFetchingTarget(false);
        setFetchingRef(false);
    };

    // Calculations
    const hypotheticalPrice = targetData && refData && targetData.circulatingSupply > 0
        ? refData.marketCap / targetData.circulatingSupply
        : null;

    const growthMultiplier = hypotheticalPrice && targetData && targetData.price > 0
        ? hypotheticalPrice / targetData.price
        : null;

    const hasResults = hypotheticalPrice !== null && growthMultiplier !== null;

    // Comparison table rows
    const comparisonRows: ComparisonRow[] = targetData && targetData.circulatingSupply > 0
        ? TOP_COINS
            .filter(c => c.id !== targetData.id && topCoinCaps[c.id] > 0)
            .map(c => {
                const cap = topCoinCaps[c.id];
                const hypPrice = cap / targetData.circulatingSupply;
                const mult = targetData.price > 0 ? hypPrice / targetData.price : 0;
                return {
                    name: c.name,
                    symbol: c.symbol,
                    marketCap: cap,
                    hypotheticalPrice: hypPrice,
                    multiplier: mult,
                };
            })
        : [];

    const reset = () => {
        clearTargetCoin();
        clearRefCoin();
    };

    const formatPrice = (n: number) => {
        if (n >= 1) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (n >= 0.01) return '$' + n.toFixed(4);
        if (n >= 0.0001) return '$' + n.toFixed(6);
        return '$' + n.toFixed(8);
    };

    const formatBigNumber = (n: number) => {
        if (n >= 1_000_000_000_000) return '$' + (n / 1_000_000_000_000).toFixed(2) + 'T';
        if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(2) + 'B';
        if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
        if (n >= 1_000) return '$' + (n / 1_000).toFixed(2) + 'K';
        return '$' + n.toFixed(2);
    };

    const formatSupply = (n: number) => {
        if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(2) + 'T';
        if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
        if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K';
        return n.toLocaleString('en-US');
    };

    const shareOnX = () => {
        if (!targetData || !refData || !hypotheticalPrice || !growthMultiplier) return;
        const text = `If ${targetData.symbol.toUpperCase()} had ${refData.symbol.toUpperCase()}'s market cap, its price would be ${formatPrice(hypotheticalPrice)} — that's a ${growthMultiplier.toFixed(1)}x growth!\n\nCheck yours at CryptoCalk.com`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    const isFetching = fetchingTarget || fetchingRef;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    {/* Target Coin (A) Search */}
                    <div className="input-group" ref={targetSuggestionsRef}>
                        <label>
                            <Search size={14} />
                            Target Token (A)
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={targetSearch}
                                onChange={(e) => handleTargetSearch(e.target.value)}
                                placeholder="Search coin (e.g. Dogecoin)..."
                                id="mcc-target-search"
                            />
                            {targetCoin && (
                                <button className="coin-clear" onClick={clearTargetCoin} aria-label="Clear">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showTargetSuggestions && targetSuggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {targetSuggestions.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectTargetCoin(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {fetchingTarget && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Loader2 size={12} className="spin" /> Fetching data...
                            </div>
                        )}
                    </div>

                    {/* Target coin info */}
                    {targetData && (
                        <div className="input-group">
                            <label>
                                <Info size={14} />
                                {targetData.symbol.toUpperCase()} Current Data
                            </label>
                            <div className="coin-info-grid">
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Price</span>
                                    <span className="coin-info-value">{formatPrice(targetData.price)}</span>
                                </div>
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Market Cap</span>
                                    <span className="coin-info-value">{formatBigNumber(targetData.marketCap)}</span>
                                </div>
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Supply</span>
                                    <span className="coin-info-value">{formatSupply(targetData.circulatingSupply)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reference Coin (B) Search */}
                    <div className="input-group" ref={refSuggestionsRef}>
                        <label>
                            <Search size={14} />
                            Reference Token (B)
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={refSearch}
                                onChange={(e) => handleRefSearch(e.target.value)}
                                placeholder="Search coin (e.g. Ethereum)..."
                                id="mcc-ref-search"
                            />
                            {refCoin && (
                                <button className="coin-clear" onClick={clearRefCoin} aria-label="Clear">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showRefSuggestions && refSuggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {refSuggestions.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectRefCoin(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {fetchingRef && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Loader2 size={12} className="spin" /> Fetching data...
                            </div>
                        )}
                    </div>

                    {/* Reference coin info */}
                    {refData && (
                        <div className="input-group">
                            <label>
                                <Info size={14} />
                                {refData.symbol.toUpperCase()} Current Data
                            </label>
                            <div className="coin-info-grid">
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Price</span>
                                    <span className="coin-info-value">{formatPrice(refData.price)}</span>
                                </div>
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Market Cap</span>
                                    <span className="coin-info-value">{formatBigNumber(refData.marketCap)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Scenarios */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            Quick Scenarios
                        </label>
                        <div className="pills-row">
                            {QUICK_SCENARIOS.map((s, i) => (
                                <button
                                    key={i}
                                    className="pill-btn"
                                    onClick={() => handleQuickScenario(s)}
                                    disabled={isFetching}
                                >
                                    {s.targetLabel} → {s.refLabel}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {hasResults && targetData && refData ? (
                        <>
                            {/* Hero Result */}
                            <div className={`result-hero ${growthMultiplier >= 1 ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    If {targetData.symbol.toUpperCase()} had {refData.symbol.toUpperCase()}'s market cap
                                </span>
                                <span className="result-hero-value">
                                    <DollarSign size={28} />
                                    {formatPrice(hypotheticalPrice).replace('$', '')}
                                </span>
                                <span className={`result-hero-roi ${growthMultiplier >= 1 ? 'profit' : 'fee'}`}>
                                    <TrendingUp size={16} />
                                    {growthMultiplier.toFixed(2)}x from current price
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Hypothetical Price')}</span>
                                    <span className="result-value profit">{formatPrice(hypotheticalPrice)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Current Price ({targetData.symbol.toUpperCase()})</span>
                                    <span className="result-value">{formatPrice(targetData.price)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Growth Multiplier')}</span>
                                    <span className="result-value profit"><strong>{growthMultiplier.toFixed(2)}x</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Price Change')}</span>
                                    <span className="result-value profit">
                                        +{((growthMultiplier - 1) * 100).toFixed(1)}%
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{targetData.symbol.toUpperCase()} Market Cap</span>
                                    <span className="result-value">{formatBigNumber(targetData.marketCap)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{refData.symbol.toUpperCase()} Market Cap</span>
                                    <span className="result-value">{formatBigNumber(refData.marketCap)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{targetData.symbol.toUpperCase()} Circulating Supply</span>
                                    <span className="result-value">{formatSupply(targetData.circulatingSupply)}</span>
                                </div>
                            </div>

                            {/* Top Coin Comparison Table */}
                            {comparisonRows.length > 0 && (
                                <div className="result-breakdown">
                                    <div className="result-row" style={{ marginBottom: '4px' }}>
                                        <span className="result-label">
                                            <strong>
                                                <ArrowRightLeft size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                                {targetData.symbol.toUpperCase()} at other market caps
                                            </strong>
                                        </span>
                                    </div>
                                    <div className="result-divider" />
                                    {comparisonRows.map((row) => (
                                        <div className="result-row" key={row.symbol}>
                                            <span className="result-label">
                                                {row.name} ({formatBigNumber(row.marketCap)})
                                            </span>
                                            <span className="result-value">
                                                {formatPrice(row.hypotheticalPrice)}
                                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}>
                                                    ({row.multiplier.toFixed(1)}x)
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Share Button */}
                            <button
                                className="pill-btn active"
                                onClick={shareOnX}
                                style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}
                            >
                                <Share2 size={14} />
                                {getUiString(lang, 'Share on X')}
                            </button>

                            {/* CTA */}
                            <div className="result-cta">
                                <a
                                    href="https://www.binance.com"
                                    target="_blank" rel="noopener noreferrer sponsored"
                                    
                                    className="cta-btn"
                                >
                                    Buy {targetData.symbol.toUpperCase()} on Binance →
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Market cap comparisons are hypothetical scenarios.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <BarChart3 size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Market Cap Comparator')}</h3>
                            <p>
                                Select two coins to compare: "What if {targetCoin?.symbol.toUpperCase() || 'Coin A'} had {refCoin?.symbol.toUpperCase() || 'Coin B'}'s market cap?"
                                {isFetching && (
                                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', color: 'var(--color-text-muted)' }}>
                                        <Loader2 size={16} className="spin" /> {getUiString(lang, 'Loading coin data...')}
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
