import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Plus,
    Trash2,
    AlertTriangle,
    Scissors,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Position {
    coin: string;
    buyPrice: string;
    currentPrice: string;
    quantity: string;
}

const emptyPosition = (): Position => ({ coin: '', buyPrice: '', currentPrice: '', quantity: '' });

const SCENARIOS = [
    {
        label: 'Bear Market Portfolio',
        positions: [
            { coin: 'BTC', buyPrice: '65000', currentPrice: '42000', quantity: '0.5' },
            { coin: 'ETH', buyPrice: '3800', currentPrice: '1900', quantity: '5' },
            { coin: 'SOL', buyPrice: '180', currentPrice: '85', quantity: '50' },
        ],
        taxBracket: '24',
        filingStatus: 'single' as const,
    },
    {
        label: 'Mixed Bag',
        positions: [
            { coin: 'BTC', buyPrice: '30000', currentPrice: '67500', quantity: '0.2' },
            { coin: 'ETH', buyPrice: '4000', currentPrice: '2400', quantity: '3' },
            { coin: 'AVAX', buyPrice: '50', currentPrice: '22', quantity: '100' },
        ],
        taxBracket: '22',
        filingStatus: 'single' as const,
    },
    {
        label: 'Recovery Dip',
        positions: [
            { coin: 'BTC', buyPrice: '72000', currentPrice: '67500', quantity: '0.3' },
            { coin: 'LINK', buyPrice: '25', currentPrice: '14', quantity: '200' },
            { coin: 'DOT', buyPrice: '12', currentPrice: '5.50', quantity: '500' },
        ],
        taxBracket: '32',
        filingStatus: 'married' as const,
    },
] as const;

function TaxLossHarvestingCalculator({ lang = 'en' }: { lang?: string }) {
    const [positions, setPositions] = useState<Position[]>([emptyPosition()]);
    const [taxBracket, setTaxBracket] = useState('24');
    const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single');

    const updatePosition = (index: number, field: keyof Position, value: string) => {
        setPositions((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const addPosition = () => {
        if (positions.length < 5) setPositions((prev) => [...prev, emptyPosition()]);
    };

    const removePosition = (index: number) => {
        if (positions.length > 1) setPositions((prev) => prev.filter((_, i) => i !== index));
    };

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setPositions(s.positions.map((p) => ({ ...p })));
        setTaxBracket(s.taxBracket);
        setFilingStatus(s.filingStatus);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        taxBracket === s.taxBracket && filingStatus === s.filingStatus &&
        positions.length === s.positions.length &&
        positions.every((p, i) => s.positions[i] &&
            p.coin === s.positions[i].coin && p.buyPrice === s.positions[i].buyPrice &&
            p.currentPrice === s.positions[i].currentPrice && p.quantity === s.positions[i].quantity);

    // Calculations
    const bracket = (parseFloat(taxBracket) || 0) / 100;
    const annualLimit = filingStatus === 'married' ? 3000 : 3000; // IRS limit $3,000 for both

    const positionResults = positions.map((p) => {
        const buy = parseFloat(p.buyPrice) || 0;
        const current = parseFloat(p.currentPrice) || 0;
        const qty = parseFloat(p.quantity) || 0;
        const costBasis = buy * qty;
        const currentValue = current * qty;
        const unrealizedGainLoss = currentValue - costBasis;
        const harvestable = unrealizedGainLoss < 0 ? Math.abs(unrealizedGainLoss) : 0;
        return { coin: p.coin || '?', costBasis, currentValue, unrealizedGainLoss, harvestable };
    });

    const totalHarvestable = positionResults.reduce((sum, r) => sum + r.harvestable, 0);
    const totalGains = positionResults.reduce((sum, r) => sum + Math.max(r.unrealizedGainLoss, 0), 0);
    const netLosses = totalHarvestable - totalGains;
    // Losses first offset gains, then up to $3,000 deduction against ordinary income
    const effectiveLossDeduction = netLosses > 0 ? Math.min(netLosses, annualLimit) + totalGains : totalHarvestable;
    const taxSavings = effectiveLossDeduction * bracket;
    const totalPortfolioValue = positionResults.reduce((sum, r) => sum + r.currentValue, 0);

    const hasPositions = positions.some((p) =>
        (parseFloat(p.buyPrice) || 0) > 0 && (parseFloat(p.currentPrice) || 0) > 0 && (parseFloat(p.quantity) || 0) > 0
    );

    const reset = () => {
        setPositions([emptyPosition()]);
        setTaxBracket('24');
        setFilingStatus('single');
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}>
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filing Status */}
                    <div className="input-group">
                        <label>{getUiString(lang, 'Filing Status')}</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${filingStatus === 'single' ? 'active' : ''}`}
                                onClick={() => setFilingStatus('single')}>
                                {getUiString(lang, 'Single')}
                            </button>
                            <button className={`toggle-btn ${filingStatus === 'married' ? 'active' : ''}`}
                                onClick={() => setFilingStatus('married')}>
                                {getUiString(lang, 'Married')}
                            </button>
                        </div>
                    </div>

                    {/* Tax Bracket */}
                    <div className="input-group">
                        <label htmlFor="tlh-bracket"><Percent size={14} /> {getUiString(lang, 'Tax Bracket (%)')}</label>
                        <div className="pills-row">
                            {['12', '22', '24', '32', '35', '37'].map((v) => (
                                <button key={v} className={`pill-btn ${taxBracket === v ? 'active' : ''}`}
                                    onClick={() => setTaxBracket(v)}>{v}%</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={taxBracket} onChange={(e) => setTaxBracket(e.target.value)}
                            id="tlh-bracket" step="1" min="0" max="100" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    {/* Positions */}
                    {positions.map((pos, idx) => (
                        <div key={idx} style={{
                            padding: '12px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                            borderRadius: '10px', marginBottom: '8px',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Position')} {idx + 1}
                                </span>
                                {positions.length > 1 && (
                                    <button onClick={() => removePosition(idx)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                            <div className="input-group compact">
                                <label>{getUiString(lang, 'Coin')}</label>
                                <input type="text" value={pos.coin} onChange={(e) => updatePosition(idx, 'coin', e.target.value)}
                                    placeholder="BTC, ETH..." />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
                                <div className="input-group compact">
                                    <label>{getUiString(lang, 'Buy Price')}</label>
                                    <input type="number" inputMode="decimal" value={pos.buyPrice}
                                        onChange={(e) => updatePosition(idx, 'buyPrice', e.target.value)}
                                        step="any" min="0" onFocus={(e) => e.target.select()} />
                                </div>
                                <div className="input-group compact">
                                    <label>{getUiString(lang, 'Current Price')}</label>
                                    <input type="number" inputMode="decimal" value={pos.currentPrice}
                                        onChange={(e) => updatePosition(idx, 'currentPrice', e.target.value)}
                                        step="any" min="0" onFocus={(e) => e.target.select()} />
                                </div>
                                <div className="input-group compact">
                                    <label>{getUiString(lang, 'Quantity')}</label>
                                    <input type="number" inputMode="decimal" value={pos.quantity}
                                        onChange={(e) => updatePosition(idx, 'quantity', e.target.value)}
                                        step="any" min="0" onFocus={(e) => e.target.select()} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {positions.length < 5 && (
                        <button onClick={addPosition} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                            background: 'var(--color-bg-card)', border: '1px dashed var(--color-border)',
                            borderRadius: '8px', cursor: 'pointer', color: 'var(--color-primary)', fontSize: '0.85rem',
                            width: '100%', justifyContent: 'center', minHeight: '44px',
                        }}>
                            <Plus size={14} /> {getUiString(lang, 'Add Position')}
                        </button>
                    )}

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Add up to 5 positions to identify tax-loss harvesting opportunities.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {hasPositions ? (
                        <>
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Estimated Tax Savings')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <Scissors size={28} />
                                    {formatUSD(taxSavings)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                                    {getUiString(lang, 'From')} {formatUSD(totalHarvestable)} {getUiString(lang, 'in harvestable losses')}
                                </span>
                            </div>

                            {/* Per-position breakdown */}
                            <div style={{ marginTop: '12px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Position Breakdown')}
                                </h4>
                                {positionResults.map((r, idx) => {
                                    if (r.costBasis <= 0) return null;
                                    const isLoss = r.unrealizedGainLoss < 0;
                                    return (
                                        <div key={idx} className="result-breakdown" style={{ marginBottom: '8px' }}>
                                            <div className="result-row">
                                                <span className="result-label" style={{ fontWeight: 600 }}>{r.coin}</span>
                                                <span className={`result-value ${isLoss ? 'fee' : 'profit'}`} style={{ fontWeight: 600 }}>
                                                    {r.unrealizedGainLoss >= 0 ? '+' : ''}{formatUSD(r.unrealizedGainLoss)}
                                                </span>
                                            </div>
                                            <div className="result-row">
                                                <span className="result-label">{getUiString(lang, 'Cost Basis')}</span>
                                                <span className="result-value">{formatUSD(r.costBasis)}</span>
                                            </div>
                                            <div className="result-row">
                                                <span className="result-label">{getUiString(lang, 'Current Value')}</span>
                                                <span className="result-value">{formatUSD(r.currentValue)}</span>
                                            </div>
                                            {r.harvestable > 0 && (
                                                <div className="result-row">
                                                    <span className="result-label">{getUiString(lang, 'Harvestable Loss')}</span>
                                                    <span className="result-value fee">{formatUSD(r.harvestable)}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Summary */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Harvestable Losses')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(totalHarvestable)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Unrealized Gains')}</span>
                                    <span className="result-value profit">{formatUSD(totalGains)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tax Bracket')}</span>
                                    <span className="result-value">{taxBracket}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Estimated Tax Savings')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(taxSavings)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Net Portfolio Value')}</span>
                                    <span className="result-value">{formatUSD(totalPortfolioValue)}</span>
                                </div>
                            </div>

                            {/* Wash Sale Warning */}
                            {totalHarvestable > 0 && (
                                <div style={{
                                    padding: '12px 16px', background: '#fef3c7', border: '1px solid #f59e0b',
                                    borderRadius: '10px', fontSize: '0.85rem', lineHeight: 1.5, marginTop: '8px',
                                    color: '#92400e', display: 'flex', gap: '8px', alignItems: 'flex-start',
                                }}>
                                    <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <span>{getUiString(lang, 'Wash sale rule: Do not repurchase the same or substantially identical asset within 30 days before or after selling, or the loss will be disallowed.')}</span>
                                </div>
                            )}

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Not tax advice. Tax rules vary by jurisdiction. Consult a qualified tax professional before harvesting losses.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Scissors size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Tax-Loss Harvesting')}</h3>
                            <p>{getUiString(lang, 'Add your crypto positions to see which losses you can harvest to reduce your tax bill.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(TaxLossHarvestingCalculator);
