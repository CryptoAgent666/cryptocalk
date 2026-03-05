import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp } from 'lucide-react';

const EXPECTED_RETURN_PRESETS = [12, 18, 24, 36];
const RISK_FREE_PRESETS = [3, 4, 5];
const DOWNSIDE_DEV_PRESETS = [8, 12, 16, 20];
const HORIZON_YEAR_PRESETS = [1, 3, 5];
const SORTINO_SCENARIOS = [
  {
    label: 'Balanced',
    portfolioValue: '25000',
    expectedReturn: '24',
    riskFreeRate: '4',
    downsideDeviation: '12',
    years: '1',
  },
  {
    label: 'Conservative',
    portfolioValue: '25000',
    expectedReturn: '12',
    riskFreeRate: '4',
    downsideDeviation: '8',
    years: '3',
  },
  {
    label: 'Aggressive',
    portfolioValue: '50000',
    expectedReturn: '36',
    riskFreeRate: '5',
    downsideDeviation: '20',
    years: '1',
  },
] as const;



export default function SortinoCalculator({ lang = 'en' }: { lang?: string }) {
  function formatUSD(value: number): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  const [portfolioValue, setPortfolioValue] = useState('25000');
  const [expectedReturn, setExpectedReturn] = useState('24');
  const [riskFreeRate, setRiskFreeRate] = useState('4');
  const [downsideDeviation, setDownsideDeviation] = useState('12');
  const [years, setYears] = useState('1');
  const applyScenario = (scenario: (typeof SORTINO_SCENARIOS)[number]) => {
    setPortfolioValue(scenario.portfolioValue);
    setExpectedReturn(scenario.expectedReturn);
    setRiskFreeRate(scenario.riskFreeRate);
    setDownsideDeviation(scenario.downsideDeviation);
    setYears(scenario.years);
  };
  const isScenarioActive = (scenario: (typeof SORTINO_SCENARIOS)[number]) => (
    portfolioValue === scenario.portfolioValue
    && expectedReturn === scenario.expectedReturn
    && riskFreeRate === scenario.riskFreeRate
    && downsideDeviation === scenario.downsideDeviation
    && years === scenario.years
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const mu = Number(expectedReturn);
    const rf = Number(riskFreeRate);
    const dd = Number(downsideDeviation);
    const horizon = Number(years);

    if ([value, mu, rf, dd, horizon].some((v) => !Number.isFinite(v)) || value <= 0 || dd <= 0 || horizon <= 0) {
      return null;
    }

    const excess = mu - rf;
    const sortino = excess / dd;
    const annualExcessUsd = value * (excess / 100);
    const horizonExpectedValue = value * Math.pow(1 + mu / 100, horizon);

    let rating = 'Weak';
    if (sortino >= 2) rating = 'Excellent';
    else if (sortino >= 1) rating = 'Good';
    else if (sortino >= 0.5) rating = 'Moderate';

    return {
      sortino,
      excess,
      annualExcessUsd,
      horizonExpectedValue,
      rating,
    };
  }, [portfolioValue, expectedReturn, riskFreeRate, downsideDeviation, years]);

  const reset = () => {
    setPortfolioValue('25000');
    setExpectedReturn('24');
    setRiskFreeRate('4');
    setDownsideDeviation('12');
    setYears('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SORTINO_SCENARIOS.map((scenario) => (
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
            <label>{getUiString(lang, 'Portfolio Value (USD)')}</label>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} min="0" step="any" id="sortino-value" onFocus={(e) => e.target.select()} />
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
              <input type="number" inputMode="decimal" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} step="any" id="sortino-return" onFocus={(e) => e.target.select()} />
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
              <input type="number" inputMode="decimal" value={riskFreeRate} onChange={(e) => setRiskFreeRate(e.target.value)} step="any" id="sortino-rf" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Downside Deviation (%)')}</label>
            <div className="pills-row">
              {DOWNSIDE_DEV_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${downsideDeviation === String(preset) ? 'active' : ''}`}
                  onClick={() => setDownsideDeviation(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={downsideDeviation} onChange={(e) => setDownsideDeviation(e.target.value)} min="0.01" step="any" id="sortino-dd" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Projection Horizon (years)')}</label>
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
            <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} min="0.1" step="any" id="sortino-years" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Use the same horizon and assumptions when comparing strategies.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.sortino >= 1 ? 'profit' : result.sortino >= 0.5 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Sortino Ratio')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />{result.sortino.toFixed(3)}</span>
                <span className={`result-hero-roi ${result.sortino >= 1 ? 'profit' : result.sortino >= 0.5 ? '' : 'loss'}`}>{getUiString(lang, result.rating)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Excess return (annual)')}</span><span className={`result-value ${result.excess >= 0 ? 'profit' : 'loss'}`}>{result.excess >= 0 ? '+' : ''}{result.excess.toFixed(2)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Excess return (USD/year)')}</span><span className={`result-value ${result.annualExcessUsd >= 0 ? 'profit' : 'loss'}`}>{result.annualExcessUsd >= 0 ? '+' : ''}{formatUSD(result.annualExcessUsd)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Projected portfolio value')}</span><span className="result-value">{formatUSD(result.horizonExpectedValue)}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Sortino focuses on downside volatility. It is useful for comparing strategies, but depends on stable return and risk assumptions.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid inputs')}</h3><p>{getUiString(lang, 'Provide return, risk-free rate, and downside deviation to compute Sortino ratio.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
