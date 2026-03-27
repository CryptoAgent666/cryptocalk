import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const PORTFOLIO_VALUE_PRESETS = [10000, 20000, 50000, 100000];
const EXPECTED_RETURN_PRESETS = [8, 12, 18, 22, 30];
const VOLATILITY_PRESETS = [15, 25, 35, 45];
const RISK_FREE_PRESETS = [2, 4, 5];
const HORIZON_PRESETS = [1, 3, 5];
const SHARPE_SCENARIOS = [
  { label: 'Conservative', portfolioValue: '10000', expectedReturn: '8', volatility: '15', riskFreeRate: '4', horizonYears: '1' },
  { label: 'Balanced', portfolioValue: '20000', expectedReturn: '12', volatility: '25', riskFreeRate: '4', horizonYears: '3' },
  { label: 'Growth', portfolioValue: '50000', expectedReturn: '22', volatility: '35', riskFreeRate: '4', horizonYears: '3' },
  { label: 'Aggressive', portfolioValue: '100000', expectedReturn: '30', volatility: '45', riskFreeRate: '5', horizonYears: '5' },
] as const;



function SharpeCalculator({ lang = 'en' }: { lang?: string }) {
  function formatUSD(value: number): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  const [portfolioValue, setPortfolioValue] = useState('20000');
  const [expectedReturn, setExpectedReturn] = useState('22');
  const [volatility, setVolatility] = useState('35');
  const [riskFreeRate, setRiskFreeRate] = useState('4');
  const [horizonYears, setHorizonYears] = useState('1');
  const applyScenario = (scenario: (typeof SHARPE_SCENARIOS)[number]) => {
    setPortfolioValue(scenario.portfolioValue);
    setExpectedReturn(scenario.expectedReturn);
    setVolatility(scenario.volatility);
    setRiskFreeRate(scenario.riskFreeRate);
    setHorizonYears(scenario.horizonYears);
  };
  const isScenarioActive = (scenario: (typeof SHARPE_SCENARIOS)[number]) => (
    portfolioValue === scenario.portfolioValue
    && expectedReturn === scenario.expectedReturn
    && volatility === scenario.volatility
    && riskFreeRate === scenario.riskFreeRate
    && horizonYears === scenario.horizonYears
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const mu = Number(expectedReturn);
    const sigma = Number(volatility);
    const rf = Number(riskFreeRate);
    const years = Number(horizonYears);

    if ([value, mu, sigma, rf, years].some((v) => !Number.isFinite(v)) || value <= 0 || sigma <= 0 || years <= 0) {
      return null;
    }

    const excessReturn = mu - rf;
    const sharpe = excessReturn / sigma;

    const annualExcessUsd = value * (excessReturn / 100);
    const horizonMeanReturnPct = mu * years;
    const horizonVolPct = sigma * Math.sqrt(years);

    const lowerBoundValue = value * (1 + (horizonMeanReturnPct - horizonVolPct) / 100);
    const upperBoundValue = value * (1 + (horizonMeanReturnPct + horizonVolPct) / 100);

    let rating = 'Weak';
    if (sharpe >= 2) rating = 'Excellent';
    else if (sharpe >= 1) rating = 'Good';
    else if (sharpe >= 0.5) rating = 'Moderate';

    return {
      sharpe,
      excessReturn,
      annualExcessUsd,
      lowerBoundValue,
      upperBoundValue,
      rating,
    };
  }, [portfolioValue, expectedReturn, volatility, riskFreeRate, horizonYears]);

  const reset = () => {
    setPortfolioValue('20000');
    setExpectedReturn('22');
    setVolatility('35');
    setRiskFreeRate('4');
    setHorizonYears('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SHARPE_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {getUiString(lang, scenario.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Portfolio Value (USD)')}</label>
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
              <input type="number" inputMode="decimal" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} min="0" step="any" id="sharpe-value" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Expected Annual Return (%)')}</label>
            <div className="pills-row">
              {EXPECTED_RETURN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${expectedReturn === String(preset) ? 'active' : ''}`}
                  onClick={() => setExpectedReturn(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} step="any" id="sharpe-return" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Annual Volatility (%)')}</label>
            <div className="pills-row">
              {VOLATILITY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${volatility === String(preset) ? 'active' : ''}`}
                  onClick={() => setVolatility(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={volatility} onChange={(e) => setVolatility(e.target.value)} min="0.01" step="any" id="sharpe-volatility" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Risk-Free Rate (%)')}</label>
            <div className="pills-row">
              {RISK_FREE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${riskFreeRate === String(preset) ? 'active' : ''}`}
                  onClick={() => setRiskFreeRate(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} step="any" id="sharpe-rf" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Analysis Horizon (years)')}</label>
            <div className="pills-row">
              {HORIZON_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${horizonYears === String(preset) ? 'active' : ''}`}
                  onClick={() => setHorizonYears(String(preset))}
                >
                  {preset}y
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={horizonYears} onChange={(e) => setHorizonYears(e.target.value)} min="0.1" step="any" id="sharpe-years" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Keep return, volatility, and risk-free assumptions on the same horizon.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.sharpe >= 1 ? 'profit' : result.sharpe >= 0.5 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Sharpe Ratio')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />{result.sharpe.toFixed(3)}</span>
                <span className={`result-hero-roi ${result.sharpe >= 1 ? 'profit' : result.sharpe >= 0.5 ? '' : 'loss'}`}>{getUiString(lang, result.rating)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Expected excess return')}</span><span className={`result-value ${result.excessReturn >= 0 ? 'profit' : 'loss'}`}>{result.excessReturn >= 0 ? '+' : ''}{result.excessReturn.toFixed(2)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Annual excess return (USD)')}</span><span className={`result-value ${result.annualExcessUsd >= 0 ? 'profit' : 'loss'}`}>{result.annualExcessUsd >= 0 ? '+' : ''}{formatUSD(result.annualExcessUsd)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, '1σ downside scenario value')}</span><span className="result-value">{formatUSD(result.lowerBoundValue)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, '1σ upside scenario value')}</span><span className="result-value">{formatUSD(result.upperBoundValue)}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Sharpe uses average return and volatility assumptions. Use it for comparative ranking, not guaranteed performance forecasting.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid portfolio inputs')}</h3><p>{getUiString(lang, 'Set return, volatility, and risk-free rate to estimate Sharpe-adjusted performance.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(SharpeCalculator);
