import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Search,
    X,
    Clock,
    TrendingUp,
    TrendingDown,
    Calendar,
    Zap,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface Results {
    costPerInterval: number;
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
    annualCost: number;
    dailyAsPercent: number;
    annualAsPercent: number;
    direction: 'pay' | 'receive';
}

const HOLDING_PERIODS = [
    { label: '1 Day', days: 1 },
    { label: '1 Week', days: 7 },
    { label: '1 Month', days: 30 },
    { label: '3 Months', days: 90 },
    { label: '6 Months', days: 180 },
    { label: '1 Year', days: 365 },
] as const;

const INTERVALS_PER_DAY = [
    { label: '3× / 8h', value: 3 },
    { label: '1× / 24h', value: 1 },
] as const;

const FUNDING_PRESETS = [0.005, 0.01, 0.03, 0.05, 0.1];
const POSITION_SIZE_PILLS = ['1000', '5000', '10000', '25000'];
const FUNDING_SCENARIOS = [
    {
        label: 'Long 30d',
        positionSize: '10000',
        fundingRate: '0.01',
        intervalsPerDay: 3,
        holdingDays: 30,
        isShort: false,
    },
    {
        label: 'Short Capture',
        positionSize: '10000',
        fundingRate: '0.03',
        intervalsPerDay: 3,
        holdingDays: 7,
        isShort: true,
    },
    {
        label: 'Low Funding',
        positionSize: '5000',
        fundingRate: '0.005',
        intervalsPerDay: 1,
        holdingDays: 90,
        isShort: false,
    },
] as const;

export default function FundingRateCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [positionSize, setPositionSize] = useState('');
    const [fundingRate, setFundingRate] = useState('0.01');
    const [intervalsPerDay, setIntervalsPerDay] = useState(3);
    const [holdingDays, setHoldingDays] = useState(30);
    const [isShort, setIsShort] = useState(false);
    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [validationHint, setValidationHint] = useState('');

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Search coins
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) { setSuggestions([]); return; }
        setLoading(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setSuggestions((data.coins || []).slice(0, 8).map((c: any) => ({
                id: c.id, name: c.name, symbol: c.symbol, thumb: c.thumb,
            })));
            setShowSuggestions(true);
        } catch {
            setSuggestions([]);
            setSearchError(getUiString(lang, 'Failed to search. Check your connection and try again.'));
        }
        setLoading(false);
    }, []);

    const handleCoinSearch = (value: string) => {
        setCoinSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(value), 400);
    };

    const selectCoin = (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
    };

    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
    };
    const applyScenario = (scenario: (typeof FUNDING_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setPositionSize(scenario.positionSize);
        setFundingRate(scenario.fundingRate);
        setIntervalsPerDay(scenario.intervalsPerDay);
        setHoldingDays(scenario.holdingDays);
        setIsShort(scenario.isShort);
    };
    const isScenarioActive = (scenario: (typeof FUNDING_SCENARIOS)[number]) => (
        positionSize === scenario.positionSize
        && fundingRate === scenario.fundingRate
        && intervalsPerDay === scenario.intervalsPerDay
        && holdingDays === scenario.holdingDays
        && isShort === scenario.isShort
    );

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node))
                setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Calculate
    const calculate = useCallback(() => {
        const size = parseFloat(positionSize);
        const rate = parseFloat(fundingRate);

        if (isNaN(size) || isNaN(rate) || size <= 0) {
            setResults(null);
            setValidationHint(getUiString(lang, 'Enter a valid position size and funding rate.'));
            return;
        }
        setValidationHint('');

        // Funding rate is in % — e.g. 0.01 means 0.01%
        const rateDecimal = rate / 100;

        // Cost per funding interval
        const costPerInterval = size * rateDecimal;

        // Daily cost
        const dailyCost = costPerInterval * intervalsPerDay;

        // Projections
        const weeklyCost = dailyCost * 7;
        const monthlyCost = dailyCost * 30;
        const annualCost = dailyCost * 365;

        // As % of position
        const dailyAsPercent = (dailyCost / size) * 100;
        const annualAsPercent = (annualCost / size) * 100;

        // If funding rate is positive: longs pay shorts
        // If negative: shorts pay longs
        const direction: 'pay' | 'receive' =
            (rate > 0 && !isShort) || (rate < 0 && isShort) ? 'pay' : 'receive';

        setResults({
            costPerInterval: Math.abs(costPerInterval),
            dailyCost: Math.abs(dailyCost),
            weeklyCost: Math.abs(weeklyCost),
            monthlyCost: Math.abs(monthlyCost),
            annualCost: Math.abs(annualCost),
            dailyAsPercent: Math.abs(dailyAsPercent),
            annualAsPercent: Math.abs(annualAsPercent),
            direction,
        });
    }, [positionSize, fundingRate, intervalsPerDay, isShort]);

    useEffect(() => { calculate(); }, [calculate]);

    const totalCost = results ? results.dailyCost * holdingDays : 0;
    const totalAsPercent = results ? (totalCost / (parseFloat(positionSize) || 1)) * 100 : 0;

    const reset = () => {
        setPositionSize('');
        setFundingRate('0.01');
        setIntervalsPerDay(3);
        setHoldingDays(30);
        setIsShort(false);
        setResults(null);
        clearCoin();
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency', currency: 'USD',
            minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);

    const formatPercent = (n: number) => `${n.toFixed(4)}%`;

    const selectedPeriod = HOLDING_PERIODS.find(p => p.days === holdingDays);

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {FUNDING_SCENARIOS.map((scenario) => (
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
                            {getUiString(lang, 'Cryptocurrency (optional)')}
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={coinSearch}
                                onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder={getUiString(lang, 'Search coin (e.g. Bitcoin)...')}
                                id="funding-coin-search"
                            />
                            {selectedCoin && (
                                <button className="coin-clear" onClick={clearCoin} aria-label="Clear">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectCoin(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {searchError && <span className="input-hint" style={{ color: '#f97316' }}>{searchError}</span>}
                    </div>

                    {/* Position Type */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Your Position')}</label>
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
                            <DollarSign size={14} />
                            {getUiString(lang, 'Position Size')}
                        </label>
                        <div className="pills-row">
                            {POSITION_SIZE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${positionSize === preset ? 'active' : ''}`}
                                    onClick={() => setPositionSize(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={positionSize}
                                onChange={(e) => setPositionSize(e.target.value)}
                                placeholder=""
                                id="funding-position-size"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Funding Rate */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            {getUiString(lang, 'Funding Rate (per interval)')}
                        </label>
                        <div className="pills-row">
                            {FUNDING_PRESETS.map((r) => (
                                <button
                                    key={r}
                                    className={`pill-btn ${fundingRate === String(r) ? 'active' : ''}`}
                                    onClick={() => setFundingRate(String(r))}
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={fundingRate}
                                onChange={(e) => setFundingRate(e.target.value)}
                                placeholder=""
                                id="funding-rate-input"
                                step="0.001"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {getUiString(lang, 'Positive rate = longs pay shorts. Negative = shorts pay longs.')}
                        </span>
                    </div>

                    {/* Funding Intervals */}
                    <div className="input-group">
                        <label>
                            <Clock size={14} />
                            {getUiString(lang, 'Funding Interval')}
                        </label>
                        <div className="pills-row">
                            {INTERVALS_PER_DAY.map((iv) => (
                                <button
                                    key={iv.value}
                                    className={`pill-btn ${intervalsPerDay === iv.value ? 'active' : ''}`}
                                    onClick={() => setIntervalsPerDay(iv.value)}
                                >
                                    {iv.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Holding Period */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            {getUiString(lang, 'Holding Period')}
                        </label>
                        <div className="pills-row">
                            {HOLDING_PERIODS.map((p) => (
                                <button
                                    key={p.days}
                                    className={`pill-btn ${holdingDays === p.days ? 'active' : ''}`}
                                    onClick={() => setHoldingDays(p.days)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use size, rate, and period presets for quick funding projections.')}
                    </span>
                    {validationHint && <span className="input-hint" style={{ color: '#f97316' }}>{validationHint}</span>}
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Direction indicator */}
                            <div className={`result-hero ${results.direction === 'receive' ? 'profit' : ''}`}
                                style={results.direction === 'pay' ? { borderColor: '#f97316' } : {}}
                            >
                                <span className="result-hero-label">
                                    {results.direction === 'pay' ? getUiString(lang, 'You Pay Funding') : getUiString(lang, 'You Receive Funding')}
                                </span>
                                <span className="result-hero-value" style={{
                                    color: results.direction === 'pay' ? '#f97316' : 'var(--color-accent-green)'
                                }}>
                                    <Zap size={28} />
                                    {formatUSD(totalCost)}
                                </span>
                                <span className="result-hero-roi" style={{
                                    color: results.direction === 'pay' ? '#f97316' : 'var(--color-accent-green)'
                                }}>
                                    {results.direction === 'pay' ? '−' : '+'}{totalAsPercent.toFixed(2)}% {getUiString(lang, 'over')} {selectedPeriod?.label || `${holdingDays} ${getUiString(lang, 'days')}`}
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Funding Rate')}</span>
                                    <span className="result-value">{fundingRate}% {getUiString(lang, 'per interval')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Intervals / Day')}</span>
                                    <span className="result-value">{intervalsPerDay}× ({getUiString(lang, 'every')} {24 / intervalsPerDay}h)</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Position')}</span>
                                    <span className="result-value">{isShort ? `🔴 ${getUiString(lang, 'Short')}` : `🟢 ${getUiString(lang, 'Long')}`} {formatUSD(parseFloat(positionSize) || 0)}</span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Cost Per Interval')}</span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        {results.direction === 'pay' ? '−' : '+'}{formatUSD(results.costPerInterval)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Daily Cost')}</strong>
                                    </span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        <strong>{results.direction === 'pay' ? '−' : '+'}{formatUSD(results.dailyCost)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Weekly')}</span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        {results.direction === 'pay' ? '−' : '+'}{formatUSD(results.weeklyCost)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly (30d)')}</span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        {results.direction === 'pay' ? '−' : '+'}{formatUSD(results.monthlyCost)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Annual (365d)')}</span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        {results.direction === 'pay' ? '−' : '+'}{formatUSD(results.annualCost)} ({results.annualAsPercent.toFixed(2)}%)
                                    </span>
                                </div>

                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Total for')} {selectedPeriod?.label || `${holdingDays}d`}</strong>
                                    </span>
                                    <span className={`result-value ${results.direction === 'receive' ? 'profit' : 'fee'}`}>
                                        <strong>{results.direction === 'pay' ? '−' : '+'}{formatUSD(totalCost)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Info tip */}
                            <div style={{
                                padding: '12px 16px',
                                background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '10px',
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                color: 'var(--color-text-secondary)',
                                marginTop: '8px',
                            }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <Info size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-primary)' }} />
                                    <span>
                                        {results.direction === 'pay'
                                            ? getUiString(lang, 'Funding fees erode your margin over time. Consider the total cost when planning holding duration.')
                                            : getUiString(lang, 'Receiving funding can offset trading costs. Many traders use funding arbitrage strategies to profit from high rates.')
                                        }
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Funding rates fluctuate constantly. This calculator uses a fixed rate for projection. Actual costs may vary significantly.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Zap size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Calculate Funding Costs')}</h3>
                            <p>{getUiString(lang, 'Enter your position size and funding rate to see how much you\'ll pay or receive for holding perpetual futures.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
