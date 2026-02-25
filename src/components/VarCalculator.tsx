import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { AlertTriangle, Info, RotateCcw, TrendingUp } from 'lucide-react';

function formatUSD(value: number): string {
  return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const Z_SCORE: Record<string, number> = {
  '90': 1.2816,
  '95': 1.6449,
  '99': 2.3263,
};

const VOLATILITY_PRESETS = [2, 4, 6, 8, 10];
const HORIZON_PRESETS = [1, 7, 30, 90];
const VAR_SCENARIOS = [
  {
    label: 'Conservative',
    portfolioValue: '25000',
    dailyVolatility: '2',
    timeHorizonDays: '1',
    confidence: '95' as const,
  },
  {
    label: 'Balanced',
    portfolioValue: '25000',
    dailyVolatility: '4',
    timeHorizonDays: '7',
    confidence: '95' as const,
  },
  {
    label: 'Stress Test',
    portfolioValue: '50000',
    dailyVolatility: '8',
    timeHorizonDays: '30',
    confidence: '99' as const,
  },
] as const;

export default function VarCalculator({ lang = 'en' }: { lang?: string }) {
  const [portfolioValue, setPortfolioValue] = useState('25000');
  const [dailyVolatility, setDailyVolatility] = useState('4');
  const [timeHorizonDays, setTimeHorizonDays] = useState('1');
  const [confidence, setConfidence] = useState<'90' | '95' | '99'>('95');
  const applyScenario = (scenario: (typeof VAR_SCENARIOS)[number]) => {
    setPortfolioValue(scenario.portfolioValue);
    setDailyVolatility(scenario.dailyVolatility);
    setTimeHorizonDays(scenario.timeHorizonDays);
    setConfidence(scenario.confidence);
  };
  const isScenarioActive = (scenario: (typeof VAR_SCENARIOS)[number]) => (
    portfolioValue === scenario.portfolioValue
    && dailyVolatility === scenario.dailyVolatility
    && timeHorizonDays === scenario.timeHorizonDays
    && confidence === scenario.confidence
  );

  const result = useMemo(() => {
    const value = Number(portfolioValue);
    const vol = Number(dailyVolatility) / 100;
    const days = Number(timeHorizonDays);
    const c = Number(confidence) / 100;
    const z = Z_SCORE[confidence];

    if ([value, vol, days, c, z].some((v) => !Number.isFinite(v)) || value <= 0 || vol <= 0 || days <= 0) {
      return null;
    }

    const sigmaHorizon = vol * Math.sqrt(days);
    const varAmount = value * z * sigmaHorizon;
    const varPct = (varAmount / value) * 100;

    const pdf = (1 / Math.sqrt(2 * Math.PI)) * Math.exp((-0.5) * z * z);
    const tailProb = 1 - c;
    const expectedShortfall = value * sigmaHorizon * (pdf / tailProb);
    const expectedShortfallPct = (expectedShortfall / value) * 100;

    return {
      varAmount,
      varPct,
      expectedShortfall,
      expectedShortfallPct,
    };
  }, [portfolioValue, dailyVolatility, timeHorizonDays, confidence]);

  const reset = () => {
    setPortfolioValue('25000');
    setDailyVolatility('4');
    setTimeHorizonDays('1');
    setConfidence('95');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {VAR_SCENARIOS.map((scenario) => (
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
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={portfolioValue} onChange={(e) => setPortfolioValue(e.target.value)} min="0" step="any" id="var-portfolio" />
            </div>
          </div>

          <div className="input-group">
            <label>Daily Volatility (%)</label>
            <div className="pills-row">
              {VOLATILITY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${dailyVolatility === String(preset) ? 'active' : ''}`}
                  onClick={() => setDailyVolatility(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={dailyVolatility} onChange={(e) => setDailyVolatility(e.target.value)} min="0" step="any" id="var-daily-vol" />
            </div>
          </div>

          <div className="input-group">
            <label>Time Horizon (days)</label>
            <div className="pills-row">
              {HORIZON_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${timeHorizonDays === String(preset) ? 'active' : ''}`}
                  onClick={() => setTimeHorizonDays(String(preset))}
                >
                  {preset}d
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={timeHorizonDays} onChange={(e) => setTimeHorizonDays(e.target.value)} min="1" step="1" id="var-horizon" />
          </div>

          <div className="input-group">
            <label>Confidence Level</label>
            <div className="toggle-group" role="tablist" aria-label="Confidence level">
              {(['90', '95', '99'] as const).map((level) => (
                <button
                  type="button"
                  key={level}
                  className={`toggle-btn ${confidence === level ? 'active' : ''}`}
                  onClick={() => setConfidence(level)}
                >
                  {level}%
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> Reset</button>
          <span className="input-hint">
            Auto-calculates as you type. 95% confidence is the common baseline for portfolio risk checks.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero loss">
                <span className="result-hero-label">Value at Risk ({confidence}%)</span>
                <span className="result-hero-value"><AlertTriangle size={28} />{formatUSD(result.varAmount)}</span>
                <span className="result-hero-roi loss">{result.varPct.toFixed(2)}% portfolio downside threshold</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'VaR loss threshold')}</span><span className="result-value fee">-{formatUSD(result.varAmount)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'VaR as % of portfolio')}</span><span className="result-value fee">-{result.varPct.toFixed(2)}%</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Expected Shortfall (CVaR)')}</span><span className="result-value fee">-{formatUSD(result.expectedShortfall)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'CVaR as % of portfolio')}</span><span className="result-value fee">-{result.expectedShortfallPct.toFixed(2)}%</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Parametric VaR assumes normally distributed returns and stable volatility. Stress scenarios can exceed these estimates.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid risk inputs')}</h3><p>{getUiString(lang, 'Set portfolio size, volatility, and horizon to estimate VaR and CVaR.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
