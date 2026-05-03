import { useState, useCallback, useEffect } from 'react';
import { getUiString } from '../i18n/ui-strings';
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
import { withErrorBoundary } from './ErrorBoundary';

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
            { label: '$0 – $48,475', shortTermRate: 12, longTermRate: 0 },
            { label: '$48,476 – $103,350', shortTermRate: 22, longTermRate: 15 },
            { label: '$103,351 – $197,300', shortTermRate: 24, longTermRate: 15 },
            { label: '$197,301 – $250,525', shortTermRate: 32, longTermRate: 15 },
            { label: '$250,526 – $626,350', shortTermRate: 35, longTermRate: 20 },
            { label: '$626,351+', shortTermRate: 37, longTermRate: 20 },
        ],
        notes: 'US taxes crypto as property. Short-term gains taxed as ordinary income. NIIT (3.8%) may apply to high earners. Brackets updated for 2026 tax year (single filer).',
    },
    uk: {
        name: 'United Kingdom',
        currency: 'GBP',
        shortTermLabel: 'Basic rate taxpayer',
        longTermLabel: 'Higher rate taxpayer',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: '£0 – £37,700', shortTermRate: 18, longTermRate: 18 },
            { label: '£37,701 – £125,140', shortTermRate: 24, longTermRate: 24 },
            { label: '£125,141+', shortTermRate: 24, longTermRate: 24 },
        ],
        notes: 'UK has a £3,000 annual CGT exemption (2025/26). No distinction for holding period. 18% basic / 24% higher rate (updated Oct 2024 Budget).',
    },
    de: {
        name: 'Germany',
        currency: 'EUR',
        shortTermLabel: 'Held < 1 year',
        longTermLabel: 'Held ≥ 1 year',
        longTermThreshold: '1 year',
        brackets: [
            { label: '€0 – €12,084 (exempt)', shortTermRate: 0, longTermRate: 0 },
            { label: '€12,085 – €68,430', shortTermRate: 25, longTermRate: 0 },
            { label: '€68,431 – €277,825', shortTermRate: 42, longTermRate: 0 },
            { label: '€277,826+', shortTermRate: 45, longTermRate: 0 },
        ],
        notes: 'Germany: crypto held over 1 year is TAX FREE. Short-term gains under €1,000/year are exempt (raised from €600 in 2024). One of the most crypto-friendly tax regimes. Brackets updated for 2026.',
    },
    au: {
        name: 'Australia',
        currency: 'AUD',
        shortTermLabel: 'Short-term (< 12 months)',
        longTermLabel: 'Long-term (≥ 12 months, 50% discount)',
        longTermThreshold: '12 months',
        brackets: [
            { label: 'A$0 – A$18,200 (tax-free)', shortTermRate: 0, longTermRate: 0 },
            { label: 'A$18,201 – A$45,000', shortTermRate: 16, longTermRate: 8 },
            { label: 'A$45,001 – A$135,000', shortTermRate: 30, longTermRate: 15 },
            { label: 'A$135,001 – A$190,000', shortTermRate: 37, longTermRate: 18.5 },
            { label: 'A$190,001+', shortTermRate: 45, longTermRate: 22.5 },
        ],
        notes: 'Australia: 50% CGT discount for assets held over 12 months. Crypto treated as CGT asset. Stage 3 tax cuts (effective 2024-07-01): 19%→16% for low bracket, threshold raised to A$135K/A$190K.',
    },
    ca: {
        name: 'Canada',
        currency: 'CAD',
        shortTermLabel: 'Capital gains (50%/66.67% inclusion)',
        longTermLabel: 'Capital gains (50%/66.67% inclusion)',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: 'C$0 – C$55,867', shortTermRate: 7.5, longTermRate: 7.5 },
            { label: 'C$55,868 – C$111,733', shortTermRate: 10.25, longTermRate: 10.25 },
            { label: 'C$111,734 – C$154,906', shortTermRate: 13, longTermRate: 13 },
            { label: 'C$154,907 – C$220,000', shortTermRate: 14.5, longTermRate: 14.5 },
            { label: 'C$220,001+', shortTermRate: 16.5, longTermRate: 16.5 },
        ],
        notes: 'Canada: 50% of capital gains are taxable up to C$250K; gains above C$250K have a 66.67% inclusion rate (effective Jan 1, 2026). Rates shown use the 50% inclusion. No distinction by holding period.',
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
    jp: {
        name: 'Japan',
        currency: 'JPY',
        shortTermLabel: 'Miscellaneous income',
        longTermLabel: 'Miscellaneous income',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: '¥0 – ¥1,950,000', shortTermRate: 15, longTermRate: 15 },
            { label: '¥1,950,001 – ¥3,300,000', shortTermRate: 20, longTermRate: 20 },
            { label: '¥3,300,001 – ¥6,950,000', shortTermRate: 30, longTermRate: 30 },
            { label: '¥6,950,001 – ¥9,000,000', shortTermRate: 33, longTermRate: 33 },
            { label: '¥9,000,001 – ¥18,000,000', shortTermRate: 43, longTermRate: 43 },
            { label: '¥18,000,001 – ¥40,000,000', shortTermRate: 50, longTermRate: 50 },
            { label: '¥40,000,001+', shortTermRate: 55, longTermRate: 55 },
        ],
        notes: 'Japan classifies crypto as miscellaneous income. Rates include 10% local inhabitant tax. Gains under ¥200,000 exempt from filing.',
    },
    br: {
        name: 'Brazil',
        currency: 'BRL',
        shortTermLabel: 'Flat rate',
        longTermLabel: 'Flat rate',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 17.5, longTermRate: 17.5 },
        ],
        notes: 'Brazil: flat 17.5% on all crypto gains (2026 reform). No cross-asset loss offsetting. Losses carry forward 5 quarters.',
    },
    fr: {
        name: 'France',
        currency: 'EUR',
        shortTermLabel: 'Flat tax (PFU)',
        longTermLabel: 'Flat tax (PFU)',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 30, longTermRate: 30 },
        ],
        notes: 'France: 30% flat tax (PFU). Crypto-to-crypto swaps are NOT taxable. Gains under €305/year exempt.',
    },
    es_country: {
        name: 'Spain',
        currency: 'EUR',
        shortTermLabel: 'Savings tax',
        longTermLabel: 'Savings tax',
        longTermThreshold: 'N/A (no holding period benefit)',
        brackets: [
            { label: '€0 – €6,000', shortTermRate: 19, longTermRate: 19 },
            { label: '€6,001 – €50,000', shortTermRate: 21, longTermRate: 21 },
            { label: '€50,001 – €200,000', shortTermRate: 23, longTermRate: 23 },
            { label: '€200,001 – €300,000', shortTermRate: 27, longTermRate: 27 },
            { label: '€300,001+', shortTermRate: 30, longTermRate: 30 },
        ],
        notes: 'Spain: progressive savings tax. No holding period benefit. FIFO required. Losses carry forward 4 years.',
    },
    kr: {
        name: 'South Korea',
        currency: 'KRW',
        shortTermLabel: 'Flat rate (delayed)',
        longTermLabel: 'Flat rate (delayed)',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains above ₩50M', shortTermRate: 22, longTermRate: 22 },
        ],
        notes: 'South Korea: 22% (incl. local tax) on gains above ₩50M. Currently delayed to 2027. No crypto tax enforced yet.',
    },
    pt_country: {
        name: 'Portugal',
        currency: 'EUR',
        shortTermLabel: 'Held < 365 days (28%)',
        longTermLabel: 'Held ≥ 365 days (0%)',
        longTermThreshold: '365 days',
        brackets: [
            { label: 'All gains', shortTermRate: 28, longTermRate: 0 },
        ],
        notes: 'Portugal: crypto held over 365 days is TAX FREE. Short-term gains taxed at 28%. Crypto-to-crypto swaps are not taxable.',
    },
    it: {
        name: 'Italy',
        currency: 'EUR',
        shortTermLabel: 'Flat rate',
        longTermLabel: 'Flat rate',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 26, longTermRate: 26 },
        ],
        notes: 'Italy: flat 26% on all crypto gains (rising to 33% in 2026). No annual exemption since 2025.',
    },
    ch: {
        name: 'Switzerland',
        currency: 'CHF',
        shortTermLabel: 'Private investor',
        longTermLabel: 'Private investor',
        longTermThreshold: 'N/A (no capital gains tax)',
        brackets: [
            { label: 'All gains', shortTermRate: 0, longTermRate: 0 },
        ],
        notes: 'Switzerland: 0% capital gains tax for private investors. Annual wealth tax of ~0.15–1% applies. Professional traders taxed as income.',
    },
    at: {
        name: 'Austria',
        currency: 'EUR',
        shortTermLabel: 'Flat rate',
        longTermLabel: 'Flat rate',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 27.5, longTermRate: 27.5 },
        ],
        notes: 'Austria: flat 27.5% on crypto gains. Crypto-to-crypto swaps are NOT taxed. Legacy assets (pre-March 2021) may be exempt.',
    },
    pl: {
        name: 'Poland',
        currency: 'PLN',
        shortTermLabel: 'Flat rate',
        longTermLabel: 'Flat rate',
        longTermThreshold: 'N/A (flat rate)',
        brackets: [
            { label: 'All gains', shortTermRate: 19, longTermRate: 19 },
        ],
        notes: 'Poland: flat 19% on crypto-to-fiat gains. Crypto-to-crypto swaps are tax-neutral. Acquisition costs are deductible.',
    },
    nl: {
        name: 'Netherlands',
        currency: 'EUR',
        shortTermLabel: 'Deemed return',
        longTermLabel: 'Deemed return',
        longTermThreshold: 'N/A (wealth-based)',
        brackets: [
            { label: 'Above €57,684 threshold', shortTermRate: 2.12, longTermRate: 2.12 },
        ],
        notes: 'Netherlands: taxed on deemed return (~5.88%), not actual gains. Effective rate ~2.12%. Tax-free threshold: €57,684 per person.',
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
        label: 'DE 1Y+ Exempt',
        country: 'de',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'long' as const,
        bracketIndex: 1,
        method: 'fifo',
    },
    {
        label: 'PT 365D Free',
        country: 'pt_country',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'long' as const,
        bracketIndex: 0,
        method: 'fifo',
    },
    {
        label: 'CH 0% Tax',
        country: 'ch',
        buyPrice: '30000',
        sellPrice: '65000',
        quantity: '1',
        holdingPeriod: 'short' as const,
        bracketIndex: 0,
        method: 'fifo',
    },
    {
        label: 'JP High Rate',
        country: 'jp',
        buyPrice: '4500000',
        sellPrice: '9500000',
        quantity: '1',
        holdingPeriod: 'short' as const,
        bracketIndex: 4,
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

function TaxCalculator({ lang = 'en' }: { lang?: string }) {
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
        const symbols: Record<string, string> = {
            USD: '$', GBP: '£', EUR: '€', AUD: 'A$', CAD: 'C$', INR: '₹',
            JPY: '¥', BRL: 'R$', KRW: '₩', CHF: 'CHF ', PLN: 'zł',
        };
        const sym = symbols[config.currency] || '$';
        const noDecimals = config.currency === 'JPY' || config.currency === 'KRW';
        const digits = noDecimals ? 0 : 2;
        return `${sym}${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
    };

    const isGain = result ? result.capitalGain >= 0 : true;

    return (
        <div className="tax-wrapper">
            <div className="tax-grid">
                {/* Left: Inputs */}
                <div className="tax-input-panel">
                    <div className="input-group">
                        <label className="input-label">{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {TAX_SCENARIOS.map((scenario) => (
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

                    {/* Country Selector */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="tax-country">
                            <Globe size={14} />
                            {getUiString(lang, 'COUNTRY')}
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
                                    <option key={key} value={key}>{getUiString(lang, c.name)}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-icon" />
                        </div>
                    </div>

                    {/* Income Bracket */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="tax-bracket">
                            <DollarSign size={14} />
                            {getUiString(lang, 'INCOME BRACKET')}
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
                            {getUiString(lang, 'HOLDING PERIOD')}
                        </label>
                        <div className="holding-pills">
                            <button
                                className={`holding-pill ${holdingPeriod === 'short' ? 'active' : ''}`}
                                onClick={() => setHoldingPeriod('short')}
                            >
                                {getUiString(lang, config.shortTermLabel)}
                            </button>
                            <button
                                className={`holding-pill ${holdingPeriod === 'long' ? 'active' : ''}`}
                                onClick={() => setHoldingPeriod('long')}
                            >
                                {getUiString(lang, config.longTermLabel)}
                            </button>
                        </div>
                    </div>

                    {/* Buy Price */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="tax-buy-price">
                            <DollarSign size={14} />
                            {getUiString(lang, 'BUY PRICE (per coin)')}
                        </label>
                        <div className="pills-row">
                            {BUY_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${buyPrice === price ? 'active' : ''}`}
                                    onClick={() => setBuyPrice(price)}
                                >
                                    {Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                placeholder=""
                                id="tax-buy-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Sell Price */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="tax-sell-price">
                            <DollarSign size={14} />
                            {getUiString(lang, 'SELL PRICE (per coin)')}
                        </label>
                        <div className="pills-row">
                            {SELL_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${sellPrice === price ? 'active' : ''}`}
                                    onClick={() => setSellPrice(price)}
                                >
                                    {Number(price).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                placeholder=""
                                id="tax-sell-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="input-group">
                        <label className="input-label" htmlFor="tax-quantity">
                            {getUiString(lang, 'QUANTITY')}
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
                            <input
                                type="number" inputMode="decimal"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder=""
                                id="tax-quantity"
                                step="any"
                                min="0.000001"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Method */}
                    <div className="input-group">
                        <label className="input-label">{getUiString(lang, 'ACCOUNTING METHOD')}</label>
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
                            {getUiString(lang, METHODS.find(m => m.id === method)?.description ?? '')}
                        </p>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use price and quantity presets for a quick tax estimate.')}
                    </span>
                </div>

                {/* Right: Results */}
                <div className="tax-results-panel">
                    {result ? (
                        <>
                            {/* Hero */}
                            <div className={`tax-hero ${isGain ? 'gain' : 'loss'}`}>
                                <span className="tax-hero-label">
                                    {isGain ? getUiString(lang, 'Capital Gain') : getUiString(lang, 'Capital Loss')}
                                </span>
                                <span className="tax-hero-value">
                                    {isGain ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                                    {isGain ? '' : '−'}{formatCurrency(result.capitalGain)}
                                </span>
                            </div>

                            {/* Tax Owed */}
                            <div className="tax-owed-card">
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">{getUiString(lang, 'Estimated Tax')}</span>
                                    <span className="tax-owed-value">
                                        {result.estimatedTax > 0 ? formatCurrency(result.estimatedTax) : getUiString(lang, 'No tax owed')}
                                    </span>
                                </div>
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">{getUiString(lang, 'Applicable Rate')}</span>
                                    <span className="tax-owed-value">{result.taxRate}%</span>
                                </div>
                                <div className="tax-owed-row">
                                    <span className="tax-owed-label">{getUiString(lang, 'Effective Rate')}</span>
                                    <span className="tax-owed-value">{result.effectiveRate.toFixed(1)}%</span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="tax-breakdown">
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Country')}</span>
                                    <span className="breakdown-value">{getUiString(lang, config.name)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Income Bracket')}</span>
                                    <span className="breakdown-value">{result.bracketLabel}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Holding Period')}</span>
                                    <span className="breakdown-value">{getUiString(lang, result.holdingPeriodLabel)}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Method')}</span>
                                    <span className="breakdown-value">{method.toUpperCase()}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Total Cost Basis')}</span>
                                    <span className="breakdown-value">{formatCurrency(parseFloat(buyPrice) * (parseFloat(quantity) || 1))}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'Total Proceeds')}</span>
                                    <span className="breakdown-value">{formatCurrency(parseFloat(sellPrice) * (parseFloat(quantity) || 1))}</span>
                                </div>
                                <div className="breakdown-row">
                                    <span className="breakdown-label">{getUiString(lang, 'After-Tax Proceeds')}</span>
                                    <span className={`breakdown-value ${isGain ? 'text-profit' : 'text-loss'}`}>
                                        {formatCurrency(parseFloat(sellPrice) * (parseFloat(quantity) || 1) - result.estimatedTax)}
                                    </span>
                                </div>
                            </div>

                            {/* Short vs Long Comparison */}
                            {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate !==
                                config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate && result.capitalGain > 0 && (
                                    <div className="tax-comparison">
                                        <h4 className="comparison-title">{getUiString(lang, 'Short-Term vs Long-Term')}</h4>
                                        <div className="comparison-grid">
                                            <div className={`comparison-card ${!result.isLongTerm ? 'current' : ''}`}>
                                                <span className="comparison-label">{getUiString(lang, 'Short-Term')}</span>
                                                <span className="comparison-value">
                                                    {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate}%
                                                </span>
                                                <span className="comparison-tax">
                                                    {formatCurrency(result.capitalGain * config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].shortTermRate / 100)}
                                                </span>
                                            </div>
                                            <div className={`comparison-card ${result.isLongTerm ? 'current' : ''}`}>
                                                <span className="comparison-label">{getUiString(lang, 'Long-Term')}</span>
                                                <span className="comparison-value">
                                                    {config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate}%
                                                </span>
                                                <span className="comparison-tax">
                                                    {formatCurrency(result.capitalGain * config.brackets[Math.min(bracketIndex, config.brackets.length - 1)].longTermRate / 100)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="comparison-saving">
                                            💡 {getUiString(lang, 'Holding longer could save you')}{' '}
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
                                <p>{getUiString(lang, config.notes)}</p>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'This is an estimate only, not tax advice. Tax laws vary and change frequently. Consult a qualified tax professional for your specific situation.')}
                            </p>
                        </>
                    ) : (
                        <div className="tax-empty">
                            <Globe size={40} strokeWidth={1} />
                            <h3>{getUiString(lang, 'Estimate Your Crypto Taxes')}</h3>
                            <p>{getUiString(lang, 'Select your country, enter your trade details, and see your estimated capital gains tax instantly.')}</p>
                            <div className="tax-features">
                                <span>🌍 {getUiString(lang, '17 countries')}</span>
                                <span>📊 FIFO / LIFO</span>
                                <span>📅 {getUiString(lang, 'Short / Long-term')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(TaxCalculator);
