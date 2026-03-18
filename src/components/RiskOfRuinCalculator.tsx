import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { AlertTriangle, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const WIN_RATE_PRESETS = [40, 45, 50, 55];
const REWARD_RISK_PRESETS = [1, 1.5, 2, 3];
const RISK_PER_TRADE_PRESETS = [0.5, 1, 2, 3, 5];
const MAX_DRAWDOWN_PRESETS = [20, 30, 40, 50];
const RISK_OF_RUIN_SCENARIOS = [
  {
    label: 'Conservative',
    winRate: '50',
    rewardRisk: '1.5',
    riskPerTrade: '1',
    maxDrawdown: '20',
  },
  {
    label: 'Balanced',
    winRate: '45',
    rewardRisk: '1.8',
    riskPerTrade: '2',
    maxDrawdown: '30',
  },
  {
    label: 'Aggressive',
    winRate: '40',
    rewardRisk: '1.2',
    riskPerTrade: '5',
    maxDrawdown: '40',
  },
] as const;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function RiskOfRuinCalculator({ lang = 'en' }: { lang?: string }) {
  const [winRate, setWinRate] = useState('45');
  const [rewardRisk, setRewardRisk] = useState('1.8');
  const [riskPerTrade, setRiskPerTrade] = useState('2');
  const [maxDrawdown, setMaxDrawdown] = useState('30');
  const applyScenario = (scenario: (typeof RISK_OF_RUIN_SCENARIOS)[number]) => {
    setWinRate(scenario.winRate);
    setRewardRisk(scenario.rewardRisk);
    setRiskPerTrade(scenario.riskPerTrade);
    setMaxDrawdown(scenario.maxDrawdown);
  };
  const isScenarioActive = (scenario: (typeof RISK_OF_RUIN_SCENARIOS)[number]) => (
    winRate === scenario.winRate
    && rewardRisk === scenario.rewardRisk
    && riskPerTrade === scenario.riskPerTrade
    && maxDrawdown === scenario.maxDrawdown
  );

  const result = useMemo(() => {
    const p = Number(winRate) / 100;
    const rr = Number(rewardRisk);
    const risk = Number(riskPerTrade);
    const dd = Number(maxDrawdown);

    if ([p, rr, risk, dd].some((v) => !Number.isFinite(v)) || p <= 0 || p >= 1 || rr <= 0 || risk <= 0 || dd <= 0) {
      return null;
    }

    const q = 1 - p;
    const expectancyR = p * rr - q;
    const kelly = (rr * p - q) / rr;
    const halfKellyPct = Math.max(0, kelly / 2) * 100;

    const unitsToRuin = dd / risk;
    let ruinProbability = 1;
    if (expectancyR > 0) {
      const base = q / (p * rr);
      ruinProbability = Math.pow(base, unitsToRuin);
    }
    ruinProbability = clamp(ruinProbability, 0, 1);

    let riskLabel = 'High';
    if (ruinProbability <= 0.1) riskLabel = 'Low';
    else if (ruinProbability <= 0.3) riskLabel = 'Moderate';

    return {
      expectancyR,
      ruinProbability,
      riskLabel,
      unitsToRuin,
      halfKellyPct,
    };
  }, [winRate, rewardRisk, riskPerTrade, maxDrawdown]);

  const reset = () => {
    setWinRate('45');
    setRewardRisk('1.8');
    setRiskPerTrade('2');
    setMaxDrawdown('30');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {RISK_OF_RUIN_SCENARIOS.map((scenario) => (
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
            <label>{getUiString(lang, 'Win Rate (%)')}</label>
            <div className="pills-row">
              {WIN_RATE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${winRate === String(preset) ? 'active' : ''}`}
                  onClick={() => setWinRate(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={winRate} onChange={(e) => setWinRate(e.target.value)} min="0.1" max="99.9" step="any" id="ror-win-rate" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Reward-to-Risk Ratio')}</label>
            <div className="pills-row">
              {REWARD_RISK_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${rewardRisk === String(preset) ? 'active' : ''}`}
                  onClick={() => setRewardRisk(String(preset))}
                >
                  {preset}x
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={rewardRisk} onChange={(e) => setRewardRisk(e.target.value)} min="0.01" step="any" id="ror-rr" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Risk per Trade (%)')}</label>
            <div className="pills-row">
              {RISK_PER_TRADE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${riskPerTrade === String(preset) ? 'active' : ''}`}
                  onClick={() => setRiskPerTrade(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={riskPerTrade} onChange={(e) => setRiskPerTrade(e.target.value)} min="0.01" step="any" id="ror-risk-trade" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Max Tolerable Drawdown (%)')}</label>
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
              <input type="number" inputMode="decimal" value={maxDrawdown} onChange={(e) => setMaxDrawdown(e.target.value)} min="0.1" step="any" id="ror-max-dd" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Lower risk per trade usually reduces ruin probability fastest.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.ruinProbability <= 0.1 ? 'profit' : result.ruinProbability <= 0.3 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Estimated Risk of Ruin')}</span>
                <span className="result-hero-value"><AlertTriangle size={28} />{(result.ruinProbability * 100).toFixed(2)}%</span>
                <span className={`result-hero-roi ${result.ruinProbability <= 0.1 ? 'profit' : result.ruinProbability <= 0.3 ? '' : 'loss'}`}>{getUiString(lang, result.riskLabel)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Expectancy per trade (R)')}</span><span className={`result-value ${result.expectancyR >= 0 ? 'profit' : 'loss'}`}>{result.expectancyR >= 0 ? '+' : ''}{result.expectancyR.toFixed(3)}R</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Loss units to ruin threshold')}</span><span className="result-value">{result.unitsToRuin.toFixed(1)} {getUiString(lang, 'units')}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Suggested max risk (Half Kelly)')}</span><span className={`result-value ${result.halfKellyPct >= 0 ? 'profit' : 'loss'}`}>{result.halfKellyPct.toFixed(2)}%</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Model uses simplified fixed-risk assumptions. Real trading outcomes vary due to slippage, regime changes, and non-independent outcomes.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid strategy stats')}</h3><p>{getUiString(lang, 'Set win rate, reward/risk, and risk per trade to estimate ruin probability.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(RiskOfRuinCalculator);
