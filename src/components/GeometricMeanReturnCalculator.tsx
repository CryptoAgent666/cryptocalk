import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp, Plus, X } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const GEO_SCENARIOS = [
  { label: 'Steady Growth', returns: ['10', '12', '8', '11', '9'] },
  { label: 'Volatile (BTC)', returns: ['150', '-65', '95', '-77', '155'] },
  { label: 'Choppy Market', returns: ['25', '-15', '30', '-20', '18'] },
  { label: 'Bear Then Bull', returns: ['-30', '-25', '50', '120', '40'] },
] as const;

function GeometricMeanReturnCalculator({ lang = 'en' }: { lang?: string }) {
  const [returns, setReturns] = useState<string[]>(['10', '12', '8', '11', '9']);

  const applyScenario = (s: (typeof GEO_SCENARIOS)[number]) => setReturns([...s.returns]);
  const isScenarioActive = (s: (typeof GEO_SCENARIOS)[number]) =>
    s.returns.length === returns.length && s.returns.every((r, i) => r === returns[i]);

  const setReturn = (i: number, v: string) => {
    const next = [...returns];
    next[i] = v;
    setReturns(next);
  };
  const addReturn = () => returns.length < 20 && setReturns([...returns, '']);
  const removeReturn = (i: number) => returns.length > 2 && setReturns(returns.filter((_, idx) => idx !== i));

  const result = useMemo(() => {
    const valid = returns.map((r) => parseFloat(r)).filter((r) => Number.isFinite(r));
    if (valid.length < 2) return null;

    const n = valid.length;
    // Arithmetic mean
    const arithmetic = valid.reduce((s, r) => s + r, 0) / n;

    // Geometric mean: (∏(1 + r/100))^(1/n) − 1
    let product = 1;
    let allValid = true;
    for (const r of valid) {
      const factor = 1 + r / 100;
      if (factor <= 0) { allValid = false; break; } // -100% wipes out
      product *= factor;
    }
    const geometric = allValid ? (Math.pow(product, 1 / n) - 1) * 100 : -100;

    // Total compound return
    const totalCompound = allValid ? (product - 1) * 100 : -100;
    // What $10K becomes
    const finalValue10k = allValid ? product * 10000 : 0;

    // Volatility drag
    const drag = arithmetic - geometric;

    // Sample variance (population for simplicity)
    const variance = valid.reduce((s, r) => s + Math.pow(r - arithmetic, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    let rating = 'High drag';
    if (drag < 1) rating = 'Minimal drag';
    else if (drag < 5) rating = 'Low drag';
    else if (drag < 15) rating = 'Moderate drag';

    return { n, arithmetic, geometric, totalCompound, finalValue10k, drag, stdDev, rating, allValid };
  }, [returns]);

  const reset = () => setReturns(['10', '12', '8', '11', '9']);

  const formatUSD = (v: number) =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(v);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {GEO_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Period Returns')} (%)</label>
            {returns.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <span style={{ minWidth: '24px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>#{i + 1}</span>
                <input type="number" inputMode="decimal" value={r}
                  onChange={(e) => setReturn(i, e.target.value)}
                  step="any" placeholder="0"
                  style={{ flex: 1 }}
                  onFocus={(e) => e.target.select()} />
                {returns.length > 2 && (
                  <button onClick={() => removeReturn(i)} className="pill-btn"
                    style={{ padding: '4px 8px' }}
                    aria-label={getUiString(lang, 'Remove')}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
            {returns.length < 20 && (
              <button onClick={addReturn} className="pill-btn" style={{ marginTop: '4px' }}>
                <Plus size={14} /> {getUiString(lang, 'Add Period')}
              </button>
            )}
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Geometric mean = (∏(1+r))^(1/n) − 1. Always lower than arithmetic mean for volatile assets.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.geometric >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Geometric Mean (per period)')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />
                  {result.geometric >= 0 ? '+' : ''}{result.geometric.toFixed(3)}%
                </span>
                <span className={`result-hero-roi ${result.drag < 5 ? 'profit' : result.drag < 15 ? '' : 'loss'}`}>
                  {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Arithmetic Mean')}</span>
                  <span className="result-value">{result.arithmetic.toFixed(3)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Volatility Drag')}</span>
                  <span className={`result-value ${result.drag > 5 ? 'fee' : ''}`}>
                    {result.drag.toFixed(3)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Std Deviation')}</span>
                  <span className="result-value">{result.stdDev.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total Compound Return')}</span>
                  <span className={`result-value ${result.totalCompound >= 0 ? 'profit' : 'loss'}`}>
                    {result.totalCompound >= 0 ? '+' : ''}{result.totalCompound.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">$10,000 {getUiString(lang, 'becomes')}</span>
                  <span className={`result-value ${result.finalValue10k >= 10000 ? 'profit' : 'loss'}`}>
                    {formatUSD(result.finalValue10k)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Periods')}</span>
                  <span className="result-value">{result.n}</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Use geometric mean for compound returns over time. Arithmetic overstates true performance for volatile assets — the gap is "volatility drag".')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter at least 2 periods')}</h2>
              <p>{getUiString(lang, 'Add return values to compute geometric vs arithmetic mean.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(GeometricMeanReturnCalculator);
