import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Dice5, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';



const KELLY_SCENARIOS = [
  { label: 'Conservative', winRate: '45', avgWinPct: '1.5', avgLossPct: '1', capital: '10000' },
  { label: 'Balanced', winRate: '55', avgWinPct: '1.8', avgLossPct: '1', capital: '10000' },
  { label: 'Aggressive', winRate: '60', avgWinPct: '2', avgLossPct: '1', capital: '25000' },
] as const;

function KellyCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const WIN_RATE_PRESETS = [40, 45, 50, 55, 60];
  const AVG_WIN_PRESETS = [1, 1.5, 2, 3];
  const AVG_LOSS_PRESETS = [0.5, 1, 1.5, 2];
  const CAPITAL_PRESETS = [5000, 10000, 25000, 50000];

  const [winRate, setWinRate] = useState('55');
  const [avgWinPct, setAvgWinPct] = useState('1.8');
  const [avgLossPct, setAvgLossPct] = useState('1');
  const [capital, setCapital] = useState('10000');

  const result = useMemo(() => {
    const p = Number(winRate) / 100;
    const avgWin = Number(avgWinPct);
    const avgLoss = Number(avgLossPct);
    const totalCapital = Number(capital);

    if ([p, avgWin, avgLoss, totalCapital].some((v) => !Number.isFinite(v)) || p <= 0 || p >= 1 || avgWin <= 0 || avgLoss <= 0 || totalCapital <= 0) {
      return null;
    }

    const q = 1 - p;
    const b = avgWin / avgLoss;
    const fullKellyRaw = (b * p - q) / b;
    const fullKelly = Math.max(0, fullKellyRaw);
    const halfKelly = fullKelly / 2;
    const quarterKelly = fullKelly / 4;

    const edgePerTradePct = p * avgWin - q * avgLoss;
    const lossStreak5Prob = Math.pow(q, 5) * 100;

    return {
      fullKelly,
      halfKelly,
      quarterKelly,
      edgePerTradePct,
      lossStreak5Prob,
      fullKellyUsd: totalCapital * fullKelly,
      halfKellyUsd: totalCapital * halfKelly,
      quarterKellyUsd: totalCapital * quarterKelly,
    };
  }, [winRate, avgWinPct, avgLossPct, capital]);

  const reset = () => {
    setWinRate('55');
    setAvgWinPct('1.8');
    setAvgLossPct('1');
    setCapital('10000');
  };
  const applyScenario = (scenario: (typeof KELLY_SCENARIOS)[number]) => {
    setWinRate(scenario.winRate);
    setAvgWinPct(scenario.avgWinPct);
    setAvgLossPct(scenario.avgLossPct);
    setCapital(scenario.capital);
  };
  const isScenarioActive = (scenario: (typeof KELLY_SCENARIOS)[number]) => (
    winRate === scenario.winRate
    && avgWinPct === scenario.avgWinPct
    && avgLossPct === scenario.avgLossPct
    && capital === scenario.capital
  );

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {KELLY_SCENARIOS.map((scenario) => (
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
              <input type="number" inputMode="decimal" value={winRate} onChange={(e) => setWinRate(e.target.value)} min="0.1" max="99.9" step="any" id="kelly-win-rate" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Average Win (%)')}</label>
            <div className="pills-row">
              {AVG_WIN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${avgWinPct === String(preset) ? 'active' : ''}`}
                  onClick={() => setAvgWinPct(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={avgWinPct} onChange={(e) => setAvgWinPct(e.target.value)} min="0.01" step="any" id="kelly-avg-win" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Average Loss (%)')}</label>
            <div className="pills-row">
              {AVG_LOSS_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${avgLossPct === String(preset) ? 'active' : ''}`}
                  onClick={() => setAvgLossPct(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={avgLossPct} onChange={(e) => setAvgLossPct(e.target.value)} min="0.01" step="any" id="kelly-avg-loss" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Account Capital (USD)')}</label>
            <div className="pills-row">
              {CAPITAL_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${capital === String(preset) ? 'active' : ''}`}
                  onClick={() => setCapital(String(preset))}
                >
                  ${preset.toLocaleString('en-US')}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={capital} onChange={(e) => setCapital(e.target.value)} min="0" step="any" id="kelly-capital" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Half Kelly is usually safer than full Kelly in volatile markets.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.halfKelly > 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Suggested Position Size (Half Kelly)')}</span>
                <span className="result-hero-value"><Dice5 size={28} />{(result.halfKelly * 100).toFixed(2)}%</span>
                <span className={`result-hero-roi ${result.halfKelly > 0 ? 'profit' : 'loss'}`}>
                  {formatUSD(result.halfKellyUsd)} {getUiString(lang, 'per trade')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Full Kelly')}</span><span className={`result-value ${result.fullKelly > 0 ? 'profit' : 'loss'}`}>{(result.fullKelly * 100).toFixed(2)}% ({formatUSD(result.fullKellyUsd)})</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Half Kelly')}</span><span className={`result-value ${result.halfKelly > 0 ? 'profit' : 'loss'}`}>{(result.halfKelly * 100).toFixed(2)}% ({formatUSD(result.halfKellyUsd)})</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Quarter Kelly')}</span><span className={`result-value ${result.quarterKelly > 0 ? 'profit' : 'loss'}`}>{(result.quarterKelly * 100).toFixed(2)}% ({formatUSD(result.quarterKellyUsd)})</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Expected edge per trade')}</span><span className={`result-value ${result.edgePerTradePct >= 0 ? 'profit' : 'loss'}`}>{result.edgePerTradePct >= 0 ? '+' : ''}{result.edgePerTradePct.toFixed(3)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Chance of 5-loss streak')}</span><span className="result-value">{result.lossStreak5Prob.toFixed(2)}%</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Kelly assumes stable edge and independent outcomes. For volatile markets, fractional Kelly is typically safer than full Kelly.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid strategy stats')}</h3><p>{getUiString(lang, 'Set win rate and average win/loss to estimate Kelly-based sizing.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(KellyCalculator);
