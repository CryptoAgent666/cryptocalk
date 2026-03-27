import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    TrendingUp,
    Calendar,
    PiggyBank,
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

const APY_PRESETS = [3, 5, 8, 12, 20, 50, 100];
const YEAR_PRESETS = [1, 2, 3, 5, 10];
const INITIAL_PRESETS = [1000, 5000, 10000, 25000];
const MONTHLY_PRESETS = [0, 100, 250, 500, 1000];
const COMPOUND_SCENARIOS = [
    {
        label: 'Steady Saver',
        initialAmount: '5000',
        monthlyContribution: '100',
        annualRate: '8',
        years: '5',
        compoundFreq: 'monthly',
    },
    {
        label: 'Growth Plan',
        initialAmount: '10000',
        monthlyContribution: '500',
        annualRate: '12',
        years: '10',
        compoundFreq: 'daily',
    },
    {
        label: 'High Yield',
        initialAmount: '1000',
        monthlyContribution: '250',
        annualRate: '20',
        years: '3',
        compoundFreq: 'daily',
    },
] as const;

function CompoundInterestCalculator({ lang = 'en' }: { lang?: string }) {
    const [initialAmount, setInitialAmount] = useState('1000');
    const [monthlyContribution, setMonthlyContribution] = useState('100');
    const [annualRate, setAnnualRate] = useState('12');
    const [years, setYears] = useState('5');
    const [compoundFreq, setCompoundFreq] = useState('daily');
    const applyScenario = (scenario: (typeof COMPOUND_SCENARIOS)[number]) => {
        setInitialAmount(scenario.initialAmount);
        setMonthlyContribution(scenario.monthlyContribution);
        setAnnualRate(scenario.annualRate);
        setYears(scenario.years);
        setCompoundFreq(scenario.compoundFreq);
    };
    const isScenarioActive = (scenario: (typeof COMPOUND_SCENARIOS)[number]) => (
        initialAmount === scenario.initialAmount
        && monthlyContribution === scenario.monthlyContribution
        && annualRate === scenario.annualRate
        && years === scenario.years
        && compoundFreq === scenario.compoundFreq
    );

    const principal = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualRate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const freq = COMPOUND_FREQUENCIES.find(f => f.id === compoundFreq)!;
    const n = freq.n;

    const hasInputs = principal > 0 && rate > 0 && t > 0;

    // Compound interest on principal: A = P(1 + r/n)^(nt)
    const compoundedPrincipal = principal * Math.pow(1 + rate / n, n * t);

    const ratePerPeriod = rate / n;
    const totalDeposited = principal + monthly * Math.floor(t * 12);

    // Year-by-year breakdown (single source of truth)
    const properBreakdown: { year: number; balance: number; deposited: number; interest: number }[] = [];
    let bal = principal;
    for (let y = 1; y <= Math.min(t, 30); y++) {
        for (let m = 0; m < 12; m++) {
            // Compound for 1 month
            const periodsInMonth = n / 12;
            bal *= Math.pow(1 + ratePerPeriod, periodsInMonth);
            // Add monthly contribution
            bal += monthly;
        }
        const deposited = principal + monthly * 12 * y;
        properBreakdown.push({
            year: y,
            balance: bal,
            deposited,
            interest: bal - deposited,
        });
    }

    // Use the final breakdown value as the hero value for consistency
    const totalValue = properBreakdown.length > 0 ? properBreakdown[properBreakdown.length - 1].balance : compoundedPrincipal;
    const totalInterest = totalValue - totalDeposited;
    const effectiveROI = totalDeposited > 0 ? ((totalValue - totalDeposited) / totalDeposited) * 100 : 0;

    // Simple interest comparison
    const totalMonths = Math.floor(t * 12);
    const simpleInterest = principal * rate * t + monthly * rate * totalMonths * ((totalMonths - 1) / 2) / 12;
    const simpleTotal = totalDeposited + simpleInterest;

    // Compound advantage
    const compoundAdvantage = totalValue - simpleTotal;

    const reset = () => {
        setInitialAmount('1000'); setMonthlyContribution('100');
        setAnnualRate('12'); setYears('5'); setCompoundFreq('daily');
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {COMPOUND_SCENARIOS.map((scenario) => (
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

                    <div className="input-group">
                        <label><PiggyBank size={14} /> {getUiString(lang, 'Initial Investment')}</label>
                        <div className="pills-row">
                            {INITIAL_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${initialAmount === String(preset) ? 'active' : ''}`}
                                    onClick={() => setInitialAmount(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={initialAmount} onChange={(e) => setInitialAmount(e.target.value)}
                                placeholder="" id="ci-initial" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><DollarSign size={14} /> {getUiString(lang, 'Monthly Contribution')}</label>
                        <div className="pills-row">
                            {MONTHLY_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${monthlyContribution === String(preset) ? 'active' : ''}`}
                                    onClick={() => setMonthlyContribution(String(preset))}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)}
                                placeholder="" id="ci-monthly" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><Percent size={14} /> {getUiString(lang, 'Annual Interest Rate (APY)')}</label>
                        <div className="pills-row">
                            {APY_PRESETS.map((a) => (
                                <button key={a} className={`pill-btn ${annualRate === String(a) ? 'active' : ''}`}
                                    onClick={() => setAnnualRate(String(a))}>
                                    {a}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)}
                                placeholder="" id="ci-rate" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

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
                                placeholder="" id="ci-years" step="1" min="1" max="30" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label><Layers size={14} /> {getUiString(lang, 'Compound Frequency')}</label>
                        <div className="pills-row">
                            {COMPOUND_FREQUENCIES.map((f) => (
                                <button key={f.id} className={`pill-btn ${compoundFreq === f.id ? 'active' : ''}`}
                                    onClick={() => setCompoundFreq(f.id)}>
                                    {getUiString(lang, f.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use the same monthly contribution across scenarios to compare compounding impact fairly.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero Result */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Future Value')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <TrendingUp size={28} />
                                    {formatUSD(totalValue)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-accent-green)' }}>
                                    ROI: {formatPercent(effectiveROI)}
                                </span>
                            </div>

                            {/* Three Cards */}
                            <div className="calc-three-col-grid" style={{ margin: '16px 0' }}>
                                <div style={{
                                    padding: '12px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'Deposited')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>{formatUSD(totalDeposited)}</div>
                                </div>
                                <div style={{
                                    padding: '12px', background: 'rgba(34,197,94,0.06)',
                                    border: '1px solid rgba(34,197,94,0.3)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'Interest Earned')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>{formatUSD(totalInterest)}</div>
                                </div>
                                <div style={{
                                    padding: '12px', background: 'rgba(99,102,241,0.06)',
                                    border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{getUiString(lang, 'Compound Bonus')}</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>+{formatUSD(compoundAdvantage)}</div>
                                </div>
                            </div>

                            {/* Visual bar: deposited vs interest */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', borderRadius: '8px', overflow: 'hidden', height: '24px' }}>
                                    <div style={{
                                        width: `${Math.min((totalDeposited / totalValue) * 100, 100)}%`,
                                        background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem', fontWeight: 600, color: '#fff', minWidth: '40px',
                                    }}>
                                        {((totalDeposited / totalValue) * 100).toFixed(0)}%
                                    </div>
                                    <div style={{
                                        flex: 1, background: 'var(--color-accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem', fontWeight: 600, color: '#fff', minWidth: '40px',
                                    }}>
                                        {((totalInterest / totalValue) * 100).toFixed(0)}%
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                    <span>{getUiString(lang, '📦 Deposits')}</span>
                                    <span>{getUiString(lang, '💰 Interest')}</span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Investment')}</span>
                                    <span className="result-value">{formatUSD(principal)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly Contributions')}</span>
                                    <span className="result-value">{formatUSD(monthly)} × {Math.floor(t * 12)} {getUiString(lang, 'months')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Deposited')}</span>
                                    <span className="result-value">{formatUSD(totalDeposited)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Compound Frequency')}</span>
                                    <span className="result-value">{getUiString(lang, freq.label)} ({n}×/{getUiString(lang, 'year')})</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Annual Rate')}</span>
                                    <span className="result-value">{annualRate}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Interest Earned')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatUSD(totalInterest)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Simple Interest Would Be')}</span>
                                    <span className="result-value">{formatUSD(simpleTotal - totalDeposited)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Compound Advantage')}</strong></span>
                                    <span className="result-value profit"><strong>+{formatUSD(compoundAdvantage)}</strong></span>
                                </div>
                            </div>

                            {/* Year by Year Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Year-by-Year Growth')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Year')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Deposited')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Interest')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {properBreakdown.map((row) => (
                                                <tr key={row.year} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 500 }}>{getUiString(lang, 'Year')} {row.year}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text)' }}>
                                                        {formatUSD(row.balance)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                        {formatUSD(row.deposited)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: 500 }}>
                                                        +{formatUSD(row.interest)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'This assumes a constant rate and regular contributions. Crypto yields vary over time. Not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><TrendingUp size={40} /></div>
                            <h3>{getUiString(lang, 'Watch Your Money Grow')}</h3>
                            <p>{getUiString(lang, 'Enter your initial investment, monthly contribution, and APY to see the power of compound interest over time.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CompoundInterestCalculator);
