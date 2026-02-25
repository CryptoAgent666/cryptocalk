import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { BarChart3, Info, RotateCcw, TrendingUp } from 'lucide-react';

const WIN_RATE_PRESETS = [40, 45, 50, 55];
const AVG_WIN_R_PRESETS = [1, 1.5, 2, 3];
const AVG_LOSS_R_PRESETS = [0.5, 1, 1.5, 2];
const RISK_PER_TRADE_PRESETS = [0.5, 1, 1.5, 2, 3];
const TRADES_PER_MONTH_PRESETS = [10, 20, 30, 50];
const ACCOUNT_SIZE_PRESETS = [5000, 10000, 25000, 50000];
const EXPECTANCY_SCENARIOS = [
  { label: 'Conservative', winRate: '45', avgWinR: '1.5', avgLossR: '1', riskPerTrade: '1', tradesPerMonth: '20' },
  { label: 'Balanced', winRate: '50', avgWinR: '1.9', avgLossR: '1', riskPerTrade: '1.5', tradesPerMonth: '20' },
  { label: 'Aggressive', winRate: '55', avgWinR: '2', avgLossR: '1', riskPerTrade: '2', tradesPerMonth: '30' },
];

function formatUSD(value: number): string {
  return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function TradeExpectancyCalculator({ lang = 'en' }: { lang?: string }) {
  const [accountSize, setAccountSize] = useState('10000');
  const [winRate, setWinRate] = useState('48');
  const [avgWinR, setAvgWinR] = useState('1.9');
  const [avgLossR, setAvgLossR] = useState('1');
  const [riskPerTrade, setRiskPerTrade] = useState('1.5');
  const [tradesPerMonth, setTradesPerMonth] = useState('20');
  const applyScenario = (scenario: (typeof EXPECTANCY_SCENARIOS)[number]) => {
    setWinRate(scenario.winRate);
    setAvgWinR(scenario.avgWinR);
    setAvgLossR(scenario.avgLossR);
    setRiskPerTrade(scenario.riskPerTrade);
    setTradesPerMonth(scenario.tradesPerMonth);
  };
  const isScenarioActive = (scenario: (typeof EXPECTANCY_SCENARIOS)[number]) => (
    winRate === scenario.winRate
    && avgWinR === scenario.avgWinR
    && avgLossR === scenario.avgLossR
    && riskPerTrade === scenario.riskPerTrade
    && tradesPerMonth === scenario.tradesPerMonth
  );

  const result = useMemo(() => {
    const equity = Number(accountSize);
    const p = Number(winRate) / 100;
    const avgWin = Number(avgWinR);
    const avgLoss = Number(avgLossR);
    const riskPct = Number(riskPerTrade);
    const trades = Number(tradesPerMonth);

    if (
      [equity, p, avgWin, avgLoss, riskPct, trades].some((v) => !Number.isFinite(v)) ||
      equity <= 0 ||
      p <= 0 ||
      p >= 1 ||
      avgWin <= 0 ||
      avgLoss <= 0 ||
      riskPct <= 0 ||
      trades <= 0
    ) {
      return null;
    }

    const q = 1 - p;
    const expectancyR = p * avgWin - q * avgLoss;
    const riskAmount = equity * (riskPct / 100);
    const expectedPerTrade = expectancyR * riskAmount;
    const expectedMonthly = expectedPerTrade * trades;
    const expectedQuarter = expectedMonthly * 3;
    const breakEvenWinRate = (avgLoss / (avgWin + avgLoss)) * 100;
    const profitFactor = (p * avgWin) / (q * avgLoss);

    let rating = 'Negative edge';
    if (expectancyR >= 0.4) rating = 'Strong edge';
    else if (expectancyR >= 0.15) rating = 'Positive edge';
    else if (expectancyR >= 0) rating = 'Thin edge';

    return {
      expectancyR,
      riskAmount,
      expectedPerTrade,
      expectedMonthly,
      expectedQuarter,
      breakEvenWinRate,
      profitFactor,
      rating,
    };
  }, [accountSize, winRate, avgWinR, avgLossR, riskPerTrade, tradesPerMonth]);

  const reset = () => {
    setAccountSize('10000');
    setWinRate('48');
    setAvgWinR('1.9');
    setAvgLossR('1');
    setRiskPerTrade('1.5');
    setTradesPerMonth('20');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {EXPECTANCY_SCENARIOS.map((scenario) => (
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
            <label>Account Size (USD)</label>
            <div className="pills-row">
              {ACCOUNT_SIZE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${accountSize === String(preset) ? 'active' : ''}`}
                  onClick={() => setAccountSize(String(preset))}
                >
                  ${preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={accountSize} onChange={(e) => setAccountSize(e.target.value)} min="0" step="any" id="exp-account-size" />
            </div>
          </div>

          <div className="input-group">
            <label>Win Rate (%)</label>
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
              <input type="number" inputMode="decimal" value={winRate} onChange={(e) => setWinRate(e.target.value)} min="0.1" max="99.9" step="any" id="exp-win-rate" />
            </div>
          </div>

          <div className="input-group">
            <label>Average Win (R)</label>
            <div className="pills-row">
              {AVG_WIN_R_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${avgWinR === String(preset) ? 'active' : ''}`}
                  onClick={() => setAvgWinR(String(preset))}
                >
                  {preset}R
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={avgWinR} onChange={(e) => setAvgWinR(e.target.value)} min="0.01" step="any" id="exp-avg-win" />
          </div>

          <div className="input-group">
            <label>Average Loss (R)</label>
            <div className="pills-row">
              {AVG_LOSS_R_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${avgLossR === String(preset) ? 'active' : ''}`}
                  onClick={() => setAvgLossR(String(preset))}
                >
                  {preset}R
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={avgLossR} onChange={(e) => setAvgLossR(e.target.value)} min="0.01" step="any" id="exp-avg-loss" />
          </div>

          <div className="input-group">
            <label>Risk per Trade (%)</label>
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
              <input type="number" inputMode="decimal" value={riskPerTrade} onChange={(e) => setRiskPerTrade(e.target.value)} min="0.01" step="any" id="exp-risk-trade" />
            </div>
          </div>

          <div className="input-group">
            <label>Trades per Month</label>
            <div className="pills-row">
              {TRADES_PER_MONTH_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${tradesPerMonth === String(preset) ? 'active' : ''}`}
                  onClick={() => setTradesPerMonth(String(preset))}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={tradesPerMonth} onChange={(e) => setTradesPerMonth(e.target.value)} min="1" step="1" id="exp-trades-month" />
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
          <span className="input-hint">
            Auto-calculates as you type. Use conservative values first, then stress-test with aggressive assumptions.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.expectancyR > 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Expectancy per Trade')}</span>
                <span className="result-hero-value">
                  <BarChart3 size={28} />
                  {result.expectancyR >= 0 ? '+' : ''}
                  {result.expectancyR.toFixed(3)}R
                </span>
                <span className={`result-hero-roi ${result.expectancyR > 0 ? 'profit' : 'loss'}`}>{result.rating}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Risk amount per trade')}</span>
                  <span className="result-value">{formatUSD(result.riskAmount)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expected P/L per trade')}</span>
                  <span className={`result-value ${result.expectedPerTrade >= 0 ? 'profit' : 'loss'}`}>
                    {result.expectedPerTrade >= 0 ? '+' : ''}
                    {formatUSD(result.expectedPerTrade)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expected monthly P/L')}</span>
                  <span className={`result-value ${result.expectedMonthly >= 0 ? 'profit' : 'loss'}`}>
                    {result.expectedMonthly >= 0 ? '+' : ''}
                    {formatUSD(result.expectedMonthly)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expected quarterly P/L')}</span>
                  <span className={`result-value ${result.expectedQuarter >= 0 ? 'profit' : 'loss'}`}>
                    {result.expectedQuarter >= 0 ? '+' : ''}
                    {formatUSD(result.expectedQuarter)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Break-even win rate')}</span>
                  <span className="result-value">{result.breakEvenWinRate.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit factor')}</span>
                  <span className={`result-value ${result.profitFactor >= 1 ? 'profit' : 'loss'}`}>{result.profitFactor.toFixed(2)}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'Expectancy is a model, not a guarantee. Slippage, execution quality, and strategy drift can materially change real outcomes.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon">
                <TrendingUp size={40} />
              </div>
              <h3>{getUiString(lang, 'Enter valid trading stats')}</h3>
              <p>{getUiString(lang, 'Set win rate, average win/loss in R, and monthly trade count to estimate expectancy.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
