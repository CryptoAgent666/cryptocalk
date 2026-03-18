import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Info, RotateCcw, ShieldCheck, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const EXPECTED_RETURN_PRESETS = [12, 18, 24, 30];
const RISK_FREE_PRESETS = [3, 4, 5];
const BETA_PRESETS = [0.8, 1, 1.2, 1.5];
const HORIZON_YEAR_PRESETS = [1, 3, 5];
const PORTFOLIO_VALUE_PRESETS = [10000, 25000, 50000, 100000];
const TREYNOR_SCENARIOS = [
  { label: 'Defensive', expectedReturn: '12', riskFreeRate: '4', beta: '0.8', years: '1' },
  { label: 'Balanced', expectedReturn: '18', riskFreeRate: '4', beta: '1.2', years: '1' },
  { label: 'Aggressive', expectedReturn: '24', riskFreeRate: '5', beta: '1.5', years: '3' },
];

function TreynorCalculator({ lang = 'en' }: { lang?: string }) {
  function formatUSD(value: number): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const [portfolioValue, setPortfolioValue] = useState('25000');
  const [expectedReturn, setExpectedReturn] = useState('18');
  const [riskFreeRate, setRiskFreeRate] = useState('4');
  const [beta, setBeta] = useState('1.2');
  const [years, setYears] = useState('1');
  const applyScenario = (scenario: (typeof TREYNOR_SCENARIOS)[number]) => {
    setExpectedReturn(scenario.expectedReturn);
    setRiskFreeRate(scenario.riskFreeRate);
    setBeta(scenario.beta);
    setYears(scenario.years);
  };
  const isScenarioActive = (scenario: (typeof TREYNOR_SCENARIOS)[number]) => (
    expectedReturn === scenario.expectedReturn
    && riskFreeRate === scenario.riskFreeRate
    && beta === scenario.beta
    && years === scenario.years
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const expected = Number(expectedReturn);
    const riskFree = Number(riskFreeRate);
    const marketBeta = Number(beta);
    const horizon = Number(years);

    if (
      [value, expected, riskFree, marketBeta, horizon].some((v) => !Number.isFinite(v)) ||
      value <= 0 ||
      marketBeta <= 0 ||
      horizon <= 0
    ) {
      return null;
    }

    const excessReturn = expected - riskFree;
    const treynor = excessReturn / marketBeta;
    const annualExcessUsd = value * (excessReturn / 100);
    const projectedValue = value * Math.pow(1 + expected / 100, horizon);
    const riskFreeProjection = value * Math.pow(1 + riskFree / 100, horizon);
    const projectionAlpha = projectedValue - riskFreeProjection;
    const betaAdjustedExposure = value * marketBeta;

    let rating = 'Weak';
    if (treynor >= 12) rating = 'Excellent';
    else if (treynor >= 6) rating = 'Good';
    else if (treynor >= 2) rating = 'Moderate';

    return {
      treynor,
      excessReturn,
      annualExcessUsd,
      projectedValue,
      riskFreeProjection,
      projectionAlpha,
      betaAdjustedExposure,
      rating,
    };
  }, [portfolioValue, expectedReturn, riskFreeRate, beta, years]);

  const reset = () => {
    setPortfolioValue('25000');
    setExpectedReturn('18');
    setRiskFreeRate('4');
    setBeta('1.2');
    setYears('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {TREYNOR_SCENARIOS.map((scenario) => (
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
            <label>Portfolio Value (USD)</label>
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
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input
                type="number" inputMode="decimal"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(e.target.value)}
                min="0"
                step="any"
                id="treynor-value"
                onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Expected Annual Return (%)</label>
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
              <input
                type="number" inputMode="decimal"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                step="any"
                id="treynor-return"
                onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Risk-Free Rate (%)</label>
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
              <input
                type="number" inputMode="decimal"
                value={riskFreeRate}
                onChange={(e) => setRiskFreeRate(e.target.value)}
                step="any"
                id="treynor-rf"
                onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Portfolio Beta</label>
            <div className="pills-row">
              {BETA_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${beta === String(preset) ? 'active' : ''}`}
                  onClick={() => setBeta(String(preset))}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="number" inputMode="decimal"
              value={beta}
              onChange={(e) => setBeta(e.target.value)}
              min="0.01"
              step="any"
              id="treynor-beta"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>Projection Horizon (years)</label>
            <div className="pills-row">
              {HORIZON_YEAR_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${years === String(preset) ? 'active' : ''}`}
                  onClick={() => setYears(String(preset))}
                >
                  {preset}y
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} min="0.1" step="any" id="treynor-years" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
          <span className="input-hint">
            Auto-calculates as you type. Compare strategies at the same beta and horizon.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.treynor >= 6 ? 'profit' : result.treynor >= 2 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Treynor Ratio')}</span>
                <span className="result-hero-value">
                  <ShieldCheck size={28} />
                  {result.treynor.toFixed(3)}
                </span>
                <span className={`result-hero-roi ${result.treynor >= 6 ? 'profit' : result.treynor >= 2 ? '' : 'loss'}`}>{getUiString(lang, result.rating)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Excess return vs risk-free')}</span>
                  <span className={`result-value ${result.excessReturn >= 0 ? 'profit' : 'loss'}`}>
                    {result.excessReturn >= 0 ? '+' : ''}
                    {result.excessReturn.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual excess return (USD)')}</span>
                  <span className={`result-value ${result.annualExcessUsd >= 0 ? 'profit' : 'loss'}`}>
                    {result.annualExcessUsd >= 0 ? '+' : ''}
                    {formatUSD(result.annualExcessUsd)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Beta-adjusted exposure')}</span>
                  <span className="result-value">{formatUSD(result.betaAdjustedExposure)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Projected portfolio value')}</span>
                  <span className="result-value">{formatUSD(result.projectedValue)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Risk-free baseline value')}</span>
                  <span className="result-value">{formatUSD(result.riskFreeProjection)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Projected alpha vs baseline')}</span>
                  <span className={`result-value ${result.projectionAlpha >= 0 ? 'profit' : 'loss'}`}>
                    {result.projectionAlpha >= 0 ? '+' : ''}
                    {formatUSD(result.projectionAlpha)}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'Treynor isolates return per unit of systematic market risk (beta). Use it to compare strategies with different beta exposures.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon">
                <TrendingUp size={40} />
              </div>
              <h3>{getUiString(lang, 'Enter valid inputs')}</h3>
              <p>{getUiString(lang, 'Provide expected return, risk-free rate, beta, and horizon to compute Treynor ratio.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(TreynorCalculator);
