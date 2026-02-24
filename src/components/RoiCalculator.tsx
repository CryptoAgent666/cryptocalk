import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    Percent,
    Info,
    RotateCcw,
    BarChart3,
} from 'lucide-react';

interface Results {
    totalRoi: number;
    annualizedRoi: number;
    netProfit: number;
    initialInvestment: number;
    currentValue: number;
    fees: number;
    holdingDays: number;
    comparisons: { name: string; annualReturn: number; periodReturn: number; periodValue: number }[];
}

const PERIOD_PRESETS = [
    { label: '1M', days: 30 },
    { label: '3M', days: 91 },
    { label: '6M', days: 182 },
    { label: '1Y', days: 365 },
    { label: '2Y', days: 730 },
    { label: '3Y', days: 1095 },
    { label: '5Y', days: 1825 },
];
const INITIAL_INVESTMENT_PILLS = ['1000', '5000', '10000', '25000'];
const CURRENT_VALUE_MULTIPLIERS = [
    { label: '1x', value: 1 },
    { label: '1.2x', value: 1.2 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
];
const FEES_PILLS = ['0', '10', '50', '100', '250'];
const ROI_SCENARIOS = [
    {
        label: '1Y +50%',
        initialInvestment: '10000',
        currentValue: '15000',
        holdingDays: '365',
        selectedPreset: '1Y',
        feesPaid: '50',
    },
    {
        label: '6M Drawdown',
        initialInvestment: '10000',
        currentValue: '8000',
        holdingDays: '182',
        selectedPreset: '6M',
        feesPaid: '25',
    },
    {
        label: '3Y 2x',
        initialInvestment: '5000',
        currentValue: '10000',
        holdingDays: '1095',
        selectedPreset: '3Y',
        feesPaid: '100',
    },
] as const;

const TRADITIONAL_ASSETS = [
    { name: 'S&P 500', annualReturn: 10.5 },
    { name: 'Gold', annualReturn: 7.8 },
    { name: 'Real Estate', annualReturn: 8.6 },
    { name: 'US Bonds', annualReturn: 4.5 },
    { name: 'Savings Account', annualReturn: 4.0 },
];

export default function RoiCalculator({ lang = 'en' }: { lang?: string }) {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [holdingDays, setHoldingDays] = useState('365');
    const [selectedPreset, setSelectedPreset] = useState('1Y');
    const [feesPaid, setFeesPaid] = useState('');
    const [results, setResults] = useState<Results | null>(null);
    const applyScenario = (scenario: (typeof ROI_SCENARIOS)[number]) => {
        setInitialInvestment(scenario.initialInvestment);
        setCurrentValue(scenario.currentValue);
        setHoldingDays(scenario.holdingDays);
        setSelectedPreset(scenario.selectedPreset);
        setFeesPaid(scenario.feesPaid);
    };
    const isScenarioActive = (scenario: (typeof ROI_SCENARIOS)[number]) => (
        initialInvestment === scenario.initialInvestment
        && currentValue === scenario.currentValue
        && holdingDays === scenario.holdingDays
        && feesPaid === scenario.feesPaid
    );

    const calculate = useCallback(() => {
        const invest = parseFloat(initialInvestment);
        const current = parseFloat(currentValue);
        const days = parseFloat(holdingDays);
        const fees = parseFloat(feesPaid) || 0;

        if (isNaN(invest) || isNaN(current) || isNaN(days) || invest <= 0 || days <= 0) {
            setResults(null);
            return;
        }

        const netProfit = current - invest - fees;
        const totalRoi = ((current - invest - fees) / invest) * 100;
        const annualizedRoi = (Math.pow(1 + totalRoi / 100, 365 / days) - 1) * 100;

        // Compare with traditional assets over the same holding period
        const comparisons = TRADITIONAL_ASSETS.map((asset) => {
            const periodReturn = (Math.pow(1 + asset.annualReturn / 100, days / 365) - 1) * 100;
            const periodValue = invest * (1 + periodReturn / 100);
            return {
                name: asset.name,
                annualReturn: asset.annualReturn,
                periodReturn,
                periodValue,
            };
        });

        setResults({
            totalRoi,
            annualizedRoi,
            netProfit,
            initialInvestment: invest,
            currentValue: current,
            fees,
            holdingDays: days,
            comparisons,
        });
    }, [initialInvestment, currentValue, holdingDays, feesPaid]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const handlePreset = (label: string, days: number) => {
        setSelectedPreset(label);
        setHoldingDays(String(days));
    };

    const handleCustomDays = (value: string) => {
        setHoldingDays(value);
        setSelectedPreset('');
    };

    const parsedInitialInvestment = parseFloat(initialInvestment);
    const parsedCurrentValue = parseFloat(currentValue);

    const applyCurrentMultiplier = (multiplier: number) => {
        if (isNaN(parsedInitialInvestment) || parsedInitialInvestment <= 0) return;
        setCurrentValue((parsedInitialInvestment * multiplier).toFixed(2));
    };

    const isCurrentMultiplierActive = (multiplier: number) => {
        if (
            isNaN(parsedInitialInvestment) ||
            parsedInitialInvestment <= 0 ||
            isNaN(parsedCurrentValue) ||
            parsedCurrentValue <= 0
        ) {
            return false;
        }
        const expected = parsedInitialInvestment * multiplier;
        return Math.abs(parsedCurrentValue - expected) < Math.max(0.01, parsedInitialInvestment * 0.005);
    };

    const reset = () => {
        setInitialInvestment('');
        setCurrentValue('');
        setHoldingDays('365');
        setSelectedPreset('1Y');
        setFeesPaid('');
        setResults(null);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatPercent = (n: number) =>
        `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    const isProfit = results ? results.netProfit >= 0 : true;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {ROI_SCENARIOS.map((scenario) => (
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

                    {/* Initial Investment */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Initial Investment')}
                        </label>
                        <div className="pills-row">
                            {INITIAL_INVESTMENT_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${initialInvestment === preset ? 'active' : ''}`}
                                    onClick={() => setInitialInvestment(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(e.target.value)}
                                placeholder="10,000"
                                id="roi-initial"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Current Value */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Current Value / Exit Value
                        </label>
                        <div className="pills-row">
                            {CURRENT_VALUE_MULTIPLIERS.map((preset) => (
                                <button
                                    key={preset.label}
                                    className={`pill-btn ${isCurrentMultiplierActive(preset.value) ? 'active' : ''}`}
                                    onClick={() => applyCurrentMultiplier(preset.value)}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={currentValue}
                                onChange={(e) => setCurrentValue(e.target.value)}
                                placeholder="15,000"
                                id="roi-current"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Holding Period */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            Holding Period
                        </label>
                        <div className="pills-row">
                            {PERIOD_PRESETS.map((p) => (
                                <button
                                    key={p.label}
                                    className={`pill-btn ${selectedPreset === p.label ? 'active' : ''}`}
                                    onClick={() => handlePreset(p.label, p.days)}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number"
                                value={holdingDays}
                                onChange={(e) => handleCustomDays(e.target.value)}
                                placeholder="365"
                                id="roi-days"
                                step="1"
                                min="1"
                            />
                            <span className="input-prefix" style={{ position: 'static', padding: '0 10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>days</span>
                        </div>
                    </div>

                    {/* Fees Paid */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            Total Fees Paid (optional)
                        </label>
                        <div className="pills-row">
                            {FEES_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${feesPaid === preset ? 'active' : ''}`}
                                    onClick={() => setFeesPaid(preset)}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={feesPaid}
                                onChange={(e) => setFeesPaid(e.target.value)}
                                placeholder="0.00"
                                id="roi-fees"
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
                        Use investment presets and value multipliers for quick ROI scenarios.
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Hero: Total ROI */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    Total ROI
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {formatPercent(results.totalRoi)}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
                                    {isProfit ? 'Profit' : 'Loss'}: {formatUSD(Math.abs(results.netProfit))}
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Investment')}</span>
                                    <span className="result-value">{formatUSD(results.initialInvestment)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Value')}</span>
                                    <span className="result-value">{formatUSD(results.currentValue)}</span>
                                </div>
                                {results.fees > 0 && (
                                    <div className="result-row">
                                        <span className="result-label">Fees Paid</span>
                                        <span className="result-value fee">−{formatUSD(results.fees)}</span>
                                    </div>
                                )}
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>Net Profit / Loss</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'loss'}`}>
                                        <strong>{isProfit ? '+' : ''}{formatUSD(results.netProfit)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>Total ROI</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'loss'}`}>
                                        <strong>{formatPercent(results.totalRoi)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>Annualized ROI</strong></span>
                                    <span className={`result-value ${results.annualizedRoi >= 0 ? 'profit' : 'loss'}`}>
                                        <strong>{formatPercent(results.annualizedRoi)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Holding Period</span>
                                    <span className="result-value">
                                        {results.holdingDays} days ({(results.holdingDays / 365).toFixed(1)} years)
                                    </span>
                                </div>
                            </div>

                            {/* Comparison Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <BarChart3 size={16} />
                                    Comparison with Traditional Assets
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Asset')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>Avg Annual</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>Period Return</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>Would Be Worth</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Your Crypto ROI row */}
                                            <tr style={{ borderBottom: '2px solid var(--color-primary)', background: 'rgba(99,102,241,0.06)' }}>
                                                <td style={{ padding: '8px', fontWeight: 700, color: 'var(--color-primary)' }}>Your Crypto</td>
                                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: isProfit ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                                                    {formatPercent(results.annualizedRoi)}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: isProfit ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                                                    {formatPercent(results.totalRoi)}
                                                </td>
                                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--color-text)' }}>
                                                    {formatUSD(results.currentValue - results.fees)}
                                                </td>
                                            </tr>
                                            {results.comparisons.map((comp) => {
                                                const beats = results.annualizedRoi > comp.annualReturn;
                                                return (
                                                    <tr key={comp.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '8px', fontWeight: 500 }}>{comp.name}</td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                            {comp.annualReturn}%
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                            +{comp.periodReturn.toFixed(2)}%
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text)', fontWeight: 500 }}>
                                                            {formatUSD(comp.periodValue)}
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
                                    href="https://www.binance.com/en/register"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="cta-btn"
                                >
                                    Trade on Binance →
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                For informational purposes only. Traditional asset returns are historical averages and not guaranteed. Crypto investments are volatile and carry significant risk. Not financial advice.
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <BarChart3 size={40} />
                            </div>
                            <h3>Calculate Your Crypto ROI</h3>
                            <p>Enter your initial investment, current value, and holding period to see your return on investment compared with traditional assets.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
