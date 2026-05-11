import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Shield,
    ShieldCheck,
    RotateCcw,
    Info,
    DollarSign,
    Percent,
    Calendar,
    AlertTriangle,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    premiumCost: number;
    premiumPct: number;
    effectiveCoverage: number;
    dailyCost: number;
    breakEvenHackSize: number;
    /** Expected value comparison at various hack probabilities */
    evTable: { hackProb: number; evInsured: number; evUninsured: number }[];
    /** Net P&L: no hack vs hack */
    pnlNoHackInsured: number;
    pnlNoHackUninsured: number;
    pnlHackInsured: number;
    pnlHackUninsured: number;
}

type RiskTier = 'low' | 'medium' | 'high';

const RISK_TIERS: { id: RiskTier; label: string; examples: string; defaultRate: string }[] = [
    { id: 'low', label: 'Low (Aave, Compound)', examples: 'Aave, Compound', defaultRate: '2.5' },
    { id: 'medium', label: 'Medium (Uniswap, Curve)', examples: 'Uniswap, Curve', defaultRate: '5' },
    { id: 'high', label: 'High (New Protocols)', examples: 'New Protocols', defaultRate: '10' },
];

const SCENARIOS = [
    {
        label: 'Blue Chip DeFi',
        positionSize: '50000',
        coveragePeriod: '365',
        riskTier: 'low' as RiskTier,
        premiumRate: '2.5',
        deductible: '10',
    },
    {
        label: 'LP Position',
        positionSize: '10000',
        coveragePeriod: '90',
        riskTier: 'medium' as RiskTier,
        premiumRate: '5',
        deductible: '10',
    },
    {
        label: 'Degen Play',
        positionSize: '5000',
        coveragePeriod: '30',
        riskTier: 'high' as RiskTier,
        premiumRate: '10',
        deductible: '10',
    },
] as const;

const HACK_PROBABILITIES = [0.5, 1, 2, 5, 10];

function DefiInsuranceCalculator({ lang = 'en' }: { lang?: string }) {
    const [positionSize, setPositionSize] = useState('10000');
    const [coveragePeriod, setCoveragePeriod] = useState('90');
    const [riskTier, setRiskTier] = useState<RiskTier>('medium');
    const [premiumRate, setPremiumRate] = useState('5');
    const [deductible, setDeductible] = useState('10');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setPositionSize(s.positionSize);
        setCoveragePeriod(s.coveragePeriod);
        setRiskTier(s.riskTier);
        setPremiumRate(s.premiumRate);
        setDeductible(s.deductible);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        positionSize === s.positionSize &&
        coveragePeriod === s.coveragePeriod &&
        riskTier === s.riskTier &&
        premiumRate === s.premiumRate &&
        deductible === s.deductible;

    const handleRiskTierChange = (tier: RiskTier) => {
        setRiskTier(tier);
        const found = RISK_TIERS.find((t) => t.id === tier);
        if (found) setPremiumRate(found.defaultRate);
    };

    const results = useMemo<Results | null>(() => {
        const size = parseFloat(positionSize) || 0;
        const days = parseFloat(coveragePeriod) || 0;
        const rate = parseFloat(premiumRate) || 0;
        const ded = parseFloat(deductible) || 0;

        if (size <= 0 || days <= 0 || rate <= 0) return null;

        // Premium cost = position * annual rate * (days / 365)
        const premiumCost = size * (rate / 100) * (days / 365);
        const premiumPct = (premiumCost / size) * 100;

        // Effective coverage = position - deductible amount
        const deductibleAmount = size * (ded / 100);
        const effectiveCoverage = size - deductibleAmount;

        // Daily cost
        const dailyCost = days > 0 ? premiumCost / days : 0;

        // Break-even hack size: minimum loss that justifies insurance
        // Insurance pays (loss - deductible), you paid premium
        // break-even: (hackSize - deductibleAmount) = premiumCost => hackSize = premiumCost + deductibleAmount
        const breakEvenHackSize = premiumCost + deductibleAmount;

        // Expected value comparison at different hack probabilities
        const evTable = HACK_PROBABILITIES.map((probPct) => {
            const prob = probPct / 100;
            // Uninsured: (1-prob)*0 + prob*(-size) = -prob*size
            const evUninsured = -prob * size;
            // Insured: always pay premium. If hacked, recover (size - deductible) = effectiveCoverage
            // So net if hacked = -premiumCost - size + effectiveCoverage = -premiumCost - deductibleAmount
            // EV insured = -premiumCost + prob * (effectiveCoverage - size) ...
            // Actually: EV = -premium + prob*(recovery) where recovery = effectiveCoverage
            // Without hack: lose premium only. With hack: lose position + deductible, get coverage payout, minus premium
            // EV = (1-prob)*(-premiumCost) + prob*(-premiumCost - deductibleAmount)
            // EV = -premiumCost - prob*deductibleAmount
            const evInsured = -premiumCost - prob * deductibleAmount;
            return { hackProb: probPct, evInsured, evUninsured };
        });

        // Net P&L scenarios
        const pnlNoHackInsured = -premiumCost;
        const pnlNoHackUninsured = 0;
        const pnlHackInsured = -premiumCost - deductibleAmount; // lose premium + deductible
        const pnlHackUninsured = -size; // lose entire position

        return {
            premiumCost,
            premiumPct,
            effectiveCoverage,
            dailyCost,
            breakEvenHackSize,
            evTable,
            pnlNoHackInsured,
            pnlNoHackUninsured,
            pnlHackInsured,
            pnlHackUninsured,
        };
    }, [positionSize, coveragePeriod, premiumRate, deductible]);

    const reset = () => {
        setPositionSize('10000');
        setCoveragePeriod('90');
        setRiskTier('medium');
        setPremiumRate('5');
        setDeductible('10');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    const getRiskColor = (tier: RiskTier) => {
        switch (tier) {
            case 'low': return 'var(--color-accent-green)';
            case 'medium': return '#f59e0b';
            case 'high': return '#ef4444';
        }
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button
                                    key={s.label}
                                    className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}
                                >
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="ins-position-size">
                            <DollarSign size={14} /> {getUiString(lang, 'Position Size ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={positionSize}
                            onChange={(e) => setPositionSize(e.target.value)}
                            id="ins-position-size"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="ins-coverage-period">
                            <Calendar size={14} /> {getUiString(lang, 'Coverage Period (days)')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={coveragePeriod}
                            onChange={(e) => setCoveragePeriod(e.target.value)}
                            id="ins-coverage-period"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label>
                            <Shield size={14} /> {getUiString(lang, 'Protocol Risk Tier')}
                        </label>
                        <div className="pills-row">
                            {RISK_TIERS.map((tier) => (
                                <button
                                    key={tier.id}
                                    className={`pill-btn ${riskTier === tier.id ? 'active' : ''}`}
                                    style={riskTier === tier.id ? { borderColor: getRiskColor(tier.id) } : undefined}
                                    onClick={() => handleRiskTierChange(tier.id)}
                                >
                                    {getUiString(lang, tier.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="ins-premium-rate">
                            <Percent size={14} /> {getUiString(lang, 'Annual Premium Rate (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={premiumRate}
                            onChange={(e) => setPremiumRate(e.target.value)}
                            id="ins-premium-rate"
                            step="0.1"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                        <span className="input-hint" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {getUiString(lang, 'Auto-set by risk tier. Adjust manually if needed.')}
                        </span>
                    </div>

                    <div className="input-group">
                        <label htmlFor="ins-deductible">
                            <Percent size={14} /> {getUiString(lang, 'Deductible (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={deductible}
                            onChange={(e) => setDeductible(e.target.value)}
                            id="ins-deductible"
                            step="1"
                            min="0"
                            max="100"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Evaluate the cost-benefit of insuring your DeFi positions against smart contract exploits.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: getRiskColor(riskTier) }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Insurance Premium')}
                                </span>
                                <span className="result-hero-value">
                                    <ShieldCheck size={28} />
                                    {formatUSD(results.premiumCost)}
                                </span>
                                <span className="result-hero-roi">
                                    {formatPercent(results.premiumPct)} {getUiString(lang, 'of position')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Premium Cost')}</span>
                                    <span className="result-value fee">{formatUSD(results.premiumCost)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Premium as % of Position')}</span>
                                    <span className="result-value">{formatPercent(results.premiumPct)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Coverage')}</span>
                                    <span className="result-value profit">{formatUSD(results.effectiveCoverage)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Daily Cost of Insurance')}</span>
                                    <span className="result-value">{formatUSD(results.dailyCost)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Break-Even Hack Size')}</strong>
                                    </span>
                                    <span className="result-value">
                                        <strong>{formatUSD(results.breakEvenHackSize)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Net P&L Table */}
                            <div className="result-breakdown" style={{ marginTop: '12px' }}>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Net P&L Scenarios')}</strong>
                                    </span>
                                    <span className="result-value" />
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'Scenario')}
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'Insured')}
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'Uninsured')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <td style={{ padding: '8px 6px' }}>{getUiString(lang, 'No Hack')}</td>
                                                <td style={{ textAlign: 'right', padding: '8px 6px', color: '#ef4444' }}>
                                                    {formatUSD(results.pnlNoHackInsured)}
                                                </td>
                                                <td style={{ textAlign: 'right', padding: '8px 6px', color: 'var(--color-accent-green)' }}>
                                                    {formatUSD(results.pnlNoHackUninsured)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '8px 6px' }}>
                                                    <AlertTriangle size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                                    {getUiString(lang, 'Full Exploit')}
                                                </td>
                                                <td style={{ textAlign: 'right', padding: '8px 6px', color: '#f59e0b' }}>
                                                    {formatUSD(results.pnlHackInsured)}
                                                </td>
                                                <td style={{ textAlign: 'right', padding: '8px 6px', color: '#ef4444' }}>
                                                    {formatUSD(results.pnlHackUninsured)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Expected Value Comparison */}
                            <div className="result-breakdown" style={{ marginTop: '12px' }}>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Expected Value by Hack Probability')}</strong>
                                    </span>
                                    <span className="result-value" />
                                </div>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ textAlign: 'left', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'Hack Prob.')}
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'EV Insured')}
                                                </th>
                                                <th style={{ textAlign: 'right', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'EV Uninsured')}
                                                </th>
                                                <th style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                                                    {getUiString(lang, 'Better')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.evTable.map((row) => {
                                                const insuredBetter = row.evInsured > row.evUninsured;
                                                return (
                                                    <tr key={row.hackProb} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px 6px' }}>{row.hackProb}%</td>
                                                        <td style={{ textAlign: 'right', padding: '8px 6px', color: insuredBetter ? 'var(--color-accent-green)' : 'var(--color-text-muted)' }}>
                                                            {formatUSD(row.evInsured)}
                                                        </td>
                                                        <td style={{ textAlign: 'right', padding: '8px 6px', color: !insuredBetter ? 'var(--color-accent-green)' : 'var(--color-text-muted)' }}>
                                                            {formatUSD(row.evUninsured)}
                                                        </td>
                                                        <td style={{ textAlign: 'center', padding: '8px 6px', fontWeight: 600 }}>
                                                            {insuredBetter
                                                                ? getUiString(lang, 'Insured')
                                                                : getUiString(lang, 'Uninsured')}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'DeFi insurance coverage varies by provider (Nexus Mutual, InsurAce, Unslashed). Always read policy terms, exclusions, and claim procedures before purchasing.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Shield size={40} /></div>
                            <h2>{getUiString(lang, 'Calculate Insurance Cost')}</h2>
                            <p>{getUiString(lang, 'Enter your position size and coverage parameters to see the cost-benefit analysis of DeFi insurance.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(DefiInsuranceCalculator);
