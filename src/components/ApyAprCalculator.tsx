import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback } from 'react';
import {
    Percent,
    Info,
    RotateCcw,
    TrendingUp,
    Calendar,
    ArrowRightLeft,
    DollarSign,
    Layers,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const COMPOUND_FREQUENCIES = [
    { id: 'daily', label: 'Daily', n: 365 },
    { id: 'weekly', label: 'Weekly', n: 52 },
    { id: 'monthly', label: 'Monthly', n: 12 },
    { id: 'quarterly', label: 'Quarterly', n: 4 },
    { id: 'yearly', label: 'Yearly', n: 1 },
];

const RATE_PRESETS = [3, 5, 8, 12, 20, 50, 100];
const YEAR_PRESETS = [1, 2, 3, 5, 10];
const PRINCIPAL_PRESETS = [1000, 5000, 10000, 25000];

type ConversionMode = 'apr-to-apy' | 'apy-to-apr';
const APY_APR_SCENARIOS = [
    { label: 'Savings', mode: 'apr-to-apy', rateInput: '5', compoundFreq: 'monthly', principal: '5000', years: '1' },
    { label: 'Staking', mode: 'apr-to-apy', rateInput: '12', compoundFreq: 'daily', principal: '10000', years: '3' },
    { label: 'DeFi Yield', mode: 'apr-to-apy', rateInput: '30', compoundFreq: 'daily', principal: '10000', years: '1' },
    { label: 'APY Check', mode: 'apy-to-apr', rateInput: '20', compoundFreq: 'monthly', principal: '10000', years: '1' },
] as const;

function ApyAprCalculator({ lang = 'en' }: { lang?: string }) {
    const [mode, setMode] = useState<ConversionMode>('apr-to-apy');
    const [rateInput, setRateInput] = useState('12');
    const [compoundFreq, setCompoundFreq] = useState('daily');
    const [principal, setPrincipal] = useState('10000');
    const [years, setYears] = useState('1');
    const applyScenario = (scenario: (typeof APY_APR_SCENARIOS)[number]) => {
        setMode(scenario.mode);
        setRateInput(scenario.rateInput);
        setCompoundFreq(scenario.compoundFreq);
        setPrincipal(scenario.principal);
        setYears(scenario.years);
    };
    const isScenarioActive = (scenario: (typeof APY_APR_SCENARIOS)[number]) => (
        mode === scenario.mode
        && rateInput === scenario.rateInput
        && compoundFreq === scenario.compoundFreq
        && principal === scenario.principal
        && years === scenario.years
    );

    const rate = (parseFloat(rateInput) || 0) / 100;
    const principalAmount = parseFloat(principal) || 0;
    const t = parseFloat(years) || 0;
    const freq = COMPOUND_FREQUENCIES.find(f => f.id === compoundFreq)!;
    const n = freq.n;

    const hasInputs = rate > 0 && principalAmount > 0 && t > 0;

    // APR to APY: APY = (1 + APR/n)^n - 1
    // APY to APR: APR = n * ((1 + APY)^(1/n) - 1)
    let apr: number;
    let apy: number;

    if (mode === 'apr-to-apy') {
        apr = rate;
        apy = Math.pow(1 + apr / n, n) - 1;
    } else {
        apy = rate;
        apr = n * (Math.pow(1 + apy, 1 / n) - 1);
    }

    const difference = Math.abs(apy - apr);
    const differencePercent = (difference * 100).toFixed(4);

    // Earnings with compounding (uses APR compounded n times)
    const totalWithCompounding = principalAmount * Math.pow(1 + apr / n, n * t);
    const earningsWithCompounding = totalWithCompounding - principalAmount;

    // Earnings without compounding (simple interest using APR)
    const totalSimple = principalAmount * (1 + apr * t);
    const earningsSimple = totalSimple - principalAmount;

    // Compounding advantage
    const compoundAdvantage = earningsWithCompounding - earningsSimple;

    // Monthly earnings breakdown
    const monthlyBreakdown: { month: number; balance: number; monthlyEarning: number; cumEarnings: number }[] = [];
    let bal = principalAmount;
    let cumEarnings = 0;
    const totalMonths = Math.min(Math.ceil(t * 12), 60);
    for (let m = 1; m <= totalMonths; m++) {
        const periodsInMonth = n / 12;
        const newBal = bal * Math.pow(1 + apr / n, periodsInMonth);
        const monthEarning = newBal - bal;
        cumEarnings += monthEarning;
        bal = newBal;
        monthlyBreakdown.push({ month: m, balance: bal, monthlyEarning: monthEarning, cumEarnings });
    }

    // Comparison table: show APY for each compounding frequency using the same input rate
    const comparisonData = COMPOUND_FREQUENCIES.map(f => {
        let compApy: number;
        let compApr: number;
        if (mode === 'apr-to-apy') {
            compApr = rate;
            compApy = Math.pow(1 + compApr / f.n, f.n) - 1;
        } else {
            // For comparison in APY->APR mode, show what the APR would be for this frequency
            compApy = rate;
            compApr = f.n * (Math.pow(1 + compApy, 1 / f.n) - 1);
        }
        const totalValue = principalAmount * Math.pow(1 + compApr / f.n, f.n * t);
        const earnings = totalValue - principalAmount;
        return {
            label: f.label,
            n: f.n,
            apr: compApr,
            apy: compApy,
            totalValue,
            earnings,
        };
    });

    // Yearly growth table
    const yearlyGrowth: { year: number; balance: number; yearEarning: number; cumEarnings: number }[] = [];
    let yBal = principalAmount;
    let yCum = 0;
    for (let y = 1; y <= Math.min(t, 30); y++) {
        const newBal = yBal * Math.pow(1 + apr / n, n);
        const yearEarning = newBal - yBal;
        yCum += yearEarning;
        yBal = newBal;
        yearlyGrowth.push({ year: y, balance: yBal, yearEarning, cumEarnings: yCum });
    }

    const reset = () => {
        setMode('apr-to-apy');
        setRateInput('12');
        setCompoundFreq('daily');
        setPrincipal('10000');
        setYears('1');
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n.toFixed(4)}%`;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {APY_APR_SCENARIOS.map((scenario) => (
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
                        <label><ArrowRightLeft size={14} /> {getUiString(lang, 'Conversion Mode')}</label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${mode === 'apr-to-apy' ? 'active' : ''}`}
                                onClick={() => setMode('apr-to-apy')}
                            >
                                APR &rarr; APY
                            </button>
                            <button
                                className={`toggle-btn ${mode === 'apy-to-apr' ? 'active' : ''}`}
                                onClick={() => setMode('apy-to-apr')}
                            >
                                APY &rarr; APR
                            </button>
                        </div>
                    </div>

                    {/* Rate Input */}
                    <div className="input-group">
                        <label><Percent size={14} /> {mode === 'apr-to-apy' ? getUiString(lang, 'APR (Annual Percentage Rate)') : getUiString(lang, 'APY (Annual Percentage Yield)')}</label>
                        <div className="pills-row">
                            {RATE_PRESETS.map((r) => (
                                <button key={r} className={`pill-btn ${rateInput === String(r) ? 'active' : ''}`}
                                    onClick={() => setRateInput(String(r))}>
                                    {r}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={rateInput} onChange={(e) => setRateInput(e.target.value)}
                                placeholder="" id="apy-rate" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Compounding Frequency */}
                    <div className="input-group">
                        <label><Layers size={14} /> {getUiString(lang, 'Compounding Frequency')}</label>
                        <div className="pills-row">
                            {COMPOUND_FREQUENCIES.map((f) => (
                                <button key={f.id} className={`pill-btn ${compoundFreq === f.id ? 'active' : ''}`}
                                    onClick={() => setCompoundFreq(f.id)}>
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Principal */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> {getUiString(lang, 'Principal Amount')}</label>
                        <div className="pills-row">
                            {PRINCIPAL_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${principal === String(preset) ? 'active' : ''}`}
                                    onClick={() => setPrincipal(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)}
                                placeholder="" id="apy-principal" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Period */}
                    <div className="input-group">
                        <label><Calendar size={14} /> {getUiString(lang, 'Investment Period (years)')}</label>
                        <div className="pills-row">
                            {YEAR_PRESETS.map((y) => (
                                <button key={y} className={`pill-btn ${years === String(y) ? 'active' : ''}`}
                                    onClick={() => setYears(String(y))}>
                                    {y}y
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)}
                                placeholder="" id="apy-years" step="1" min="1" max="30" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare frequencies using the same principal and horizon for a fair APY/APR comparison.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero Result */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-primary)' }}>
                                <span className="result-hero-label">
                                    {mode === 'apr-to-apy' ? getUiString(lang, 'Equivalent APY') : getUiString(lang, 'Equivalent APR')}
                                </span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <ArrowRightLeft size={28} />
                                    {mode === 'apr-to-apy'
                                        ? formatPercent(apy * 100)
                                        : formatPercent(apr * 100)
                                    }
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                    {mode === 'apr-to-apy'
                                        ? `${formatPercent(apr * 100)} APR = ${formatPercent(apy * 100)} APY`
                                        : `${formatPercent(apy * 100)} APY = ${formatPercent(apr * 100)} APR`
                                    }
                                </span>
                            </div>

                            {/* Three Cards */}
                            <div className="calc-three-col-grid" style={{ margin: '16px 0' }}>
                                <div style={{
                                    padding: '12px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'APR')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>{formatPercent(apr * 100)}</div>
                                </div>
                                <div style={{
                                    padding: '12px', background: 'rgba(99,102,241,0.06)',
                                    border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'APY')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>{formatPercent(apy * 100)}</div>
                                </div>
                                <div style={{
                                    padding: '12px', background: 'rgba(34,197,94,0.06)',
                                    border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'Difference')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>+{differencePercent}%</div>
                                </div>
                            </div>

                            {/* Earnings Summary */}
                            <div className="calc-two-col-grid" style={{ margin: '0 0 16px' }}>
                                <div style={{
                                    padding: '12px', background: 'rgba(34,197,94,0.06)',
                                    border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{getUiString(lang, 'With Compounding')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>+{formatUSD(earningsWithCompounding)}</div>
                                </div>
                                <div style={{
                                    padding: '12px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>{getUiString(lang, 'Simple Interest')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>+{formatUSD(earningsSimple)}</div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Principal')}</span>
                                    <span className="result-value">{formatUSD(principalAmount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{mode === 'apr-to-apy' ? getUiString(lang, 'Input APR') : getUiString(lang, 'Input APY')}</span>
                                    <span className="result-value">{rateInput}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Compounding')}</span>
                                    <span className="result-value">{freq.label} ({n}x/{getUiString(lang, 'year')})</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Period')}</span>
                                    <span className="result-value">{t} {t !== 1 ? getUiString(lang, 'years') : getUiString(lang, 'year')}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total with Compounding')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(totalWithCompounding)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Earnings (Compounded)')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatUSD(earningsWithCompounding)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Earnings (Simple Interest)')}</span>
                                    <span className="result-value">+{formatUSD(earningsSimple)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Compounding Advantage')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatUSD(compoundAdvantage)}</strong></span>
                                </div>
                            </div>

                            {/* Comparison Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Compounding Frequency Comparison')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Frequency')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'APR')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'APY')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Earnings')} ({t}y)</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Total')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonData.map((row) => (
                                                <tr key={row.label} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: row.label === freq.label ? 'rgba(99,102,241,0.06)' : 'transparent',
                                                }}>
                                                    <td style={{ padding: '8px', fontWeight: row.label === freq.label ? 600 : 500 }}>
                                                        {row.label} {row.label === freq.label && `(${getUiString(lang, 'selected')})`}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)' }}>
                                                        {formatPercent(row.apr * 100)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-primary)', fontWeight: 600 }}>
                                                        {formatPercent(row.apy * 100)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 500 }}>
                                                        +{formatUSD(row.earnings)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)', fontWeight: 600 }}>
                                                        {formatUSD(row.totalValue)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Monthly Earnings Breakdown */}
                            {monthlyBreakdown.length > 0 && (
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                        {t >= 2 ? getUiString(lang, 'Yearly Growth') : getUiString(lang, 'Monthly Earnings Breakdown')}
                                    </h4>
                                    <div style={{ overflowX: 'auto', maxHeight: '300px', overflowY: 'auto' }}>
                                        {t >= 2 && yearlyGrowth.length > 0 ? (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-bg)' }}>
                                                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Year')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Earned')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cumulative')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yearlyGrowth.map((row) => (
                                                        <tr key={row.year} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                            <td style={{ padding: '8px', fontWeight: 500 }}>{getUiString(lang, 'Year')} {row.year}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)' }}>+{formatUSD(row.yearEarning)}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 500 }}>+{formatUSD(row.cumEarnings)}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)', fontWeight: 600 }}>{formatUSD(row.balance)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-bg)' }}>
                                                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Month')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Earned')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cumulative')}</th>
                                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {monthlyBreakdown.map((row) => (
                                                        <tr key={row.month} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                            <td style={{ padding: '8px', fontWeight: 500 }}>{getUiString(lang, 'Month')} {row.month}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)' }}>+{formatUSD(row.monthlyEarning)}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 500 }}>+{formatUSD(row.cumEarnings)}</td>
                                                            <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)', fontWeight: 600 }}>{formatUSD(row.balance)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            )}

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'APY assumes interest is reinvested at the same rate. Actual DeFi and staking yields fluctuate. This calculator is for educational purposes only and is not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
                            <h3>{getUiString(lang, 'Convert APR to APY')}</h3>
                            <p>{getUiString(lang, 'Enter an interest rate, choose your compounding frequency, and see the real yield you earn after compounding. Compare across different frequencies instantly.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(ApyAprCalculator);
