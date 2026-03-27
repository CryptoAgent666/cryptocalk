import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Globe,
    Shield,
    Info,
    RotateCcw,
    Clock,
    Trophy,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface CountryData {
    id: string;
    name: string;
    flag: string;
    currency: string;
    inflationRate: number;
    adoptionRate: number;
}

interface AssetConfig {
    id: string;
    label: string;
    annualReturn: number;
    color: string;
}

const COUNTRIES: CountryData[] = [
    { id: 'turkey', name: 'Turkey', flag: 'TR', currency: 'TRY', inflationRate: 0.50, adoptionRate: 25.6 },
    { id: 'argentina', name: 'Argentina', flag: 'AR', currency: 'ARS', inflationRate: 1.00, adoptionRate: 18.9 },
    { id: 'nigeria', name: 'Nigeria', flag: 'NG', currency: 'NGN', inflationRate: 0.30, adoptionRate: 32.0 },
    { id: 'usa', name: 'USA', flag: 'US', currency: 'USD', inflationRate: 0.03, adoptionRate: 15.5 },
    { id: 'russia', name: 'Russia', flag: 'RU', currency: 'RUB', inflationRate: 0.09, adoptionRate: 10.0 },
    { id: 'india', name: 'India', flag: 'IN', currency: 'INR', inflationRate: 0.05, adoptionRate: 7.4 },
    { id: 'brazil', name: 'Brazil', flag: 'BR', currency: 'BRL', inflationRate: 0.045, adoptionRate: 17.5 },
    { id: 'uk', name: 'UK', flag: 'GB', currency: 'GBP', inflationRate: 0.04, adoptionRate: 12.0 },
];

const ASSETS: AssetConfig[] = [
    { id: 'btc', label: 'BTC', annualReturn: 0.50, color: '#f59e0b' },
    { id: 'eth', label: 'ETH', annualReturn: 0.40, color: '#0891b2' },
    { id: 'usdc_yield', label: 'USDC + Yield', annualReturn: 0.08, color: '#3b82f6' },
    { id: 'gold', label: 'Gold', annualReturn: 0.08, color: '#eab308' },
    { id: 'sp500', label: 'S&P 500', annualReturn: 0.10, color: '#10b981' },
];

const PERIODS = [1, 3, 5, 10];
const SAVINGS_PRESETS = [1000, 5000, 10000, 50000, 100000];
const INFLATION_SCENARIOS = [
    { label: 'Emerging Market', selectedCountry: 'turkey', amount: '10000', years: 5, activeAssets: ['btc', 'gold', 'sp500'] },
    { label: 'USD Saver', selectedCountry: 'usa', amount: '50000', years: 3, activeAssets: ['btc', 'eth', 'usdc_yield', 'sp500'] },
    { label: 'Stable Focus', selectedCountry: 'uk', amount: '10000', years: 1, activeAssets: ['usdc_yield', 'gold', 'sp500'] },
] as const;

function InflationHedgeCalculator({ lang = 'en' }: { lang?: string }) {
    const [selectedCountry, setSelectedCountry] = useState('turkey');
    const [amount, setAmount] = useState('10000');
    const [years, setYears] = useState(5);
    const [activeAssets, setActiveAssets] = useState<string[]>(['btc', 'eth', 'usdc_yield', 'gold', 'sp500']);

    const country = COUNTRIES.find(c => c.id === selectedCountry)!;
    const amountNum = parseFloat(amount) || 0;

    const toggleAsset = (assetId: string) => {
        setActiveAssets(prev =>
            prev.includes(assetId)
                ? prev.filter(id => id !== assetId)
                : [...prev, assetId]
        );
    };
    const applyScenario = (scenario: (typeof INFLATION_SCENARIOS)[number]) => {
        setSelectedCountry(scenario.selectedCountry);
        setAmount(scenario.amount);
        setYears(scenario.years);
        setActiveAssets([...scenario.activeAssets]);
    };
    const isScenarioActive = (scenario: (typeof INFLATION_SCENARIOS)[number]) => (
        selectedCountry === scenario.selectedCountry
        && amount === scenario.amount
        && years === scenario.years
        && activeAssets.length === scenario.activeAssets.length
        && scenario.activeAssets.every((assetId) => activeAssets.includes(assetId))
    );

    // Fiat purchasing power after N years: amount / (1 + inflation_rate)^years
    const fiatValue = amountNum > 0 ? amountNum / Math.pow(1 + country.inflationRate, years) : 0;
    const fiatLossPercent = amountNum > 0 ? ((amountNum - fiatValue) / amountNum) * 100 : 0;

    // Asset values after N years
    const assetResults = ASSETS.filter(a => activeAssets.includes(a.id)).map(asset => {
        const value = amountNum * Math.pow(1 + asset.annualReturn, years);
        const realReturn = ((value - amountNum) / amountNum) * 100;
        const vsFiat = realReturn - (-fiatLossPercent);
        return {
            ...asset,
            value,
            realReturn,
            vsFiat,
        };
    });

    // Find best performing asset
    const bestAsset = assetResults.length > 0
        ? assetResults.reduce((best, curr) => curr.value > best.value ? curr : best)
        : null;

    const hasInputs = amountNum > 0;

    const reset = () => {
        setSelectedCountry('turkey');
        setAmount('10000');
        setYears(5);
        setActiveAssets(['btc', 'eth', 'usdc_yield', 'gold', 'sp500']);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(n);

    const formatPercent = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(1)}%`;

    // SVG Chart
    const renderChart = () => {
        const width = 600;
        const height = 300;
        const padding = { top: 30, right: 20, bottom: 50, left: 20 };
        const innerW = width - padding.left - padding.right;
        const innerH = height - padding.top - padding.bottom;

        // Build data points for each asset + fiat
        const allLines: { id: string; label: string; color: string; points: number[] }[] = [];

        // Fiat line
        const fiatPoints: number[] = [];
        for (let y = 0; y <= years; y++) {
            fiatPoints.push(amountNum / Math.pow(1 + country.inflationRate, y));
        }
        allLines.push({ id: 'fiat', label: `${getUiString(lang, 'Fiat')} (${country.currency})`, color: '#ef4444', points: fiatPoints });

        // Asset lines
        ASSETS.filter(a => activeAssets.includes(a.id)).forEach(asset => {
            const points: number[] = [];
            for (let y = 0; y <= years; y++) {
                points.push(amountNum * Math.pow(1 + asset.annualReturn, y));
            }
            allLines.push({ id: asset.id, label: asset.label, color: asset.color, points });
        });

        // Find min/max across all lines
        const allValues = allLines.flatMap(l => l.points);
        const maxVal = Math.max(...allValues);
        const minVal = Math.min(...allValues);
        const range = maxVal - minVal || 1;

        const getX = (yr: number) => padding.left + (yr / years) * innerW;
        const getY = (val: number) => padding.top + innerH - ((val - minVal) / range) * innerH;

        return (
            <div style={{ marginTop: '20px', marginBottom: '16px' }}>
                <h4 style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    marginBottom: '10px',
                    color: 'var(--color-text)',
                }}>
                    {getUiString(lang, 'Value Over Time')}
                </h4>
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    style={{
                        width: '100%',
                        height: 'auto',
                        background: 'var(--color-bg-card)',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                    }}
                >
                    {/* Grid lines */}
                    {Array.from({ length: years + 1 }, (_, i) => (
                        <line
                            key={`grid-${i}`}
                            x1={getX(i)}
                            y1={padding.top}
                            x2={getX(i)}
                            y2={padding.top + innerH}
                            stroke="var(--color-border)"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                            opacity="0.5"
                        />
                    ))}

                    {/* Horizontal grid lines (5 lines) */}
                    {Array.from({ length: 5 }, (_, i) => {
                        const val = minVal + (range * i) / 4;
                        return (
                            <line
                                key={`hgrid-${i}`}
                                x1={padding.left}
                                y1={getY(val)}
                                x2={padding.left + innerW}
                                y2={getY(val)}
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                strokeDasharray="4,4"
                                opacity="0.3"
                            />
                        );
                    })}

                    {/* Asset lines */}
                    {allLines.map(line => {
                        const pathD = line.points
                            .map((val, i) => `${i === 0 ? 'M' : 'L'}${getX(i)},${getY(val)}`)
                            .join(' ');
                        return (
                            <polyline
                                key={line.id}
                                points={line.points.map((val, i) => `${getX(i)},${getY(val)}`).join(' ')}
                                fill="none"
                                stroke={line.color}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        );
                    })}

                    {/* Endpoint dots */}
                    {allLines.map(line => (
                        <circle
                            key={`dot-${line.id}`}
                            cx={getX(years)}
                            cy={getY(line.points[line.points.length - 1])}
                            r="4"
                            fill={line.color}
                        />
                    ))}

                    {/* X-axis labels */}
                    {Array.from({ length: years + 1 }, (_, i) => (
                        <text
                            key={`xlabel-${i}`}
                            x={getX(i)}
                            y={padding.top + innerH + 20}
                            textAnchor="middle"
                            fontSize="11"
                            fill="var(--color-text-muted)"
                        >
                            {i === 0 ? getUiString(lang, 'Now') : `${i}y`}
                        </text>
                    ))}

                    {/* Y-axis labels */}
                    {Array.from({ length: 5 }, (_, i) => {
                        const val = minVal + (range * i) / 4;
                        return (
                            <text
                                key={`ylabel-${i}`}
                                x={padding.left + 4}
                                y={getY(val) - 6}
                                textAnchor="start"
                                fontSize="9"
                                fill="var(--color-text-muted)"
                            >
                                ${(val / 1000).toFixed(0)}k
                            </text>
                        );
                    })}
                </svg>

                {/* Legend */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    marginTop: '10px',
                }}>
                    {allLines.map(line => (
                        <div key={line.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-secondary)',
                        }}>
                            <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: line.color,
                            }} />
                            {line.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {INFLATION_SCENARIOS.map((scenario) => (
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
                        <label>
                            <Globe size={14} />
                            {getUiString(lang, 'Country')}
                        </label>
                        <div className="pills-row">
                            {COUNTRIES.map(c => (
                                <button
                                    key={c.id}
                                    className={`pill-btn ${selectedCountry === c.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCountry(c.id)}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Savings Amount */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Savings Amount')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder=""
                                id="inflation-amount"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {SAVINGS_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${amount === String(preset) ? 'active' : ''}`}
                                    onClick={() => setAmount(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Period */}
                    <div className="input-group">
                        <label>
                            <Clock size={14} />
                            {getUiString(lang, 'Time Period')}
                        </label>
                        <div className="pills-row">
                            {PERIODS.map(p => (
                                <button
                                    key={p}
                                    className={`pill-btn ${years === p ? 'active' : ''}`}
                                    onClick={() => setYears(p)}
                                >
                                    {p} {p === 1 ? 'year' : 'years'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Assets */}
                    <div className="input-group">
                        <label>
                            <Shield size={14} />
                            {getUiString(lang, 'Comparison Assets')}
                        </label>
                        <span className="label-hint">{getUiString(lang, 'Assumptions: BTC 50%, ETH 40%, USDC Yield 8%, Gold 8%, S&P 500 10% (annual)')}</span>
                        <div className="pills-row">
                            {ASSETS.map(asset => (
                                <button
                                    key={asset.id}
                                    className={`pill-btn ${activeAssets.includes(asset.id) ? 'active' : ''}`}
                                    onClick={() => toggleAsset(asset.id)}
                                >
                                    {asset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare multiple assets at the same country inflation and horizon.')}
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero: Fiat Purchasing Power Loss */}
                            <div
                                className="result-hero"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.02))',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                }}
                            >
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Purchasing Power Loss')}
                                </span>
                                <span
                                    className="result-hero-value"
                                    style={{ color: '#ef4444' }}
                                >
                                    <TrendingDown size={28} />
                                    -{fiatLossPercent.toFixed(1)}%
                                </span>
                                <span
                                    className="result-hero-roi"
                                    style={{
                                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                        color: '#ef4444',
                                    }}
                                >
                                    {getUiString(lang, 'Your')} {formatUSD(amountNum)} {getUiString(lang, 'in')} {country.currency} {getUiString(lang, 'would lose')} {fiatLossPercent.toFixed(1)}% {getUiString(lang, 'in')} {years} {years === 1 ? getUiString(lang, 'year') : getUiString(lang, 'years')}
                                </span>
                            </div>

                            {/* Comparison Table */}
                            <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                                            <th style={{ padding: '10px 8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'Asset')}</th>
                                            <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'Value after')} {years}{getUiString(lang, 'yr')}</th>
                                            <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'Real Return')}</th>
                                            <th style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{getUiString(lang, 'vs Fiat')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Fiat row */}
                                        <tr style={{
                                            borderBottom: '1px solid var(--color-border)',
                                            background: 'rgba(239, 68, 68, 0.04)',
                                        }}>
                                            <td style={{ padding: '10px 8px', fontWeight: 600 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                                                    {getUiString(lang, 'Fiat')} ({country.currency})
                                                </div>
                                            </td>
                                            <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text)' }}>
                                                {formatUSD(fiatValue)}
                                            </td>
                                            <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: '#ef4444' }}>
                                                -{fiatLossPercent.toFixed(1)}%
                                            </td>
                                            <td style={{ padding: '10px 8px', textAlign: 'right', color: 'var(--color-text-muted)' }}>
                                                --
                                            </td>
                                        </tr>

                                        {/* Asset rows */}
                                        {assetResults.map(asset => (
                                            <tr
                                                key={asset.id}
                                                style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: bestAsset && bestAsset.id === asset.id
                                                        ? 'rgba(16, 185, 129, 0.04)'
                                                        : undefined,
                                                }}
                                            >
                                                <td style={{ padding: '10px 8px', fontWeight: 600 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: asset.color }} />
                                                        {asset.label}
                                                        {bestAsset && bestAsset.id === asset.id && (
                                                            <Trophy size={12} style={{ color: 'var(--color-accent-green)' }} />
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text)' }}>
                                                    {formatUSD(asset.value)}
                                                </td>
                                                <td style={{
                                                    padding: '10px 8px',
                                                    textAlign: 'right',
                                                    fontWeight: 600,
                                                    color: asset.realReturn >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                                }}>
                                                    {formatPercent(asset.realReturn)}
                                                </td>
                                                <td style={{
                                                    padding: '10px 8px',
                                                    textAlign: 'right',
                                                    fontWeight: 600,
                                                    color: 'var(--color-accent-green)',
                                                    fontSize: '0.75rem',
                                                }}>
                                                    {formatPercent(asset.vsFiat)} {getUiString(lang, 'vs fiat')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Best Performer Highlight */}
                            {bestAsset && (
                                <div style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(16, 185, 129, 0.3)',
                                    background: 'rgba(16, 185, 129, 0.06)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '16px',
                                }}>
                                    <Trophy size={18} style={{ color: 'var(--color-accent-green)' }} />
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>
                                            {getUiString(lang, 'Best Performer')}: {bestAsset.label}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                            {formatUSD(bestAsset.value)} ({formatPercent(bestAsset.realReturn)} {getUiString(lang, 'return')}) {getUiString(lang, 'over')} {years} {years === 1 ? getUiString(lang, 'year') : getUiString(lang, 'years')}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SVG Chart */}
                            {renderChart()}

                            {/* Country Info Card */}
                            <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label">
                                        <strong>
                                            <Globe size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {getUiString(lang, 'Country Info')}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Country')}</span>
                                    <span className="result-value">{country.name}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Currency')}</span>
                                    <span className="result-value">{country.currency}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Inflation Rate')}</span>
                                    <span className="result-value fee">{(country.inflationRate * 100).toFixed(1)}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Crypto Adoption Rate')}</span>
                                    <span className="result-value profit">{country.adoptionRate}%</span>
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label">
                                        <strong>
                                            <TrendingDown size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {getUiString(lang, 'Fiat Erosion Details')}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Savings')}</span>
                                    <span className="result-value">{formatUSD(amountNum)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Purchasing Power After')} {years}{getUiString(lang, 'yr')}</span>
                                    <span className="result-value fee">{formatUSD(fiatValue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Purchasing Power Lost')}</strong></span>
                                    <span className="result-value" style={{ color: '#ef4444', fontWeight: 700 }}>
                                        -{formatUSD(amountNum - fiatValue)}
                                    </span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Historical returns are not indicative of future performance. Crypto is highly volatile.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Shield size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Inflation Hedge Calculator')}</h3>
                            <p>{getUiString(lang, 'Select a country, enter your savings amount, and choose a time period to see how crypto and other assets compare against fiat inflation.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(InflationHedgeCalculator);
