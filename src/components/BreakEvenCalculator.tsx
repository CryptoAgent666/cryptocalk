import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    Target,
    Percent,
} from 'lucide-react';

const BREAK_EVEN_SCENARIOS = [
    { label: '20% Drawdown', mode: 'loss', lossPct: '20', originalValue: '10000', currentValue: '8000' },
    { label: '50% Drawdown', mode: 'loss', lossPct: '50', originalValue: '10000', currentValue: '5000' },
    { label: 'Long Fees', mode: 'trade', entryPrice: '65000', positionSize: '10000', entryFee: '0.1', exitFee: '0.1', isShort: false },
    { label: 'Short Fees', mode: 'trade', entryPrice: '65000', positionSize: '10000', entryFee: '0.1', exitFee: '0.1', isShort: true },
] as const;

export default function BreakEvenCalculator({ lang = 'en' }: { lang?: string }) {
    const [mode, setMode] = useState<'loss' | 'trade'>('loss');
    // Loss Recovery mode
    const [lossPct, setLossPct] = useState('20');
    const [currentValue, setCurrentValue] = useState('8000');
    const [originalValue, setOriginalValue] = useState('10000');
    // Trade Break-Even mode
    const [entryPrice, setEntryPrice] = useState('');
    const [positionSize, setPositionSize] = useState('');
    const [entryFee, setEntryFee] = useState('0.1');
    const [exitFee, setExitFee] = useState('0.1');
    const [isShort, setIsShort] = useState(false);

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPct = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    // Loss Recovery calculations
    const loss = parseFloat(lossPct) || 0;
    const recoveryPct = loss > 0 && loss < 100 ? (loss / (100 - loss)) * 100 : 0;
    const curVal = parseFloat(currentValue) || 0;
    const origVal = parseFloat(originalValue) || 0;
    const recoveryNeeded = origVal > 0 && curVal > 0 ? ((origVal / curVal - 1) * 100) : 0;
    const amountToRecover = origVal - curVal;

    // Trade Break-Even calculations
    const entry = parseFloat(entryPrice) || 0;
    const size = parseFloat(positionSize) || 0;
    const eFee = parseFloat(entryFee) || 0;
    const xFee = parseFloat(exitFee) || 0;
    const totalFeePct = eFee + xFee;
    const breakEvenPrice = isShort
        ? entry * (1 - totalFeePct / 100)
        : entry * (1 + totalFeePct / 100);
    const feeAmount = size * (totalFeePct / 100);

    // Reference table: loss % → required recovery %
    const refData = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90].map((l) => ({
        loss: l,
        recovery: (l / (100 - l)) * 100,
    }));

    const reset = () => {
        setLossPct('20'); setCurrentValue('8000'); setOriginalValue('10000');
        setEntryPrice(''); setPositionSize(''); setEntryFee('0.1'); setExitFee('0.1'); setIsShort(false);
    };
    const applyScenario = (scenario: (typeof BREAK_EVEN_SCENARIOS)[number]) => {
        setMode(scenario.mode);
        if (scenario.mode === 'loss') {
            setLossPct(scenario.lossPct);
            setOriginalValue(scenario.originalValue);
            setCurrentValue(scenario.currentValue);
            setEntryPrice('');
            setPositionSize('');
            setEntryFee('0.1');
            setExitFee('0.1');
            setIsShort(false);
            return;
        }
        setEntryPrice(scenario.entryPrice);
        setPositionSize(scenario.positionSize);
        setEntryFee(scenario.entryFee);
        setExitFee(scenario.exitFee);
        setIsShort(scenario.isShort);
        setLossPct('20');
        setCurrentValue('8000');
        setOriginalValue('10000');
    };
    const isScenarioActive = (scenario: (typeof BREAK_EVEN_SCENARIOS)[number]) => {
        if (mode !== scenario.mode) return false;
        if (scenario.mode === 'loss') {
            return lossPct === scenario.lossPct
                && originalValue === scenario.originalValue
                && currentValue === scenario.currentValue;
        }
        return entryPrice === scenario.entryPrice
            && positionSize === scenario.positionSize
            && entryFee === scenario.entryFee
            && exitFee === scenario.exitFee
            && isShort === scenario.isShort;
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {BREAK_EVEN_SCENARIOS.map((scenario) => (
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
                        <label><Target size={14} /> Calculator Mode</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${mode === 'loss' ? 'active' : ''}`}
                                onClick={() => setMode('loss')}>
                                <TrendingDown size={14} /> Loss Recovery
                            </button>
                            <button className={`toggle-btn ${mode === 'trade' ? 'active' : ''}`}
                                onClick={() => setMode('trade')}>
                                <TrendingUp size={14} /> Trade Break-Even
                            </button>
                        </div>
                    </div>

                    {mode === 'loss' ? (
                        <>
                            {/* Loss % */}
                            <div className="input-group">
                                <label><Percent size={14} /> Loss Percentage</label>
                                <div className="pills-row">
                                    {[10, 20, 30, 50, 70, 90].map((v) => (
                                        <button key={v} className={`pill-btn ${lossPct === String(v) ? 'active' : ''}`}
                                            onClick={() => {
                                                setLossPct(String(v));
                                                if (origVal > 0) setCurrentValue(String(origVal * (1 - v / 100)));
                                            }}>
                                            {v}%
                                        </button>
                                    ))}
                                </div>
                                <input type="number" inputMode="decimal" value={lossPct} onChange={(e) => setLossPct(e.target.value)}
                                    placeholder="" id="be-loss-pct" step="0.1" min="0" max="99.99" />
                            </div>

                            {/* Original Value */}
                            <div className="input-group">
                                <label><DollarSign size={14} /> {getUiString(lang, 'Original Value')}</label>
                                <div className="input-with-prefix">
                                    <input type="number" inputMode="decimal" value={originalValue} onChange={(e) => setOriginalValue(e.target.value)}
                                        placeholder="" id="be-original" step="any" min="0" />
                                </div>
                            </div>

                            {/* Current Value */}
                            <div className="input-group">
                                <label><DollarSign size={14} /> {getUiString(lang, 'Current Value')}</label>
                                <div className="input-with-prefix">
                                    <input type="number" inputMode="decimal" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}
                                        placeholder="" id="be-current" step="any" min="0" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Direction */}
                            <div className="input-group">
                                <label>Position Direction</label>
                                <div className="toggle-group">
                                    <button className={`toggle-btn ${!isShort ? 'active long' : ''}`}
                                        onClick={() => setIsShort(false)}>
                                        <TrendingUp size={14} /> Long
                                    </button>
                                    <button className={`toggle-btn ${isShort ? 'active short' : ''}`}
                                        onClick={() => setIsShort(true)}>
                                        <TrendingDown size={14} /> Short
                                    </button>
                                </div>
                            </div>

                            {/* Entry Price */}
                            <div className="input-group">
                                <label><DollarSign size={14} /> {getUiString(lang, 'Entry Price')}</label>
                                <div className="input-with-prefix">
                                    <input type="number" inputMode="decimal" value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)}
                                        placeholder="" id="be-entry" step="any" min="0" />
                                </div>
                            </div>

                            {/* Position Size */}
                            <div className="input-group">
                                <label><DollarSign size={14} /> Position Size (USD)</label>
                                <div className="input-with-prefix">
                                    <input type="number" inputMode="decimal" value={positionSize} onChange={(e) => setPositionSize(e.target.value)}
                                        placeholder="" id="be-size" step="any" min="0" />
                                </div>
                            </div>

                            {/* Fees */}
                            <div className="calc-two-col-grid">
                                <div className="input-group">
                                    <label>Entry Fee (%)</label>
                                    <input type="number" inputMode="decimal" value={entryFee} onChange={(e) => setEntryFee(e.target.value)}
                                        placeholder="" id="be-entry-fee" step="0.01" min="0" />
                                </div>
                                <div className="input-group">
                                    <label>Exit Fee (%)</label>
                                    <input type="number" inputMode="decimal" value={exitFee} onChange={(e) => setExitFee(e.target.value)}
                                        placeholder="" id="be-exit-fee" step="0.01" min="0" />
                                </div>
                            </div>
                        </>
                    )}

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        {mode === 'loss'
                            ? 'Auto-updates as you type. Loss % instantly maps to required recovery.'
                            : 'Auto-updates as you type. Fees are included in break-even price.'}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {mode === 'loss' && loss > 0 ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Recovery Required')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-accent-green)' }}>
                                    <TrendingUp size={28} />
                                    +{recoveryPct.toFixed(2)}%
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    {getUiString(lang, 'to recover from a')} {loss}% {getUiString(lang, 'loss')}
                                </span>
                            </div>

                            {/* Visual comparison */}
                            <div className="calc-two-col-grid" style={{ margin: '16px 0' }}>
                                <div style={{
                                    padding: '12px', borderRadius: '10px',
                                    border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{getUiString(lang, 'Loss')}</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-accent-red)' }}>-{loss}%</div>
                                </div>
                                <div style={{
                                    padding: '12px', borderRadius: '10px',
                                    border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.06)',
                                    textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{getUiString(lang, 'Needed Gain')}</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-accent-green)' }}>+{recoveryPct.toFixed(1)}%</div>
                                </div>
                            </div>

                            {/* Dollar values */}
                            {curVal > 0 && origVal > 0 && (
                                <div className="result-breakdown">
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Original Value')}</span>
                                        <span className="result-value">{formatUSD(origVal)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Current Value')}</span>
                                        <span className="result-value" style={{ color: 'var(--color-accent-red)' }}>{formatUSD(curVal)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Amount to Recover')}</span>
                                        <span className="result-value" style={{ color: 'var(--color-accent-green)' }}>{formatUSD(amountToRecover)}</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Gain Needed')}</span>
                                        <span className="result-value" style={{ fontWeight: 600, color: 'var(--color-accent-green)' }}>+{recoveryNeeded.toFixed(2)}%</span>
                                    </div>
                                </div>
                            )}

                            {/* Reference Table */}
                            <div style={{ marginTop: '16px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Loss vs Recovery Reference')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Loss')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Recovery Needed')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {refData.map((row) => (
                                                <tr key={row.loss} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: row.loss === Math.round(loss) ? 'var(--color-bg-card)' : 'transparent',
                                                }}>
                                                    <td style={{ padding: '8px', color: 'var(--color-accent-red)', fontWeight: row.loss === Math.round(loss) ? 700 : 400 }}>
                                                        -{row.loss}%
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)', fontWeight: row.loss === Math.round(loss) ? 700 : 400 }}>
                                                        +{row.recovery.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : mode === 'trade' && entry > 0 ? (
                        <>
                            {/* Trade break-even hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-primary)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Break-Even Price')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <Target size={28} />
                                    {formatUSD(breakEvenPrice)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    {isShort ? getUiString(lang, 'Short') : getUiString(lang, 'Long')} {getUiString(lang, 'from')} {formatUSD(entry)} ({formatPct((breakEvenPrice / entry - 1) * 100)})
                                </span>
                            </div>

                            <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Price')}</span>
                                    <span className="result-value">{formatUSD(entry)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Break-Even Price')}</span>
                                    <span className="result-value" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{formatUSD(breakEvenPrice)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Price Difference')}</span>
                                    <span className="result-value">{formatPct((breakEvenPrice / entry - 1) * 100)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Entry Fee')} ({eFee}%)</span>
                                    <span className="result-value fee">{formatUSD(size * eFee / 100)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Exit Fee')} ({xFee}%)</span>
                                    <span className="result-value fee">{formatUSD(size * xFee / 100)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Fees')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(feeAmount)}</strong></span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Target size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Break-Even')}</h3>
                            <p>{getUiString(lang, 'Use')} <strong>{getUiString(lang, 'Loss Recovery')}</strong> {getUiString(lang, 'to see how much gain you need to recover from a loss, or')} <strong>{getUiString(lang, 'Trade Break-Even')}</strong> {getUiString(lang, 'to find the exit price that covers your fees.')}</p>
                        </div>
                    )}

                    <p className="calc-disclaimer">
                        <Info size={12} />
                        {getUiString(lang, 'Break-even calculations are mathematical. Actual recovery depends on market conditions, timing, and fees.')}
                    </p>
                </div>
            </div>
        </div>
    );
}
