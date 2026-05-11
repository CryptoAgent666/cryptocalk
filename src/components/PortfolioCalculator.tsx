import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    PieChart,
    Plus,
    Trash2,
    Target,
    AlertTriangle,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Asset {
    id: number;
    name: string;
    amount: number;
    targetPct: number;
    color: string;
}

const COLORS = [
    '#0891b2', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#06b6d4', '#ec4899', '#14b8a6', '#f97316', '#84cc16',
    '#a855f7', '#64748b',
];

const PRESET_PORTFOLIOS = [
    {
        name: 'Conservative',
        assets: [
            { name: 'BTC', pct: 50 }, { name: 'ETH', pct: 30 }, { name: 'Stablecoins', pct: 20 },
        ],
    },
    {
        name: 'Balanced',
        assets: [
            { name: 'BTC', pct: 40 }, { name: 'ETH', pct: 25 },
            { name: 'SOL', pct: 10 }, { name: 'Altcoins', pct: 15 }, { name: 'Stablecoins', pct: 10 },
        ],
    },
    {
        name: 'Aggressive',
        assets: [
            { name: 'BTC', pct: 25 }, { name: 'ETH', pct: 20 },
            { name: 'SOL', pct: 15 }, { name: 'Altcoins', pct: 30 }, { name: 'Memecoins', pct: 10 },
        ],
    },
];

const TOTAL_INVESTMENT_PRESETS = [5000, 10000, 25000, 50000];
const DEFAULT_ALLOCATION = [
    { name: 'Bitcoin (BTC)', pct: 40 },
    { name: 'Ethereum (ETH)', pct: 25 },
    { name: 'Solana (SOL)', pct: 15 },
    { name: 'Stablecoins', pct: 20 },
];
const PORTFOLIO_SCENARIOS = [
    { label: 'Starter', preset: 'Conservative', totalInvestment: '10000' },
    { label: 'Balanced', preset: 'Balanced', totalInvestment: '25000' },
    { label: 'Growth', preset: 'Aggressive', totalInvestment: '50000' },
] as const;

let nextId = 1;

function getNextId() {
    return nextId++;
}

function buildAssetsFromAllocation(
    allocation: { name: string; pct: number }[],
    total: number,
): Asset[] {
    return allocation.map((asset, i) => ({
        id: getNextId(),
        name: asset.name,
        amount: (asset.pct / 100) * total,
        targetPct: asset.pct,
        color: COLORS[i % COLORS.length],
    }));
}

function PortfolioCalculator({ lang = 'en' }: { lang?: string }) {
    const [totalInvestment, setTotalInvestment] = useState('10000');
    const [assets, setAssets] = useState<Asset[]>(() => buildAssetsFromAllocation(DEFAULT_ALLOCATION, 10000));

    const total = parseFloat(totalInvestment) || 0;
    const actualTotal = assets.reduce((s, a) => s + a.amount, 0);
    const targetTotal = assets.reduce((s, a) => s + a.targetPct, 0);

    const addAsset = () => {
        const idx = assets.length % COLORS.length;
        setAssets([...assets, { id: getNextId(), name: '', amount: 0, targetPct: 0, color: COLORS[idx] }]);
    };

    const removeAsset = (id: number) => {
        setAssets(assets.filter(a => a.id !== id));
    };

    const updateAsset = (id: number, field: keyof Asset, value: string | number) => {
        setAssets(assets.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const applyPreset = (preset: typeof PRESET_PORTFOLIOS[0]) => {
        const t = total || 10000;
        setTotalInvestment(String(t));
        setAssets(buildAssetsFromAllocation(preset.assets, t));
    };
    const applyScenario = (scenario: (typeof PORTFOLIO_SCENARIOS)[number]) => {
        const preset = PRESET_PORTFOLIOS.find((item) => item.name === scenario.preset);
        if (!preset) return;
        const scenarioTotal = Number(scenario.totalInvestment);
        setTotalInvestment(scenario.totalInvestment);
        setAssets(buildAssetsFromAllocation(preset.assets, scenarioTotal));
    };
    const isScenarioActive = (scenario: (typeof PORTFOLIO_SCENARIOS)[number]) => {
        if (totalInvestment !== scenario.totalInvestment) return false;
        const preset = PRESET_PORTFOLIOS.find((item) => item.name === scenario.preset);
        if (!preset || assets.length !== preset.assets.length) return false;
        return preset.assets.every((asset, idx) => (
            assets[idx]
            && assets[idx].name === asset.name
            && assets[idx].targetPct === asset.pct
        ));
    };
    const isPresetActive = (preset: typeof PRESET_PORTFOLIOS[number]) => (
        assets.length === preset.assets.length
        && preset.assets.every((asset, idx) => (
            assets[idx]
            && assets[idx].name === asset.name
            && assets[idx].targetPct === asset.pct
        ))
    );

    const reset = () => {
        setTotalInvestment('10000');
        setAssets(buildAssetsFromAllocation(DEFAULT_ALLOCATION, 10000));
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(n);

    // Pie chart as CSS conic-gradient
    const gradientParts: string[] = [];
    let cumPct = 0;
    const assetData = assets.filter(a => a.amount > 0).map((a) => {
        const pct = actualTotal > 0 ? (a.amount / actualTotal) * 100 : 0;
        return { ...a, actualPct: pct };
    });
    assetData.forEach((a) => {
        const start = cumPct;
        cumPct += a.actualPct;
        gradientParts.push(`${a.color} ${start}% ${cumPct}%`);
    });
    const pieGradient = gradientParts.length > 0
        ? `conic-gradient(${gradientParts.join(', ')})`
        : 'conic-gradient(var(--color-border) 0% 100%)';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {PORTFOLIO_SCENARIOS.map((scenario) => (
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

                    {/* Presets */}
                    <div className="input-group">
                        <label><Target size={14} /> {getUiString(lang, 'Portfolio Presets')}</label>
                        <div className="pills-row">
                            {PRESET_PORTFOLIOS.map((p) => (
                                <button
                                    key={p.name}
                                    className={`pill-btn ${isPresetActive(p) ? 'active' : ''}`}
                                    onClick={() => applyPreset(p)}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Total Investment */}
                    <div className="input-group">
                        <label htmlFor="pf-total"><DollarSign size={14} /> {getUiString(lang, 'Total Investment')}</label>
                        <div className="pills-row">
                            {TOTAL_INVESTMENT_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${totalInvestment === String(preset) ? 'active' : ''}`}
                                    onClick={() => setTotalInvestment(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={totalInvestment} onChange={(e) => setTotalInvestment(e.target.value)}
                                placeholder="" id="pf-total" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Assets List */}
                    <div className="input-group">
                        <label><PieChart size={14} /> {getUiString(lang, 'Assets')} ({assets.length})</label>
                        <div className="portfolio-asset-stack">
                            {assets.map((asset) => (
                                <div key={asset.id} className="portfolio-asset-row">
                                    <div className="portfolio-asset-dot" style={{ background: asset.color }} />
                                    <input type="text" value={asset.name}
                                        onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                                        placeholder={getUiString(lang, 'Asset name')}
                                        className="portfolio-asset-name" />
                                    <div className="portfolio-asset-amount">
                                        <span className="portfolio-asset-prefix">$</span>
                                        <input type="number" inputMode="decimal" value={asset.amount || ''}
                                            onChange={(e) => updateAsset(asset.id, 'amount', parseFloat(e.target.value) || 0)}
                                            placeholder=""
                                            className="portfolio-asset-input" onFocus={(e) => e.target.select()} />
                                    </div>
                                    <div className="portfolio-asset-target">
                                        <input type="number" inputMode="decimal" value={asset.targetPct || ''}
                                            onChange={(e) => updateAsset(asset.id, 'targetPct', parseFloat(e.target.value) || 0)}
                                            placeholder="%"
                                            className="portfolio-asset-input portfolio-asset-input-target" onFocus={(e) => e.target.select()} />
                                        <span className="portfolio-asset-suffix">%</span>
                                    </div>
                                    <button onClick={() => removeAsset(asset.id)} className="portfolio-asset-remove">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addAsset} className="portfolio-add-asset-btn">
                            <Plus size={14} /> {getUiString(lang, 'Add Asset')}
                        </button>
                    </div>

                    {targetTotal !== 100 && targetTotal > 0 && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                            borderRadius: '8px', border: '1px solid rgba(245,158,11,0.4)',
                            background: 'rgba(245,158,11,0.06)', fontSize: '0.8rem',
                            color: 'var(--color-text-secondary)',
                        }}>
                            <AlertTriangle size={14} style={{ color: '#f59e0b' }} />
                            {getUiString(lang, 'Target allocation')}: {targetTotal.toFixed(1)}% ({getUiString(lang, 'should be 100%')})
                        </div>
                    )}

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Keep target allocation near 100% and avoid over-concentration in one asset.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {assets.length > 0 && actualTotal > 0 ? (
                        <>
                            {/* Pie Chart */}
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 20px' }}>
                                <div style={{
                                    width: 200, height: 200, borderRadius: '50%',
                                    background: pieGradient,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                }}>
                                    <div style={{
                                        width: 100, height: 100, borderRadius: '50%',
                                        background: 'var(--color-bg)', display: 'flex',
                                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>{getUiString(lang, 'Total')}</span>
                                        <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)' }}>{formatUSD(actualTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legend */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                                {assetData.map((a) => (
                                    <div key={a.id} style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        padding: '4px 10px', borderRadius: '6px',
                                        background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                                        fontSize: '0.75rem',
                                    }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                                        <span style={{ fontWeight: 500 }}>{a.name || getUiString(lang, 'Unnamed')}</span>
                                        <span style={{ color: 'var(--color-text-muted)' }}>{a.actualPct.toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>

                            {/* Allocation Table */}
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Asset')}</th>
                                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Value')}</th>
                                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Actual %')}</th>
                                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Target %')}</th>
                                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Rebalance')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assets.map((a) => {
                                            const actualPct = actualTotal > 0 ? (a.amount / actualTotal) * 100 : 0;
                                            const targetAmount = (a.targetPct / 100) * actualTotal;
                                            const diff = targetAmount - a.amount;
                                            return (
                                                <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 500 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                                                            {a.name || getUiString(lang, 'Unnamed')}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right' }}>{formatUSD(a.amount)}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right' }}>{actualPct.toFixed(1)}%</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-primary)' }}>{a.targetPct}%</td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 600,
                                                        color: diff > 0 ? 'var(--color-accent-green)' : diff < 0 ? 'var(--color-accent-red)' : 'var(--color-text-muted)',
                                                    }}>
                                                        {diff > 0 ? '+' : ''}{formatUSD(diff)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Diversification Score */}
                            <div style={{ marginTop: '16px' }}>
                                {(() => {
                                    const maxPct = Math.max(...assetData.map(a => a.actualPct));
                                    const count = assetData.length;
                                    let score = getUiString(lang, 'Poor');
                                    let scoreColor = 'var(--color-accent-red)';
                                    if (count >= 4 && maxPct < 50) { score = getUiString(lang, 'Good'); scoreColor = 'var(--color-accent-green)'; }
                                    else if (count >= 3 && maxPct < 60) { score = getUiString(lang, 'Moderate'); scoreColor = '#f59e0b'; }
                                    return (
                                        <div style={{
                                            padding: '12px 16px', borderRadius: '10px',
                                            border: `1px solid ${scoreColor}30`,
                                            background: `${scoreColor}08`,
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        }}>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '2px' }}>{getUiString(lang, 'Diversification')}</div>
                                                <div style={{ fontSize: '1rem', fontWeight: 700, color: scoreColor }}>{score}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{count} {getUiString(lang, 'assets, largest')} {maxPct.toFixed(0)}%</div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Portfolio allocation is for educational purposes. Diversification doesn\'t guarantee against loss. Not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><PieChart size={40} /></div>
                            <h2>{getUiString(lang, 'Plan Your Portfolio')}</h2>
                            <p>{getUiString(lang, 'Add assets with their current values and target allocations. See a visual breakdown and rebalancing suggestions.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(PortfolioCalculator);
