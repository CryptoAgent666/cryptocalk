import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, Repeat } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const LP_SCENARIOS = [
  { label: 'Conservative 2x', deposit: '10000', supplyApy: '5', borrowApr: '3', ltvTarget: '40', liquidationLtv: '85', loops: '1' },
  { label: 'Moderate 3x', deposit: '10000', supplyApy: '6', borrowApr: '4', ltvTarget: '60', liquidationLtv: '85', loops: '3' },
  { label: 'Aggressive 5x', deposit: '10000', supplyApy: '8', borrowApr: '5', ltvTarget: '75', liquidationLtv: '85', loops: '5' },
  { label: 'Stable→Stable Loop', deposit: '10000', supplyApy: '4', borrowApr: '2.5', ltvTarget: '85', liquidationLtv: '92', loops: '6' },
] as const;

function LoopingYieldCalculator({ lang = 'en' }: { lang?: string }) {
  const [deposit, setDeposit] = useState('10000');
  const [supplyApy, setSupplyApy] = useState('6');
  const [borrowApr, setBorrowApr] = useState('4');
  const [ltvTarget, setLtvTarget] = useState('60');
  const [liquidationLtv, setLiquidationLtv] = useState('85');
  const [loops, setLoops] = useState('3');
  const [gasPerLoop, setGasPerLoop] = useState('25');

  const applyScenario = (s: (typeof LP_SCENARIOS)[number]) => {
    setDeposit(s.deposit); setSupplyApy(s.supplyApy); setBorrowApr(s.borrowApr);
    setLtvTarget(s.ltvTarget); setLiquidationLtv(s.liquidationLtv); setLoops(s.loops);
  };
  const isScenarioActive = (s: (typeof LP_SCENARIOS)[number]) =>
    deposit === s.deposit && supplyApy === s.supplyApy && borrowApr === s.borrowApr &&
    ltvTarget === s.ltvTarget && liquidationLtv === s.liquidationLtv && loops === s.loops;

  const result = useMemo(() => {
    const dep = Number(deposit);
    const supplyPct = Number(supplyApy);
    const borrowPct = Number(borrowApr);
    const ltvPct = Number(ltvTarget) / 100;
    const liqLtvPct = Number(liquidationLtv) / 100;
    const numLoops = Number(loops);
    const gasPerOp = Number(gasPerLoop);

    if (![dep, supplyPct, borrowPct, ltvPct, liqLtvPct, numLoops, gasPerOp].every(Number.isFinite)) return null;
    if (dep <= 0 || ltvPct <= 0 || ltvPct >= 1 || liqLtvPct <= ltvPct || numLoops < 0) return null;

    // Looping math:
    // Round 0: deposit dep → collateral = dep
    // Round 1: borrow ltv * dep → re-deposit → collateral = dep + ltv*dep
    // Round 2: borrow ltv * (ltv*dep) → collateral = dep + ltv*dep + ltv²*dep
    // ...
    // After N loops: total_collateral = dep × (1 - ltv^(N+1)) / (1 - ltv)
    // total_borrowed = dep × ltv × (1 - ltv^N) / (1 - ltv)

    const geometricFactor = (1 - Math.pow(ltvPct, numLoops + 1)) / (1 - ltvPct);
    const totalCollateral = dep * geometricFactor;
    const totalBorrowed = dep * ltvPct * (1 - Math.pow(ltvPct, numLoops)) / (1 - ltvPct);
    const netEquity = totalCollateral - totalBorrowed;
    const effectiveLeverage = totalCollateral / dep;

    // Theoretical max leverage at this LTV with infinite loops
    const maxLeverage = 1 / (1 - ltvPct);

    // Yields
    const grossSupplyYield = totalCollateral * (supplyPct / 100);
    const totalBorrowCost = totalBorrowed * (borrowPct / 100);
    const netAnnualYield = grossSupplyYield - totalBorrowCost;
    const netApr = (netAnnualYield / dep) * 100;
    const yieldMultiplier = supplyPct > 0 ? netApr / supplyPct : 0;

    // Gas costs
    const totalGas = gasPerOp * numLoops * 2; // each loop = 2 ops (borrow + deposit)
    const gasPctOfDeposit = (totalGas / dep) * 100;

    // Liquidation analysis
    // Current LTV = totalBorrowed / totalCollateral
    const currentLtv = totalCollateral > 0 ? totalBorrowed / totalCollateral : 0;
    const distanceToLiquidation = liqLtvPct - currentLtv;
    // For liquidation, collateral_value × liqLtv = borrow → collateral_value = borrow / liqLtv
    // Current collateral × (1 + drop%) = borrow / liqLtv
    // 1 + drop% = borrow / (liqLtv × collateral) = currentLtv / liqLtv
    const liquidationDropPct = currentLtv > 0 ? (1 - currentLtv / liqLtvPct) * 100 : 100;
    const healthFactor = currentLtv > 0 ? liqLtvPct / currentLtv : Infinity;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (netApr > supplyPct * 1.5) { zone = 'profit'; rating = 'Strong amplification'; }
    else if (netApr > supplyPct) { zone = 'profit'; rating = 'Modest amplification'; }
    else if (netApr > 0) { zone = 'neutral'; rating = 'Marginal'; }
    else { zone = 'loss'; rating = 'Negative carry'; }

    let liquidationRisk = 'Low';
    if (liquidationDropPct < 10) liquidationRisk = 'Critical';
    else if (liquidationDropPct < 20) liquidationRisk = 'High';
    else if (liquidationDropPct < 35) liquidationRisk = 'Moderate';

    return {
      totalCollateral, totalBorrowed, netEquity, effectiveLeverage, maxLeverage,
      grossSupplyYield, totalBorrowCost, netAnnualYield, netApr, yieldMultiplier,
      totalGas, gasPctOfDeposit, currentLtv, distanceToLiquidation,
      liquidationDropPct, healthFactor, zone, rating, liquidationRisk,
    };
  }, [deposit, supplyApy, borrowApr, ltvTarget, liquidationLtv, loops, gasPerLoop]);

  const reset = () => {
    setDeposit('10000'); setSupplyApy('6'); setBorrowApr('4');
    setLtvTarget('60'); setLiquidationLtv('85'); setLoops('3'); setGasPerLoop('25');
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
              {LP_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="lp-deposit">{getUiString(lang, 'Initial Deposit')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-deposit" value={deposit}
              onChange={(e) => setDeposit(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-supply">{getUiString(lang, 'Supply APY')} (%)</label>
            <input type="number" inputMode="decimal" id="lp-supply" value={supplyApy}
              onChange={(e) => setSupplyApy(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-borrow">{getUiString(lang, 'Borrow APR')} (%)</label>
            <input type="number" inputMode="decimal" id="lp-borrow" value={borrowApr}
              onChange={(e) => setBorrowApr(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-ltv">{getUiString(lang, 'Target LTV per loop')} (%)</label>
            <div className="pills-row">
              {['30', '50', '60', '70', '80'].map((p) => (
                <button key={p}
                  className={`pill-btn ${ltvTarget === p ? 'active' : ''}`}
                  onClick={() => setLtvTarget(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="lp-ltv" value={ltvTarget}
              onChange={(e) => setLtvTarget(e.target.value)} min="1" max="95" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-liqltv">{getUiString(lang, 'Liquidation LTV')} (%)</label>
            <input type="number" inputMode="decimal" id="lp-liqltv" value={liquidationLtv}
              onChange={(e) => setLiquidationLtv(e.target.value)} min="1" max="100" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-loops">{getUiString(lang, 'Number of Loops')}</label>
            <div className="pills-row">
              {['0', '1', '3', '5', '8'].map((p) => (
                <button key={p}
                  className={`pill-btn ${loops === p ? 'active' : ''}`}
                  onClick={() => setLoops(p)}>
                  {p}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="lp-loops" value={loops}
              onChange={(e) => setLoops(e.target.value)} min="0" max="20" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-gas">{getUiString(lang, 'Gas Cost per Loop')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-gas" value={gasPerLoop}
              onChange={(e) => setGasPerLoop(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Looping: deposit → borrow → re-deposit. Max leverage = 1/(1−LTV). 80% LTV = max 5×.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net APR')}</span>
                <span className="result-hero-value"><Repeat size={28} />
                  {result.netApr >= 0 ? '+' : ''}{result.netApr.toFixed(2)}%
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.effectiveLeverage.toFixed(2)}× · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Effective leverage')}</span>
                  <span className="result-value">{result.effectiveLeverage.toFixed(3)}×</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Max leverage at this LTV')}</span>
                  <span className="result-value">{result.maxLeverage.toFixed(2)}×</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Yield multiplier')}</span>
                  <span className={`result-value ${result.yieldMultiplier > 1 ? 'profit' : 'fee'}`}>
                    {result.yieldMultiplier.toFixed(2)}×
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total collateral')}</span>
                  <span className="result-value">{formatUSD(result.totalCollateral)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total borrowed')}</span>
                  <span className="result-value fee">{formatUSD(result.totalBorrowed)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net equity')}</span>
                  <span className="result-value">{formatUSD(result.netEquity)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual gross yield')}</span>
                  <span className="result-value profit">+{formatUSD(result.grossSupplyYield)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual borrow cost')}</span>
                  <span className="result-value fee">−{formatUSD(result.totalBorrowCost)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net annual yield')}</span>
                  <span className={`result-value ${result.netAnnualYield >= 0 ? 'profit' : 'loss'}`}>
                    {result.netAnnualYield >= 0 ? '+' : ''}{formatUSD(result.netAnnualYield)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total gas (one-time)')}</span>
                  <span className="result-value fee">−{formatUSD(result.totalGas)} ({result.gasPctOfDeposit.toFixed(2)}%)</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Current LTV')}</span>
                  <span className="result-value">{(result.currentLtv * 100).toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Health Factor')}</span>
                  <span className={`result-value ${result.healthFactor >= 1.5 ? 'profit' : result.healthFactor >= 1.2 ? '' : 'loss'}`}>
                    {Number.isFinite(result.healthFactor) ? result.healthFactor.toFixed(2) : '∞'}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Liquidation if collateral drops')}</span>
                  <span className="result-value loss">−{result.liquidationDropPct.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Liquidation risk')}</span>
                  <span className={`result-value ${result.liquidationRisk === 'Low' ? 'profit' : result.liquidationRisk === 'Critical' || result.liquidationRisk === 'High' ? 'loss' : ''}`}>
                    {getUiString(lang, result.liquidationRisk)}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Looping amplifies both yield and risk. Single liquidation can wipe out the position. Use only with stable→stable or correlated assets. Monitor health factor daily.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter valid inputs')}</h3>
              <p>{getUiString(lang, 'Liquidation LTV must be greater than target LTV; LTV must be between 0 and 95%.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(LoopingYieldCalculator);
