import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    Search,
    DollarSign,
    TrendingUp,
    Target,
    Info,
    RotateCcw,
    X,
    BarChart3,
    Loader2,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

interface CoinMarketData {
    price: number;
    marketCap: number;
}

interface Results {
    coinsHeld: number;
    requiredPrice: number;
    growthMultiplier: number;
    growthPercent: number;
    currentPrice: number;
    investment: number;
    targetProfit: number;
    totalTarget: number;
    requiredMarketCap: number | null;
    currentMarketCap: number | null;
    probability: { label: string; color: string };
    milestones: { multiplier: number; label: string; value: number }[];
}

const INVESTMENT_PILLS = [
    { label: '$1K', value: 1000 },
    { label: '$5K', value: 5000 },
    { label: '$10K', value: 10000 },
    { label: '$25K', value: 25000 },
    { label: '$50K', value: 50000 },
];

const PROFIT_PILLS = [
    { label: '$10K', value: 10000 },
    { label: '$50K', value: 50000 },
    { label: '$100K', value: 100000 },
    { label: '$500K', value: 500000 },
    { label: '$1M', value: 1000000 },
];
const CURRENT_PRICE_PILLS = ['0.01', '0.1', '1', '10', '100'];
const REVERSE_ROI_SCENARIOS = [
    {
        label: '$10k -> +$100k',
        investmentAmount: '10000',
        targetProfit: '100000',
        currentPrice: '1',
        selectedInvestmentPill: '$10K',
        selectedProfitPill: '$100K',
    },
    {
        label: '$5k -> +$50k',
        investmentAmount: '5000',
        targetProfit: '50000',
        currentPrice: '0.1',
        selectedInvestmentPill: '$5K',
        selectedProfitPill: '$50K',
    },
    {
        label: '$25k -> +$500k',
        investmentAmount: '25000',
        targetProfit: '500000',
        currentPrice: '10',
        selectedInvestmentPill: '$25K',
        selectedProfitPill: '$500K',
    },
] as const;

const MILESTONE_MULTIPLIERS = [
    { multiplier: 2, label: '2x' },
    { multiplier: 5, label: '5x' },
    { multiplier: 10, label: '10x' },
    { multiplier: 25, label: '25x' },
    { multiplier: 50, label: '50x' },
    { multiplier: 100, label: '100x' },
];

const TOP_COINS_REFERENCE = [
    { name: 'Bitcoin', cap: 1_900_000_000_000 },
    { name: 'Ethereum', cap: 400_000_000_000 },
    { name: 'BNB', cap: 90_000_000_000 },
    { name: 'Solana', cap: 80_000_000_000 },
    { name: 'XRP', cap: 70_000_000_000 },
];

function getProbability(multiplier: number): { label: string; color: string } {
    if (multiplier < 2) return { label: 'Very Likely', color: 'var(--color-accent-green)' };
    if (multiplier < 5) return { label: 'Possible', color: 'var(--color-accent-green)' };
    if (multiplier < 10) return { label: 'Challenging', color: '#eab308' };
    if (multiplier < 50) return { label: 'Unlikely', color: '#f97316' };
    if (multiplier < 100) return { label: 'Very Unlikely', color: 'var(--color-accent-red)' };
    return { label: 'Extremely Unlikely', color: 'var(--color-accent-red)' };
}

export default function ReverseRoiCalculator({ lang = 'en' }: { lang?: string }) {
    const [coinSearch, setCoinSearch] = useState('');
    const [selectedCoin, setSelectedCoin] = useState<CoinSuggestion | null>(null);
    const [suggestions, setSuggestions] = useState<CoinSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [coinMarketData, setCoinMarketData] = useState<CoinMarketData | null>(null);

    const [investmentAmount, setInvestmentAmount] = useState('');
    const [targetProfit, setTargetProfit] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [selectedInvestmentPill, setSelectedInvestmentPill] = useState('');
    const [selectedProfitPill, setSelectedProfitPill] = useState('');

    const [results, setResults] = useState<Results | null>(null);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    // Search coins via CoinGecko
    const searchCoins = useCallback(async (query: string) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`
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

    // Handle coin search input
    const handleCoinSearch = (value: string) => {
        setCoinSearch(value);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => searchCoins(value), 400);
    };

    // Select a coin and fetch its price + market cap
    const selectCoin = async (coin: CoinSuggestion) => {
        setSelectedCoin(coin);
        setCoinSearch(coin.name);
        setShowSuggestions(false);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=REMOVED_COINGECKO_KEY`
            );
            if (!res.ok) throw new Error('Failed to fetch price');
            const data = await res.json();
            const price = data[coin.id]?.usd;
            const marketCap = data[coin.id]?.usd_market_cap || null;
            if (price) {
                setCurrentPrice(String(price));
                setCoinMarketData({ price, marketCap });
            }
        } catch {
            // Silently fail
        }
    };

    // Clear coin selection
    const clearCoin = () => {
        setSelectedCoin(null);
        setCoinSearch('');
        setSuggestions([]);
        setCoinMarketData(null);
    };
    const applyScenario = (scenario: (typeof REVERSE_ROI_SCENARIOS)[number]) => {
        clearCoin();
        setShowSuggestions(false);
        setInvestmentAmount(scenario.investmentAmount);
        setTargetProfit(scenario.targetProfit);
        setCurrentPrice(scenario.currentPrice);
        setSelectedInvestmentPill(scenario.selectedInvestmentPill);
        setSelectedProfitPill(scenario.selectedProfitPill);
    };
    const isScenarioActive = (scenario: (typeof REVERSE_ROI_SCENARIOS)[number]) => (
        investmentAmount === scenario.investmentAmount
        && targetProfit === scenario.targetProfit
        && currentPrice === scenario.currentPrice
    );

    // Close suggestions on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Calculate results
    const calculate = useCallback(() => {
        const investment = parseFloat(investmentAmount);
        const profit = parseFloat(targetProfit);
        const price = parseFloat(currentPrice);

        if (isNaN(investment) || isNaN(profit) || isNaN(price) || investment <= 0 || profit <= 0 || price <= 0) {
            setResults(null);
            return;
        }

        const coinsHeld = investment / price;
        const totalTarget = investment + profit;
        const requiredPrice = totalTarget / coinsHeld;
        const growthMultiplier = requiredPrice / price;
        const growthPercent = (growthMultiplier - 1) * 100;

        let requiredMarketCap: number | null = null;
        let currentMarketCap: number | null = null;
        if (coinMarketData && coinMarketData.marketCap) {
            currentMarketCap = coinMarketData.marketCap;
            requiredMarketCap = (requiredPrice / coinMarketData.price) * coinMarketData.marketCap;
        }

        const probability = getProbability(growthMultiplier);

        const milestones = MILESTONE_MULTIPLIERS.map((m) => ({
            multiplier: m.multiplier,
            label: m.label,
            value: investment * m.multiplier,
        }));

        setResults({
            coinsHeld,
            requiredPrice,
            growthMultiplier,
            growthPercent,
            currentPrice: price,
            investment,
            targetProfit: profit,
            totalTarget,
            requiredMarketCap,
            currentMarketCap,
            probability,
            milestones,
        });
    }, [investmentAmount, targetProfit, currentPrice, coinMarketData]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    const handleInvestmentPill = (label: string, value: number) => {
        setSelectedInvestmentPill(label);
        setInvestmentAmount(String(value));
    };

    const handleProfitPill = (label: string, value: number) => {
        setSelectedProfitPill(label);
        setTargetProfit(String(value));
    };

    const handleInvestmentInput = (value: string) => {
        setInvestmentAmount(value);
        setSelectedInvestmentPill('');
    };

    const handleProfitInput = (value: string) => {
        setTargetProfit(value);
        setSelectedProfitPill('');
    };

    const reset = () => {
        setInvestmentAmount('');
        setTargetProfit('');
        setCurrentPrice('');
        setSelectedInvestmentPill('');
        setSelectedProfitPill('');
        setResults(null);
        setCoinMarketData(null);
        clearCoin();
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

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

    const formatCompact = (n: number) => {
        if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
        if (n >= 1_000) return '$' + (n / 1_000).toFixed(1) + 'K';
        return formatUSD(n);
    };

    const getMarketCapComparison = (requiredCap: number): string | null => {
        for (const coin of TOP_COINS_REFERENCE) {
            if (requiredCap <= coin.cap * 1.2 && requiredCap >= coin.cap * 0.8) {
                return `roughly equal to ${coin.name}'s current market cap`;
            }
        }
        for (let i = 0; i < TOP_COINS_REFERENCE.length; i++) {
            if (requiredCap < TOP_COINS_REFERENCE[i].cap) {
                return `below ${TOP_COINS_REFERENCE[i].name}'s market cap (${formatBigNumber(TOP_COINS_REFERENCE[i].cap)})`;
            }
        }
        const btcCap = TOP_COINS_REFERENCE[0].cap;
        const multiple = requiredCap / btcCap;
        return `${multiple.toFixed(1)}x Bitcoin's current market cap`;
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {REVERSE_ROI_SCENARIOS.map((scenario) => (
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
                            Cryptocurrency (optional)
                        </label>
                        <div className="coin-search-wrapper">
                            <input
                                type="text"
                                value={coinSearch}
                                onChange={(e) => handleCoinSearch(e.target.value)}
                                placeholder="Search coin (e.g. Bitcoin)..."
                                id="reverse-roi-coin-search"
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
                        {loading && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Loader2 size={12} className="spin" /> Searching...
                            </div>
                        )}
                    </div>

                    {/* Current Token Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Current Token Price
                            {selectedCoin && (
                                <span className="label-hint">Auto-filled</span>
                            )}
                        </label>
                        <div className="pills-row">
                            {CURRENT_PRICE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${currentPrice === preset ? 'active' : ''}`}
                                    onClick={() => setCurrentPrice(preset)}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input
                                type="number" inputMode="decimal"
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                placeholder="0.00"
                                id="reverse-roi-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Investment Amount */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Current Investment Amount
                        </label>
                        <div className="pills-row">
                            {INVESTMENT_PILLS.map((p) => (
                                <button
                                    key={p.label}
                                    className={`pill-btn ${selectedInvestmentPill === p.label ? 'active' : ''}`}
                                    onClick={() => handleInvestmentPill(p.label, p.value)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">$</span>
                            <input
                                type="number" inputMode="decimal"
                                value={investmentAmount}
                                onChange={(e) => handleInvestmentInput(e.target.value)}
                                placeholder="10,000"
                                id="reverse-roi-investment"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Target Profit */}
                    <div className="input-group">
                        <label>
                            <Target size={14} />
                            Target Profit
                        </label>
                        <div className="pills-row">
                            {PROFIT_PILLS.map((p) => (
                                <button
                                    key={p.label}
                                    className={`pill-btn ${selectedProfitPill === p.label ? 'active' : ''}`}
                                    onClick={() => handleProfitPill(p.label, p.value)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">$</span>
                            <input
                                type="number" inputMode="decimal"
                                value={targetProfit}
                                onChange={(e) => handleProfitInput(e.target.value)}
                                placeholder="1,000,000"
                                id="reverse-roi-target"
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
                        Auto-calculates as you type. Use price, investment, and target presets for quick planning.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Hero: Required Price */}
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Required Token Price')}
                                </span>
                                <span className="result-hero-value">
                                    <TrendingUp size={28} />
                                    {formatPrice(results.requiredPrice)}
                                </span>
                                <span className="result-hero-roi profit">
                                    {results.growthMultiplier.toFixed(2)}x growth needed
                                </span>
                            </div>

                            {/* Probability Indicator */}
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    background: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {getUiString(lang, 'Probability:')}
                                </span>
                                <span
                                    style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 700,
                                        color: results.probability.color,
                                    }}
                                >
                                    {results.probability.label}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                    ({results.growthMultiplier.toFixed(1)}x)
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Price')}</span>
                                    <span className="result-value">{formatPrice(results.currentPrice)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Required Price')}</span>
                                    <span className="result-value profit">{formatPrice(results.requiredPrice)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Growth Needed')}</strong></span>
                                    <span className="result-value profit">
                                        <strong>{results.growthMultiplier.toFixed(2)}x / +{results.growthPercent.toFixed(1)}%</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Coins Held')}</span>
                                    <span className="result-value">
                                        {results.coinsHeld < 1
                                            ? results.coinsHeld.toFixed(6)
                                            : results.coinsHeld.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                                        {selectedCoin && ` ${selectedCoin.symbol.toUpperCase()}`}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Investment')}</span>
                                    <span className="result-value">{formatUSD(results.investment)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Target Profit')}</span>
                                    <span className="result-value profit">+{formatUSD(results.targetProfit)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Investment Value at Target')}</strong></span>
                                    <span className="result-value profit">
                                        <strong>{formatUSD(results.totalTarget)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Market Cap Insight */}
                            {results.requiredMarketCap && results.currentMarketCap && (
                                <div
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        background: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        marginBottom: '16px',
                                        fontSize: '0.8rem',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: 600, color: 'var(--color-text)', fontSize: '0.85rem' }}>
                                        <BarChart3 size={14} />
                                        {getUiString(lang, 'Market Cap Analysis')}
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                        {getUiString(lang, 'Current market cap:')} <strong>{formatBigNumber(results.currentMarketCap)}</strong>
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                        {getUiString(lang, 'Required market cap:')} <strong style={{ color: 'var(--color-primary)' }}>{formatBigNumber(results.requiredMarketCap)}</strong>
                                    </div>
                                    {(() => {
                                        const comparison = getMarketCapComparison(results.requiredMarketCap!);
                                        return comparison ? (
                                            <div style={{ marginTop: '6px', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                                                This would be {comparison}.
                                            </div>
                                        ) : null;
                                    })()}
                                </div>
                            )}

                            {/* Milestone Table */}
                            <div style={{ marginTop: '4px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <TrendingUp size={16} />
                                    {getUiString(lang, 'Investment Milestones')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Growth')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Token Price')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Your Investment Worth')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.milestones.map((m) => {
                                                const milestonePrice = results.currentPrice * m.multiplier;
                                                const isTarget = Math.abs(m.multiplier - results.growthMultiplier) / results.growthMultiplier < 0.15;
                                                return (
                                                    <tr
                                                        key={m.label}
                                                        style={{
                                                            borderBottom: '1px solid var(--color-border)',
                                                            background: isTarget ? 'rgba(99,102,241,0.06)' : 'transparent',
                                                        }}
                                                    >
                                                        <td style={{ padding: '8px', fontWeight: isTarget ? 700 : 500, color: isTarget ? 'var(--color-primary)' : 'var(--color-text)' }}>
                                                            {m.label}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                            {formatPrice(milestonePrice)}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 500, color: 'var(--color-accent-green)' }}>
                                                            {formatCompact(m.value)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="result-cta">
                                <a
                                    href="https://www.binance.com"
                                    target="_blank" rel="noopener noreferrer sponsored"
                                    
                                    className="cta-btn"
                                >
                                    Buy{selectedCoin ? ` ${selectedCoin.symbol.toUpperCase()}` : ''} on Binance →
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'For informational purposes only. Not financial advice. Cryptocurrency investments are highly volatile and carry significant risk. Past performance does not guarantee future results. Never invest more than you can afford to lose.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Target size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Reverse ROI Calculator')}</h3>
                            <p>{getUiString(lang, 'Enter your investment amount, target profit, and current token price to see the required price growth to reach your goal.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
