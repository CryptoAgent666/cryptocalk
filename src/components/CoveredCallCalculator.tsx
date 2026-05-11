import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, Layers } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const CC_SCENARIOS = [
  { label: 'OTM 5% / 30d', spot: '77000', costBasis: '60000', strike: '81000', premium: '1500', daysToExpiry: '30', shares: '1' },
  { label: 'ATM / 14d', spot: '77000', costBasis: '70000', strike: '77000', premium: '2200', daysToExpiry: '14', shares: '1' },
  { label: 'Premium-rich ITM', spot: '77000', costBasis: '50000', strike: '70000', premium: '8500', daysToExpiry: '30', shares: '1' },
  { label: 'Deep OTM / 60d', spot: '77000', costBasis: '70000', strike: '95000', premium: '1200', daysToExpiry: '60', shares: '1' },
] as const;

function CoveredCallCalculator({ lang = 'en' }: { lang?: string }) {
  const [spot, setSpot] = useState('77000');
  const [costBasis, setCostBasis] = useState('60000');
  const [strike, setStrike] = useState('81000');
  const [premium, setPremium] = useState('1500');
  const [daysToExpiry, setDaysToExpiry] = useState('30');
  const [shares, setShares] = useState('1');

  const applyScenario = (s: (typeof CC_SCENARIOS)[number]) => {
    setSpot(s.spot); setCostBasis(s.costBasis); setStrike(s.strike);
    setPremium(s.premium); setDaysToExpiry(s.daysToExpiry); setShares(s.shares);
  };
  const isScenarioActive = (s: (typeof CC_SCENARIOS)[number]) =>
    spot === s.spot && costBasis === s.costBasis && strike === s.strike &&
    premium === s.premium && daysToExpiry === s.daysToExpiry && shares === s.shares;

  const result = useMemo(() => {
    const sp = Number(spot);
    const cb = Number(costBasis);
    const k = Number(strike);
    const prem = Number(premium);
    const dte = Number(daysToExpiry);
    const sh = Number(shares);
    if (![sp, cb, k, prem, dte, sh].every(Number.isFinite) || sp <= 0 || k <= 0 || prem <= 0 || dte <= 0 || sh <= 0) return null;

    const totalPremium = prem * sh;
    const sharePosition = sp * sh;

    // Scenarios at expiry:
    // Case A: spot ≤ strike → keep shares + premium (unrealized = current spot)
    // Case B: spot > strike → called away at strike + premium

    // Scenario A: BTC stays at spot (no assignment if spot ≤ strike)
    const stayAtSpotPnL = sp <= k
      ? (sp - cb) * sh + totalPremium  // unrealized + premium
      : (k - cb) * sh + totalPremium;  // capped at strike + premium

    // Best case (called away at strike, premium kept): max profit
    const calledAwayProfit = (k - cb) * sh + totalPremium;
    // Worst case if called: same as max profit (capped) — opportunity cost is upside above strike + premium
    const opportunityCostAt2x = sp * 2 > k
      ? (sp * 2 - k) * sh - 0 // missed gain above strike (premium already kept)
      : 0;

    // Yield calculations
    const premiumYieldPct = (totalPremium / (cb * sh)) * 100; // on cost basis
    const annualizedYield = premiumYieldPct * (365 / dte);
    const premiumYieldOnSpot = (totalPremium / sharePosition) * 100;

    // Effective sale price if called
    const effectiveSalePrice = k + prem;
    const effectiveSaleProfit = effectiveSalePrice - cb;
    const effectiveSaleROI = ((effectiveSalePrice - cb) / cb) * 100;

    // Breakeven (downside protection): cost_basis - premium
    const breakeven = cb - prem;
    const downsideProtectionPct = sp > 0 ? ((sp - breakeven) / sp) * 100 : 0;

    // Strike vs spot ratio (OTM/ATM/ITM classification)
    const strikeRatio = k / sp;
    const moneyness = strikeRatio > 1.02 ? 'OTM' : strikeRatio < 0.98 ? 'ITM' : 'ATM';

    // Probability of being called: rough heuristic (will not use BS without IV)
    let assignmentRisk: 'Low' | 'Medium' | 'High';
    if (strikeRatio > 1.10) assignmentRisk = 'Low';
    else if (strikeRatio > 1.02) assignmentRisk = 'Medium';
    else assignmentRisk = 'High';

    // Payoff at various spot prices
    const payoffPoints = [-30, -20, -10, 0, 10, 20, 30, 50].map((pct) => {
      const futureSpot = sp * (1 + pct / 100);
      const calledAway = futureSpot > k;
      const sharesValue = calledAway ? k * sh : futureSpot * sh;
      const totalValue = sharesValue + totalPremium;
      const pnlVsCost = totalValue - cb * sh;
      return { pct, futureSpot, calledAway, totalValue, pnlVsCost };
    });

    return {
      totalPremium, calledAwayProfit, premiumYieldPct, annualizedYield, premiumYieldOnSpot,
      effectiveSalePrice, effectiveSaleROI, breakeven, downsideProtectionPct,
      moneyness, assignmentRisk, payoffPoints, opportunityCostAt2x,
    };
  }, [spot, costBasis, strike, premium, daysToExpiry, shares]);

  const reset = () => {
    setSpot('77000'); setCostBasis('60000'); setStrike('81000');
    setPremium('1500'); setDaysToExpiry('30'); setShares('1');
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
              {CC_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="cc-spot">{getUiString(lang, 'Current Spot Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-spot" value={spot}
              onChange={(e) => setSpot(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-basis">{getUiString(lang, 'Your Cost Basis')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-basis" value={costBasis}
              onChange={(e) => setCostBasis(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-strike">{getUiString(lang, 'Call Strike Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-strike" value={strike}
              onChange={(e) => setStrike(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-premium">{getUiString(lang, 'Premium Received per Contract')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-premium" value={premium}
              onChange={(e) => setPremium(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-dte">{getUiString(lang, 'Days to Expiry')}</label>
            <div className="pills-row">
              {['7', '14', '30', '45', '60'].map((p) => (
                <button key={p}
                  className={`pill-btn ${daysToExpiry === p ? 'active' : ''}`}
                  onClick={() => setDaysToExpiry(p)}>
                  {p}d
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="cc-dte" value={daysToExpiry}
              onChange={(e) => setDaysToExpiry(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-shares">{getUiString(lang, 'Number of Contracts/Shares')}</label>
            <input type="number" inputMode="decimal" id="cc-shares" value={shares}
              onChange={(e) => setShares(e.target.value)} min="0.01" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Covered call: hold the asset, sell a call option above current price. Premium = guaranteed income; risk = capping upside.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero profit">
                <span className="result-hero-label">{getUiString(lang, 'Annualized Yield')}</span>
                <span className="result-hero-value"><Layers size={28} />{result.annualizedYield.toFixed(2)}%</span>
                <span className="result-hero-roi profit">
                  {getUiString(lang, result.moneyness)} · {getUiString(lang, result.assignmentRisk)} {getUiString(lang, 'assignment risk')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Premium received (total)')}</span>
                  <span className="result-value profit">+{formatUSD(result.totalPremium)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Premium yield (on cost)')}</span>
                  <span className="result-value">{result.premiumYieldPct.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Premium yield (on spot)')}</span>
                  <span className="result-value">{result.premiumYieldOnSpot.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Max profit if called')}</span>
                  <span className="result-value profit">{formatUSD(result.calledAwayProfit)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Effective sale price')}</span>
                  <span className="result-value">{formatUSD(result.effectiveSalePrice)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Effective sale ROI')}</span>
                  <span className="result-value profit">{result.effectiveSaleROI.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Break-even (downside)')}</span>
                  <span className="result-value">{formatUSD(result.breakeven)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Downside protection from spot')}</span>
                  <span className="result-value">{result.downsideProtectionPct.toFixed(2)}%</span>
                </div>
              </div>

              <h2 style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '12px', marginBottom: '6px' }}>
                {getUiString(lang, 'Payoff at expiry by spot move')}
              </h2>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '4px' }}>{getUiString(lang, 'Spot move')}</th>
                    <th style={{ textAlign: 'right', padding: '4px' }}>{getUiString(lang, 'Total value')}</th>
                    <th style={{ textAlign: 'right', padding: '4px' }}>{getUiString(lang, 'P&L')}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.payoffPoints.map((pt) => (
                    <tr key={pt.pct} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                      <td style={{ padding: '4px' }}>
                        {pt.pct >= 0 ? '+' : ''}{pt.pct}% {pt.calledAway ? '(called)' : ''}
                      </td>
                      <td style={{ textAlign: 'right', padding: '4px' }}>{formatUSD(pt.totalValue)}</td>
                      <td style={{ textAlign: 'right', padding: '4px', color: pt.pnlVsCost >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                        {pt.pnlVsCost >= 0 ? '+' : ''}{formatUSD(pt.pnlVsCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Covered calls cap your upside above the strike. Best for sideways/mild bull markets. Wheel strategy: get assigned, then sell cash-secured puts to re-enter.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Set spot, cost basis, strike, premium, and days to expiry.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(CoveredCallCalculator);
