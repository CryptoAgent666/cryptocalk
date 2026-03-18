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
    Hash,
    ArrowUpDown,
    Ruler,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    current_price?: number;
    thumb?: string;
}

interface Results {
    pipValue: number;
    positionCoins: number;
    positionUSD: number;
    currentPrice: number;
    tickSize: number;
    pnlTable: { pips: number; value: number }[];
}

const POPULAR_PAIRS = [
    { label: 'BTC/USDT', id: 'bitcoin', symbol: 'BTC', tickPresets: [0.1, 1, 10, 100] },
    { label: 'ETH/USDT', id: 'ethereum', symbol: 'ETH', tickPresets: [0.01, 0.1, 1, 10] },
    { label: 'SOL/USDT', id: 'solana', symbol: 'SOL', tickPresets: [0.001, 0.01, 0.1, 1] },
    { label: 'XRP/USDT', id: 'ripple', symbol: 'XRP', tickPresets: [0.0001, 0.001, 0.01, 0.1] },
    { label: 'DOGE/USDT', id: 'dogecoin', symbol: 'DOGE', tickPresets: [0.00001, 0.0001, 0.001, 0.01] },
];

const PIP_STEPS = [1, 10, 50, 100, 500, 1000];
const PIP_SCENARIOS = [
    {
        label: 'BTC Swing Long',
        currentPrice: '65000',
        positionSize: '10000',
        sizeMode: 'usd' as const,
        tickSize: '10',
        isShort: false,
    },
    {
        label: 'ETH Day Trade',
        currentPrice: '3500',
        positionSize: '5000',
        sizeMode: 'usd' as const,
        tickSize: '1',
        isShort: false,
    },
    {
        label: 'XRP Short',
        currentPrice: '0.6',
        positionSize: '20000',
        sizeMode: 'usd' as const,
        tickSize: '0.01',
        isShort: true,
    },
] as const;

function getDefaultTickSize(price: number): number {
    if (price >= 10000) return 1;
    if (price >= 1000) return 0.1;
    if (price >= 100) return 0.01;
    if (price >= 10) return 0.001;
    if (price >= 1) return 0.0001;
    if (price >= 0.01) return 0.000001;
    return 0.00000001;
}

function PipCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [currentPrice, setCurrentPrice] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [sizeMode, setSizeMode] = useState<'usd' | 'coins'>('usd');
    const [tickSize, setTickSize] = useState('');
    const [isShort, setIsShort] = useState(false);
    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const CG_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || 'REMOVED_COINGECKO_KEY';

    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=${CG_KEY}`
            );
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            const coins = (data.coins || []).slice(0, 8).map((c: { id: string; name: string; symbol: string; thumb: string }) => ({
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
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[coin.id]?.usd;
            if (price) {
                setCurrentPrice(String(price));
                const defaultTick = getDefaultTickSize(price);
                setTickSize(String(defaultTick));
            }
        } catch {
            // Silently fail
        }
    };

    const selectQuickPair = async (pair: typeof POPULAR_PAIRS[0]) => {
        const coin: CoinSuggestion = { id: pair.id, name: pair.label.split('/')[0], symbol: pair.symbol };
        setSelectedCoin(coin);
        setCoinSearch(pair.label);
        setShowSuggestions(false);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${pair.id}&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[pair.id]?.usd;
            if (price) {
                setCurrentPrice(String(price));
                setTickSize(String(pair.tickPresets[1]));
            }
        } catch {
            // Silently fail
        }
    };

    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
        setCurrentPrice('');
        setTickSize('');
    };
    const applyScenario = (scenario: (typeof PIP_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setCurrentPrice(scenario.currentPrice);
        setPositionSize(scenario.positionSize);
        setSizeMode(scenario.sizeMode);
        setTickSize(scenario.tickSize);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof PIP_SCENARIOS)[number]) => (
        currentPrice === scenario.currentPrice
        && positionSize === scenario.positionSize
        && sizeMode === scenario.sizeMode
        && tickSize === scenario.tickSize
        && isShort === scenario.isShort
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

    const calculate = useCallback(() => {
        const price = parseFloat(currentPrice);
        const size = parseFloat(positionSize);
        const tick = parseFloat(tickSize);

        if (isNaN(price) || isNaN(size) || isNaN(tick) || price <= 0 || size <= 0 || tick <= 0) {
            setResults(null);
            return;
        }

        const positionCoins = sizeMode === 'usd' ? size / price : size;
        const positionUSD = sizeMode === 'usd' ? size : size * price;
        const pipValue = positionCoins * tick;

        const pnlTable = PIP_STEPS.map((pips) => ({
            pips,
            value: pipValue * pips,
        }));

        setResults({
            pipValue,
            positionCoins,
            positionUSD,
            currentPrice: price,
            tickSize: tick,
            pnlTable,
        });
    }, [currentPrice, positionSize, tickSize, sizeMode]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setPositionSize('');
        setCurrentPrice('');
        setTickSize('');
        setSizeMode('usd');
        setIsShort(false);
        setResults(null);
        clearCoin();
    };

    const formatUSD = (n: number) => {
        if (Math.abs(n) < 0.01 && n !== 0) {
            return '$' + n.toFixed(6);
        }
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatCoins = (n: number) => {
        if (n >= 1) return n.toFixed(4);
        if (n >= 0.001) return n.toFixed(6);
        return n.toFixed(8);
    };

    const formatPrice = (n: number) => {
        if (n >= 1) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (n >= 0.01) return '$' + n.toFixed(4);
        if (n >= 0.0001) return '$' + n.toFixed(6);
        return '$' + n.toFixed(8);
    };

    const formatTick = (n: number) => {
        if (n >= 1) return '$' + n.toFixed(2);
        if (n >= 0.01) return '$' + n.toFixed(4);
        if (n >= 0.0001) return '$' + n.toFixed(6);
        return '$' + n.toFixed(8);
    };

    const getTickPresets = (): number[] => {
        const pair = POPULAR_PAIRS.find((p) => p.id === selectedCoin?.id);
        if (pair) return pair.tickPresets;
        const price = parseFloat(currentPrice);
        if (isNaN(price) || price <= 0) return [0.01, 0.1, 1, 10];
        const base = getDefaultTickSize(price);
        return [base, base * 10, base * 100, base * 1000];
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {PIP_SCENARIOS.map((scenario) => (
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

                    {/* Quick Pair Buttons */}
                    <div className="input-group">
                        <label>
                            <ArrowUpDown size={14} />
                            {getUiString(lang, 'Quick Pairs')}
                        </label>
                        <div className="pills-row">
                            {POPULAR_PAIRS.map((pair) => (
                                <button
                                    key={pair.id}
                                    className={`pill-btn ${selectedCoin?.id === pair.id ? 'active' : ''}`}
                                    onClick={() => selectQuickPair(pair)}
                                >
                                    {pair.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Search */}
                    <div className="input-group" ref={suggestionsRef}>
                        <label>
                            <Search size={14} />
                            {getUiString(lang, 'Cryptocurrency')}
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={coinSearch}
                                onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder={getUiString(lang, 'Search coin (e.g. Bitcoin)...')}
                                id="pip-coin-search"
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
                                            <img src={coin.thumb} alt={coin.name} width={20} height={20} loading="lazy" />
                                        )}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Current Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Current Price')}
                            {selectedCoin && (
                                <span className="label-hint">{getUiString(lang, 'Auto-filled')}</span>
                            )}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                placeholder=""
                                id="pip-current-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Position Type */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Direction')}</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${!isShort ? 'active' : ''}`}
                                onClick={() => setIsShort(false)}
                            >
                                <TrendingUp size={14} />
                                {getUiString(lang, 'Long')}
                            </button>
                            <button
                                className={`toggle-btn toggle-short ${isShort ? 'active' : ''}`}
                                onClick={() => setIsShort(true)}
                            >
                                <TrendingDown size={14} />
                                {getUiString(lang, 'Short')}
                            </button>
                        </div>
                    </div>

                    {/* Position Size */}
                    <div className="input-group">
                        <label>
                            <Hash size={14} />
                            {getUiString(lang, 'Position Size')}
                        </label>
                        <div className="toggle-group" style={{ marginBottom: '8px' }}>
                            <button
                                className={`toggle-btn ${sizeMode === 'usd' ? 'active' : ''}`}
                                onClick={() => setSizeMode('usd')}
                            >
                                <DollarSign size={14} />
                                {getUiString(lang, 'USD')}
                            </button>
                            <button
                                className={`toggle-btn ${sizeMode === 'coins' ? 'active' : ''}`}
                                onClick={() => setSizeMode('coins')}
                            >
                                <Hash size={14} />
                                {getUiString(lang, 'Coins')}
                            </button>
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={positionSize}
                                onChange={(e) => setPositionSize(e.target.value)}
                                placeholder=""
                                id="pip-position-size"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Tick / Pip Size */}
                    <div className="input-group">
                        <label>
                            <Ruler size={14} />
                            {getUiString(lang, 'Tick / Pip Size')}
                        </label>
                        <div className="pills-row">
                            {getTickPresets().map((t) => (
                                <button
                                    key={t}
                                    className={`pill-btn ${tickSize === String(t) ? 'active' : ''}`}
                                    onClick={() => setTickSize(String(t))}
                                >
                                    {formatTick(t)}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tickSize}
                                onChange={(e) => setTickSize(e.target.value)}
                                placeholder=""
                                id="pip-tick-size"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Choose USD or Coins to match your position model.')}
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Main Result: Value of 1 Pip */}
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Value of 1 Pip / Tick')}
                                </span>
                                <span className="result-hero-value">
                                    <Ruler size={28} />
                                    {formatUSD(results.pipValue)}
                                </span>
                                <span className="result-hero-roi profit">
                                    {getUiString(lang, 'per')} {formatTick(results.tickSize)} {getUiString(lang, 'move')}
                                </span>
                            </div>

                            {/* Position Info */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Position Size')}</span>
                                    <span className="result-value">{formatUSD(results.positionUSD)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Position in Coins')}</span>
                                    <span className="result-value">
                                        {formatCoins(results.positionCoins)} {selectedCoin ? selectedCoin.symbol.toUpperCase() : getUiString(lang, 'coins')}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Price')}</span>
                                    <span className="result-value">{formatPrice(results.currentPrice)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tick Size')}</span>
                                    <span className="result-value">{formatTick(results.tickSize)}</span>
                                </div>
                            </div>

                            {/* P&L per N Pips Table */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label"><strong>{getUiString(lang, 'Price Move')}</strong></span>
                                    <span className="result-value"><strong>{getUiString(lang, 'P&L')}</strong></span>
                                </div>
                                <div className="result-divider" />
                                {results.pnlTable.map(({ pips, value }) => (
                                    <div className="result-row" key={pips}>
                                        <span className="result-label">
                                            {pips} {pips === 1 ? getUiString(lang, 'pip') : getUiString(lang, 'pips')} ({formatTick(results.tickSize * pips)})
                                        </span>
                                        <span className={`result-value ${isShort ? 'fee' : 'profit'}`}>
                                            {isShort ? '−' : '+'}{formatUSD(value)}
                                        </span>
                                    </div>
                                ))}
                                <div className="result-divider" />
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    {isShort ? getUiString(lang, 'Values shown as profit for short (price moves down). Reverse sign if price moves up.') : getUiString(lang, 'Values shown as profit for long (price moves up). Reverse sign if price moves down.')}
                                </p>
                            </div>

                            {/* Quick Reference */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label"><strong>{getUiString(lang, 'Common Tick Sizes')}</strong></span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'BTC/USDT')}</span>
                                    <span className="result-value">$0.10 — $10.00</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'ETH/USDT')}</span>
                                    <span className="result-value">$0.01 — $1.00</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'SOL/USDT')}</span>
                                    <span className="result-value">$0.001 — $0.10</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'XRP/USDT')}</span>
                                    <span className="result-value">$0.0001 — $0.01</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'DOGE/USDT')}</span>
                                    <span className="result-value">$0.00001 — $0.001</span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Tick sizes vary by exchange and trading pair.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Ruler size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Calculate Pip / Tick Value')}</h3>
                            <p>{getUiString(lang, 'Select a trading pair, enter your position size and tick size to see the dollar value of each price movement.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(PipCalculator);
