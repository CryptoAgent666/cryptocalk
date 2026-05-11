import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ArrowUpDown, Info, RotateCcw, TrendingDown, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const SCENARIOS = [
  { label: 'BTC Long 10x 24h', direction: 'long' as const, entry: '65000', exit: '66500', size: '10000', leverage: '10', funding: '0.01', hours: '24', makerFee: '0.02', takerFee: '0.05' },
  { label: 'ETH Short 5x 72h', direction: 'short' as const, entry: '2300', exit: '2150', size: '5000', leverage: '5', funding: '0.01', hours: '72', makerFee: '0.02', takerFee: '0.05' },
  { label: 'SOL Long 20x 8h', direction: 'long' as const, entry: '140', exit: '145', size: '2000', leverage: '20', funding: '0.015', hours: '8', makerFee: '0.02', takerFee: '0.05' },
] as const;

function PerpetualFuturesCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (v: number) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;

  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [entry, setEntry] = useState('65000');
  const [exit, setExit] = useState('66500');
  const [size, setSize] = useState('10000');
  const [leverage, setLeverage] = useState('10');
  const [funding, setFunding] = useState('0.01');
  const [hours, setHours] = useState('24');
  const [makerFee, setMakerFee] = useState('0.02');
  const [takerFee, setTakerFee] = useState('0.05');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setDirection(s.direction); setEntry(s.entry); setExit(s.exit);
    setSize(s.size); setLeverage(s.leverage); setFunding(s.funding);
    setHours(s.hours); setMakerFee(s.makerFee); setTakerFee(s.takerFee);
  };
  const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
    direction === s.direction && entry === s.entry && exit === s.exit &&
    size === s.size && leverage === s.leverage && funding === s.funding &&
    hours === s.hours && makerFee === s.makerFee && takerFee === s.takerFee;

  const result = useMemo(() => {
    const e = parseFloat(entry) || 0;
    const x = parseFloat(exit) || 0;
    const s = parseFloat(size) || 0;
    const lev = parseFloat(leverage) || 0;
    const fr = parseFloat(funding) || 0;
    const h = parseFloat(hours) || 0;
    const mf = parseFloat(makerFee) || 0;
    const tf = parseFloat(takerFee) || 0;
    if (e <= 0 || s <= 0 || lev <= 0) return null;

    const margin = s / lev;
    const notional = s;
    const priceDelta = direction === 'long' ? (x - e) / e : (e - x) / e;
    const unrealizedPnl = notional * priceDelta;

    const fundingPeriods = h / 8;
    const fundingTotal = notional * (fr / 100) * fundingPeriods;

    const entryFeeTotal = notional * (tf / 100);
    const exitFeeTotal = notional * (tf / 100);
    const tradingFees = entryFeeTotal + exitFeeTotal;

    const netPnl = unrealizedPnl - fundingTotal - tradingFees;
    const roe = margin > 0 ? (netPnl / margin) * 100 : 0;

    const liqPrice = direction === 'long'
      ? e * (1 - 1 / lev + (mf + tf) / 100)
      : e * (1 + 1 / lev - (mf + tf) / 100);

    const effectiveLev = margin > 0 ? notional / ((margin + netPnl) > 0 ? (margin + netPnl) : margin) : 0;

    const days = Math.ceil(h / 24);
    const fundingByDay = Array.from({ length: days }, (_, i) => {
      const periodsInDay = Math.min(3, (h - i * 24) / 8);
      const dayFunding = notional * (fr / 100) * Math.max(0, periodsInDay);
      return { day: i + 1, cost: dayFunding, cumulative: 0 };
    });
    let cum = 0;
    for (const d of fundingByDay) { cum += d.cost; d.cumulative = cum; }

    return { unrealizedPnl, fundingTotal, tradingFees, netPnl, roe, liqPrice, effectiveLev, fundingByDay };
  }, [direction, entry, exit, size, leverage, funding, hours, makerFee, takerFee]);

  const reset = () => {
    setDirection('long'); setEntry('65000'); setExit('66500'); setSize('10000');
    setLeverage('10'); setFunding('0.01'); setHours('24'); setMakerFee('0.02'); setTakerFee('0.05');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Direction')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${direction === 'long' ? 'active' : ''}`} onClick={() => setDirection('long')}>{getUiString(lang, 'Long')}</button>
              <button className={`pill-btn ${direction === 'short' ? 'active' : ''}`} onClick={() => setDirection('short')}>{getUiString(lang, 'Short')}</button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pf-entry">{getUiString(lang, 'Entry Price ($)')}</label>
            <input type="number" inputMode="decimal" value={entry} onChange={(e) => setEntry(e.target.value)} min="0" step="any" id="pf-entry" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-exit">{getUiString(lang, 'Exit Price ($)')}</label>
            <input type="number" inputMode="decimal" value={exit} onChange={(e) => setExit(e.target.value)} min="0" step="any" id="pf-exit" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-size">{getUiString(lang, 'Position Size ($)')}</label>
            <div className="pills-row">
              {[1000, 5000, 10000, 50000].map((p) => (
                <button key={p} className={`pill-btn ${size === String(p) ? 'active' : ''}`} onClick={() => setSize(String(p))}>${p >= 1000 ? `${p / 1000}k` : p}</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={size} onChange={(e) => setSize(e.target.value)} min="0" step="any" id="pf-size" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-lev">{getUiString(lang, 'Leverage (x)')}</label>
            <div className="pills-row">
              {[2, 5, 10, 20, 50].map((l) => (
                <button key={l} className={`pill-btn ${leverage === String(l) ? 'active' : ''}`} onClick={() => setLeverage(String(l))}>{l}x</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={leverage} onChange={(e) => setLeverage(e.target.value)} min="1" step="any" id="pf-lev" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-funding">{getUiString(lang, 'Funding Rate (% per 8h)')}</label>
            <input type="number" inputMode="decimal" value={funding} onChange={(e) => setFunding(e.target.value)} step="any" id="pf-funding" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-hours">{getUiString(lang, 'Holding Period (hours)')}</label>
            <div className="pills-row">
              {[8, 24, 72, 168].map((h) => (
                <button key={h} className={`pill-btn ${hours === String(h) ? 'active' : ''}`} onClick={() => setHours(String(h))}>{h}h</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={hours} onChange={(e) => setHours(e.target.value)} min="1" step="1" id="pf-hours" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-maker">{getUiString(lang, 'Maker Fee (%)')}</label>
            <input type="number" inputMode="decimal" value={makerFee} onChange={(e) => setMakerFee(e.target.value)} min="0" step="any" id="pf-maker" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-taker">{getUiString(lang, 'Taker Fee (%)')}</label>
            <input type="number" inputMode="decimal" value={takerFee} onChange={(e) => setTakerFee(e.target.value)} min="0" step="any" id="pf-taker" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Includes funding rate cost over holding period.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netPnl >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net P&L')}</span>
                <span className="result-hero-value">{result.netPnl >= 0 ? <TrendingUp size={28} /> : <TrendingDown size={28} />}{fmtUSD(result.netPnl)}</span>
                <span className={`result-hero-roi ${result.roe >= 0 ? 'profit' : 'loss'}`}>{fmtPct(result.roe)} ROE</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Unrealized P&L')}</span><span className={`result-value ${result.unrealizedPnl >= 0 ? 'profit' : 'loss'}`}>{fmtUSD(result.unrealizedPnl)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Funding Cost Total')}</span><span className="result-value loss">-{fmtUSD(result.fundingTotal)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Trading Fees Total')}</span><span className="result-value loss">-{fmtUSD(result.tradingFees)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Liquidation Price')}</span><span className="result-value">{fmtUSD(result.liqPrice)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Effective Leverage')}</span><span className="result-value">{result.effectiveLev.toFixed(2)}x</span></div>
              </div>

              {result.fundingByDay.length > 1 && (
                <>
                  <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 600 }}>{getUiString(lang, 'Funding Cost by Day')}</h4>
                  <div className="result-breakdown">
                    {result.fundingByDay.map((d) => (
                      <div key={d.day} className="result-row">
                        <span className="result-label">{getUiString(lang, 'Day')} {d.day}</span>
                        <span className="result-value loss">-{fmtUSD(d.cost)} ({fmtUSD(d.cumulative)})</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Funding rates fluctuate each period. Actual liquidation depends on exchange maintenance margin. Not financial advice.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><ArrowUpDown size={40} /></div>
              <h3>{getUiString(lang, 'Enter trade parameters')}</h3>
              <p>{getUiString(lang, 'Set entry, exit, leverage, and funding rate to calculate perpetual futures P&L.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PerpetualFuturesCalculator);
