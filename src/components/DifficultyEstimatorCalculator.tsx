import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Activity, BarChart3, DollarSign, Info, Percent, RotateCcw } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const DIFFICULTY_PILLS = ['70', '85', '100', '120'];
const CHANGE_PILLS = ['-10', '-5', '5', '8', '15'];
const REVENUE_PILLS = ['50', '120', '250', '500'];
const SHARE_PILLS = ['0.001', '0.0025', '0.005', '0.01'];
const DIFFICULTY_SCENARIOS = [
  { label: 'Base Case', currentDifficulty: '85', expectedChange: '8', dailyRevenue: '120', hashrateShare: '0.0025' },
  { label: 'Difficulty Drop', currentDifficulty: '85', expectedChange: '-5', dailyRevenue: '120', hashrateShare: '0.0025' },
  { label: 'Hashrate Surge', currentDifficulty: '100', expectedChange: '15', dailyRevenue: '250', hashrateShare: '0.005' },
] as const;

// formatUSD is defined inside the component to access `lang` prop

function DifficultyEstimatorCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const [currentDifficulty, setCurrentDifficulty] = useState('85');
  const [expectedChange, setExpectedChange] = useState('8');
  const [dailyRevenue, setDailyRevenue] = useState('120');
  const [hashrateShare, setHashrateShare] = useState('0.0025');
  const applyScenario = (scenario: (typeof DIFFICULTY_SCENARIOS)[number]) => {
    setCurrentDifficulty(scenario.currentDifficulty);
    setExpectedChange(scenario.expectedChange);
    setDailyRevenue(scenario.dailyRevenue);
    setHashrateShare(scenario.hashrateShare);
  };
  const isScenarioActive = (scenario: (typeof DIFFICULTY_SCENARIOS)[number]) => (
    currentDifficulty === scenario.currentDifficulty
    && expectedChange === scenario.expectedChange
    && dailyRevenue === scenario.dailyRevenue
    && hashrateShare === scenario.hashrateShare
  );

  const result = useMemo(() => {
    const diff = Number(currentDifficulty);
    const change = Number(expectedChange);
    const revenue = Number(dailyRevenue);
    const share = Number(hashrateShare);

    if ([diff, change, revenue, share].some((v) => !Number.isFinite(v)) || revenue <= 0 || diff <= 0 || share <= 0) {
      return null;
    }

    const projectedDifficulty = diff * (1 + change / 100);
    const projectedRevenue = revenue / (1 + change / 100);
    const dailyDelta = projectedRevenue - revenue;
    const monthlyDelta = dailyDelta * 30;

    return {
      projectedDifficulty,
      projectedRevenue,
      dailyDelta,
      monthlyDelta,
      networkSharePct: share * 100,
    };
  }, [currentDifficulty, expectedChange, dailyRevenue, hashrateShare]);

  const reset = () => {
    setCurrentDifficulty('85');
    setExpectedChange('8');
    setDailyRevenue('120');
    setHashrateShare('0.0025');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {DIFFICULTY_SCENARIOS.map((scenario) => (
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
            <label>
              <Activity size={14} />
              {getUiString(lang, 'Current Difficulty (T)')}
            </label>
            <div className="pills-row">
              {DIFFICULTY_PILLS.map((pill) => (
                <button
                  key={pill}
                  className={`pill-btn ${currentDifficulty === pill ? 'active' : ''}`}
                  onClick={() => setCurrentDifficulty(pill)}
                >
                  {pill}T
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={currentDifficulty} onChange={(e) => setCurrentDifficulty(e.target.value)} min="0" step="any" id="difficulty-current" onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="input-group">
            <label>
              <Percent size={14} />
              {getUiString(lang, 'Expected Difficulty Change (%)')}
            </label>
            <div className="pills-row">
              {CHANGE_PILLS.map((pill) => (
                <button
                  key={pill}
                  className={`pill-btn ${expectedChange === pill ? 'active' : ''}`}
                  onClick={() => setExpectedChange(pill)}
                >
                  {pill}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={expectedChange} onChange={(e) => setExpectedChange(e.target.value)} step="any" id="difficulty-change" onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="input-group">
            <label>
              <DollarSign size={14} />
              {getUiString(lang, 'Current Daily Revenue (USD)')}
            </label>
            <div className="pills-row">
              {REVENUE_PILLS.map((pill) => (
                <button
                  key={pill}
                  className={`pill-btn ${dailyRevenue === pill ? 'active' : ''}`}
                  onClick={() => setDailyRevenue(pill)}
                >
                  ${pill}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={dailyRevenue} onChange={(e) => setDailyRevenue(e.target.value)} min="0" step="any" id="difficulty-revenue" onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="input-group">
            <label>
              <Percent size={14} />
              {getUiString(lang, 'Your Network Share (fraction)')}
            </label>
            <div className="pills-row">
              {SHARE_PILLS.map((pill) => (
                <button
                  key={pill}
                  className={`pill-btn ${hashrateShare === pill ? 'active' : ''}`}
                  onClick={() => setHashrateShare(pill)}
                >
                  {pill}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={hashrateShare} onChange={(e) => setHashrateShare(e.target.value)} min="0" step="any" id="difficulty-share" onFocus={(e) => e.target.select()} />
              <span className="input-unit">{getUiString(lang, 'e.g.')} 0.0025</span>
            </div>
          </div>
          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type.')} 0.0025 = 0.25% {getUiString(lang, 'network share')}.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.dailyDelta >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Projected Daily Revenue')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />{formatUSD(result.projectedRevenue)}</span>
                <span className={`result-hero-roi ${result.dailyDelta >= 0 ? 'profit' : 'loss'}`}>
                  {result.dailyDelta >= 0 ? '+' : ''}{formatUSD(result.dailyDelta)} / {getUiString(lang, 'day')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Projected difficulty')}</span><span className="result-value">{result.projectedDifficulty.toFixed(2)} T</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Revenue delta (monthly)')}</span><span className={`result-value ${result.monthlyDelta >= 0 ? 'profit' : 'fee'}`}>{result.monthlyDelta >= 0 ? '+' : ''}{formatUSD(result.monthlyDelta)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Estimated network share')}</span><span className="result-value">{result.networkSharePct.toFixed(4)}%</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Difficulty and price dynamics are independent in reality. Treat this as directional scenario planning only.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><BarChart3 size={40} /></div><h3>{getUiString(lang, 'Enter valid mining assumptions')}</h3><p>{getUiString(lang, 'Provide difficulty and revenue inputs to model the next adjustment impact.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DifficultyEstimatorCalculator);
