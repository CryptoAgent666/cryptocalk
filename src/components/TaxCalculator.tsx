import { useState, useCallback, useEffect } from 'react';
import {
    Globe,
    DollarSign,
    Calendar,
    RotateCcw,
    Info,
    TrendingUp,
    TrendingDown,
    ChevronDown,
} from 'lucide-react';

interface TaxBracket {
    label: string;
    shortTermRate: number;
    longTermRate: number;
}

interface CountryConfig {
    name: string;
    currency: string;
    shortTermLabel: string;
    longTermLabel: string;
    longTermThreshold: string;
    brackets: TaxBracket[];
    notes: string;
}

const COUNTRIES: Record<string, CountryConfig> = {
    us: {
        name: 'United States',
        currency: 'USD',
        shortTermLabel: 'Short-term (< 1 year)',
        longTermLabel: 'Long-term (≥ 1 year)',
        longTermThreshold: '1 year',
        brackets: [
            { label: '$0 – $44,725', shortTermRate: 12, longTermRate: 0 },
            { label: '$44,726 – $95,375', shortTermRate: 22, longTermRate: 15 },
            { label: '$95,376 – $191,950', shortTermRate: 24, longTermRate: 15 },
            { label: '$191,951 – $243,725', shortTermRate: 32, longTermRate: 15 },
            { label: '$243,726 – $609,350', shortTermRate: 35, longTermRate: 20 },
            { label: '$609,351+', shortTermRate: 37, longTermRate: 20 },
        ],
        notes: 'US taxes crypto as property. Short-term gains taxed as ordinary income. NIIT (3.8%) may apply to high earners.',
    },
    uk: {
        name: 'United Kingdom',
        currency: 'GBP',
        shortTermLabel: 'Basic rate taxpayer',
        longTermLabel: 'Higher rate taxpayer',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: '£0 – £37,700', shortTermRate: 10, longTermRate: 10 },
            { label: '£37,701 – £125,140', shortTermRate: 20, longTermRate: 20 },
            { label: '£125,141+', shortTermRate: 20, longTermRate: 20 },
        ],
        notes: 'UK has a £3,000 annual CGT exemption (2024/25). No distinction for holding period. 10% basic / 20% higher rate.',
    },
    de: {
        name: 'Germany',
        currency: 'EUR',
        shortTermLabel: 'Held < 1 year',
        longTermLabel: 'Held ≥ 1 year',
        longTermThreshold: '1 year',
        brackets: [
            { label: '€0 – €11,604 (exempt)', shortTermRate: 0, longTermRate: 0 },
            { label: '€11,605 – €62,809', shortTermRate: 25, longTermRate: 0 },
            { label: '€62,810 – €277,825', shortTermRate: 42, longTermRate: 0 },
            { label: '€277,826+', shortTermRate: 45, longTermRate: 0 },
        ],
        notes: 'Germany: crypto held over 1 year is TAX FREE. Short-term gains under €600 are also exempt. This is one of the most crypto-friendly tax regimes.',
    },
    au: {
        name: 'Australia',
        currency: 'AUD',
        shortTermLabel: 'Short-term (< 12 months)',
        longTermLabel: 'Long-term (≥ 12 months, 50% discount)',
        longTermThreshold: '12 months',
        brackets: [
            { label: 'A$0 – A$18,200 (tax-free)', shortTermRate: 0, longTermRate: 0 },
            { label: 'A$18,201 – A$45,000', shortTermRate: 19, longTermRate: 9.5 },
            { label: 'A$45,001 – A$120,000', shortTermRate: 32.5, longTermRate: 16.25 },
            { label: 'A$120,001 – A$180,000', shortTermRate: 37, longTermRate: 18.5 },
            { label: 'A$180,001+', shortTermRate: 45, longTermRate: 22.5 },
        ],
        notes: 'Australia offers a 50% CGT discount for assets held over 12 months. Crypto is treated as a CGT asset.',
    },
    ca: {
        name: 'Canada',
        currency: 'CAD',
        shortTermLabel: 'Capital gains (50% inclusion)',
        longTermLabel: 'Capital gains (50% inclusion)',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: 'C$0 – C$55,867', shortTermRate: 7.5, longTermRate: 7.5 },
            { label: 'C$55,868 – C$111,733', shortTermRate: 10.25, longTermRate: 10.25 },
            { label: 'C$111,734 – C$154,906', shortTermRate: 13, longTermRate: 13 },
            { label: 'C$154,907 – C$220,000', shortTermRate: 14.5, longTermRate: 14.5 },
            { label: 'C$220,001+', shortTermRate: 16.5, longTermRate: 16.5 },
        ],
        notes: 'Canada: only 50% of capital gains are taxable, included in your regular income. No distinction by holding period.',
    },
    in: {
        name: 'India',
        currency: 'INR',
        shortTermLabel: 'Flat rate',
        longTermLabel: 'Flat rate',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 30, longTermRate: 30 },
        ],
        notes: 'India: flat 30% tax on all crypto gains + 4% cess = 31.2% effective. No deduction allowed except cost of acquisition. 1% TDS on transfers above ₹10,000.',
    },
};

const METHODS = [
    { id: 'fifo', label: 'FIFO', description: 'First In, First Out — sell your oldest coins first' },
    { id: 'lifo', label: 'LIFO', description: 'Last In, First Out — sell your newest coins first' },
];

const BUY_PRICE_PILLS = ['10000', '30000', '60000', '100000'];
const SELL_PRICE_PILLS = ['30000', '65000', '90000', '120000'];
const QUANTITY_PILLS = ['0.1', '0.5', '1', '2'];
const TAX_SCENARIOS = [
    {
        label: 'US Short-Term',
        country: 'us',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'short' as const,
        bracketIndex: 1,
        method: 'fifo',
    },
    {
        label: 'AU Long-Term',
        country: 'au',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'long' as const,
        bracketIndex: 2,
        method: 'fifo',
    },
    {
        label: 'DE 1Y+ Exempt',
        country: 'de',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'long' as const,
        bracketIndex: 1,
        method: 'fifo',
    },
] as const;

interface TaxResult {
    capitalGain: number;
    taxRate: number;
    estimatedTax: number;
    effectiveRate: number;
    isLongTerm: boolean;
    holdingPeriodLabel: string;
    bracketLabel: string;
}

export default function TaxCalculator() {
    const [country, setCountry] = useState('us');
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('short');
    const [bracketIndex, setBracketIndex] = useState(1);
    const [method, setMethod] = useState('fifo');
    const [result, setResult] = useState<TaxResult | null>(null);
    const applyScenario = (scenario: (typeof TAX_SCENARIOS)[number]) => {
        setCountry(scenario.country);
        setBuyPrice(scenario.buyPrice);
        setSellPrice(scenario.sellPrice);
        setQuantity(scenario.quantity);
        setHoldingPeriod(scenario.holdingPeriod);
        setBracketIndex(scenario.bracketIndex);
        setMethod(scenario.method);
    };
    const isScenarioActive = (scenario: (typeof TAX_SCENARIOS)[number]) => (
        country === scenario.country
        && buyPrice === scenario.buyPrice
        && sellPrice === scenario.sellPrice
        && quantity === scenario.quantity
        && holdingPeriod === scenario.holdingPeriod
        && bracketIndex === scenario.bracketIndex
        && method === scenario.method
    );

    const config = COUNTRIES[country];

    const calculate = useCallback(() => {
        const buy = parseFloat(buyPrice);
        const sell = parseFloat(sellPrice);
        const qty = parseFloat(quantity);

        if (isNaN(buy) || isNaN(sell) || isNaN(qty) || qty <= 0) {
            setResult(null);
            return;
        }

        const totalBuy = buy * qty;
        const totalSell = sell * qty;
        const capitalGain = totalSell - totalBuy;

        const isLong = holdingPeriod === 'long';
        const bracket = config.brackets[Math.min(bracketIndex, config.brackets.length - 1)];
        const taxRate = isLong ? bracket.longTermRate : bracket.shortTermRate;

        const estimatedTax = capitalGain > 0 ? capitalGain * (taxRate / 100) : 0;
        const effectiveRate = capitalGain > 0 ? (estimatedTax / capitalGain) * 100 : 0;

        setResult({
            capitalGain,
            taxRate,
            estimatedTax,
            effectiveRate,
            isLongTerm: isLong,
            holdingPeriodLabel: isLong ? config.longTermLabel : config.shortTermLabel,
            bracketLabel: bracket.label,
        });
    }, [buyPrice, sellPrice, quantity, holdingPeriod, bracketIndex, config, country]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setBuyPrice('');
        setSellPrice('');
        setQuantity('1');
        setHoldingPeriod('short');
        setBracketIndex(1);
        setMethod('fifo');
        setResult(null);
    };

    const formatCurrency = (n: number) => {
        const sym = config.currency === 'USD' ? '$' : config.currency === 'GBP' ? '£' : config.currency === 'EUR' ? '€' : config.currency === 'AUD' ? 'A$' : config.currency === 'CAD' ? 'C$' : '₹';
        return `${sym}${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const isGain = result ? result.capitalGain >= 0 : true;

    return (
        <div className="tax-wrapper">
            <div className="tax-grid">
                {/* Left: Inputs */}
                <div className="tax-input-panel">
                    <div className="input-group">
                        <label className="input-label">Quick Scenarios</label>
                        <div className="pills-row">
                            {TAX_SCENARIOS.map((scenario) => (
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

                    {/* Country Selector */}
                    <div className="input-group">
                        <label className="input-label">
                            <Globe size={14} />
                            COUNTRY
                        </label>
                        <div className="select-wrap">
                            <select
                                value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                    setBracketIndex(1);
                                }}
                                className="select-input"
                                id="tax-country"
                            >
                                {Object.entries(COUNTRIES).map(([key, c]) => (
                                    <option key={key} value={key}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-icon" />
                        </div>
                    </div>

                    {/* Income Bracket */}
                    <div className="input-group">
                        <label className="input-label">
                            <DollarSign size={14} />
                            INCOME BRACKET
                        </label>
                        <div className="select-wrap">
                            <select
                                value={bracketIndex}
                                onChange={(e) => {
                                    setBracketIndex(parseInt(e.target.value));
                                }}
                                className="select-input"
                                id="tax-bracket"
                            >
                                {config.brackets.map((b, i) => (
                                    <option key={i} value={i}>{b.label}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-icon" />
                        </div>
                    </div>

                    {/* Holding Period */}
                    <div className="input-group">
                        <label className="input-label">
                            <Calendar size={14} />
                            HOLDING PERIOD
                        </label>
                        <div className="holding-pills">
                            <button
                                className={`holding-pill ${holdingPeriod === 'short' ? 'active' : ''}`}
                                onClick={() => setHoldingPeriod('short')}
                            >
                                {config.shortTermLabel}
                            </button>
                            <button
                                className={`holding-pill ${holdingPeriod === 'long' ? 'active' : ''}`}
                                onClick={() => setHoldingPeriod('long')}
                            >
                                {config.longTermLabel}
                            </button>
                        </div>
                    </div>

                    {/* Buy Price */}
                    <div className="input-group">
                        <label className="input-label">
                            <DollarSign size={14} />
                            BUY PRICE (per coin)
                        </label>
                        <div className="pills-row">
                            {BUY_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${buyPrice === price ? 'active' : ''}`}
                                    onClick={() => setBuyPrice(price)}
                                >
                                    {config.currency === 'AUD' ? 'A$' : config.currency === 'USD' ? '$' : ''}
                                    {Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <span className="input-prefix">{config.currency}</span>
                            <input
                                type="number"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                placeholder="30,000"
                                id="tax-buy-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Sell Price */}
                    <div className="input-group">
                        <label className="input-label">
                            <DollarSign size={14} />
                            SELL PRICE (per coin)
                        </label>
                        <div className="pills-row">
                            {SELL_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${sellPrice === price ? 'active' : ''}`}
                                    onClick={() => setSellPrice(price)}
                                >
                                    {config.currency === 'AUD' ? 'A$' : config.currency === 'USD' ? '$' : ''}
                                    {Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <span className="input-prefix">{config.currency}</span>
                            <input
                                type="number"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                placeholder="65,000"
                                id="tax-sell-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="input-group">
                        <label className="input-label">
                            QUANTITY
                        </label>
                        <div className="pills-row">
                            {QUANTITY_PILLS.map((qty) => (
                                <button
                                    key={qty}
                                    className={`pill-btn ${quantity === qty ? 'active' : ''}`}
                                    onClick={() => setQuantity(qty)}
                                >
                                    {qty}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <span className="input-prefix">#</span>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="1"
                                id="tax-quantity"
                                step="any"
                                min="0.000001"
                            />
                        </div>
                    </div>

                    {/* Method */}
                    <div className="input-group">
                        <label className="input-label">ACCOUNTING METHOD</label>
                        <div className="method-pills">
                            {METHODS.map(m => (
                                <button
                                    key={m.id}
                                    className={`method-pill ${method === m.id ? 'active' : ''}`}
                                    onClick={() => setMethod(m.id)}
                                    title={m.description}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                        <p className="method-desc">
                            {METHODS.find(m => m.id === method)?.description}
                        </p>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Use price and quantity presets for a quick tax estimate.
                    </span>
                </div>

                {/* Right: Results */}
                <div className="tax-results-panel">
                    {result ? (
                        <>
                            {/* Hero */}
                            <div className={`tax-hero ${isGain ? 'gain' : 'loss'}`}>
                                <span className="tax-hero-label">
                                    {isGain ? 'Capital Gain' : 'Capital Loss'}
                                </span>
                                <span className="tax-hero-value">
                                    {isGain ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                    {isGain ? '' : '−'}{formatCurrency(result.capitalGain)}
                                </span>
                            </div>

                            {/* Tax Owed */}
                            <div className="tax-owed-card">
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">Estimated Tax</span>
                                    <span className="tax-owed-value">
                                        {result.estimatedTax > 0 ? formatCurrency(result.estimatedTax) : 'No tax owed'}
                                    </span>
                                </div>
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">Applicable Rate</span>
                                    <span className="tax-owed-value">{result.taxRate}%</span>
                                </div>
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">Effective Rate</span>
                                    <span className="tax-owed-value">{result.effectiveRate.toFixed(1)}%</span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="tax-breakdown">
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Country</span>
                                    <span className="breakdown-value">{config.name}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Income Bracket</span>
                                    <span className="breakdown-value">{result.bracketLabel}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Holding Period</span>
                                    <span className="breakdown-value">{result.holdingPeriodLabel}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Method</span>
                                    <span className="breakdown-value">{method.toUpperCase()}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Total Cost Basis</span>
                                    <span className="breakdown-value">{formatCurrency(parseFloat(buyPrice) * (parseFloat(quantity) || 1))}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">Total Proceeds</span>
                                    <span className="breakdown-value">{formatCurrency(parseFloat(sellPrice) * (parseFloat(quantity) || 1))}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">After-Tax Proceeds</span>
                                    <span className={`breakdown-value ${isGain ? 'text-profit' : 'text-loss'}`}>
                                        {formatCurrency(parseFloat(sellPrice) * (parseFloat(quantity) || 1) - result.estimatedTax)}
                                    </span>
                                </div>
                            </div>

                            {/* Short vs Long Comparison */}
                            {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate !==
                                config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate && result.capitalGain > 0 && (
                                    <div className="tax-comparison">
                                        <h4 className="comparison-title">Short-Term vs Long-Term</h4>
                                        <div className="comparison-grid">
                                            <div className={`comparison-card ${!result.isLongTerm ? 'current' : ''}`}>
                                                <span className="comparison-label">Short-Term</span>
                                                <span className="comparison-value">
                                                    {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate}%
                                                </span>
                                                <span className="comparison-tax">
                                                    {formatCurrency(result.capitalGain * config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate / 100)}
                                                </span>
                                            </div>
                                            <div className={`comparison-card ${result.isLongTerm ? 'current' : ''}`}>
                                                <span className="comparison-label">Long-Term</span>
                                                <span className="comparison-value">
                                                    {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate}%
                                                </span>
                                                <span className="comparison-tax">
                                                    {formatCurrency(result.capitalGain * config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate / 100)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="comparison-saving">
                                            💡 Holding longer could save you{' '}
                                            <strong>
                                                {formatCurrency(
                                                    result.capitalGain *
                                                    (config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate -
                                                        config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate) /
                                                    100
                                                )}
                                            </strong>
                                        </p>
                                    </div>
                                )}

                            {/* Country Notes */}
                            <div className="tax-notes">
                                <Info size={14} />
                                <p>{config.notes}</p>
                            </div>

                            {/* CTA */}
                            <a
                                href="https://coinledger.io"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="tax-cta"
                            >
                                Get Your Full Tax Report with CoinLedger — Save 20% →
                            </a>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                This is an estimate only, not tax advice. Tax laws vary and change frequently. Consult a qualified tax professional for your specific situation.
                            </p>
                        </>
                    ) : (
                        <div className="tax-empty">
                            <Globe size={40} strokeWidth={1} />
                            <h3>Estimate Your Crypto Taxes</h3>
                            <p>Select your country, enter your trade details, and see your estimated capital gains tax instantly.</p>
                            <div className="tax-features">
                                <span>🌍 6 countries</span>
                                <span>📊 FIFO / LIFO</span>
                                <span>📅 Short / Long-term</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
