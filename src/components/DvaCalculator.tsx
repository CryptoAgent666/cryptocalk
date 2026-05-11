import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const SCENARIOS = [
  { label: 'Steady BTC', budget: '12000', period: '12', baseMo: '1000', volatility: 'low' as const, startPrice: '65000', targetPath: 'linear' as const },
  { label: 'Volatile ALT', budget: '6000', period: '12', baseMo: '500', volatility: 'high' as const, startPrice: '5', targetPath: 'aggressive' as const },
  { label: 'Bear Market', budget: '12000', period: '12', baseMo: '1000', volatility: 'med' as const, startPrice: '30000', targetPath: 'linear' as const },
] as const;

type Volatility = 'low' | 'med' | 'high';
type TargetPath = 'linear' | 'aggressive';

// Deterministic pseudo-random price path based on volatility
function simulatePricePath(startPrice: number, months: number, vol: Volatility): number[] {
  const volMap: Record<Volatility, number> = { low: 0.05, med: 0.12, high: 0.25 };
  const sigma = volMap[vol];
  // Use a fixed seed-like sequence for reproducibility
  const noise = [0.3, -0.7, 0.5, -0.2, 0.8, -0.5, 0.1, -0.9, 0.6, -0.3, 0.4, -0.6,
    0.2, -0.8, 0.7, -0.1, 0.9, -0.4, 0.3, -0.7, 0.5, -0.2, 0.8, -0.5];
  const prices = [startPrice];
  for (let i = 1; i <= months; i++) {
    const n = noise[i % noise.length];
    const change = 1 + sigma * n;
    prices.push(prices[i - 1] * Math.max(0.5, change));
  }
  return prices;
}

function DvaCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (v: number) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;

  const [budget, setBudget] = useState('12000');
  const [period, setPeriod] = useState('12');
  const [targetPath, setTargetPath] = useState<TargetPath>('linear');
  const [baseMo, setBaseMo] = useState('1000');
  const [volatility, setVolatility] = useState<Volatility>('low');
  const [startPrice, setStartPrice] = useState('65000');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setBudget(s.budget); setPeriod(s.period); setBaseMo(s.baseMo);
    setVolatility(s.volatility); setStartPrice(s.startPrice); setTargetPath(s.targetPath);
  };
  const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
    budget === s.budget && period === s.period && baseMo === s.baseMo &&
    volatility === s.volatility && startPrice === s.startPrice && targetPath === s.targetPath;

  const result = useMemo(() => {
    const b = parseFloat(budget) || 0;
    const m = parseInt(period) || 0;
    const base = parseFloat(baseMo) || 0;
    const sp = parseFloat(startPrice) || 0;
    if (b <= 0 || m <= 0 || base <= 0 || sp <= 0) return null;

    const prices = simulatePricePath(sp, m, volatility);

    // Target value path
    const targetValues: number[] = [];
    for (let i = 0; i <= m; i++) {
      if (targetPath === 'aggressive') {
        targetValues.push(b * Math.pow(i / m, 1.5));
      } else {
        targetValues.push((b / m) * i);
      }
    }

    // DVA simulation
    let dvaUnits = 0;
    let dvaTotalInvested = 0;
    let dvaInvestMore = 0;
    let dvaInvestLess = 0;
    const dvaMonthly: { month: number; invested: number; value: number; units: number }[] = [];

    for (let i = 1; i <= m; i++) {
      const currentValue = dvaUnits * prices[i];
      const targetValue = targetValues[i];
      const gap = targetValue - currentValue;
      const investAmount = Math.max(0, Math.min(gap, base * 2));
      const actualInvest = Math.min(investAmount, b - dvaTotalInvested);

      if (actualInvest > base) dvaInvestMore++;
      else if (actualInvest < base) dvaInvestLess++;

      const unitsBought = prices[i] > 0 ? actualInvest / prices[i] : 0;
      dvaUnits += unitsBought;
      dvaTotalInvested += actualInvest;
      dvaMonthly.push({ month: i, invested: actualInvest, value: dvaUnits * prices[i], units: dvaUnits });
    }

    // DCA simulation
    let dcaUnits = 0;
    let dcaTotalInvested = 0;
    const dcaMonthly: { month: number; invested: number; value: number; units: number }[] = [];

    for (let i = 1; i <= m; i++) {
      const investAmount = Math.min(base, b - dcaTotalInvested);
      const unitsBought = prices[i] > 0 ? investAmount / prices[i] : 0;
      dcaUnits += unitsBought;
      dcaTotalInvested += investAmount;
      dcaMonthly.push({ month: i, invested: investAmount, value: dcaUnits * prices[i], units: dcaUnits });
    }

    const dvaFinal = dvaUnits * prices[m];
    const dcaFinal = dcaUnits * prices[m];
    const dvaAvgCost = dvaUnits > 0 ? dvaTotalInvested / dvaUnits : 0;
    const dcaAvgCost = dcaUnits > 0 ? dcaTotalInvested / dcaUnits : 0;
    const outperformance = dcaFinal > 0 ? ((dvaFinal - dcaFinal) / dcaFinal) * 100 : 0;

    return {
      dvaTotalInvested, dcaTotalInvested, dvaFinal, dcaFinal,
      dvaAvgCost, dcaAvgCost, outperformance,
      dvaInvestMore, dvaInvestLess,
      dvaMonthly, dcaMonthly,
    };
  }, [budget, period, baseMo, volatility, startPrice, targetPath]);

  const reset = () => {
    setBudget('12000'); setPeriod('12'); setBaseMo('1000');
    setVolatility('low'); setStartPrice('65000'); setTargetPath('linear');
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
            <label htmlFor="dva-budget">{getUiString(lang, 'Total Budget ($)')}</label>
            <div className="pills-row">
              {[3000, 6000, 12000, 24000].map((p) => (
                <button key={p} className={`pill-btn ${budget === String(p) ? 'active' : ''}`} onClick={() => setBudget(String(p))}>${p >= 1000 ? `${p / 1000}k` : p}</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={budget} onChange={(e) => setBudget(e.target.value)} min="0" step="any" id="dva-budget" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="dva-period">{getUiString(lang, 'Investment Period (months)')}</label>
            <div className="pills-row">
              {[6, 12, 18, 24].map((p) => (
                <button key={p} className={`pill-btn ${period === String(p) ? 'active' : ''}`} onClick={() => setPeriod(String(p))}>{p}mo</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={period} onChange={(e) => setPeriod(e.target.value)} min="1" step="1" id="dva-period" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Target Value Path')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${targetPath === 'linear' ? 'active' : ''}`} onClick={() => setTargetPath('linear')}>{getUiString(lang, 'Linear')}</button>
              <button className={`pill-btn ${targetPath === 'aggressive' ? 'active' : ''}`} onClick={() => setTargetPath('aggressive')}>{getUiString(lang, 'Aggressive')}</button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="dva-base">{getUiString(lang, 'Base Monthly Investment ($)')}</label>
            <input type="number" inputMode="decimal" value={baseMo} onChange={(e) => setBaseMo(e.target.value)} min="0" step="any" id="dva-base" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Asset Volatility')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${volatility === 'low' ? 'active' : ''}`} onClick={() => setVolatility('low')}>{getUiString(lang, 'Low')}</button>
              <button className={`pill-btn ${volatility === 'med' ? 'active' : ''}`} onClick={() => setVolatility('med')}>{getUiString(lang, 'Medium')}</button>
              <button className={`pill-btn ${volatility === 'high' ? 'active' : ''}`} onClick={() => setVolatility('high')}>{getUiString(lang, 'High')}</button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="dva-price">{getUiString(lang, 'Starting Asset Price ($)')}</label>
            <input type="number" inputMode="decimal" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} min="0" step="any" id="dva-price" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. DVA adjusts each month based on target value path.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.outperformance >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'DVA vs DCA')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />{fmtPct(result.outperformance)}</span>
                <span className={`result-hero-roi ${result.outperformance >= 0 ? 'profit' : 'loss'}`}>
                  {result.outperformance >= 0 ? getUiString(lang, 'DVA outperforms') : getUiString(lang, 'DCA outperforms')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DVA Total Invested')}</span><span className="result-value">{fmtUSD(result.dvaTotalInvested)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DCA Total Invested')}</span><span className="result-value">{fmtUSD(result.dcaTotalInvested)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DVA Final Value')}</span><span className="result-value profit">{fmtUSD(result.dvaFinal)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DCA Final Value')}</span><span className="result-value">{fmtUSD(result.dcaFinal)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DVA Avg Cost')}</span><span className="result-value">{fmtUSD(result.dvaAvgCost)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DCA Avg Cost')}</span><span className="result-value">{fmtUSD(result.dcaAvgCost)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Months DVA invested more')}</span><span className="result-value">{result.dvaInvestMore}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Months DVA invested less')}</span><span className="result-value">{result.dvaInvestLess}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Uses a simulated price path based on volatility setting. Real results depend on actual market conditions. Not financial advice.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter DVA parameters')}</h3>
              <p>{getUiString(lang, 'Set budget, period, and volatility to compare Dollar Value Averaging vs DCA.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DvaCalculator);
