import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    Landmark,
    Shield,
    AlertTriangle,
    TrendingDown,
} from 'lucide-react';

const LTV_PRESETS = [25, 33, 50, 67, 75];
const COLLATERAL_PRESETS = [5000, 10000, 25000, 50000];
const APR_PRESETS = [3.9, 6.9, 9.9, 12.9];
const MARGIN_CALL_PRESETS = [65, 70, 75, 80];
const LIQUIDATION_PRESETS = [75, 80, 83, 90];

const PLATFORMS = [
    { id: 'nexo', label: 'Nexo', apr: 6.9, maxLtv: 83 },
    { id: 'aave', label: 'Aave', apr: 5.0, maxLtv: 80 },
    { id: 'binance', label: 'Binance', apr: 8.0, maxLtv: 75 },
    { id: 'custom', label: 'Custom', apr: 0, maxLtv: 100 },
];
const LOAN_SCENARIOS = [
    {
        label: 'Safe 33% LTV',
        platform: 'aave',
        collateralValue: '10000',
        ltv: '33',
        apr: '5',
        loanTerm: '12',
        marginCallLtv: '72',
        liquidationLtv: '80',
    },
    {
        label: 'Balanced 50% LTV',
        platform: 'nexo',
        collateralValue: '10000',
        ltv: '50',
        apr: '6.9',
        loanTerm: '12',
        marginCallLtv: '75',
        liquidationLtv: '83',
    },
    {
        label: 'Aggressive 67% LTV',
        platform: 'binance',
        collateralValue: '25000',
        ltv: '67',
        apr: '8',
        loanTerm: '24',
        marginCallLtv: '68',
        liquidationLtv: '75',
    },
] as const;

export default function LoanCalculator({ lang = 'en' }: { lang?: string }) {
    const [collateralValue, setCollateralValue] = useState('10000');
    const [ltv, setLtv] = useState('50');
    const [apr, setApr] = useState('6.9');
    const [loanTerm, setLoanTerm] = useState('12');
    const [platform, setPlatform] = useState('nexo');
    const [marginCallLtv, setMarginCallLtv] = useState('75');
    const [liquidationLtv, setLiquidationLtv] = useState('83');

    const handlePlatform = (id: string) => {
        setPlatform(id);
        if (id !== 'custom') {
            const p = PLATFORMS.find(p => p.id === id)!;
            setApr(String(p.apr));
            setMarginCallLtv(String(Math.round(p.maxLtv * 0.9)));
            setLiquidationLtv(String(p.maxLtv));
        }
    };
    const applyScenario = (scenario: (typeof LOAN_SCENARIOS)[number]) => {
        setPlatform(scenario.platform);
        setCollateralValue(scenario.collateralValue);
        setLtv(scenario.ltv);
        setApr(scenario.apr);
        setLoanTerm(scenario.loanTerm);
        setMarginCallLtv(scenario.marginCallLtv);
        setLiquidationLtv(scenario.liquidationLtv);
    };
    const isScenarioActive = (scenario: (typeof LOAN_SCENARIOS)[number]) => (
        platform === scenario.platform
        && collateralValue === scenario.collateralValue
        && ltv === scenario.ltv
        && apr === scenario.apr
        && loanTerm === scenario.loanTerm
        && marginCallLtv === scenario.marginCallLtv
        && liquidationLtv === scenario.liquidationLtv
    );

    const collateral = parseFloat(collateralValue) || 0;
    const ltvPct = parseFloat(ltv) || 0;
    const aprPct = parseFloat(apr) || 0;
    const months = parseInt(loanTerm) || 0;

    const loanAmount = collateral * (ltvPct / 100);
    const monthlyRate = aprPct / 100 / 12;
    const totalInterest = loanAmount * (aprPct / 100) * (months / 12);
    const monthlyInterest = months > 0 ? totalInterest / months : 0;
    const totalRepayment = loanAmount + totalInterest;

    const mcLtv = parseFloat(marginCallLtv) || 75;
    const liqLtv = parseFloat(liquidationLtv) || 83;
    const marginCallPrice = collateral > 0 ? (loanAmount / (mcLtv / 100)) : 0;
    const liquidationPrice = collateral > 0 ? (loanAmount / (liqLtv / 100)) : 0;
    const marginCallDrop = collateral > 0 ? ((1 - marginCallPrice / collateral) * 100) : 0;
    const liquidationDrop = collateral > 0 ? ((1 - liquidationPrice / collateral) * 100) : 0;

    const hasInputs = collateral > 0 && ltvPct > 0 && months > 0;

    // Health bar
    const healthPct = ltvPct;
    let healthColor = 'var(--color-accent-green)';
    let healthLabel = 'Safe';
    if (healthPct >= 70) { healthColor = 'var(--color-accent-red)'; healthLabel = 'High Risk'; }
    else if (healthPct >= 50) { healthColor = '#f59e0b'; healthLabel = 'Moderate'; }

    const reset = () => {
        setCollateralValue('10000'); setLtv('50'); setApr('6.9');
        setLoanTerm('12'); setPlatform('nexo');
        setMarginCallLtv('75'); setLiquidationLtv('83');
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    // Amortization table (interest-only)
    const schedule: { month: number; interest: number; balance: number }[] = [];
    let remaining = loanAmount;
    for (let m = 1; m <= Math.min(months, 36); m++) {
        const interest = remaining * monthlyRate;
        schedule.push({ month: m, interest, balance: remaining });
    }

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {LOAN_SCENARIOS.map((scenario) => (
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

                    {/* Platform */}
                    <div className="input-group">
                        <label><Landmark size={14} /> Platform</label>
                        <div className="pills-row">
                            {PLATFORMS.map((p) => (
                                <button key={p.id} className={`pill-btn ${platform === p.id ? 'active' : ''}`}
                                    onClick={() => handlePlatform(p.id)}>
                                    {p.label} {p.apr > 0 ? `${p.apr}%` : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Collateral Value */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Collateral Value (USD)</label>
                        <div className="pills-row">
                            {COLLATERAL_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${collateralValue === String(preset) ? 'active' : ''}`}
                                    onClick={() => setCollateralValue(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input type="number" inputMode="decimal" value={collateralValue} onChange={(e) => setCollateralValue(e.target.value)}
                                placeholder="10,000" id="loan-collateral" step="any" min="0" />
                        </div>
                    </div>

                    {/* LTV */}
                    <div className="input-group">
                        <label><Shield size={14} /> Loan-to-Value (LTV %)</label>
                        <div className="pills-row">
                            {LTV_PRESETS.map((v) => (
                                <button key={v} className={`pill-btn ${ltv === String(v) ? 'active' : ''}`}
                                    onClick={() => setLtv(String(v))}>
                                    {v}%
                                </button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={ltv} onChange={(e) => setLtv(e.target.value)}
                            placeholder="50" id="loan-ltv" step="1" min="1" max="100" />
                    </div>

                    {/* APR */}
                    <div className="input-group">
                        <label>Annual Interest Rate (APR %)</label>
                        <div className="pills-row">
                            {APR_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${apr === String(preset) ? 'active' : ''}`}
                                    onClick={() => setApr(String(preset))}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">%</span>
                            <input type="number" inputMode="decimal" value={apr} onChange={(e) => setApr(e.target.value)}
                                placeholder="6.9" id="loan-apr" step="0.1" min="0" />
                        </div>
                    </div>

                    {/* Term */}
                    <div className="input-group">
                        <label>Loan Term (months)</label>
                        <div className="pills-row">
                            {[3, 6, 12, 24, 36].map((m) => (
                                <button key={m} className={`pill-btn ${loanTerm === String(m) ? 'active' : ''}`}
                                    onClick={() => setLoanTerm(String(m))}>
                                    {m}mo
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Margin Call / Liquidation LTV */}
                    <div className="calc-two-col-grid">
                        <div className="input-group">
                            <label style={{ fontSize: '0.75rem' }}><AlertTriangle size={12} /> Margin Call LTV %</label>
                            <div className="pills-row">
                                {MARGIN_CALL_PRESETS.map((preset) => (
                                    <button
                                        key={preset}
                                        className={`pill-btn ${marginCallLtv === String(preset) ? 'active' : ''}`}
                                        onClick={() => setMarginCallLtv(String(preset))}
                                    >
                                        {preset}%
                                    </button>
                                ))}
                            </div>
                            <input type="number" inputMode="decimal" value={marginCallLtv} onChange={(e) => setMarginCallLtv(e.target.value)}
                                placeholder="75" id="loan-mc" step="1" min="1" max="100" />
                        </div>
                        <div className="input-group">
                            <label style={{ fontSize: '0.75rem' }}><TrendingDown size={12} /> Liquidation LTV %</label>
                            <div className="pills-row">
                                {LIQUIDATION_PRESETS.map((preset) => (
                                    <button
                                        key={preset}
                                        className={`pill-btn ${liquidationLtv === String(preset) ? 'active' : ''}`}
                                        onClick={() => setLiquidationLtv(String(preset))}
                                    >
                                        {preset}%
                                    </button>
                                ))}
                            </div>
                            <input type="number" inputMode="decimal" value={liquidationLtv} onChange={(e) => setLiquidationLtv(e.target.value)}
                                placeholder="83" id="loan-liq" step="1" min="1" max="100" />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Keep LTV conservative and monitor margin-call/liquidation thresholds before borrowing.
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-primary)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Loan Amount')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <Landmark size={28} />
                                    {formatUSD(loanAmount)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    at {ltvPct}% LTV on {formatUSD(collateral)} collateral
                                </span>
                            </div>

                            {/* LTV Health Bar */}
                            <div style={{ margin: '16px 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>{getUiString(lang, 'LTV Ratio')}</span>
                                    <span style={{ color: healthColor, fontWeight: 600 }}>{healthLabel} — {ltvPct}%</span>
                                </div>
                                <div style={{ height: '8px', borderRadius: '4px', background: 'var(--color-border)', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${Math.min(healthPct, 100)}%`, background: healthColor, borderRadius: '4px', transition: 'width 0.3s ease' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                    <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Collateral')}</span>
                                    <span className="result-value">{formatUSD(collateral)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Loan Amount')}</span>
                                    <span className="result-value">{formatUSD(loanAmount)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'APR')}</span>
                                    <span className="result-value">{aprPct}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Loan Term')}</span>
                                    <span className="result-value">{months} months</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly Interest')}</span>
                                    <span className="result-value fee">{formatUSD(monthlyInterest)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Interest')}</span>
                                    <span className="result-value fee">{formatUSD(totalInterest)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Repayment')}</strong></span>
                                    <span className="result-value"><strong>{formatUSD(totalRepayment)}</strong></span>
                                </div>
                            </div>

                            {/* Risk Thresholds */}
                            <div className="calc-two-col-grid" style={{ margin: '16px 0' }}>
                                <div style={{
                                    padding: '12px', borderRadius: '10px',
                                    border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)',
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                                        {getUiString(lang, '⚠️ Margin Call')}
                                    </div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f59e0b' }}>
                                        {formatUSD(marginCallPrice)}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                        −{marginCallDrop.toFixed(1)}% collateral drop
                                    </div>
                                </div>
                                <div style={{
                                    padding: '12px', borderRadius: '10px',
                                    border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)',
                                }}>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>
                                        {getUiString(lang, '🔴 Liquidation')}
                                    </div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent-red)' }}>
                                        {formatUSD(liquidationPrice)}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                        −{liquidationDrop.toFixed(1)}% collateral drop
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Schedule */}
                            {schedule.length > 0 && (
                                <div style={{ marginTop: '16px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                        {getUiString(lang, 'Monthly Interest Schedule (interest-only)')}
                                    </h4>
                                    <div style={{ overflowX: 'auto', maxHeight: '280px', overflowY: 'auto' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-bg)' }}>
                                                    <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Month')}</th>
                                                    <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Interest')}</th>
                                                    <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cumulative')}</th>
                                                    <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Balance')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {schedule.map((row, i) => (
                                                    <tr key={row.month} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px' }}>{row.month}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-red)' }}>{formatUSD(row.interest)}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                            {formatUSD(schedule.slice(0, i + 1).reduce((s, r) => s + r.interest, 0))}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>{formatUSD(row.balance)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Crypto-backed loans carry risk of liquidation if collateral value drops. Rates and terms vary by platform. Not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Landmark size={40} /></div>
                            <h3>{getUiString(lang, 'Estimate Loan Costs')}</h3>
                            <p>{getUiString(lang, 'Enter your collateral value, LTV ratio, and loan term to calculate interest costs, repayment amounts, and liquidation thresholds.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
