import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Activity, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const PF_SCENARIOS = [
  { label: 'Losing System', winRate: '40', avgWin: '1.5', avgLoss: '1.0' },
  { label: 'Marginal', winRate: '50', avgWin: '1.2', avgLoss: '1.0' },
  { label: 'Solid Edge', winRate: '55', avgWin: '1.8', avgLoss: '1.0' },
  { label: 'Excellent', winRate: '50', avgWin: '3.0', avgLoss: '1.0' },
] as const;

function ProfitFactorCalculator({ lang = 'en' }: { lang?: string }) {
  const [winRate, setWinRate] = useState('55');
  const [avgWin, setAvgWin] = useState('1.8');
  const [avgLoss, setAvgLoss] = useState('1.0');
  const [totalTrades, setTotalTrades] = useState('100');

  const applyScenario = (s: (typeof PF_SCENARIOS)[number]) => {
    setWinRate(s.winRate); setAvgWin(s.avgWin); setAvgLoss(s.avgLoss);
  };
  const isScenarioActive = (s: (typeof PF_SCENARIOS)[number]) =>
    winRate === s.winRate && avgWin === s.avgWin && avgLoss === s.avgLoss;

  const result = useMemo(() => {
    const p = Number(winRate) / 100;
    const w = Number(avgWin);
    const l = Number(avgLoss);
    const trades = Number(totalTrades);
    if (![p, w, l, trades].every(Number.isFinite) || p <= 0 || p >= 1 || w <= 0 || l <= 0 || trades <= 0) return null;

    const q = 1 - p;
    const grossProfit = p * w * trades;
    const grossLoss = q * l * trades;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : Infinity;

    let rating = 'Losing';
    let zone: 'loss' | 'neutral' | 'profit' = 'loss';
    if (profitFactor >= 2) { rating = 'Excellent'; zone = 'profit'; }
    else if (profitFactor >= 1.5) { rating = 'Good'; zone = 'profit'; }
    else if (profitFactor >= 1.1) { rating = 'Marginal'; zone = 'neutral'; }
    else if (profitFactor >= 1) { rating = 'Break-even'; zone = 'neutral'; }

    const expectancyR = p * (w / l) - q;
    const netProfit = grossProfit - grossLoss;

    return { profitFactor, grossProfit, grossLoss, netProfit, rating, zone, expectancyR };
  }, [winRate, avgWin, avgLoss, totalTrades]);

  const reset = () => {
    setWinRate('55'); setAvgWin('1.8'); setAvgLoss('1.0'); setTotalTrades('100');
  };

  const formatR = (v: number) => v.toFixed(2);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {PF_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pf-winrate">{getUiString(lang, 'Win Rate')} (%)</label>
            <div className="pills-row">
              {[40, 50, 55, 60, 70].map((p) => (
                <button key={p}
                  className={`pill-btn ${winRate === String(p) ? 'active' : ''}`}
                  onClick={() => setWinRate(String(p))}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-winrate" value={winRate}
              onChange={(e) => setWinRate(e.target.value)} min="0.1" max="99.9" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-avgwin">{getUiString(lang, 'Average Win')} (R or $)</label>
            <div className="pills-row">
              {[1, 1.5, 2, 3].map((p) => (
                <button key={p}
                  className={`pill-btn ${avgWin === String(p) ? 'active' : ''}`}
                  onClick={() => setAvgWin(String(p))}>
                  {p}R
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-avgwin" value={avgWin}
              onChange={(e) => setAvgWin(e.target.value)} min="0.01" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-avgloss">{getUiString(lang, 'Average Loss')} (R or $)</label>
            <div className="pills-row">
              {[0.5, 1, 1.5, 2].map((p) => (
                <button key={p}
                  className={`pill-btn ${avgLoss === String(p) ? 'active' : ''}`}
                  onClick={() => setAvgLoss(String(p))}>
                  {p}R
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-avgloss" value={avgLoss}
              onChange={(e) => setAvgLoss(e.target.value)} min="0.01" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-trades">{getUiString(lang, 'Total Trades (sample)')}</label>
            <div className="pills-row">
              {[50, 100, 250, 500].map((p) => (
                <button key={p}
                  className={`pill-btn ${totalTrades === String(p) ? 'active' : ''}`}
                  onClick={() => setTotalTrades(String(p))}>
                  {p}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-trades" value={totalTrades}
              onChange={(e) => setTotalTrades(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Profit Factor = Gross Profit / Gross Loss. Above 1.5 is good, above 2.0 excellent. Use a sample of at least 30 trades for reliability.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone === 'profit' ? 'profit' : result.zone === 'loss' ? 'loss' : ''}`}>
                <span className="result-hero-label">{getUiString(lang, 'Profit Factor')}</span>
                <span className="result-hero-value"><Activity size={28} />
                  {Number.isFinite(result.profitFactor) ? result.profitFactor.toFixed(2) : '∞'}
                </span>
                <span className={`result-hero-roi ${result.zone === 'profit' ? 'profit' : result.zone === 'loss' ? 'loss' : ''}`}>
                  {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Gross Profit')}</span>
                  <span className="result-value profit">+{formatR(result.grossProfit)}R</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Gross Loss')}</span>
                  <span className="result-value fee">−{formatR(result.grossLoss)}R</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net Profit')}</span>
                  <span className={`result-value ${result.netProfit >= 0 ? 'profit' : 'loss'}`}>
                    {result.netProfit >= 0 ? '+' : ''}{formatR(result.netProfit)}R
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expectancy per trade')}</span>
                  <span className={`result-value ${result.expectancyR >= 0 ? 'profit' : 'loss'}`}>
                    {result.expectancyR >= 0 ? '+' : ''}{formatR(result.expectancyR)}R
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Profit Factor benchmarks: <1 = losing system, 1.0–1.5 = marginal, 1.5–2.0 = good, >2 = excellent. Above 4 may indicate overfitting on small samples.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter valid inputs')}</h3>
              <p>{getUiString(lang, 'Set win rate, average win, and average loss to compute profit factor.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(ProfitFactorCalculator);
