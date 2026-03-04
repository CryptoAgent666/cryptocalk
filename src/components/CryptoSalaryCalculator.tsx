import { getUiString } from '../i18n/ui-strings';
import { useState, useEffect, useCallback } from 'react';
import {
    DollarSign,
    Percent,
    TrendingUp,
    Briefcase,
    ArrowRightLeft,
    Info,
    RotateCcw,
    Loader2,
    Coins,
    Clock,
} from 'lucide-react';

type Mode = 'fiat-to-crypto' | 'crypto-to-fiat';
type CryptoType = 'bitcoin' | 'ethereum' | 'tether';
type PayFrequency = 'weekly' | 'biweekly' | 'monthly';
type FiatCurrency = 'usd' | 'eur' | 'gbp' | 'brl' | 'try' | 'inr' | 'rub';

interface PriceData {
    bitcoin: Record<string, number>;
    ethereum: Record<string, number>;
    tether: Record<string, number>;
}

const CRYPTO_LABELS: Record<CryptoType, { symbol: string; name: string }> = {
    bitcoin: { symbol: 'BTC', name: 'Bitcoin' },
    ethereum: { symbol: 'ETH', name: 'Ethereum' },
    tether: { symbol: 'USDT', name: 'Tether' },
};

const FIAT_LABELS: Record<FiatCurrency, { symbol: string; name: string }> = {
    usd: { symbol: 'USD', name: 'US Dollar' },
    eur: { symbol: 'EUR', name: 'Euro' },
    gbp: { symbol: 'GBP', name: 'British Pound' },
    brl: { symbol: 'BRL', name: 'Brazilian Real' },
    try: { symbol: 'TRY', name: 'Turkish Lira' },
    inr: { symbol: 'INR', name: 'Indian Rupee' },
    rub: { symbol: 'RUB', name: 'Russian Ruble' },
};

const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
    weekly: 52,
    biweekly: 26,
    monthly: 12,
};

const FREQUENCY_LABELS: Record<PayFrequency, string> = {
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    monthly: 'Monthly',
};

const CONVERSION_FEE_PILLS = ['0.5', '1', '2', '3'];
const CRYPTO_AMOUNT_PILLS = ['0.05', '0.1', '0.5', '1'];
const SALARY_SCENARIOS = [
    {
        label: 'DCA BTC',
        mode: 'fiat-to-crypto',
        salary: '60000',
        convertPct: '10',
        targetCrypto: 'bitcoin',
        conversionFee: '1',
        payFrequency: 'monthly',
        cryptoAmount: '',
        cryptoType: 'bitcoin',
    },
    {
        label: 'ETH Heavy',
        mode: 'fiat-to-crypto',
        salary: '100000',
        convertPct: '20',
        targetCrypto: 'ethereum',
        conversionFee: '0.5',
        payFrequency: 'biweekly',
        cryptoAmount: '',
        cryptoType: 'ethereum',
    },
    {
        label: 'USDT Payroll',
        mode: 'crypto-to-fiat',
        salary: '60000',
        convertPct: '10',
        targetCrypto: 'bitcoin',
        conversionFee: '1',
        payFrequency: 'monthly',
        cryptoAmount: '1',
        cryptoType: 'tether',
    },
] as const;

export default function CryptoSalaryCalculator({ lang = 'en' }: { lang?: string }) {
    // Mode
    const [mode, setMode] = useState<Mode>('fiat-to-crypto');

    // Fiat -> Crypto inputs
    const [salary, setSalary] = useState('60000');
    const [convertPct, setConvertPct] = useState('10');
    const [targetCrypto, setTargetCrypto] = useState<CryptoType>('bitcoin');
    const [conversionFee, setConversionFee] = useState('1');
    const [payFrequency, setPayFrequency] = useState<PayFrequency>('monthly');

    // Crypto -> Fiat inputs
    const [cryptoAmount, setCryptoAmount] = useState('');
    const [cryptoType, setCryptoType] = useState<CryptoType>('bitcoin');

    // Shared
    const [prices, setPrices] = useState<PriceData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const applyScenario = (scenario: (typeof SALARY_SCENARIOS)[number]) => {
        setMode(scenario.mode);
        setSalary(scenario.salary);
        setConvertPct(scenario.convertPct);
        setTargetCrypto(scenario.targetCrypto);
        setConversionFee(scenario.conversionFee);
        setPayFrequency(scenario.payFrequency);
        setCryptoAmount(scenario.cryptoAmount);
        setCryptoType(scenario.cryptoType);
    };
    const isScenarioActive = (scenario: (typeof SALARY_SCENARIOS)[number]) => {
        if (mode !== scenario.mode) return false;
        if (scenario.mode === 'fiat-to-crypto') {
            return (
                salary === scenario.salary
                && convertPct === scenario.convertPct
                && targetCrypto === scenario.targetCrypto
                && conversionFee === scenario.conversionFee
                && payFrequency === scenario.payFrequency
            );
        }
        return cryptoAmount === scenario.cryptoAmount && cryptoType === scenario.cryptoType;
    };

    // Fetch prices from CoinGecko
    const fetchPrices = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd,eur,gbp,brl,try,inr,rub&x_cg_demo_api_key=REMOVED_COINGECKO_KEY'
            );
            if (!res.ok) throw new Error('Failed to fetch prices');
            const data = await res.json();
            setPrices(data as PriceData);
        } catch {
            setError('Failed to fetch exchange rates. Please try again.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchPrices();
    }, [fetchPrices]);

    // Reset
    const reset = () => {
        if (mode === 'fiat-to-crypto') {
            setSalary('60000');
            setConvertPct('10');
            setTargetCrypto('bitcoin');
            setConversionFee('1');
            setPayFrequency('monthly');
        } else {
            setCryptoAmount('');
            setCryptoType('bitcoin');
        }
    };

    // Formatters
    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatCrypto = (n: number, crypto: CryptoType) => {
        if (crypto === 'tether') return n.toFixed(2);
        if (n >= 1) return n.toFixed(6);
        if (n >= 0.001) return n.toFixed(8);
        return n.toExponential(4);
    };

    const formatFiat = (n: number, currency: FiatCurrency) => {
        const symbols: Record<FiatCurrency, string> = {
            usd: '$', eur: '\u20AC', gbp: '\u00A3', brl: 'R$',
            try: '\u20BA', inr: '\u20B9', rub: '\u20BD',
        };
        return `${symbols[currency]}${new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n)}`;
    };

    // ---- Fiat -> Crypto calculations ----
    const salaryNum = parseFloat(salary) || 0;
    const pctNum = parseFloat(convertPct) || 0;
    const feeNum = parseFloat(conversionFee) || 0;
    const periodsPerYear = PERIODS_PER_YEAR[payFrequency];
    const cryptoPrice = prices ? prices[targetCrypto]?.usd || 0 : 0;

    const salaryPerPeriod = salaryNum / periodsPerYear;
    const cryptoAllocationPerPeriod = salaryPerPeriod * (pctNum / 100);
    const feeAmountPerPeriod = cryptoAllocationPerPeriod * (feeNum / 100);
    const netCryptoPerPeriod = cryptoAllocationPerPeriod * (1 - feeNum / 100);
    const coinsPerPeriod = cryptoPrice > 0 ? netCryptoPerPeriod / cryptoPrice : 0;
    const coinsPerYear = coinsPerPeriod * periodsPerYear;
    const annualCryptoValue = salaryNum * (pctNum / 100) * (1 - feeNum / 100);
    const annualFeeTotal = salaryNum * (pctNum / 100) * (feeNum / 100);

    const hasFiatInputs = salaryNum > 0 && pctNum > 0 && cryptoPrice > 0;

    // Accumulation table: 1yr, 2yr, 3yr, 5yr
    const accumulationYears = [1, 2, 3, 5];
    const accumulationData = accumulationYears.map(yr => ({
        year: yr,
        coins: coinsPerYear * yr,
        usdValue: annualCryptoValue * yr,
    }));

    // ---- Crypto -> Fiat calculations ----
    const cryptoAmountNum = parseFloat(cryptoAmount) || 0;
    const cryptoFiatPrice = prices ? prices[cryptoType]?.usd || 0 : 0;
    const monthlyUSD = cryptoAmountNum * cryptoFiatPrice;
    const annualUSD = monthlyUSD * 12;

    const hasCryptoInputs = cryptoAmountNum > 0 && cryptoFiatPrice > 0;

    const fiatEquivalents: { currency: FiatCurrency; monthly: number; annual: number }[] = prices
        ? (Object.keys(FIAT_LABELS) as FiatCurrency[]).map(cur => {
            const rate = prices[cryptoType]?.[cur] || 0;
            return {
                currency: cur,
                monthly: cryptoAmountNum * rate,
                annual: cryptoAmountNum * rate * 12,
            };
        })
        : [];

    const sym = CRYPTO_LABELS[mode === 'fiat-to-crypto' ? targetCrypto : cryptoType].symbol;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {SALARY_SCENARIOS.map((scenario) => (
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

                    {/* Mode Toggle */}
                    <div className="input-group">
                        <label>
                            <ArrowRightLeft size={14} />
                            Calculator Mode
                        </label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${mode === 'fiat-to-crypto' ? 'active' : ''}`}
                                onClick={() => setMode('fiat-to-crypto')}
                            >
                                <DollarSign size={14} />
                                Fiat &rarr; Crypto
                            </button>
                            <button
                                className={`toggle-btn ${mode === 'crypto-to-fiat' ? 'active' : ''}`}
                                onClick={() => setMode('crypto-to-fiat')}
                            >
                                <Coins size={14} />
                                Crypto &rarr; Fiat
                            </button>
                        </div>
                    </div>

                    {mode === 'fiat-to-crypto' ? (
                        <>
                            {/* Annual Salary */}
                            <div className="input-group">
                                <label>
                                    <DollarSign size={14} />
                                    Annual Salary
                                </label>
                                <div className="input-with-prefix">
                                    <input
                                        type="number" inputMode="decimal"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        placeholder=""
                                        id="salary-input"
                                        step="any"
                                        min="0"
                                     onFocus={(e) => e.target.select()} />
                                </div>
                                <div className="pills-row">
                                    {['30000', '60000', '100000', '150000', '200000'].map(a => (
                                        <button
                                            key={a}
                                            className={`pill-btn ${salary === a ? 'active' : ''}`}
                                            onClick={() => setSalary(a)}
                                        >
                                            ${(Number(a) / 1000).toFixed(0)}K
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Percent to Convert */}
                            <div className="input-group">
                                <label>
                                    <Percent size={14} />
                                    % to Convert to Crypto
                                </label>
                                <div className="input-with-prefix">
                                    <input
                                        type="number" inputMode="decimal"
                                        value={convertPct}
                                        onChange={(e) => setConvertPct(e.target.value)}
                                        placeholder=""
                                        id="convert-pct-input"
                                        step="1"
                                        min="0"
                                        max="100"
                                     onFocus={(e) => e.target.select()} />
                                </div>
                                <div className="pills-row">
                                    {['5', '10', '20', '50', '100'].map(p => (
                                        <button
                                            key={p}
                                            className={`pill-btn ${convertPct === p ? 'active' : ''}`}
                                            onClick={() => setConvertPct(p)}
                                        >
                                            {p}%
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Target Crypto */}
                            <div className="input-group">
                                <label>
                                    <Coins size={14} />
                                    Target Cryptocurrency
                                </label>
                                <div className="pills-row">
                                    {(Object.keys(CRYPTO_LABELS) as CryptoType[]).map(c => (
                                        <button
                                            key={c}
                                            className={`pill-btn ${targetCrypto === c ? 'active' : ''}`}
                                            onClick={() => setTargetCrypto(c)}
                                        >
                                            {CRYPTO_LABELS[c].symbol}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Conversion Fee */}
                            <div className="input-group">
                                <label>
                                    <Percent size={14} />
                                    Conversion Fee
                                    <span className="label-hint">Exchange/service fee</span>
                                </label>
                                <div className="pills-row">
                                    {CONVERSION_FEE_PILLS.map((fee) => (
                                        <button
                                            key={fee}
                                            className={`pill-btn ${conversionFee === fee ? 'active' : ''}`}
                                            onClick={() => setConversionFee(fee)}
                                        >
                                            {fee}%
                                        </button>
                                    ))}
                                </div>
                                <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                                    <input
                                        type="number" inputMode="decimal"
                                        value={conversionFee}
                                        onChange={(e) => setConversionFee(e.target.value)}
                                        placeholder=""
                                        id="fee-input"
                                        step="0.1"
                                        min="0"
                                        max="100"
                                     onFocus={(e) => e.target.select()} />
                                </div>
                            </div>

                            {/* Pay Frequency */}
                            <div className="input-group">
                                <label>
                                    <Clock size={14} />
                                    Pay Frequency
                                </label>
                                <div className="pills-row">
                                    {(Object.keys(PERIODS_PER_YEAR) as PayFrequency[]).map(f => (
                                        <button
                                            key={f}
                                            className={`pill-btn ${payFrequency === f ? 'active' : ''}`}
                                            onClick={() => setPayFrequency(f)}
                                        >
                                            {FREQUENCY_LABELS[f]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Crypto Amount per Month */}
                            <div className="input-group">
                                <label>
                                    <Coins size={14} />
                                    Crypto Amount per Month
                                </label>
                                <div className="pills-row">
                                    {CRYPTO_AMOUNT_PILLS.map((amount) => (
                                        <button
                                            key={amount}
                                            className={`pill-btn ${cryptoAmount === amount ? 'active' : ''}`}
                                            onClick={() => setCryptoAmount(amount)}
                                        >
                                            {amount} {CRYPTO_LABELS[cryptoType].symbol}
                                        </button>
                                    ))}
                                </div>
                                <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                                    <input
                                        type="number" inputMode="decimal"
                                        value={cryptoAmount}
                                        onChange={(e) => setCryptoAmount(e.target.value)}
                                        placeholder=""
                                        id="crypto-amount-input"
                                        step="any"
                                        min="0"
                                     onFocus={(e) => e.target.select()} />
                                </div>
                            </div>

                            {/* Crypto Type */}
                            <div className="input-group">
                                <label>
                                    <Coins size={14} />
                                    Cryptocurrency
                                </label>
                                <div className="pills-row">
                                    {(Object.keys(CRYPTO_LABELS) as CryptoType[]).map(c => (
                                        <button
                                            key={c}
                                            className={`pill-btn ${cryptoType === c ? 'active' : ''}`}
                                            onClick={() => setCryptoType(c)}
                                        >
                                            {CRYPTO_LABELS[c].symbol}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Refresh Prices */}
                    <button
                        className="reset-btn"
                        onClick={fetchPrices}
                        disabled={loading}
                        style={{ marginBottom: 0 }}
                    >
                        {loading ? <Loader2 size={14} className="spin-icon" /> : <TrendingUp size={14} />}
                        {loading ? 'Fetching prices...' : 'Refresh Prices'}
                    </button>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Refresh prices first for an accurate fiat equivalent.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {error ? (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Info size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Error')}</h3>
                            <p>{error}</p>
                            <button className="reset-btn" onClick={fetchPrices} style={{ marginTop: '12px' }}>
                                <RotateCcw size={14} />
                                {getUiString(lang, 'Retry')}
                            </button>
                        </div>
                    ) : loading && !prices ? (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Loader2 size={40} className="spin-icon" />
                            </div>
                            <h3>{getUiString(lang, 'Fetching Exchange Rates...')}</h3>
                            <p>{getUiString(lang, 'Loading live prices from CoinGecko.')}</p>
                        </div>
                    ) : mode === 'fiat-to-crypto' ? (
                        hasFiatInputs ? (
                            <>
                                {/* Hero */}
                                <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                    <span className="result-hero-label">
                                        {CRYPTO_LABELS[targetCrypto].symbol} {getUiString(lang, 'per')} {FREQUENCY_LABELS[payFrequency].toLowerCase()} {getUiString(lang, 'pay period')}
                                    </span>
                                    <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                        <Coins size={28} />
                                        {formatUSD(netCryptoPerPeriod)}
                                    </span>
                                    <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                        {formatCrypto(coinsPerPeriod, targetCrypto)} {CRYPTO_LABELS[targetCrypto].symbol} {getUiString(lang, 'per')} {payFrequency === 'biweekly' ? getUiString(lang, 'pay period') : payFrequency === 'weekly' ? getUiString(lang, 'week') : getUiString(lang, 'month')}
                                    </span>
                                </div>

                                {/* Breakdown */}
                                <div className="result-breakdown">
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Salary per Period')}</span>
                                        <span className="result-value">{formatUSD(salaryPerPeriod)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Crypto Allocation')} ({pctNum}%)</span>
                                        <span className="result-value">{formatUSD(cryptoAllocationPerPeriod)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Conversion Fee')} ({feeNum}%)</span>
                                        <span className="result-value fee">-{formatUSD(feeAmountPerPeriod)}</span>
                                    </div>
                                    <div className="result-divider" />
                                    <div className="result-row">
                                        <span className="result-label"><strong>{getUiString(lang, 'Net Crypto Amount')}</strong></span>
                                        <span className="result-value profit"><strong>{formatUSD(netCryptoPerPeriod)}</strong></span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Coins per Period')}</span>
                                        <span className="result-value profit">
                                            {formatCrypto(coinsPerPeriod, targetCrypto)} {CRYPTO_LABELS[targetCrypto].symbol}
                                        </span>
                                    </div>
                                    <div className="result-divider" />
                                    <div className="result-row">
                                        <span className="result-label">{CRYPTO_LABELS[targetCrypto].symbol} {getUiString(lang, 'Price')}</span>
                                        <span className="result-value">{formatUSD(cryptoPrice)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Annual Crypto Value')}</span>
                                        <span className="result-value profit">{formatUSD(annualCryptoValue)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Annual Coins')}</span>
                                        <span className="result-value profit">
                                            {formatCrypto(coinsPerYear, targetCrypto)} {CRYPTO_LABELS[targetCrypto].symbol}
                                        </span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Annual Fees Paid')}</span>
                                        <span className="result-value fee">-{formatUSD(annualFeeTotal)}</span>
                                    </div>
                                </div>

                                {/* Accumulation Table */}
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        marginBottom: '10px',
                                        color: 'var(--color-text)',
                                    }}>
                                        {getUiString(lang, 'Accumulation Over Time')}
                                    </h4>
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'Period')}</th>
                                                    <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{CRYPTO_LABELS[targetCrypto].symbol} {getUiString(lang, 'Accumulated')}</th>
                                                    <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'USD Value')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {accumulationData.map(row => (
                                                    <tr key={row.year} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px', fontWeight: 500 }}>
                                                            {row.year} {row.year === 1 ? getUiString(lang, 'Year') : getUiString(lang, 'Years')}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 600 }}>
                                                            {formatCrypto(row.coins, targetCrypto)} {CRYPTO_LABELS[targetCrypto].symbol}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)', fontWeight: 600 }}>
                                                            {formatUSD(row.usdValue)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                                        {getUiString(lang, '* No price appreciation assumed, accumulation only at current price.')}
                                    </p>
                                </div>

                                {/* Disclaimer */}
                                <p className="calc-disclaimer">
                                    <Info size={12} />
                                    {getUiString(lang, 'Exchange rates fluctuate. Not financial advice.')}
                                </p>
                            </>
                        ) : (
                            <div className="results-empty">
                                <div className="results-empty-icon">
                                    <Briefcase size={40} />
                                </div>
                                <h3>{getUiString(lang, 'Crypto Salary Calculator')}</h3>
                                <p>{getUiString(lang, 'Enter your annual salary, choose how much to convert to crypto, and see exactly how much you\'d receive per pay period.')}</p>
                            </div>
                        )
                    ) : (
                        /* Crypto -> Fiat mode */
                        hasCryptoInputs ? (
                            <>
                                {/* Hero */}
                                <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                    <span className="result-hero-label">
                                        {getUiString(lang, 'Monthly Salary in USD')}
                                    </span>
                                    <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                        <DollarSign size={28} />
                                        {formatUSD(monthlyUSD)}
                                    </span>
                                    <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                        {cryptoAmountNum} {CRYPTO_LABELS[cryptoType].symbol}/month @ {formatUSD(cryptoFiatPrice)}/{CRYPTO_LABELS[cryptoType].symbol}
                                    </span>
                                </div>

                                {/* Fiat Equivalents Breakdown */}
                                <div className="result-breakdown">
                                    <div className="result-row" style={{ marginBottom: '4px' }}>
                                        <span className="result-label">
                                            <strong>{getUiString(lang, 'Monthly Fiat Equivalents')}</strong>
                                        </span>
                                    </div>
                                    <div className="result-divider" />
                                    {fiatEquivalents.map(eq => (
                                        <div className="result-row" key={eq.currency}>
                                            <span className="result-label">{FIAT_LABELS[eq.currency].name} ({FIAT_LABELS[eq.currency].symbol})</span>
                                            <span className="result-value">
                                                {formatFiat(eq.monthly, eq.currency)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Annual Salary Equivalent */}
                                <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                    <div className="result-row" style={{ marginBottom: '4px' }}>
                                        <span className="result-label">
                                            <strong>{getUiString(lang, 'Annual Salary Equivalent')}</strong>
                                        </span>
                                    </div>
                                    <div className="result-divider" />
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Annual USD')}</span>
                                        <span className="result-value profit"><strong>{formatUSD(annualUSD)}</strong></span>
                                    </div>
                                    {fiatEquivalents.map(eq => (
                                        <div className="result-row" key={`annual-${eq.currency}`}>
                                            <span className="result-label">{FIAT_LABELS[eq.currency].symbol}/year</span>
                                            <span className="result-value">
                                                {formatFiat(eq.annual, eq.currency)}
                                            </span>
                                        </div>
                                    ))}
                                    <div className="result-divider" />
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Annual Crypto')}</span>
                                        <span className="result-value profit">
                                            {(cryptoAmountNum * 12).toFixed(cryptoType === 'tether' ? 2 : 6)} {CRYPTO_LABELS[cryptoType].symbol}
                                        </span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{CRYPTO_LABELS[cryptoType].symbol} {getUiString(lang, 'Price')}</span>
                                        <span className="result-value">{formatUSD(cryptoFiatPrice)}</span>
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <p className="calc-disclaimer">
                                    <Info size={12} />
                                    {getUiString(lang, 'Exchange rates fluctuate. Not financial advice.')}
                                </p>
                            </>
                        ) : (
                            <div className="results-empty">
                                <div className="results-empty-icon">
                                    <Briefcase size={40} />
                                </div>
                                <h3>{getUiString(lang, 'Crypto to Fiat Converter')}</h3>
                                <p>{getUiString(lang, 'Enter your monthly crypto salary to see the equivalent in multiple fiat currencies at current exchange rates.')}</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
