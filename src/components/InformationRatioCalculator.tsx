import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp } from 'lucide-react';

const PORTFOLIO_RETURN_PRESETS = [10, 12, 16, 20];
const BENCHMARK_RETURN_PRESETS = [6, 8, 10, 12];
const TRACKING_ERROR_PRESETS = [3, 6, 9, 12];
const HORIZON_YEAR_PRESETS = [1, 3, 5];
const PORTFOLIO_VALUE_PRESETS = [10000, 30000, 50000, 100000];
const IR_SCENARIOS = [
  { label: 'Index-Like', portfolioReturn: '12', benchmarkReturn: '10', trackingError: '3', years: '1' },
  { label: 'Balanced Active', portfolioReturn: '16', benchmarkReturn: '10', trackingError: '6', years: '1' },
  { label: 'High Alpha', portfolioReturn: '20', benchmarkReturn: '10', trackingError: '9', years: '3' },
];

function formatUSD(value: number): string {
  return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function InformationRatioCalculator({ lang = 'en' }: { lang?: string }) {
  const [portfolioValue, setPortfolioValue] = useState('30000');
  const [portfolioReturn, setPortfolioReturn] = useState('16');
  const [benchmarkReturn, setBenchmarkReturn] = useState('10');
  const [trackingError, setTrackingError] = useState('6');
  const [years, setYears] = useState('1');
  const applyScenario = (scenario: (typeof IR_SCENARIOS)[number]) => {
    setPortfolioReturn(scenario.portfolioReturn);
    setBenchmarkReturn(scenario.benchmarkReturn);
    setTrackingError(scenario.trackingError);
    setYears(scenario.years);
  };
  const isScenarioActive = (scenario: (typeof IR_SCENARIOS)[number]) => (
    portfolioReturn === scenario.portfolioReturn
    && benchmarkReturn === scenario.benchmarkReturn
    && trackingError === scenario.trackingError
    && years === scenario.years
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const portfolio = Number(portfolioReturn);
    const benchmark = Number(benchmarkReturn);
    const te = Number(trackingError);
    const horizon = Number(years);

    if ([value, portfolio, benchmark, te, horizon].some((v) => !Number.isFinite(v)) || value <= 0 || te <= 0 || horizon <= 0) {
      return null;
    }

    const activeReturn = portfolio - benchmark;
    const informationRatio = activeReturn / te;
    const annualAlphaUsd = value * (activeReturn / 100);
    const portfolioProjection = value * Math.pow(1 + portfolio / 100, horizon);
    const benchmarkProjection = value * Math.pow(1 + benchmark / 100, horizon);
    const relativeOutperformance = portfolioProjection - benchmarkProjection;

    let rating = 'Weak';
    if (informationRatio >= 1) rating = 'Excellent';
    else if (informationRatio >= 0.5) rating = 'Good';
    else if (informationRatio >= 0.2) rating = 'Moderate';

    return {
      informationRatio,
      activeReturn,
      annualAlphaUsd,
      portfolioProjection,
      benchmarkProjection,
      relativeOutperformance,
      rating,
    };
  }, [portfolioValue, portfolioReturn, benchmarkReturn, trackingError, years]);

  const reset = () => {
    setPortfolioValue('30000');
    setPortfolioReturn('16');
    setBenchmarkReturn('10');
    setTrackingError('6');
    setYears('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {IR_SCENARIOS.map((scenario) => (
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
                id="ir-value"
               onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Portfolio Return (%)</label>
            <div className="pills-row">
              {PORTFOLIO_RETURN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${portfolioReturn === String(preset) ? 'active' : ''}`}
                  onClick={() => setPortfolioReturn(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={portfolioReturn} onChange={(e) => setPortfolioReturn(e.target.value)} step="any" id="ir-portfolio-return"  onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Benchmark Return (%)</label>
            <div className="pills-row">
              {BENCHMARK_RETURN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${benchmarkReturn === String(preset) ? 'active' : ''}`}
                  onClick={() => setBenchmarkReturn(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={benchmarkReturn} onChange={(e) => setBenchmarkReturn(e.target.value)} step="any" id="ir-benchmark-return"  onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>Tracking Error (%)</label>
            <div className="pills-row">
              {TRACKING_ERROR_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${trackingError === String(preset) ? 'active' : ''}`}
                  onClick={() => setTrackingError(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={trackingError} onChange={(e) => setTrackingError(e.target.value)} min="0.01" step="any" id="ir-tracking-error"  onFocus={(e) => e.target.select()} />
            </div>
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
            <input type="number" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} min="0.1" step="any" id="ir-years"  onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
          <span className="input-hint">
            Auto-calculates as you type. Keep benchmark and horizon consistent across comparisons.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.informationRatio >= 0.5 ? 'profit' : result.informationRatio >= 0.2 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Information Ratio')}</span>
                <span className="result-hero-value">
                  <BarChart3 size={28} />
                  {result.informationRatio.toFixed(3)}
                </span>
                <span className={`result-hero-roi ${result.informationRatio >= 0.5 ? 'profit' : result.informationRatio >= 0.2 ? '' : 'loss'}`}>{getUiString(lang, result.rating)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Active return')}</span>
                  <span className={`result-value ${result.activeReturn >= 0 ? 'profit' : 'loss'}`}>
                    {result.activeReturn >= 0 ? '+' : ''}
                    {result.activeReturn.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual alpha (USD)')}</span>
                  <span className={`result-value ${result.annualAlphaUsd >= 0 ? 'profit' : 'loss'}`}>
                    {result.annualAlphaUsd >= 0 ? '+' : ''}
                    {formatUSD(result.annualAlphaUsd)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Portfolio projection')}</span>
                  <span className="result-value">{formatUSD(result.portfolioProjection)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Benchmark projection')}</span>
                  <span className="result-value">{formatUSD(result.benchmarkProjection)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Projected outperformance')}</span>
                  <span className={`result-value ${result.relativeOutperformance >= 0 ? 'profit' : 'loss'}`}>
                    {result.relativeOutperformance >= 0 ? '+' : ''}
                    {formatUSD(result.relativeOutperformance)}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'Information ratio measures active return per unit of tracking error. It is useful when comparing active portfolio strategies against a benchmark.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon">
                <TrendingUp size={40} />
              </div>
              <h3>{getUiString(lang, 'Enter valid inputs')}</h3>
              <p>{getUiString(lang, 'Provide portfolio return, benchmark return, and tracking error to compute information ratio.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
