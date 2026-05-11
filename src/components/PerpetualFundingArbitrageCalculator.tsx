import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, ArrowLeftRight } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const FA_SCENARIOS = [
  { label: 'Bull Funding (0.05%)', positionSize: '10000', fundingRatePct: '0.05', intervalsPerDay: '3', tradingFeePct: '0.04', daysHeld: '30' },
  { label: 'Calm Market', positionSize: '10000', fundingRatePct: '0.01', intervalsPerDay: '3', tradingFeePct: '0.04', daysHeld: '30' },
  { label: 'Mania Top (0.15%)', positionSize: '10000', fundingRatePct: '0.15', intervalsPerDay: '3', tradingFeePct: '0.06', daysHeld: '7' },
  { label: 'Negative Funding', positionSize: '10000', fundingRatePct: '-0.03', intervalsPerDay: '3', tradingFeePct: '0.04', daysHeld: '14' },
] as const;

function PerpetualFundingArbitrageCalculator({ lang = 'en' }: { lang?: string }) {
  const [positionSize, setPositionSize] = useState('10000');
  const [fundingRatePct, setFundingRatePct] = useState('0.05');
  const [intervalsPerDay, setIntervalsPerDay] = useState('3');
  const [tradingFeePct, setTradingFeePct] = useState('0.04');
  const [daysHeld, setDaysHeld] = useState('30');

  const applyScenario = (s: (typeof FA_SCENARIOS)[number]) => {
    setPositionSize(s.positionSize); setFundingRatePct(s.fundingRatePct);
    setIntervalsPerDay(s.intervalsPerDay); setTradingFeePct(s.tradingFeePct);
    setDaysHeld(s.daysHeld);
  };
  const isScenarioActive = (s: (typeof FA_SCENARIOS)[number]) =>
    positionSize === s.positionSize && fundingRatePct === s.fundingRatePct &&
    intervalsPerDay === s.intervalsPerDay && tradingFeePct === s.tradingFeePct &&
    daysHeld === s.daysHeld;

  const result = useMemo(() => {
    const size = Number(positionSize);
    const fundingPct = Number(fundingRatePct);
    const intervals = Number(intervalsPerDay);
    const feePct = Number(tradingFeePct);
    const days = Number(daysHeld);
    if (![size, fundingPct, intervals, feePct, days].every(Number.isFinite) || size <= 0 || days <= 0) return null;

    // Strategy: Long spot + Short perp (delta-neutral)
    // Positive funding: shorts collect from longs → we collect (since we're short on perp)
    // Negative funding: longs collect from shorts → we pay
    // Per interval: position × (funding% / 100)
    const fundingPerInterval = size * (fundingPct / 100);
    const totalIntervals = intervals * days;
    const totalFundingIncome = fundingPerInterval * totalIntervals;

    // Trading fees (entry + exit, 2 sides each for spot + perp = 4 trades)
    const totalTradingFees = size * (feePct / 100) * 4;

    // Net P&L
    const netProfit = totalFundingIncome - totalTradingFees;
    const netProfitPct = (netProfit / size) * 100;

    // Annualized
    const dailyFunding = fundingPerInterval * intervals;
    const annualizedFundingApr = (dailyFunding / size) * 365 * 100;
    const annualizedNetApr = (netProfit / size) * (365 / days) * 100;

    // Break-even funding rate (after fees)
    // Total fees = total funding → days × intervals × position × be_rate% = position × fee% × 4
    // be_rate% = fee% × 4 / (intervals × days)
    const breakevenFundingPctPerInterval = totalIntervals > 0 ? (feePct * 4) / totalIntervals : 0;

    // Funding income per day/week/month
    const weeklyIncome = dailyFunding * 7;
    const monthlyIncome = dailyFunding * 30;

    // Direction
    const isCollecting = (fundingPct > 0); // we're short perp, positive funding pays shorts
    const direction = isCollecting ? 'Collecting funding' : 'Paying funding';
    const zone: 'profit' | 'loss' | 'neutral' = netProfit > 0 ? 'profit' : netProfit < 0 ? 'loss' : 'neutral';

    let rating = '';
    if (annualizedNetApr >= 30) rating = 'Excellent yield';
    else if (annualizedNetApr >= 15) rating = 'Good yield';
    else if (annualizedNetApr >= 5) rating = 'Modest yield';
    else if (annualizedNetApr >= 0) rating = 'Marginal';
    else rating = 'Unprofitable';

    // Daily breakdown for first 7 days
    const dailyBreakdown = Array.from({ length: Math.min(7, days) }, (_, i) => {
      const day = i + 1;
      const fundingThisDay = dailyFunding;
      const cumulative = fundingThisDay * day;
      const cumNetVsFees = cumulative - (day === Math.min(7, days) ? totalTradingFees : 0);
      return { day, fundingThisDay, cumulative };
    });

    return {
      fundingPerInterval, totalFundingIncome, totalTradingFees, netProfit, netProfitPct,
      dailyFunding, weeklyIncome, monthlyIncome, annualizedFundingApr, annualizedNetApr,
      breakevenFundingPctPerInterval, isCollecting, direction, zone, rating, dailyBreakdown,
    };
  }, [positionSize, fundingRatePct, intervalsPerDay, tradingFeePct, daysHeld]);

  const reset = () => {
    setPositionSize('10000'); setFundingRatePct('0.05');
    setIntervalsPerDay('3'); setTradingFeePct('0.04'); setDaysHeld('30');
  };

  const formatUSD = (v: number) =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(v);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {FA_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="fa-size">{getUiString(lang, 'Position Size (each leg)')} (USD)</label>
            <div className="pills-row">
              {['1000', '5000', '10000', '50000'].map((p) => (
                <button key={p}
                  className={`pill-btn ${positionSize === p ? 'active' : ''}`}
                  onClick={() => setPositionSize(p)}>
                  ${(parseInt(p) / 1000)}k
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="fa-size" value={positionSize}
              onChange={(e) => setPositionSize(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
            <span className="input-hint">
              {getUiString(lang, 'Same dollar amount on spot (long) and perp (short) for delta-neutral.')}
            </span>
          </div>

          <div className="input-group">
            <label htmlFor="fa-rate">{getUiString(lang, 'Funding Rate per interval')} (%)</label>
            <div className="pills-row">
              {['-0.03', '0.005', '0.01', '0.05', '0.1'].map((p) => (
                <button key={p}
                  className={`pill-btn ${fundingRatePct === p ? 'active' : ''}`}
                  onClick={() => setFundingRatePct(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="fa-rate" value={fundingRatePct}
              onChange={(e) => setFundingRatePct(e.target.value)} step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="fa-intervals">{getUiString(lang, 'Funding Intervals per Day')}</label>
            <div className="pills-row">
              {['1', '3', '24'].map((p) => (
                <button key={p}
                  className={`pill-btn ${intervalsPerDay === p ? 'active' : ''}`}
                  onClick={() => setIntervalsPerDay(p)}>
                  {p === '1' ? '24h' : p === '3' ? '8h' : '1h'}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="fa-intervals" value={intervalsPerDay}
              onChange={(e) => setIntervalsPerDay(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="fa-fee">{getUiString(lang, 'Trading Fee per Side')} (%)</label>
            <div className="pills-row">
              {['0.02', '0.04', '0.06', '0.1'].map((p) => (
                <button key={p}
                  className={`pill-btn ${tradingFeePct === p ? 'active' : ''}`}
                  onClick={() => setTradingFeePct(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="fa-fee" value={tradingFeePct}
              onChange={(e) => setTradingFeePct(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="fa-days">{getUiString(lang, 'Days Held')}</label>
            <div className="pills-row">
              {['1', '7', '30', '90', '180'].map((p) => (
                <button key={p}
                  className={`pill-btn ${daysHeld === p ? 'active' : ''}`}
                  onClick={() => setDaysHeld(p)}>
                  {p}d
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="fa-days" value={daysHeld}
              onChange={(e) => setDaysHeld(e.target.value)} min="0.1" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Cash-and-carry: long spot + short perp = delta-neutral. Collect positive funding; pay if negative.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Annualized Net APR')}</span>
                <span className="result-hero-value"><ArrowLeftRight size={28} />
                  {result.annualizedNetApr >= 0 ? '+' : ''}{result.annualizedNetApr.toFixed(2)}%
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {getUiString(lang, result.direction)} · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Funding per interval')}</span>
                  <span className={`result-value ${result.fundingPerInterval >= 0 ? 'profit' : 'fee'}`}>
                    {result.fundingPerInterval >= 0 ? '+' : ''}{formatUSD(result.fundingPerInterval)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily funding')}</span>
                  <span className={`result-value ${result.dailyFunding >= 0 ? 'profit' : 'fee'}`}>
                    {result.dailyFunding >= 0 ? '+' : ''}{formatUSD(result.dailyFunding)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Weekly funding')}</span>
                  <span className={`result-value ${result.weeklyIncome >= 0 ? 'profit' : 'fee'}`}>
                    {formatUSD(result.weeklyIncome)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly funding')}</span>
                  <span className={`result-value ${result.monthlyIncome >= 0 ? 'profit' : 'fee'}`}>
                    {formatUSD(result.monthlyIncome)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total funding income')} ({daysHeld}d)</span>
                  <span className={`result-value ${result.totalFundingIncome >= 0 ? 'profit' : 'fee'}`}>
                    {formatUSD(result.totalFundingIncome)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Trading fees (4 trades)')}</span>
                  <span className="result-value fee">−{formatUSD(result.totalTradingFees)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net P&L')}</span>
                  <span className={`result-value ${result.netProfit >= 0 ? 'profit' : 'loss'}`}>
                    {result.netProfit >= 0 ? '+' : ''}{formatUSD(result.netProfit)} ({result.netProfitPct.toFixed(2)}%)
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annualized funding APR')}</span>
                  <span className="result-value">{result.annualizedFundingApr.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Break-even funding/interval')}</span>
                  <span className="result-value">{result.breakevenFundingPctPerInterval.toFixed(4)}%</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Risks: liquidation on perp leg if margin too low, exchange counterparty, funding inversion (paying instead of collecting). Maintain ≥3x maintenance margin on perp.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Provide position size, funding rate, intervals/day, fees, and days held.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PerpetualFundingArbitrageCalculator);
