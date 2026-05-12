import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingDown, Info, RotateCcw, Target } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const TS_PRESETS = [
  { label: 'BTC Conservative', entry: '95000', current: '105000', trailingPct: '5', positionSize: '10000' },
  { label: 'ETH Active', entry: '3500', current: '4200', trailingPct: '8', positionSize: '5000' },
  { label: 'Altcoin Volatile', entry: '1.50', current: '2.40', trailingPct: '15', positionSize: '3000' },
  { label: 'Tight Scalp', entry: '95000', current: '96500', trailingPct: '2', positionSize: '20000' },
] as const;

function TrailingStopLossCalculator({ lang = 'en' }: { lang?: string }) {
  const [entry, setEntry] = useState('95000');
  const [current, setCurrent] = useState('105000');
  const [trailingPct, setTrailingPct] = useState('5');
  const [positionSize, setPositionSize] = useState('10000');
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [highWatermark, setHighWatermark] = useState('');

  const applyPreset = (p: typeof TS_PRESETS[number]) => {
    setEntry(p.entry); setCurrent(p.current); setTrailingPct(p.trailingPct); setPositionSize(p.positionSize);
    setHighWatermark('');
  };
  const isPresetActive = (p: typeof TS_PRESETS[number]) =>
    entry === p.entry && current === p.current && trailingPct === p.trailingPct;

  const result = useMemo(() => {
    const e = Number(entry);
    const c = Number(current);
    const t = Number(trailingPct);
    const ps = Number(positionSize);
    const hw = highWatermark.trim() === '' ? c : Number(highWatermark);

    if (![e, c, t, ps, hw].every(Number.isFinite)) return null;
    if (e <= 0 || c <= 0 || t <= 0 || t >= 100 || ps <= 0) return null;

    const tFrac = t / 100;
    const qty = ps / e;

    let highest = side === 'long' ? Math.max(e, c, hw) : Math.min(e, c, hw);
    const stopPrice = side === 'long' ? highest * (1 - tFrac) : highest * (1 + tFrac);

    const profitAtStop = side === 'long' ? (stopPrice - e) * qty : (e - stopPrice) * qty;
    const profitAtStopPct = (profitAtStop / ps) * 100;
    const currentPnl = side === 'long' ? (c - e) * qty : (e - c) * qty;
    const currentPnlPct = (currentPnl / ps) * 100;

    const distanceToStop = side === 'long' ? c - stopPrice : stopPrice - c;
    const distanceToStopPct = (distanceToStop / c) * 100;
    const profitGiveback = side === 'long' ? c - stopPrice : stopPrice - c;
    const profitGivebackPct = highest > 0 ? (Math.abs(profitGiveback) / highest) * 100 : 0;

    const isLockedProfit = side === 'long' ? stopPrice > e : stopPrice < e;
    const breakevenAchieved = isLockedProfit;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (profitAtStopPct > 10) { zone = 'profit'; rating = 'Strong locked profit'; }
    else if (profitAtStopPct > 0) { zone = 'profit'; rating = 'Profit secured'; }
    else if (profitAtStopPct > -3) { zone = 'neutral'; rating = 'Tight risk'; }
    else { zone = 'loss'; rating = 'Below entry'; }

    const trailingPctEffectiveness = currentPnlPct > 0 ? (profitAtStopPct / currentPnlPct) * 100 : 0;

    return {
      stopPrice, profitAtStop, profitAtStopPct, currentPnl, currentPnlPct,
      distanceToStop, distanceToStopPct, profitGiveback, profitGivebackPct,
      qty, highest, isLockedProfit, breakevenAchieved, zone, rating,
      trailingPctEffectiveness,
    };
  }, [entry, current, trailingPct, positionSize, side, highWatermark]);

  const reset = () => { applyPreset(TS_PRESETS[0]); setSide('long'); };

  const formatUSD = (v: number) => {
    if (!Number.isFinite(v)) return '—';
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(v);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {TS_PRESETS.map((p) => (
                <button key={p.label}
                  className={`pill-btn ${isPresetActive(p) ? 'active' : ''}`}
                  onClick={() => applyPreset(p)}>
                  {getUiString(lang, p.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Position Side')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${side === 'long' ? 'active' : ''}`} onClick={() => setSide('long')}>
                {getUiString(lang, 'Long')}
              </button>
              <button className={`pill-btn ${side === 'short' ? 'active' : ''}`} onClick={() => setSide('short')}>
                {getUiString(lang, 'Short')}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ts-entry">{getUiString(lang, 'Entry Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="ts-entry" value={entry}
              onChange={(e) => setEntry(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ts-current">{getUiString(lang, 'Current Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="ts-current" value={current}
              onChange={(e) => setCurrent(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ts-trailing">{getUiString(lang, 'Trailing Distance')} (%)</label>
            <div className="pills-row">
              {['1', '2', '5', '8', '10', '15'].map((p) => (
                <button key={p}
                  className={`pill-btn ${trailingPct === p ? 'active' : ''}`}
                  onClick={() => setTrailingPct(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ts-trailing" value={trailingPct}
              onChange={(e) => setTrailingPct(e.target.value)} min="0.1" max="99" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ts-size">{getUiString(lang, 'Position Size')} (USD)</label>
            <input type="number" inputMode="decimal" id="ts-size" value={positionSize}
              onChange={(e) => setPositionSize(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ts-hw">{getUiString(lang, 'Highest Price Reached (optional)')}</label>
            <input type="number" inputMode="decimal" id="ts-hw" value={highWatermark}
              onChange={(e) => setHighWatermark(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()}
              placeholder={getUiString(lang, 'Auto: uses current price')} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Trailing stop moves with favorable price action and stays put on reversals. Locks gains while limiting upside cap.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Profit Locked at Trigger')}</span>
                <span className="result-hero-value"><Target size={28} />
                  {result.profitAtStop >= 0 ? '+' : ''}{formatUSD(result.profitAtStop)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.profitAtStopPct >= 0 ? '+' : ''}{result.profitAtStopPct.toFixed(2)}% · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Stop trigger price')}</span>
                  <span className="result-value">{formatUSD(result.stopPrice)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'High watermark used')}</span>
                  <span className="result-value">{formatUSD(result.highest)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Distance to stop')}</span>
                  <span className="result-value">
                    {formatUSD(Math.abs(result.distanceToStop))} ({Math.abs(result.distanceToStopPct).toFixed(2)}%)
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Position quantity')}</span>
                  <span className="result-value">{result.qty.toFixed(6)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Current unrealized P&L')}</span>
                  <span className={`result-value ${result.currentPnl >= 0 ? 'profit' : 'loss'}`}>
                    {result.currentPnl >= 0 ? '+' : ''}{formatUSD(result.currentPnl)} ({result.currentPnlPct >= 0 ? '+' : ''}{result.currentPnlPct.toFixed(2)}%)
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit at stop trigger')}</span>
                  <span className={`result-value ${result.profitAtStop >= 0 ? 'profit' : 'loss'}`}>
                    {result.profitAtStop >= 0 ? '+' : ''}{formatUSD(result.profitAtStop)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit captured ratio')}</span>
                  <span className="result-value">
                    {result.trailingPctEffectiveness > 0 ? `${result.trailingPctEffectiveness.toFixed(1)}%` : '—'}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Above breakeven?')}</span>
                  <span className={`result-value ${result.breakevenAchieved ? 'profit' : 'fee'}`}>
                    {result.breakevenAchieved ? getUiString(lang, 'Yes') : getUiString(lang, 'No')}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit giveback if stopped')}</span>
                  <span className="result-value fee">
                    {result.profitGivebackPct.toFixed(2)}%
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Trailing stop only moves in your favor. Tight trails risk premature exits on noise; loose trails give back more profit. ATR-based trails adapt to volatility better than fixed percentages.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingDown size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Trailing percentage must be between 0 and 100. All prices and sizes must be positive.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(TrailingStopLossCalculator);
