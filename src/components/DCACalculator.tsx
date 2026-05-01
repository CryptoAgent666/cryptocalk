import { getUiString } from '../i18n/ui-strings';
import { getPriceChart } from '../utils/cryptoPriceService';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    DollarSign,
    ChevronDown,
    RotateCcw,
    Loader2,
    Info,
    Search,
    X,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface DCAResult {
    totalInvested: number;
    currentValue: number;
    totalCoins: number;
    averagePrice: number;
    roi: number;
    profitLoss: number;
    purchases: number;
    // Lump sum comparison
    lumpSumValue: number;
    lumpSumRoi: number;
}

const POPULAR_COINS: CoinSuggestion[] = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
];

const FREQUENCIES = [
    { id: 'daily', label: 'Daily', days: 1 },
    { id: 'weekly', label: 'Weekly', days: 7 },
    { id: 'biweekly', label: 'Bi-weekly', days: 14 },
    { id: 'monthly', label: 'Monthly', days: 30 },
];

const START_DATE_YEARS = [1, 2, 3, 5];
const DCA_SCENARIOS = [
    { label: 'BTC Monthly', coinId: 'bitcoin', amount: '100', frequency: 'monthly', yearsAgo: 2 },
    { label: 'ETH Weekly', coinId: 'ethereum', amount: '250', frequency: 'weekly', yearsAgo: 1 },
    { label: 'SOL Bi-weekly', coinId: 'solana', amount: '500', frequency: 'biweekly', yearsAgo: 3 },
] as const;

function getDateYearsAgo(years: number): string {
    const d = new Date();
    d.setFullYear(d.getFullYear() - years);
    return d.toISOString().split('T')[0];
}

function DCACalculator({ lang = 'en' }: { lang?: string }) {
    // Coin search
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(POPULAR_COINS[0]);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Inputs
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [amount, setAmount] = useState('100');

    // State
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<DCAResult | null>(null);
    const [error, setError] = useState('');
    const [chartData, setChartData] = useState<{ date: string; value: number; invested: number; price: number; ma200: number | null }[]>([]);

    // Set default start date (1 year ago)
    useEffect(() => {
        setStartDate(getDateYearsAgo(1));
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Coin search
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions(POPULAR_COINS);
            return;
        }
        try {
            const apiKey = import.meta.env.PUBLIC_COINGECKO_API_KEY || '';
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=${apiKey}`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSuggestions(
                (data.coins || []).slice(0, 8).map((c: { id: string; name: string; symbol: string; thumb: string }) => ({
                    id: c.id,
                    name: c.name,
                    symbol: c.symbol,
                    thumb: c.thumb,
                }))
            );
        } catch {
            setSuggestions(POPULAR_COINS);
        }
    }, []);

    const handleCoinSearch = (val: string) => {
        setCoinSearch(val);
        setShowSuggestions(true);
        searchCoins(val);
    };

    const selectCoin = (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch('');
        setShowSuggestions(false);
        setResult(null);
        setChartData([]);
    };

    const clearSelectedCoin = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions(POPULAR_COINS);
        setShowSuggestions(true);
        setResult(null);
        setChartData([]);
    };

    const setDateYearsAgo = (years: number) => {
        setStartDate(getDateYearsAgo(years));
    };
    const applyScenario = (scenario: { label: string; coinId: string; amount: string; frequency: string; yearsAgo: number }) => {
        const coin = POPULAR_COINS.find((c) => c.id === scenario.coinId) || POPULAR_COINS[0];
        setSelectedCoin(coin);
        setCoinSearch('');
        setShowSuggestions(false);
        setAmount(scenario.amount);
        setFrequency(scenario.frequency);
        setStartDate(getDateYearsAgo(scenario.yearsAgo));
        setError('');
        setResult(null);
        setChartData([]);
    };
    const isScenarioActive = (scenario: { label: string; coinId: string; amount: string; frequency: string; yearsAgo: number }) => (
        selectedCoin?.id === scenario.coinId
        && amount === scenario.amount
        && frequency === scenario.frequency
        && startDate === getDateYearsAgo(scenario.yearsAgo)
    );

    // Calculate DCA
    const calculate = useCallback(async () => {
        if (!selectedCoin || !startDate || !amount) return;

        const amtNum = parseFloat(amount);
        if (!amtNum || amtNum <= 0) return;

        setLoading(true);
        setError('');
        setResult(null);
        setChartData([]);

        try {
            // Fetch historical prices
            const start = new Date(startDate);
            const now = new Date();
            const daysDiff = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff < 1) {
                setError('Start date must be in the past');
                setLoading(false);
                return;
            }

            const startTs = Math.floor(start.getTime() / 1000);
            const nowTs = Math.floor(now.getTime() / 1000);
            const prices: [number, number][] = await getPriceChart(selectedCoin.id, startTs, nowTs);

            if (prices.length === 0) {
                setError('No price data available for this period');
                setLoading(false);
                return;
            }

            // Determine frequency in days
            const freq = FREQUENCIES.find(f => f.id === frequency);
            const freqDays = freq?.days || 30;

            // Simulate DCA purchases
            let totalInvested = 0;
            let totalCoins = 0;
            let purchases = 0;
            const chart: { date: string; value: number; invested: number; price: number; ma200: number | null }[] = [];

            // Get price at start for lump sum comparison
            const startPrice = prices[0][1];

            // Walk through prices, buying at intervals
            let lastBuyTimestamp = 0;

            for (let i = 0; i < prices.length; i++) {
                const [timestamp, price] = prices[i];

                const daysSinceLastBuy = (timestamp - lastBuyTimestamp) / (1000 * 60 * 60 * 24);

                if (lastBuyTimestamp === 0 || daysSinceLastBuy >= freqDays) {
                    // Buy
                    const coinsBought = amtNum / price;
                    totalCoins += coinsBought;
                    totalInvested += amtNum;
                    purchases++;
                    lastBuyTimestamp = timestamp;
                }

                // Calculate 200-day Moving Average (approx 200 data points if daily)
                let ma200: number | null = null;
                if (i >= 199) {
                    let sum = 0;
                    for (let j = 0; j < 200; j++) {
                        sum += prices[i - j][1];
                    }
                    ma200 = sum / 200;
                }

                // Record chart point (sample to keep chart manageable)
                if (i % Math.max(1, Math.floor(prices.length / 60)) === 0 || i === prices.length - 1) {
                    chart.push({
                        date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
                        value: totalCoins * price,
                        invested: totalInvested,
                        price: price,
                        ma200: ma200,
                    });
                }
            }

            const currentPrice = prices[prices.length - 1][1];
            const currentValue = totalCoins * currentPrice;
            const profitLoss = currentValue - totalInvested;
            const roi = totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;
            const averagePrice = totalCoins > 0 ? totalInvested / totalCoins : 0;

            // Lump sum: if all money was invested at start
            const lumpSumCoins = totalInvested / startPrice;
            const lumpSumValue = lumpSumCoins * currentPrice;
            const lumpSumRoi = totalInvested > 0 ? ((lumpSumValue - totalInvested) / totalInvested) * 100 : 0;

            setResult({
                totalInvested,
                currentValue,
                totalCoins,
                averagePrice,
                roi,
                profitLoss,
                purchases,
                lumpSumValue,
                lumpSumRoi,
            });

            setChartData(chart);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to calculate. Try again.');
        }

        setLoading(false);
    }, [selectedCoin, startDate, frequency, amount]);

    // Reset
    const reset = () => {
        setSelectedCoin(POPULAR_COINS[0]);
        setCoinSearch('');
        setStartDate(getDateYearsAgo(1));
        setFrequency('monthly');
        setAmount('100');
        setResult(null);
        setChartData([]);
        setError('');
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatPercent = (n: number) => (n >= 0 ? '+' : '') + n.toFixed(2) + '%';

    const isProfit = result ? result.profitLoss >= 0 : true;
    const dcaBetter = result ? result.roi > result.lumpSumRoi : false;

    // Simple SVG chart
    const renderChart = () => {
        if (chartData.length < 2) return null;

        const width = 600;
        const height = 200;
        const padding = { top: 20, right: 10, bottom: 30, left: 10 };
        const innerW = width - padding.left - padding.right;
        const innerH = height - padding.top - padding.bottom;

        const maxVal = Math.max(...chartData.map(d => Math.max(d.value, d.invested)));
        const minVal = 0;
        const range = maxVal - minVal || 1;

        const xStep = innerW / (chartData.length - 1);

        const valuePath = chartData
            .map((d, i) => {
                const x = padding.left + i * xStep;
                const y = padding.top + innerH - ((d.value - minVal) / range) * innerH;
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
            })
            .join(' ');

        const investedPath = chartData
            .map((d, i) => {
                const x = padding.left + i * xStep;
                const y = padding.top + innerH - ((d.invested - minVal) / range) * innerH;
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
            })
            .join(' ');

        // Area fill for portfolio value
        const areaPath =
            valuePath +
            ` L${padding.left + (chartData.length - 1) * xStep},${padding.top + innerH} L${padding.left},${padding.top + innerH} Z`;

        // Generate Accumulation / FOMO zones backgrounds
        // Accumulation: Price < MA200
        // FOMO: Price > MA200 * 1.5 (Arbitrary multiplier for FOMO zone)
        const zones = chartData.map((d, i) => {
            const x = padding.left + i * xStep;
            let type: 'neutral' | 'acc' | 'fomo' = 'neutral';

            if (d.ma200 !== null) {
                if (d.price < d.ma200) {
                    type = 'acc';
                } else if (d.price > d.ma200 * 1.5) {
                    type = 'fomo';
                }
            }
            return { x, type };
        });

        const rects = [];
        let currentRect = null;

        for (let i = 0; i < zones.length; i++) {
            const z = zones[i];
            if (z.type !== 'neutral') {
                if (!currentRect || currentRect.type !== z.type) {
                    if (currentRect) rects.push(currentRect);
                    currentRect = { startX: z.x, endX: z.x, type: z.type };
                } else {
                    currentRect.endX = z.x;
                }
            } else {
                if (currentRect) {
                    rects.push(currentRect);
                    currentRect = null;
                }
            }
        }
        if (currentRect) rects.push(currentRect);

        // X-axis labels (show ~5)
        const labelInterval = Math.max(1, Math.floor(chartData.length / 5));

        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="dca-chart-svg">
                <defs>
                    <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isProfit ? '#10b981' : '#ef4444'} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={isProfit ? '#10b981' : '#ef4444'} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Draw DCA Zones */}
                {rects.map((r, i) => (
                    <rect
                        key={i}
                        x={r.startX}
                        y={padding.top}
                        width={Math.max(1, r.endX - r.startX)}
                        height={innerH}
                        fill={r.type === 'acc' ? '#10b981' : '#ef4444'}
                        opacity="0.1"
                    />
                ))}

                <path d={areaPath} fill="url(#valueGrad)" />
                <path d={investedPath} fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
                <path d={valuePath} fill="none" stroke={isProfit ? '#10b981' : '#ef4444'} strokeWidth="2" />
                {chartData.map((d, i) =>
                    i % labelInterval === 0 || i === chartData.length - 1 ? (
                        <text
                            key={i}
                            x={padding.left + i * xStep}
                            y={height - 4}
                            textAnchor="middle"
                            fontSize="9"
                            fill="var(--color-text-muted)"
                        >
                            {d.date}
                        </text>
                    ) : null
                )}
            </svg>
        );
    };

    return (
        <div className="dca-wrapper">
            <div className="dca-grid">
                {/* Left: Inputs */}
                <div className="dca-input-panel">
                    <div className="input-group">
                        <label className="input-label">{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {DCA_SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.label}
                                    className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                                    onClick={() => applyScenario(scenario)}
                                >
                                    {getUiString(lang, scenario.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Coin Selector */}
                    <div className="input-group" ref={searchRef}>
                        <label className="input-label" htmlFor="dca-coin-search">
                            <Search size={14} />
                            {getUiString(lang, 'CRYPTOCURRENCY')}
                        </label>
                        {selectedCoin && !showSuggestions ? (
                            <div className="selected-coin" onClick={() => { setShowSuggestions(true); setSuggestions(POPULAR_COINS); }}>
                                <span className="coin-symbol">{selectedCoin.symbol.toUpperCase()}</span>
                                <span className="coin-name">{selectedCoin.name}</span>
                                <X size={14} className="coin-clear" onClick={clearSelectedCoin} />
                            </div>
                        ) : (
                            <div className="search-input-wrap">
                                <input
                                    type="text"
                                    value={coinSearch}
                                    onChange={(e) => handleCoinSearch(e.target.value)}
                                    placeholder={getUiString(lang, 'Search cryptocurrency...')}
                                    className="search-input"
                                    id="dca-coin-search"
                                    autoFocus={showSuggestions}
                                />
                            </div>
                        )}
                        {showSuggestions && (
                            <div className="suggestions-dropdown">
                                {suggestions.length > 0 ? (
                                    suggestions.map((s) => (
                                        <div
                                            key={s.id}
                                            className="suggestion-item"
                                            onClick={() => selectCoin(s)}
                                        >
                                            {s.thumb && <img src={s.thumb} alt={s.name} className="suggestion-thumb" />}
                                            <span className="suggestion-name">{s.name}</span>
                                            <span className="suggestion-symbol">{s.symbol.toUpperCase()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="suggestion-empty">{getUiString(lang, 'No results')}</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Start Date */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="dca-start-date">
                            <Calendar size={14} />
                            {getUiString(lang, 'START DATE')}
                        </label>
                        <div className="pills-row">
                            {START_DATE_YEARS.map((years) => (
                                <button
                                    key={years}
                                    className={`pill-btn ${(() => {
                                        if (!startDate) return false;
                                        const selected = new Date(startDate);
                                        const today = new Date();
                                        const diff = today.getFullYear() - selected.getFullYear();
                                        return diff === years;
                                    })() ? 'active' : ''}`}
                                    onClick={() => setDateYearsAgo(years)}
                                >
                                    {years}{getUiString(lang, 'Y ago')}
                                </button>
                            ))}
                        </div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input-date"
                            id="dca-start-date"
                            max={new Date().toISOString().split('T')[0]}
                            style={{ marginTop: '8px' }}
                        />
                    </div>

                    {/* Frequency */}
                    <div className="input-group">
                        <label className="input-label">
                            <Calendar size={14} />
                            {getUiString(lang, 'FREQUENCY')}
                        </label>
                        <div className="freq-pills">
                            {FREQUENCIES.map(f => (
                                <button
                                    key={f.id}
                                    className={`freq-pill ${frequency === f.id ? 'active' : ''}`}
                                    onClick={() => setFrequency(f.id)}
                                >
                                    {getUiString(lang, f.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount per purchase */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="dca-amount">
                            <DollarSign size={14} />
                            {getUiString(lang, 'AMOUNT PER PURCHASE')}
                        </label>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="dca-amount"
                                step="any"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Quick amounts */}
                    <div className="quick-amounts">
                        {['50', '100', '250', '500', '1000'].map(a => (
                            <button
                                key={a}
                                className={`quick-amount ${amount === a ? 'active' : ''}`}
                                onClick={() => setAmount(a)}
                            >
                                ${a}
                            </button>
                        ))}
                    </div>

                    {/* Calculate Button */}
                    <button
                        className="calculate-btn"
                        onClick={calculate}
                        disabled={loading || !selectedCoin || !startDate}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="spin-icon" />
                                {getUiString(lang, 'Calculating...')}
                            </>
                        ) : (
                            getUiString(lang, 'Calculate DCA Returns')
                        )}
                    </button>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Pick coin, date, and amount presets, then tap Calculate DCA Returns.')}
                    </span>
                </div>

                {/* Right: Results */}
                <div className="dca-results-panel">
                    {error ? (
                        <div className="dca-error">
                            <p>⚠️ {getUiString(lang, error)}</p>
                        </div>
                    ) : result ? (
                        <>
                            {/* Hero */}
                            <div className={`dca-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="dca-hero-label">{getUiString(lang, 'Portfolio Value')}</span>
                                <span className="dca-hero-value">
                                    {isProfit ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                    {formatUSD(result.currentValue)}
                                </span>
                                <span className={`dca-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
                                    {formatPercent(result.roi)} {getUiString(lang, 'ROI')}
                                </span>
                            </div>

                            {/* Chart */}
                            {chartData.length > 1 && (
                                <div className="dca-chart">
                                    <div className="chart-legend">
                                        <div className="legend-group">
                                            <span className="legend-item">
                                                <span className="legend-dot portfolio"></span>
                                                {getUiString(lang, 'Portfolio Value')}
                                            </span>
                                            <span className="legend-item">
                                                <span className="legend-dot invested"></span>
                                                {getUiString(lang, 'Total Invested')}
                                            </span>
                                        </div>
                                        <div className="legend-group zones-legend">
                                            <span className="legend-item">
                                                <span className="legend-box acc"></span>
                                                {getUiString(lang, 'Accumulation Zone')}
                                            </span>
                                            <span className="legend-item">
                                                <span className="legend-box fomo"></span>
                                                {getUiString(lang, 'FOMO Zone')}
                                            </span>
                                        </div>
                                    </div>
                                    {renderChart()}
                                </div>
                            )}

                            {/* Breakdown */}
                            <div className="dca-breakdown">
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Total Invested')}</span>
                                    <span className="breakdown-value">{formatUSD(result.totalInvested)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Current Value')}</span>
                                    <span className="breakdown-value">{formatUSD(result.currentValue)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Profit / Loss')}</span>
                                    <span className={`breakdown-value ${isProfit ? 'text-profit' : 'text-loss'}`}>
                                        {isProfit ? '+' : ''}{formatUSD(result.profitLoss)}
                                    </span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Average Buy Price')}</span>
                                    <span className="breakdown-value">{formatUSD(result.averagePrice)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Total')} {selectedCoin?.symbol.toUpperCase() ?? 'COIN'}</span>
                                    <span className="breakdown-value">{result.totalCoins.toFixed(6)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Number of Purchases')}</span>
                                    <span className="breakdown-value">{result.purchases}</span>
                                </div>
                            </div>

                            {/* DCA vs Lump Sum */}
                            <div className="dca-comparison">
                                <h4 className="comparison-title">{getUiString(lang, 'DCA vs Lump Sum')}</h4>
                                <div className="comparison-grid">
                                    <div className={`comparison-card ${dcaBetter ? 'winner' : ''}`}>
                                        <span className="comparison-label">{getUiString(lang, 'DCA Strategy')}</span>
                                        <span className="comparison-value">{formatUSD(result.currentValue)}</span>
                                        <span className={`comparison-roi ${result.roi >= 0 ? 'text-profit' : 'text-loss'}`}>
                                            {formatPercent(result.roi)}
                                        </span>
                                    </div>
                                    <div className={`comparison-card ${!dcaBetter ? 'winner' : ''}`}>
                                        <span className="comparison-label">{getUiString(lang, 'Lump Sum')}</span>
                                        <span className="comparison-value">{formatUSD(result.lumpSumValue)}</span>
                                        <span className={`comparison-roi ${result.lumpSumRoi >= 0 ? 'text-profit' : 'text-loss'}`}>
                                            {formatPercent(result.lumpSumRoi)}
                                        </span>
                                    </div>
                                </div>
                                <p className="comparison-note">
                                    {dcaBetter
                                        ? getUiString(lang, '✅ DCA outperformed lump sum in this period')
                                        : getUiString(lang, '📈 Lump sum outperformed DCA in this period (common in bull markets)')}
                                </p>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Historical simulation only. Past performance does not guarantee future results. Data from CoinGecko.')}
                            </p>
                        </>
                    ) : (
                        <div className="dca-empty">
                            <TrendingUp size={40} strokeWidth={1} />
                            <h3>{getUiString(lang, 'Simulate DCA Strategy')}</h3>
                            <p>{getUiString(lang, 'Select a cryptocurrency, choose your timeframe, and see how dollar-cost averaging would have performed.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(DCACalculator);
