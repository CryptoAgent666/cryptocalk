import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Info,
    RotateCcw,
    Search,
    X,
    BarChart3,
    ArrowUpDown,
    Target,
    AlertTriangle,
    CheckCircle,
    XCircle,
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

interface ComparisonCoin {
    id: string;
    name: string;
    symbol: string;
    marketCap: number;
}

interface Results {
    mode: 'price' | 'marketcap';
    calculatedPrice?: number;
    calculatedMarketCap?: number;
    currentPrice: number;
    currentMarketCap: number;
    circulatingSupply: number;
    growthMultiplier: number;
    realism: 'green' | 'yellow' | 'red';
    realismLabel: string;
    coinName: string;
    coinSymbol: string;
    comparisons: { name: string; symbol: string; marketCap: number; impliedPrice: number; multiplier: number; realism: 'green' | 'yellow' | 'red' }[];
}

const TOP_COMPARISON_COINS: ComparisonCoin[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', marketCap: 0 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', marketCap: 0 },
    { id: 'binancecoin', name: 'BNB', symbol: 'BNB', marketCap: 0 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', marketCap: 0 },
    { id: 'ripple', name: 'XRP', symbol: 'XRP', marketCap: 0 },
];

const QUICK_COMPARE_COINS = [
    { id: 'bitcoin', label: 'BTC', symbol: 'BTC' },
    { id: 'ethereum', label: 'ETH', symbol: 'ETH' },
    { id: 'binancecoin', label: 'BNB', symbol: 'BNB' },
    { id: 'solana', label: 'SOL', symbol: 'SOL' },
    { id: 'ripple', label: 'XRP', symbol: 'XRP' },
];

const TARGET_MARKET_CAP_PRESETS = [1_000_000_000, 10_000_000_000, 100_000_000_000, 1_000_000_000_000];
const TARGET_PRICE_PRESETS = [1, 5, 10, 100];
const SUPPLY_PRESETS = [1_000_000, 10_000_000, 100_000_000, 1_000_000_000];
const MARKET_CAP_SCENARIOS = [
    {
        label: 'Microcap to $1B',
        mode: 'price' as const,
        targetMarketCap: '1000000000',
        targetPrice: '',
        circulatingSupply: '1000000000',
    },
    {
        label: 'Alt to $10B',
        mode: 'price' as const,
        targetMarketCap: '10000000000',
        targetPrice: '',
        circulatingSupply: '100000000',
    },
    {
        label: '$1 Token Check',
        mode: 'marketcap' as const,
        targetMarketCap: '',
        targetPrice: '1',
        circulatingSupply: '1000000000',
    },
] as const;

export default function MarketCapCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [coinData, setCoinData] = useState<CoinData | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [mode, setMode] = useState<'price' | 'marketcap'>('price');
    const [targetMarketCap, setTargetMarketCap] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [circulatingSupply, setCirculatingSupply] = useState('');
    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);
    const [topCoins, setTopCoins] = useState<ComparisonCoin[]>(TOP_COMPARISON_COINS);
    const [btcMarketCap, setBtcMarketCap] = useState(0);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Fetch top coin market caps on mount
    useEffect(() => {
        const fetchTopCoins = async () => {
            try {
                const ids = TOP_COMPARISON_COINS.map(c => c.id).join(',');
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
                );
                if (!res.ok) return;
                const data = await res.json();
                const updated = TOP_COMPARISON_COINS.map(coin => ({
                    ...coin,
                    marketCap: data[coin.id]?.usd_market_cap || 0,
                }));
                setTopCoins(updated);
                const btc = updated.find(c => c.id === 'bitcoin');
                if (btc) setBtcMarketCap(btc.marketCap);
            } catch {
                // Silently fail
            }
        };
        fetchTopCoins();
    }, []);

    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
            );
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            const coins = (data.coins || []).slice(0, 8).map((c: any) => ({
                id: c.id,
                name: c.name,
                symbol: c.symbol,
                thumb: c.thumb,
            }));
            setSuggestions(coins);
            setShowSuggestions(true);
        } catch {
            setSuggestions([]);
        }
        setLoading(false);
    }, []);

    const handleCoinSearch = (value: string) => {
        setCoinSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(value), 400);
    };

    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[coin.id]?.usd;
            const mc = data[coin.id]?.usd_market_cap;

            if (price && mc) {
                const supply = mc / price;
                setCoinData({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    price,
                    marketCap: mc,
                    circulatingSupply: supply,
                });
                setCirculatingSupply(String(Math.round(supply)));
            }
        } catch {
            // Silently fail
        }
    };

    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
        setCoinData(null);
        setCirculatingSupply('');
        setTargetMarketCap('');
        setTargetPrice('');
        setResults(null);
    };
    const applyScenario = (scenario: (typeof MARKET_CAP_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setMode(scenario.mode);
        setTargetMarketCap(scenario.targetMarketCap);
        setTargetPrice(scenario.targetPrice);
        setCirculatingSupply(scenario.circulatingSupply);
    };
    const isScenarioActive = (scenario: (typeof MARKET_CAP_SCENARIOS)[number]) => (
        mode === scenario.mode
        && targetMarketCap === scenario.targetMarketCap
        && targetPrice === scenario.targetPrice
        && circulatingSupply === scenario.circulatingSupply
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const getRealism = (targetCap: number): { realism: 'green' | 'yellow' | 'red'; label: string } => {
        if (btcMarketCap <= 0) return { realism: 'yellow', label: 'Unable to determine' };
        if (targetCap <= btcMarketCap) return { realism: 'green', label: 'Achievable — within current BTC market cap' };
        if (targetCap <= btcMarketCap * 2) return { realism: 'yellow', label: 'Ambitious — exceeds BTC market cap' };
        return { realism: 'red', label: 'Extremely unlikely — exceeds 2x BTC market cap' };
    };

    const calculate = useCallback(() => {
        const supply = parseFloat(circulatingSupply);
        if (isNaN(supply) || supply <= 0) {
            setResults(null);
            return;
        }

        const currentPrice = coinData?.price || 0;
        const currentMarketCap = coinData?.marketCap || 0;

        if (mode === 'price') {
            // User enters target market cap -> get price
            const tmc = parseFloat(targetMarketCap);
            if (isNaN(tmc) || tmc <= 0) {
                setResults(null);
                return;
            }
            const calcPrice = tmc / supply;
            const multiplier = currentMarketCap > 0 ? tmc / currentMarketCap : 0;
            const { realism, label } = getRealism(tmc);

            const comparisons = topCoins
                .filter(c => c.marketCap > 0 && c.id !== selectedCoin?.id)
                .map(c => {
                    const impliedPrice = c.marketCap / supply;
                    const mult = currentMarketCap > 0 ? c.marketCap / currentMarketCap : 0;
                    const r = getRealism(c.marketCap);
                    return {
                        name: c.name,
                        symbol: c.symbol,
                        marketCap: c.marketCap,
                        impliedPrice,
                        multiplier: mult,
                        realism: r.realism,
                    };
                });

            setResults({
                mode: 'price',
                calculatedPrice: calcPrice,
                currentPrice,
                currentMarketCap,
                circulatingSupply: supply,
                growthMultiplier: multiplier,
                realism,
                realismLabel: label,
                coinName: coinData?.name || selectedCoin?.name || 'Unknown',
                coinSymbol: coinData?.symbol || selectedCoin?.symbol || '???',
                comparisons,
            });
        } else {
            // User enters target price -> get market cap
            const tp = parseFloat(targetPrice);
            if (isNaN(tp) || tp <= 0) {
                setResults(null);
                return;
            }
            const calcMC = tp * supply;
            const multiplier = currentMarketCap > 0 ? calcMC / currentMarketCap : 0;
            const { realism, label } = getRealism(calcMC);

            const comparisons = topCoins
                .filter(c => c.marketCap > 0 && c.id !== selectedCoin?.id)
                .map(c => {
                    const impliedPrice = c.marketCap / supply;
                    const mult = currentMarketCap > 0 ? c.marketCap / currentMarketCap : 0;
                    const r = getRealism(c.marketCap);
                    return {
                        name: c.name,
                        symbol: c.symbol,
                        marketCap: c.marketCap,
                        impliedPrice,
                        multiplier: mult,
                        realism: r.realism,
                    };
                });

            setResults({
                mode: 'marketcap',
                calculatedMarketCap: calcMC,
                currentPrice,
                currentMarketCap,
                circulatingSupply: supply,
                growthMultiplier: multiplier,
                realism,
                realismLabel: label,
                coinName: coinData?.name || selectedCoin?.name || 'Unknown',
                coinSymbol: coinData?.symbol || selectedCoin?.symbol || '???',
                comparisons,
            });
        }
    }, [mode, targetMarketCap, targetPrice, circulatingSupply, coinData, selectedCoin, topCoins, btcMarketCap]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const handleQuickCompare = (compareId: string) => {
        const coin = topCoins.find(c => c.id === compareId);
        if (!coin || coin.marketCap <= 0) return;
        if (mode === 'price') {
            setTargetMarketCap(String(Math.round(coin.marketCap)));
        } else {
            const supply = parseFloat(circulatingSupply);
            if (!isNaN(supply) && supply > 0) {
                setTargetPrice(String(coin.marketCap / supply));
            }
        }
    };

    const reset = () => {
        setMode('price');
        setTargetMarketCap('');
        setTargetPrice('');
        setCirculatingSupply('');
        setResults(null);
        clearCoin();
    };

    const formatUSD = (n: number) => {
        if (Math.abs(n) < 0.01 && n !== 0) {
            return '$' + n.toFixed(8);
        }
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
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

    const getRealismIcon = (realism: 'green' | 'yellow' | 'red') => {
        switch (realism) {
            case 'green': return <CheckCircle size={16} />;
            case 'yellow': return <AlertTriangle size={16} />;
            case 'red': return <XCircle size={16} />;
        }
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {MARKET_CAP_SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.label}
                                    className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                                    onClick={() => applyScenario(scenario)}
                                >
                                    {scenario.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Search */}
                    <div className="input-group" ref={suggestionsRef}>
                        <label>
                            <Search size={14} />
                            Select Cryptocurrency
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={coinSearch}
                                onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder="Search coin (e.g. Bitcoin)..."
                                id="mcap-coin-search"
                            />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear selection">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((coin) => (
                                    <button
                                        key={coin.id}
                                        className="suggestion-item"
                                        onClick={() => selectCoin(coin)}
                                    >
                                        {coin.thumb && (
                                            <img src={coin.thumb} alt="" width={20} height={20} />
                                        )}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Current coin info */}
                    {coinData && (
                        <div className="input-group">
                            <label>
                                <Info size={14} />
                                Current Data (Auto-filled)
                            </label>
                            <div className="coin-info-grid">
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Price</span>
                                    <span className="coin-info-value">{formatPrice(coinData.price)}</span>
                                </div>
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Market Cap</span>
                                    <span className="coin-info-value">{formatBigNumber(coinData.marketCap)}</span>
                                </div>
                                <div className="coin-info-item">
                                    <span className="coin-info-label">Supply</span>
                                    <span className="coin-info-value">{formatSupply(coinData.circulatingSupply)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mode Toggle */}
                    <div className="input-group">
                        <label>
                            <ArrowUpDown size={14} />
                            Calculation Mode
                        </label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${mode === 'price' ? 'active' : ''}`}
                                onClick={() => setMode('price')}
                            >
                                <DollarSign size={14} />
                                What price?
                            </button>
                            <button
                                className={`toggle-btn ${mode === 'marketcap' ? 'active' : ''}`}
                                onClick={() => setMode('marketcap')}
                            >
                                <BarChart3 size={14} />
                                What market cap?
                            </button>
                        </div>
                    </div>

                    {/* Target Input */}
                    {mode === 'price' ? (
                        <div className="input-group">
                            <label>
                                <Target size={14} />
                                Target Market Cap
                            </label>
                            <div className="pills-row">
                                {TARGET_MARKET_CAP_PRESETS.map((preset) => (
                                    <button
                                        key={preset}
                                        className={`pill-btn ${targetMarketCap === String(preset) ? 'active' : ''}`}
                                        onClick={() => setTargetMarketCap(String(preset))}
                                    >
                                        {formatBigNumber(preset)}
                                    </button>
                                ))}
                            </div>
                            <div className="input-with-prefix">
                                <input
                                    type="number" inputMode="decimal"
                                    value={targetMarketCap}
                                    onChange={(e) => setTargetMarketCap(e.target.value)}
                                    placeholder=""
                                    id="mcap-target-marketcap"
                                    step="any"
                                    min="0"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="input-group">
                            <label>
                                <DollarSign size={14} />
                                Target Price
                            </label>
                            <div className="pills-row">
                                {TARGET_PRICE_PRESETS.map((preset) => (
                                    <button
                                        key={preset}
                                        className={`pill-btn ${targetPrice === String(preset) ? 'active' : ''}`}
                                        onClick={() => setTargetPrice(String(preset))}
                                    >
                                        ${preset}
                                    </button>
                                ))}
                            </div>
                            <div className="input-with-prefix">
                                <input
                                    type="number" inputMode="decimal"
                                    value={targetPrice}
                                    onChange={(e) => setTargetPrice(e.target.value)}
                                    placeholder=""
                                    id="mcap-target-price"
                                    step="any"
                                    min="0"
                                />
                            </div>
                        </div>
                    )}

                    {/* Quick Comparison */}
                    <div className="input-group">
                        <label>
                            <BarChart3 size={14} />
                            {selectedCoin ? `If ${selectedCoin.symbol.toUpperCase()} had the market cap of...` : 'Compare with top coins'}
                        </label>
                        <div className="pills-row">
                            {QUICK_COMPARE_COINS.filter(c => c.id !== selectedCoin?.id).map((coin) => (
                                <button
                                    key={coin.id}
                                    className="pill-btn"
                                    onClick={() => handleQuickCompare(coin.id)}
                                >
                                    {coin.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Circulating Supply */}
                    <div className="input-group">
                        <label>
                            <BarChart3 size={14} />
                            Circulating Supply
                            {coinData && (
                                <span className="label-hint">Auto-filled</span>
                            )}
                        </label>
                        <div className="pills-row">
                            {SUPPLY_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${circulatingSupply === String(preset) ? 'active' : ''}`}
                                    onClick={() => setCirculatingSupply(String(preset))}
                                >
                                    {formatSupply(preset)}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={circulatingSupply}
                                onChange={(e) => setCirculatingSupply(e.target.value)}
                                placeholder=""
                                id="mcap-supply"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Use top-coin comparisons as a reality check for target cap and implied price.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Main Result */}
                            <div className={`result-hero ${results.growthMultiplier >= 1 ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {results.mode === 'price' ? getUiString(lang, 'Price per Coin') : getUiString(lang, 'Market Cap')}
                                </span>
                                <span className="result-hero-value">
                                    {results.mode === 'price'
                                        ? <><DollarSign size={28} />{results.calculatedPrice !== undefined ? formatPrice(results.calculatedPrice).replace('$', '') : '—'}</>
                                        : <><BarChart3 size={28} />{results.calculatedMarketCap !== undefined ? formatBigNumber(results.calculatedMarketCap) : '—'}</>
                                    }
                                </span>
                                <span className={`result-hero-roi ${results.growthMultiplier >= 1 ? 'profit' : 'fee'}`}>
                                    {results.growthMultiplier > 0
                                        ? `${results.growthMultiplier >= 1 ? '+' : ''}${results.growthMultiplier.toFixed(2)}x ${getUiString(lang, 'from current')}`
                                        : getUiString(lang, 'Select a coin to see multiplier')}
                                </span>
                            </div>

                            {/* Growth & Realism */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Growth Multiplier')}</span>
                                    <span className={`result-value ${results.growthMultiplier >= 1 ? 'profit' : 'fee'}`}>
                                        {results.growthMultiplier > 0
                                            ? `${results.growthMultiplier.toFixed(2)}x`
                                            : getUiString(lang, 'N/A')}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Is This Realistic?')}</span>
                                    <span className={`result-value realism-${results.realism}`}>
                                        {getRealismIcon(results.realism)}
                                        {' '}
                                        {results.realism === 'green' ? getUiString(lang, 'Achievable') : results.realism === 'yellow' ? getUiString(lang, 'Ambitious') : getUiString(lang, 'Unlikely')}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    {results.realismLabel}
                                </p>
                            </div>

                            {/* Current Stats */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label"><strong>{getUiString(lang, 'Current Data')} ({results.coinSymbol.toUpperCase()})</strong></span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Price')}</span>
                                    <span className="result-value">{results.currentPrice > 0 ? formatPrice(results.currentPrice) : getUiString(lang, 'N/A')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Market Cap')}</span>
                                    <span className="result-value">{results.currentMarketCap > 0 ? formatBigNumber(results.currentMarketCap) : getUiString(lang, 'N/A')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Circulating Supply')}</span>
                                    <span className="result-value">{formatSupply(results.circulatingSupply)}</span>
                                </div>
                            </div>

                            {/* Top Coin Comparisons */}
                            {results.comparisons.length > 0 && (
                                <div className="result-breakdown">
                                    <div className="result-row" style={{ marginBottom: '4px' }}>
                                        <span className="result-label"><strong>{getUiString(lang, 'If')} {results.coinSymbol.toUpperCase()} {getUiString(lang, 'had the market cap of...')}</strong></span>
                                    </div>
                                    <div className="result-divider" />
                                    {results.comparisons.map((comp) => (
                                        <div className="result-row" key={comp.symbol}>
                                            <span className="result-label">
                                                <span className={`realism-dot realism-${comp.realism}`} />
                                                {comp.name} ({formatBigNumber(comp.marketCap)})
                                            </span>
                                            <span className="result-value">
                                                {formatPrice(comp.impliedPrice)}
                                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}>
                                                    ({comp.multiplier.toFixed(1)}x)
                                                </span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

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
                            <h3>{getUiString(lang, 'Market Cap Calculator')}</h3>
                            <p>{getUiString(lang, 'Search for a cryptocurrency, set a target market cap or price, and see what the implied value would be. Compare with top coins like BTC, ETH, and more.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
