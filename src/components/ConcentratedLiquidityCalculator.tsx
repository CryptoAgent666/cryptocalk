import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, Layers } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const FEE_TIERS = ['0.01', '0.05', '0.30', '1.00'] as const;

const CL_SCENARIOS = [
  { label: 'Tight ±5%', deposit: '10000', currentPrice: '2400', priceLower: '2280', priceUpper: '2520', feeTier: '0.05', dailyVolume: '500000000' },
  { label: 'Medium ±20%', deposit: '10000', currentPrice: '2400', priceLower: '1920', priceUpper: '2880', feeTier: '0.05', dailyVolume: '500000000' },
  { label: 'Wide ±50%', deposit: '10000', currentPrice: '2400', priceLower: '1200', priceUpper: '3600', feeTier: '0.05', dailyVolume: '500000000' },
  { label: 'Stable Pair (USDC/USDT)', deposit: '10000', currentPrice: '1', priceLower: '0.999', priceUpper: '1.001', feeTier: '0.01', dailyVolume: '100000000' },
] as const;

function ConcentratedLiquidityCalculator({ lang = 'en' }: { lang?: string }) {
  const [deposit, setDeposit] = useState('10000');
  const [currentPrice, setCurrentPrice] = useState('2400');
  const [priceLower, setPriceLower] = useState('1920');
  const [priceUpper, setPriceUpper] = useState('2880');
  const [feeTier, setFeeTier] = useState('0.05');
  const [dailyVolume, setDailyVolume] = useState('500000000');
  const [poolTvl, setPoolTvl] = useState('100000000');
  const [daysHeld, setDaysHeld] = useState('30');

  const applyScenario = (s: (typeof CL_SCENARIOS)[number]) => {
    setDeposit(s.deposit); setCurrentPrice(s.currentPrice);
    setPriceLower(s.priceLower); setPriceUpper(s.priceUpper);
    setFeeTier(s.feeTier); setDailyVolume(s.dailyVolume);
  };
  const isScenarioActive = (s: (typeof CL_SCENARIOS)[number]) =>
    deposit === s.deposit && currentPrice === s.currentPrice &&
    priceLower === s.priceLower && priceUpper === s.priceUpper &&
    feeTier === s.feeTier && dailyVolume === s.dailyVolume;

  const result = useMemo(() => {
    const dep = Number(deposit);
    const p = Number(currentPrice);
    const pa = Number(priceLower);
    const pb = Number(priceUpper);
    const fee = Number(feeTier);
    const vol = Number(dailyVolume);
    const tvl = Number(poolTvl);
    const days = Number(daysHeld);

    if (![dep, p, pa, pb, fee, vol, tvl, days].every(Number.isFinite)) return null;
    if (dep <= 0 || p <= 0 || days <= 0 || tvl <= 0) return null;
    if (!(pa < pb)) return null;

    // Capital efficiency vs full range V2
    // For a range [pa, pb] around current price p:
    // Efficiency = sqrt(p) / (sqrt(p) - sqrt(pa)) when at center
    // Simplified using Uniswap V3 math:
    const sqrtP = Math.sqrt(p);
    const sqrtPa = Math.sqrt(pa);
    const sqrtPb = Math.sqrt(pb);

    // Liquidity calculation depends on price position
    // L (token0 part) = amount0 * sqrt(p) * sqrt(pb) / (sqrt(pb) - sqrt(p))
    // For balanced split assumption (50/50 in USD value):
    const halfDepositUsd = dep / 2;
    const amount0 = halfDepositUsd / p; // token0 (e.g., ETH at price p)
    const amount1 = halfDepositUsd; // token1 (USD)

    let liquidity = 0;
    if (p < pa) {
      // All in token0
      liquidity = (dep / p) * (sqrtPa * sqrtPb) / (sqrtPb - sqrtPa);
    } else if (p > pb) {
      // All in token1
      liquidity = dep / (sqrtPb - sqrtPa);
    } else {
      // In range — split
      const l0 = amount0 * (sqrtP * sqrtPb) / (sqrtPb - sqrtP);
      const l1 = amount1 / (sqrtP - sqrtPa);
      liquidity = Math.min(l0, l1);
    }

    // Capital efficiency multiplier vs V2 (full range 0-Inf)
    // Efficiency = (sqrt(pb) / (sqrt(pb) - sqrt(pa))) − (sqrt(pa) / sqrt(p))
    // Simplified: ratio of how much V2 capital would be needed for same liquidity
    const v2EquivalentCapital = liquidity * 2 * sqrtP; // rough estimate
    const efficiencyMultiplier = v2EquivalentCapital > 0 ? v2EquivalentCapital / dep : 0;

    // In-range fee revenue (simplified: position's share of liquidity × volume × fee)
    // Position's share of in-range liquidity ≈ deposit / (TVL × concentration_factor)
    // For approximation, share = deposit / (tvl / efficiency)
    const concentratedTvl = tvl > 0 ? tvl / Math.max(1, efficiencyMultiplier) : tvl;
    const positionShare = concentratedTvl > 0 ? dep / (concentratedTvl + dep) : 0;
    const dailyFeeIncome = vol * (fee / 100) * positionShare;

    // Probability of being in range (rough): based on range width vs current price
    const rangeWidthPct = ((pb - pa) / p) * 100;
    const inRangeProbability = Math.min(1, rangeWidthPct / 50); // very rough heuristic
    const expectedDailyFees = dailyFeeIncome * inRangeProbability;
    const totalFees = expectedDailyFees * days;

    // Impermanent Loss at range edges
    // At lower edge: price moved down by (p/pa - 1)
    // V3 IL is amplified vs V2 because all assets concentrate
    const downsideMove = (pa / p - 1) * 100;
    const upsideMove = (pb / p - 1) * 100;

    // V2 IL formula: 2 * sqrt(r) / (1+r) - 1
    // For range edge (price moves to pa): r = pa/p
    const rDown = pa / p;
    const ilAtLower = (2 * Math.sqrt(rDown) / (1 + rDown) - 1) * 100;
    const rUp = pb / p;
    const ilAtUpper = (2 * Math.sqrt(rUp) / (1 + rUp) - 1) * 100;

    // V3 IL is larger because at edge you're 100% in one asset (vs V2 where you have both)
    // Approximation: v3_il ≈ v2_il * leverage_factor
    const v3IlAtLower = ilAtLower * efficiencyMultiplier;
    const v3IlAtUpper = ilAtUpper * efficiencyMultiplier;

    // Net P&L estimate
    const netPnl = totalFees - dep * Math.abs(Math.min(v3IlAtLower, v3IlAtUpper)) / 100 / 2; // expected IL ~ half max

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    if (totalFees > dep * 0.05) zone = 'profit';
    else if (totalFees < dep * 0.005) zone = 'loss';

    return {
      liquidity, efficiencyMultiplier, positionShare,
      dailyFeeIncome, expectedDailyFees, totalFees, inRangeProbability,
      rangeWidthPct, downsideMove, upsideMove,
      ilAtLower, ilAtUpper, v3IlAtLower, v3IlAtUpper, netPnl, zone,
    };
  }, [deposit, currentPrice, priceLower, priceUpper, feeTier, dailyVolume, poolTvl, daysHeld]);

  const reset = () => {
    setDeposit('10000'); setCurrentPrice('2400');
    setPriceLower('1920'); setPriceUpper('2880');
    setFeeTier('0.05'); setDailyVolume('500000000');
    setPoolTvl('100000000'); setDaysHeld('30');
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
              {CL_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="cl-deposit">{getUiString(lang, 'Deposit Amount')} (USD)</label>
            <input type="number" inputMode="decimal" id="cl-deposit" value={deposit}
              onChange={(e) => setDeposit(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cl-price">{getUiString(lang, 'Current Price (token0)')} (USD)</label>
            <input type="number" inputMode="decimal" id="cl-price" value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Price Range')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label htmlFor="cl-lower" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Lower')}</label>
                <input type="number" inputMode="decimal" id="cl-lower" value={priceLower}
                  onChange={(e) => setPriceLower(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="cl-upper" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Upper')}</label>
                <input type="number" inputMode="decimal" id="cl-upper" value={priceUpper}
                  onChange={(e) => setPriceUpper(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="cl-fee">{getUiString(lang, 'Fee Tier')} (%)</label>
            <div className="pills-row">
              {FEE_TIERS.map((p) => (
                <button key={p}
                  className={`pill-btn ${feeTier === p ? 'active' : ''}`}
                  onClick={() => setFeeTier(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="cl-fee" value={feeTier}
              onChange={(e) => setFeeTier(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cl-volume">{getUiString(lang, 'Pool Daily Volume')} (USD)</label>
            <input type="number" inputMode="decimal" id="cl-volume" value={dailyVolume}
              onChange={(e) => setDailyVolume(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cl-tvl">{getUiString(lang, 'Pool TVL')} (USD)</label>
            <input type="number" inputMode="decimal" id="cl-tvl" value={poolTvl}
              onChange={(e) => setPoolTvl(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cl-days">{getUiString(lang, 'Holding Period')} ({getUiString(lang, 'days')})</label>
            <div className="pills-row">
              {['7', '30', '90', '180', '365'].map((p) => (
                <button key={p}
                  className={`pill-btn ${daysHeld === p ? 'active' : ''}`}
                  onClick={() => setDaysHeld(p)}>
                  {p}d
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="cl-days" value={daysHeld}
              onChange={(e) => setDaysHeld(e.target.value)} min="0.1" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Concentrated liquidity (Uniswap V3): tighter range = higher fees but higher IL and out-of-range risk.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Capital Efficiency')}</span>
                <span className="result-hero-value"><Layers size={28} />{result.efficiencyMultiplier.toFixed(1)}×</span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {getUiString(lang, 'vs full range V2')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Range width')}</span>
                  <span className="result-value">±{(result.rangeWidthPct / 2).toFixed(1)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'In-range probability (rough)')}</span>
                  <span className="result-value">{(result.inRangeProbability * 100).toFixed(1)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily fee income (in range)')}</span>
                  <span className="result-value profit">{formatUSD(result.dailyFeeIncome)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expected daily (with downtime)')}</span>
                  <span className="result-value">{formatUSD(result.expectedDailyFees)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total fees over period')}</span>
                  <span className="result-value profit">{formatUSD(result.totalFees)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'IL at lower bound')}</span>
                  <span className="result-value fee">{result.v3IlAtLower.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'IL at upper bound')}</span>
                  <span className="result-value fee">{result.v3IlAtUpper.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net P&L estimate')}</span>
                  <span className={`result-value ${result.netPnl >= 0 ? 'profit' : 'loss'}`}>
                    {result.netPnl >= 0 ? '+' : ''}{formatUSD(result.netPnl)}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Estimates are approximate. Actual fees depend on swap volume distribution, MEV, and competing LPs. Tight ranges concentrate IL — out-of-range = no fees + max IL.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid range')}</h2>
              <p>{getUiString(lang, 'Lower must be less than upper, both must be positive.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(ConcentratedLiquidityCalculator);
