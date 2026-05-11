import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    RotateCcw,
    Info,
    Layers,
    DollarSign,
    Calendar,
    Plus,
    Trash2,
    TrendingUp,
    Shield,
    AlertTriangle,
    Zap,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Protocol {
    id: number;
    name: string;
    apy: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    tvl: string;
}

interface ProtocolResult {
    name: string;
    apy: number;
    riskLevel: string;
    projectedEarnings: number;
    riskAdjustedReturn: number;
    tvl: number;
}

interface Results {
    protocolResults: ProtocolResult[];
    bestRiskAdjusted: string;
    totalEarningsEqualSplit: number;
    bestAbsoluteReturn: string;
    investmentAmount: number;
    periodDays: number;
}

const RISK_WEIGHTS: Record<string, number> = {
    Low: 1.0,
    Medium: 0.7,
    High: 0.4,
};

let protocolIdCounter = 10;

const SCENARIOS = [
    {
        label: 'Conservative (Aave/Compound)',
        investmentAmount: '10000',
        periodDays: '365',
        protocols: [
            { id: 50, name: 'Aave V3 (USDC)', apy: '4.2', riskLevel: 'Low' as const, tvl: '12000000000' },
            { id: 51, name: 'Compound V3', apy: '3.8', riskLevel: 'Low' as const, tvl: '3000000000' },
            { id: 52, name: 'MakerDAO DSR', apy: '5.0', riskLevel: 'Low' as const, tvl: '8000000000' },
            { id: 53, name: 'Spark Protocol', apy: '5.5', riskLevel: 'Low' as const, tvl: '2500000000' },
        ],
    },
    {
        label: 'Balanced (Curve/Convex)',
        investmentAmount: '10000',
        periodDays: '365',
        protocols: [
            { id: 60, name: 'Curve 3pool', apy: '3.5', riskLevel: 'Low' as const, tvl: '1500000000' },
            { id: 61, name: 'Convex Finance', apy: '8.0', riskLevel: 'Medium' as const, tvl: '2000000000' },
            { id: 62, name: 'Yearn V3', apy: '6.5', riskLevel: 'Medium' as const, tvl: '500000000' },
            { id: 63, name: 'Aura Finance', apy: '9.5', riskLevel: 'Medium' as const, tvl: '400000000' },
            { id: 64, name: 'Pendle Finance', apy: '12.0', riskLevel: 'Medium' as const, tvl: '3500000000' },
        ],
    },
    {
        label: 'Aggressive (New protocols)',
        investmentAmount: '10000',
        periodDays: '365',
        protocols: [
            { id: 70, name: 'EigenLayer Restaking', apy: '15.0', riskLevel: 'High' as const, tvl: '10000000000' },
            { id: 71, name: 'Ethena (USDe)', apy: '25.0', riskLevel: 'High' as const, tvl: '3000000000' },
            { id: 72, name: 'Morpho Blue', apy: '8.5', riskLevel: 'Medium' as const, tvl: '2000000000' },
            { id: 73, name: 'Fluid Protocol', apy: '18.0', riskLevel: 'High' as const, tvl: '500000000' },
            { id: 74, name: 'Kamino Finance', apy: '22.0', riskLevel: 'High' as const, tvl: '1200000000' },
        ],
    },
] as const;

function DefiYieldAggregatorCalculator({ lang = 'en' }: { lang?: string }) {
    const [investmentAmount, setInvestmentAmount] = useState('10000');
    const [periodDays, setPeriodDays] = useState('365');
    const [protocols, setProtocols] = useState<Protocol[]>([
        { id: 0, name: 'Aave V3 (USDC)', apy: '4.2', riskLevel: 'Low', tvl: '12000000000' },
        { id: 1, name: 'Compound V3', apy: '3.8', riskLevel: 'Low', tvl: '3000000000' },
        { id: 2, name: 'Convex Finance', apy: '8.0', riskLevel: 'Medium', tvl: '2000000000' },
        { id: 3, name: 'Pendle Finance', apy: '12.0', riskLevel: 'Medium', tvl: '3500000000' },
        { id: 4, name: 'Ethena (USDe)', apy: '25.0', riskLevel: 'High', tvl: '3000000000' },
    ]);

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setInvestmentAmount(s.investmentAmount);
        setPeriodDays(s.periodDays);
        setProtocols(s.protocols.map((p) => ({ ...p })));
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        investmentAmount === s.investmentAmount &&
        periodDays === s.periodDays &&
        protocols.length === s.protocols.length &&
        protocols.every((p, i) => p.name === s.protocols[i]?.name && p.apy === String(s.protocols[i]?.apy));

    const updateProtocol = (id: number, field: keyof Protocol, value: string) => {
        setProtocols((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
        );
    };

    const addProtocol = () => {
        protocolIdCounter += 1;
        setProtocols((prev) => [
            ...prev,
            { id: protocolIdCounter, name: '', apy: '', riskLevel: 'Medium', tvl: '' },
        ]);
    };

    const removeProtocol = (id: number) => {
        setProtocols((prev) => prev.filter((p) => p.id !== id));
    };

    const results = useMemo<Results | null>(() => {
        const amount = parseFloat(investmentAmount) || 0;
        const days = parseFloat(periodDays) || 0;

        if (amount <= 0 || days <= 0) return null;

        const validProtocols = protocols.filter((p) => {
            const apy = parseFloat(p.apy);
            return p.name.trim() !== '' && Number.isFinite(apy) && apy >= 0;
        });

        if (validProtocols.length === 0) return null;

        const protocolResults: ProtocolResult[] = validProtocols.map((p) => {
            const apy = parseFloat(p.apy) || 0;
            const tvl = parseFloat(p.tvl) || 0;
            const riskWeight = RISK_WEIGHTS[p.riskLevel] || 0.5;

            // Projected earnings for full investment amount over period
            const periodYears = days / 365;
            const projectedEarnings = amount * (apy / 100) * periodYears;
            const riskAdjustedReturn = apy * riskWeight;

            return {
                name: p.name,
                apy,
                riskLevel: p.riskLevel,
                projectedEarnings,
                riskAdjustedReturn,
                tvl,
            };
        });

        // Sort by risk-adjusted return
        const sorted = [...protocolResults].sort((a, b) => b.riskAdjustedReturn - a.riskAdjustedReturn);
        const bestRiskAdjusted = sorted[0]?.name || '\u2014';

        const sortedByApy = [...protocolResults].sort((a, b) => b.apy - a.apy);
        const bestAbsoluteReturn = sortedByApy[0]?.name || '\u2014';

        // Equal split across all protocols
        const perProtocolAmount = amount / validProtocols.length;
        const periodYears = days / 365;
        const totalEarningsEqualSplit = protocolResults.reduce((sum, p) => {
            return sum + perProtocolAmount * (p.apy / 100) * periodYears;
        }, 0);

        return {
            protocolResults,
            bestRiskAdjusted,
            totalEarningsEqualSplit,
            bestAbsoluteReturn,
            investmentAmount: amount,
            periodDays: days,
        };
    }, [investmentAmount, periodDays, protocols]);

    const reset = () => {
        setInvestmentAmount('10000');
        setPeriodDays('365');
        setProtocols([
            { id: 0, name: 'Aave V3 (USDC)', apy: '4.2', riskLevel: 'Low', tvl: '12000000000' },
            { id: 1, name: 'Compound V3', apy: '3.8', riskLevel: 'Low', tvl: '3000000000' },
            { id: 2, name: 'Convex Finance', apy: '8.0', riskLevel: 'Medium', tvl: '2000000000' },
            { id: 3, name: 'Pendle Finance', apy: '12.0', riskLevel: 'Medium', tvl: '3500000000' },
            { id: 4, name: 'Ethena (USDe)', apy: '25.0', riskLevel: 'High', tvl: '3000000000' },
        ]);
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

    const formatTVL = (n: number) => {
        if (!Number.isFinite(n) || n === 0) return '\u2014';
        if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
        if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
        if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
        return `$${n.toFixed(0)}`;
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    const riskIcon = (level: string) => {
        switch (level) {
            case 'Low': return <Shield size={14} />;
            case 'Medium': return <AlertTriangle size={14} />;
            case 'High': return <Zap size={14} />;
            default: return null;
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
                        <label htmlFor="defi-investment-amount">
                            <DollarSign size={14} /> {getUiString(lang, 'Investment Amount ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            id="defi-investment-amount"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="defi-period-days">
                            <Calendar size={14} /> {getUiString(lang, 'Investment Period (days)')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={periodDays}
                            onChange={(e) => setPeriodDays(e.target.value)}
                            id="defi-period-days"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label>
                            <Layers size={14} /> {getUiString(lang, 'Protocols')}
                        </label>
                        {protocols.map((p) => (
                            <div key={p.id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '10px', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={p.name}
                                        onChange={(e) => updateProtocol(p.id, 'name', e.target.value)}
                                        placeholder={getUiString(lang, 'Protocol Name')}
                                        aria-label={getUiString(lang, 'Protocol Name')}
                                        style={{ flex: 1 }}
                                    />
                                    {protocols.length > 1 && (
                                        <button
                                            className="pill-btn"
                                            onClick={() => removeProtocol(p.id)}
                                            style={{ padding: '6px', minWidth: '36px' }}
                                            aria-label={getUiString(lang, 'Remove protocol')}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={p.apy}
                                            onChange={(e) => updateProtocol(p.id, 'apy', e.target.value)}
                                            placeholder={getUiString(lang, 'APY %')}
                                            aria-label={getUiString(lang, 'APY %')}
                                            step="0.1"
                                            min="0"
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </div>
                                    <select
                                        value={p.riskLevel}
                                        onChange={(e) => updateProtocol(p.id, 'riskLevel', e.target.value)}
                                        aria-label={getUiString(lang, 'Risk Level')}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="Low">{getUiString(lang, 'Low Risk')}</option>
                                        <option value="Medium">{getUiString(lang, 'Medium Risk')}</option>
                                        <option value="High">{getUiString(lang, 'High Risk')}</option>
                                    </select>
                                </div>
                                <div style={{ marginTop: '6px' }}>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        value={p.tvl}
                                        onChange={(e) => updateProtocol(p.id, 'tvl', e.target.value)}
                                        placeholder={getUiString(lang, 'TVL ($)')}
                                        aria-label={getUiString(lang, 'TVL ($)')}
                                        step="any"
                                        min="0"
                                        onFocus={(e) => e.target.select()}
                                    />
                                </div>
                            </div>
                        ))}
                        <button className="pill-btn" onClick={addProtocol} style={{ marginTop: '4px' }}>
                            <Plus size={14} /> {getUiString(lang, 'Add Protocol')}
                        </button>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare DeFi yields across protocols with risk-adjusted returns.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Best Risk-Adjusted Protocol')}
                                </span>
                                <span className="result-hero-value">
                                    <TrendingUp size={28} />
                                    {results.bestRiskAdjusted}
                                </span>
                                <span className="result-hero-roi">
                                    {getUiString(lang, 'Equal Split Earnings')}: {formatUSD(results.totalEarningsEqualSplit)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                {results.protocolResults
                                    .sort((a, b) => b.riskAdjustedReturn - a.riskAdjustedReturn)
                                    .map((p, i) => (
                                        <div key={p.name}>
                                            {i > 0 && <div className="result-divider" />}
                                            <div className="result-row">
                                                <span className="result-label">
                                                    <strong>{riskIcon(p.riskLevel)} {p.name}</strong>
                                                </span>
                                                <span className="result-value">
                                                    {p.tvl > 0 && <span style={{ fontSize: '0.8em', opacity: 0.7 }}>TVL {formatTVL(p.tvl)}</span>}
                                                </span>
                                            </div>
                                            <div className="result-row" style={{ paddingLeft: '12px' }}>
                                                <span className="result-label">{getUiString(lang, 'APY')}</span>
                                                <span className="result-value profit">{formatPercent(p.apy)}</span>
                                            </div>
                                            <div className="result-row" style={{ paddingLeft: '12px' }}>
                                                <span className="result-label">{getUiString(lang, 'Projected Earnings')}</span>
                                                <span className="result-value profit">{formatUSD(p.projectedEarnings)}</span>
                                            </div>
                                            <div className="result-row" style={{ paddingLeft: '12px' }}>
                                                <span className="result-label">{getUiString(lang, 'Risk-Adjusted Return')}</span>
                                                <span className="result-value">{formatPercent(p.riskAdjustedReturn)}</span>
                                            </div>
                                        </div>
                                    ))}
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Total (Equal Split)')}</strong>
                                    </span>
                                    <span className="result-value profit">
                                        <strong>{formatUSD(results.totalEarningsEqualSplit)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Best Absolute APY')}</span>
                                    <span className="result-value">{results.bestAbsoluteReturn}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'DeFi yields are variable and not guaranteed. Smart contract risk, impermanent loss, and protocol-specific risks may reduce actual returns. DYOR.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Layers size={40} /></div>
                            <h2>{getUiString(lang, 'Compare DeFi Yields')}</h2>
                            <p>{getUiString(lang, 'Enter your investment amount and add protocols to compare yields and risk-adjusted returns.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(DefiYieldAggregatorCalculator);
