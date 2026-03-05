import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Gauge, Info, RotateCcw, TrendingUp } from 'lucide-react';

const PORTFOLIO_VALUE_PRESETS = [10000, 30000, 50000, 100000];
const ANNUAL_RETURN_PRESETS = [10, 20, 30, 40];
const MAX_DRAWDOWN_PRESETS = [10, 20, 25, 35];
const HORIZON_PRESETS = [1, 3, 5];
const CALMAR_SCENARIOS = [
  { label: 'Defensive', portfolioValue: '10000', annualReturn: '10', maxDrawdown: '10', years: '1' },
  { label: 'Balanced', portfolioValue: '30000', annualReturn: '20', maxDrawdown: '20', years: '3' },
  { label: 'Growth', portfolioValue: '50000', annualReturn: '30', maxDrawdown: '25', years: '3' },
  { label: 'High Risk', portfolioValue: '100000', annualReturn: '40', maxDrawdown: '35', years: '5' },
] as const;


export default function CalmarCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  const [portfolioValue, setPortfolioValue] = useState('30000');
  const [annualReturn, setAnnualReturn] = useState('30');
  const [maxDrawdown, setMaxDrawdown] = useState('25');
  const [years, setYears] = useState('3');
  const applyScenario = (scenario: (typeof CALMAR_SCENARIOS)[number]) => {
    setPortfolioValue(scenario.portfolioValue);
    setAnnualReturn(scenario.annualReturn);
    setMaxDrawdown(scenario.maxDrawdown);
    setYears(scenario.years);
  };
  const isScenarioActive = (scenario: (typeof CALMAR_SCENARIOS)[number]) => (
    portfolioValue === scenario.portfolioValue
    && annualReturn === scenario.annualReturn
    && maxDrawdown === scenario.maxDrawdown
    && years === scenario.years
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const ret = Number(annualReturn);
    const dd = Number(maxDrawdown);
    const horizon = Number(years);

    if ([value, ret, dd, horizon].some((v) => !Number.isFinite(v)) || value <= 0 || dd <= 0 || horizon <= 0) {
      return null;
    }

    const calmar = ret / dd;
    const projectedValue = value * Math.pow(1 + ret / 100, horizon);
    const projectedGain = projectedValue - value;
    const drawdownAmount = value * (dd / 100);

    let rating = 'Weak';
    if (calmar >= 3) rating = 'Excellent';
    else if (calmar >= 1) rating = 'Good';
    else if (calmar >= 0.5) rating = 'Moderate';

    return {
      calmar,
      projectedValue,
      projectedGain,
      drawdownAmount,
      rating,
    };
  }, [portfolioValue, annualReturn, maxDrawdown, years]);

  const reset = () => {
    setPortfolioValue('30000');
    setAnnualReturn('30');
    setMaxDrawdown('25');
    setYears('3');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {CALMAR_SCENARIOS.map((scenario) => (
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

          <div className="input-group">
            <label>{getUiString(lang, 'Portfolio Value')} (USD)</label>
            <div className="pills-row">
              {PORTFOLIO_VALUE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${portfolioValue === String(preset) ? 'active' : ''}`}
                  onClick={() => setPortfolioValue(String(preset))}
                >
                  ${preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} min="0" step="any" id="calmar-value" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Expected Annual Return')} (%)</label>
            <div className="pills-row">
              {ANNUAL_RETURN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${annualReturn === String(preset) ? 'active' : ''}`}
                  onClick={() => setAnnualReturn(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={annualReturn} onChange={(e) => setAnnualReturn(e.target.value)} step="any" id="calmar-return" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Maximum Drawdown')} (%)</label>
            <div className="pills-row">
              {MAX_DRAWDOWN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${maxDrawdown === String(preset) ? 'active' : ''}`}
                  onClick={() => setMaxDrawdown(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={maxDrawdown} onChange={(e) => setMaxDrawdown(e.target.value)} min="0.01" step="any" id="calmar-dd" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Projection Horizon')} ({getUiString(lang, 'years')})</label>
            <div className="pills-row">
              {HORIZON_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${years === String(preset) ? 'active' : ''}`}
                  onClick={() => setYears(String(preset))}
                >
                  {preset}y
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} min="0.1" step="any" id="calmar-years" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Calmar is most useful when drawdown and return come from the same backtest period.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.calmar >= 1 ? 'profit' : result.calmar >= 0.5 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Calmar Ratio')}</span>
                <span className="result-hero-value"><Gauge size={28} />{result.calmar.toFixed(3)}</span>
                <span className={`result-hero-roi ${result.calmar >= 1 ? 'profit' : result.calmar >= 0.5 ? '' : 'loss'}`}>{getUiString(lang, result.rating)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Projected portfolio value')}</span><span className="result-value">{formatUSD(result.projectedValue)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Projected gain')}</span><span className={`result-value ${result.projectedGain >= 0 ? 'profit' : 'loss'}`}>{result.projectedGain >= 0 ? '+' : ''}{formatUSD(result.projectedGain)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Max drawdown amount')}</span><span className="result-value fee">-{formatUSD(result.drawdownAmount)}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Calmar compares annual return to max drawdown. It is most useful for evaluating trend-following and high-volatility strategies.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid inputs')}</h3><p>{getUiString(lang, 'Provide annual return and max drawdown to compute Calmar ratio.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
