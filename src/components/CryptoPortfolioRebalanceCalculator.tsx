import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    PieChart,
    RotateCcw,
    Info,
    DollarSign,
    ArrowUp,
    ArrowDown,
    Plus,
    Trash2,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Asset {
    id: number;
    name: string;
    currentValue: string;
    targetAllocation: string;
}

interface AssetResult {
    name: string;
    currentPct: number;
    targetPct: number;
    difference: number;
    action: 'Buy' | 'Sell' | 'Hold';
    tradeAmount: number;
}

interface Results {
    assets: AssetResult[];
    totalPortfolioValue: number;
    totalTrades: number;
    totalTradeVolume: number;
    rebalancingCost: number;
}

let nextId = 1;

const SCENARIOS = [
    {
        label: '60/40 BTC-ETH',
        assets: [
            { name: 'BTC', currentValue: '60000', targetAllocation: '60' },
            { name: 'ETH', currentValue: '40000', targetAllocation: '40' },
        ],
    },
    {
        label: 'Equal Weight 5',
        assets: [
            { name: 'BTC', currentValue: '30000', targetAllocation: '20' },
            { name: 'ETH', currentValue: '25000', targetAllocation: '20' },
            { name: 'SOL', currentValue: '20000', targetAllocation: '20' },
            { name: 'ADA', currentValue: '15000', targetAllocation: '20' },
            { name: 'DOT', currentValue: '10000', targetAllocation: '20' },
        ],
    },
    {
        label: 'BTC Heavy 70/15/15',
        assets: [
            { name: 'BTC', currentValue: '50000', targetAllocation: '70' },
            { name: 'ETH', currentValue: '30000', targetAllocation: '15' },
            { name: 'SOL', currentValue: '20000', targetAllocation: '15' },
        ],
    },
] as const;

function makeAsset(name: string, currentValue: string, targetAllocation: string): Asset {
    return { id: nextId++, name, currentValue, targetAllocation };
}

function CryptoPortfolioRebalanceCalculator({ lang = 'en' }: { lang?: string }) {
    const [assets, setAssets] = useState<Asset[]>([
        makeAsset('BTC', '60000', '60'),
        makeAsset('ETH', '40000', '40'),
    ]);

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setAssets(
            s.assets.map((a) => makeAsset(a.name, a.currentValue, a.targetAllocation))
        );
    };

    const updateAsset = (id: number, field: keyof Omit<Asset, 'id'>, value: string) => {
        setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
    };

    const removeAsset = (id: number) => {
        setAssets((prev) => prev.filter((a) => a.id !== id));
    };

    const addAsset = () => {
        if (assets.length >= 5) return;
        setAssets((prev) => [...prev, makeAsset('', '0', '0')]);
    };

    const results = useMemo<Results | null>(() => {
        const parsed = assets.map((a) => ({
            name: a.name || 'Asset',
            currentValue: parseFloat(a.currentValue) || 0,
            targetPct: parseFloat(a.targetAllocation) || 0,
        }));

        const totalValue = parsed.reduce((s, a) => s + a.currentValue, 0);
        if (totalValue <= 0) return null;

        const totalTargetPct = parsed.reduce((s, a) => s + a.targetPct, 0);
        if (totalTargetPct <= 0) return null;

        const assetResults: AssetResult[] = parsed.map((a) => {
            const currentPct = (a.currentValue / totalValue) * 100;
            const targetPct = a.targetPct;
            const difference = targetPct - currentPct;
            const targetValue = (targetPct / 100) * totalValue;
            const tradeAmount = Math.abs(targetValue - a.currentValue);
            let action: 'Buy' | 'Sell' | 'Hold';
            if (difference > 0.5) action = 'Buy';
            else if (difference < -0.5) action = 'Sell';
            else action = 'Hold';

            return { name: a.name, currentPct, targetPct, difference, action, tradeAmount };
        });

        const totalTradeVolume = assetResults.reduce((s, a) => s + a.tradeAmount, 0) / 2;
        const tradesNeeded = assetResults.filter((a) => a.action !== 'Hold').length;
        const rebalancingCost = totalTradeVolume * 0.001;

        return {
            assets: assetResults,
            totalPortfolioValue: totalValue,
            totalTrades: tradesNeeded,
            totalTradeVolume,
            rebalancingCost,
        };
    }, [assets]);

    const reset = () => {
        setAssets([
            makeAsset('BTC', '60000', '60'),
            makeAsset('ETH', '40000', '40'),
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

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    const getActionColor = (action: string) => {
        switch (action) {
            case 'Buy': return 'var(--color-accent-green, #22c55e)';
            case 'Sell': return '#ef4444';
            default: return 'var(--color-text-muted, #94a3b8)';
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
                                    className="pill-btn"
                                    onClick={() => applyScenario(s)}
                                >
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {assets.map((asset, idx) => (
                        <div key={asset.id} style={{ border: '1px solid var(--color-border, #334155)', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <strong>{getUiString(lang, 'Asset')} {idx + 1}</strong>
                                {assets.length > 1 && (
                                    <button
                                        onClick={() => removeAsset(asset.id)}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        aria-label={getUiString(lang, 'Remove')}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            <div className="input-group">
                                <label htmlFor={`rebal-name-${asset.id}`}>
                                    {getUiString(lang, 'Name')}
                                </label>
                                <input
                                    type="text"
                                    value={asset.name}
                                    onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                                    id={`rebal-name-${asset.id}`}
                                    placeholder="BTC"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor={`rebal-value-${asset.id}`}>
                                    <DollarSign size={14} /> {getUiString(lang, 'Current Value ($)')}
                                </label>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    value={asset.currentValue}
                                    onChange={(e) => updateAsset(asset.id, 'currentValue', e.target.value)}
                                    id={`rebal-value-${asset.id}`}
                                    step="any"
                                    min="0"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor={`rebal-target-${asset.id}`}>
                                    {getUiString(lang, 'Target Allocation (%)')}
                                </label>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    value={asset.targetAllocation}
                                    onChange={(e) => updateAsset(asset.id, 'targetAllocation', e.target.value)}
                                    id={`rebal-target-${asset.id}`}
                                    step="any"
                                    min="0"
                                    max="100"
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        </div>
                    ))}

                    {assets.length < 5 && (
                        <button className="pill-btn" onClick={addAsset} style={{ width: '100%', justifyContent: 'center' }}>
                            <Plus size={14} /> {getUiString(lang, 'Add Asset')}
                        </button>
                    )}

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Plan how to rebalance your crypto portfolio to target allocations.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Portfolio Value')}
                                </span>
                                <span className="result-hero-value">
                                    <PieChart size={28} />
                                    {formatUSD(results.totalPortfolioValue)}
                                </span>
                                <span className="result-hero-roi">
                                    {results.totalTrades} {getUiString(lang, 'trades needed')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                {results.assets.map((a) => (
                                    <div key={a.name}>
                                        <div className="result-row" style={{ fontWeight: 600 }}>
                                            <span className="result-label">{a.name}</span>
                                            <span className="result-value" style={{ color: getActionColor(a.action) }}>
                                                {a.action === 'Buy' && <ArrowUp size={14} />}
                                                {a.action === 'Sell' && <ArrowDown size={14} />}
                                                {getUiString(lang, a.action)} {formatUSD(a.tradeAmount)}
                                            </span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label" style={{ paddingLeft: '1rem' }}>
                                                {getUiString(lang, 'Current')}: {formatPercent(a.currentPct)} → {getUiString(lang, 'Target')}: {formatPercent(a.targetPct)}
                                            </span>
                                            <span className="result-value" style={{ color: a.difference > 0 ? 'var(--color-accent-green, #22c55e)' : a.difference < 0 ? '#ef4444' : 'inherit' }}>
                                                {a.difference > 0 ? '+' : ''}{formatPercent(a.difference)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Trade Volume')}</span>
                                    <span className="result-value">{formatUSD(results.totalTradeVolume)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Est. Rebalancing Cost (0.1%)')}</span>
                                    <span className="result-value">{formatUSD(results.rebalancingCost)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Rebalancing cost estimate assumes 0.1% average trading fee. Actual fees vary by exchange and order type.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><PieChart size={40} /></div>
                            <h2>{getUiString(lang, 'Plan Portfolio Rebalancing')}</h2>
                            <p>{getUiString(lang, 'Enter asset values and target allocations to see what trades are needed to rebalance your portfolio.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CryptoPortfolioRebalanceCalculator);
