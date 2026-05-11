import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Grid3x3, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const GRID_COUNT_PRESETS = [10, 20, 50, 100];
const SCENARIOS = [
  {
    label: 'BTC Tight Range',
    upperPrice: '90000',
    lowerPrice: '80000',
    gridCount: '20',
    investment: '10000',
    gridType: 'arithmetic' as const,
    tradingFee: '0.1',
    volatility: '60',
  },
  {
    label: 'ETH Wide Swing',
    upperPrice: '4000',
    lowerPrice: '2000',
    gridCount: '50',
    investment: '5000',
    gridType: 'arithmetic' as const,
    tradingFee: '0.1',
    volatility: '80',
  },
  {
    label: 'SOL Volatile',
    upperPrice: '250',
    lowerPrice: '100',
    gridCount: '30',
    investment: '3000',
    gridType: 'geometric' as const,
    tradingFee: '0.1',
    volatility: '120',
  },
] as const;

function GridTradingCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (value: number): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value);

  const fmtNum = (value: number, digits = 2): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      minimumFractionDigits: digits, maximumFractionDigits: digits,
    }).format(value);

  const [upperPrice, setUpperPrice] = useState('90000');
  const [lowerPrice, setLowerPrice] = useState('80000');
  const [gridCount, setGridCount] = useState('20');
  const [investment, setInvestment] = useState('10000');
  const [gridType, setGridType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [tradingFee, setTradingFee] = useState('0.1');
  const [volatility, setVolatility] = useState('60');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setUpperPrice(s.upperPrice); setLowerPrice(s.lowerPrice); setGridCount(s.gridCount);
    setInvestment(s.investment); setGridType(s.gridType); setTradingFee(s.tradingFee);
    setVolatility(s.volatility);
  };

  const isActive = (s: (typeof SCENARIOS)[number]) =>
    upperPrice === s.upperPrice && lowerPrice === s.lowerPrice && gridCount === s.gridCount &&
    investment === s.investment && gridType === s.gridType && tradingFee === s.tradingFee && volatility === s.volatility;

  const result = useMemo(() => {
    const upper = parseFloat(upperPrice) || 0;
    const lower = parseFloat(lowerPrice) || 0;
    const grids = Math.floor(parseFloat(gridCount) || 0);
    const invest = parseFloat(investment) || 0;
    const fee = (parseFloat(tradingFee) || 0) / 100;
    const vol = (parseFloat(volatility) || 0) / 100;

    if (upper <= lower || grids < 2 || invest <= 0 || lower <= 0) return null;

    const levels: number[] = [];
    if (gridType === 'arithmetic') {
      const step = (upper - lower) / grids;
      for (let i = 0; i <= grids; i++) levels.push(lower + step * i);
    } else {
      const ratio = Math.pow(upper / lower, 1 / grids);
      for (let i = 0; i <= grids; i++) levels.push(lower * Math.pow(ratio, i));
    }

    const pricePerGrid = gridType === 'arithmetic'
      ? (upper - lower) / grids
      : levels[1] - levels[0];

    const profitPerGrid = pricePerGrid * (invest / grids / ((upper + lower) / 2)) * (1 - 2 * fee);
    const maxProfit = profitPerGrid * grids;
    const requiredMovement = pricePerGrid;
    const dailyGrids = vol > 0 ? (vol * ((upper + lower) / 2) / pricePerGrid) / 365 : 0;
    const dailyProfit = dailyGrids * profitPerGrid;
    const annualReturn = invest > 0 ? (dailyProfit * 365 / invest) * 100 : 0;
    const totalFeesCost = fee * 2 * invest;

    return {
      levels,
      pricePerGrid,
      profitPerGrid,
      maxProfit,
      requiredMovement,
      annualReturn,
      dailyGrids,
      totalFeesCost,
      investPerGrid: invest / grids,
    };
  }, [upperPrice, lowerPrice, gridCount, investment, gridType, tradingFee, volatility]);

  const reset = () => {
    setUpperPrice('90000'); setLowerPrice('80000'); setGridCount('20');
    setInvestment('10000'); setGridType('arithmetic'); setTradingFee('0.1');
    setVolatility('60');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="grid-upper">{getUiString(lang, 'Upper Price (USD)')}</label>
            <input type="number" inputMode="decimal" id="grid-upper" value={upperPrice} onChange={(e) => setUpperPrice(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="grid-lower">{getUiString(lang, 'Lower Price (USD)')}</label>
            <input type="number" inputMode="decimal" id="grid-lower" value={lowerPrice} onChange={(e) => setLowerPrice(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="grid-count">{getUiString(lang, 'Number of Grids')}</label>
            <div className="pills-row">
              {GRID_COUNT_PRESETS.map((p) => (
                <button key={p} className={`pill-btn ${gridCount === String(p) ? 'active' : ''}`} onClick={() => setGridCount(String(p))}>
                  {p}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="grid-count" value={gridCount} onChange={(e) => setGridCount(e.target.value)} min="2" max="200" step="1" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="grid-invest">{getUiString(lang, 'Total Investment (USD)')}</label>
            <input type="number" inputMode="decimal" id="grid-invest" value={investment} onChange={(e) => setInvestment(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Grid Type')}</label>
            <div className="toggle-group" role="tablist" aria-label="Grid type">
              {(['arithmetic', 'geometric'] as const).map((t) => (
                <button key={t} type="button" className={`toggle-btn ${gridType === t ? 'active' : ''}`} onClick={() => setGridType(t)}>
                  {getUiString(lang, t === 'arithmetic' ? 'Arithmetic' : 'Geometric')}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="grid-fee">{getUiString(lang, 'Trading Fee (%)')}</label>
            <input type="number" inputMode="decimal" id="grid-fee" value={tradingFee} onChange={(e) => setTradingFee(e.target.value)} min="0" step="0.01" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="grid-vol">{getUiString(lang, 'Historical Volatility (%/year)')}</label>
            <input type="number" inputMode="decimal" id="grid-vol" value={volatility} onChange={(e) => setVolatility(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Annual return estimate uses historical volatility to project grid fills.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.annualReturn > 0 ? 'profit' : ''}`}>
                <span className="result-hero-label">{getUiString(lang, 'Estimated Annual Return')}</span>
                <span className="result-hero-value"><Grid3x3 size={28} />{fmtNum(result.annualReturn)}%</span>
                <span className="result-hero-roi profit">{getUiString(lang, 'Max Profit')}: {fmtUSD(result.maxProfit)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Price per Grid')}</span><span className="result-value">{fmtUSD(result.pricePerGrid)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Profit per Grid')}</span><span className="result-value profit">{fmtUSD(result.profitPerGrid)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Investment per Grid')}</span><span className="result-value">{fmtUSD(result.investPerGrid)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Required Movement (1 grid)')}</span><span className="result-value">{fmtUSD(result.requiredMovement)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Estimated Daily Grid Fills')}</span><span className="result-value">{fmtNum(result.dailyGrids, 1)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Total Fee Cost (round-trip)')}</span><span className="result-value fee">{fmtUSD(result.totalFeesCost)}</span></div>
              </div>

              <div className="result-breakdown" style={{ marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>{getUiString(lang, 'Grid Levels')}</h4>
                {result.levels.slice(0, 10).map((level, i) => (
                  <div className="result-row" key={i}>
                    <span className="result-label">#{i + 1}</span>
                    <span className="result-value">{fmtUSD(level)}</span>
                  </div>
                ))}
                {result.levels.length > 10 && (
                  <div className="result-row">
                    <span className="result-label">...</span>
                    <span className="result-value">{getUiString(lang, 'and')} {result.levels.length - 10} {getUiString(lang, 'more levels')}</span>
                  </div>
                )}
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Grid trading profits depend on price staying within the range. Breakout moves can result in unrealized losses. Past volatility does not guarantee future fills.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Configure Your Grid')}</h3>
              <p>{getUiString(lang, 'Set upper and lower prices, grid count, and investment to estimate grid trading profitability.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(GridTradingCalculator);
