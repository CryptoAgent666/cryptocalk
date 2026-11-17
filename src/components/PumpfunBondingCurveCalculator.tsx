import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, Rocket } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';
import { loc } from '../i18n/format';

// Pump.fun bonding curve constants (constant product Bancor-like).
// Initial virtual reserves (these don't change unless protocol updates).
const VIRTUAL_SOL_RESERVE = 30; // 30 SOL
const VIRTUAL_TOKEN_RESERVE = 1_073_000_191; // ~1.073B tokens
const TOTAL_TOKEN_SUPPLY = 1_000_000_000; // 1B fixed supply
// The curve completes ('graduates') when ~85 real SOL has entered it (~793M of the virtual tokens sold) and the
// token migrates to PumpSwap (Pump.fun's own AMM since 20 Mar 2025; Raydium before). Graduation is therefore fixed in
// SOL, not in dollars: its USD market cap is ~410.8 SOL x the SOL price (~$63.7K at $155, ~$29.6K at $72).
const GRADUATION_SOL = 85;

const PUMPFUN_SCENARIOS = [
  { label: 'Early Sniper', solInvested: '0.5', solPriceUsd: '72', currentSolInCurve: '0.1' },
  { label: 'Mid Pump', solInvested: '1', solPriceUsd: '72', currentSolInCurve: '50' },
  { label: 'Pre-Graduation', solInvested: '2', solPriceUsd: '72', currentSolInCurve: '85' },
  { label: 'Whale Entry', solInvested: '10', solPriceUsd: '72', currentSolInCurve: '20' },
] as const;

function PumpfunBondingCurveCalculator({ lang = 'en' }: { lang?: string }) {
  const [solInvested, setSolInvested] = useState('1');
  const [solPriceUsd, setSolPriceUsd] = useState('72');
  const [currentSolInCurve, setCurrentSolInCurve] = useState('20');

  const applyScenario = (s: (typeof PUMPFUN_SCENARIOS)[number]) => {
    setSolInvested(s.solInvested); setSolPriceUsd(s.solPriceUsd);
    setCurrentSolInCurve(s.currentSolInCurve);
  };
  const isScenarioActive = (s: (typeof PUMPFUN_SCENARIOS)[number]) =>
    solInvested === s.solInvested && solPriceUsd === s.solPriceUsd &&
    currentSolInCurve === s.currentSolInCurve;

  const result = useMemo(() => {
    const buyAmount = Number(solInvested);
    const solUsd = Number(solPriceUsd);
    const currentSol = Number(currentSolInCurve);
    if (![buyAmount, solUsd, currentSol].every(Number.isFinite) || buyAmount <= 0 || solUsd <= 0 || currentSol < 0) return null;

    // Current state: virtual reserves shifted by curve progress
    const currentVirtualSol = VIRTUAL_SOL_RESERVE + currentSol;
    // k = constant product
    const k = VIRTUAL_SOL_RESERVE * VIRTUAL_TOKEN_RESERVE;
    const currentVirtualTokens = k / currentVirtualSol;
    const tokensSold = VIRTUAL_TOKEN_RESERVE - currentVirtualTokens;

    // Current price per token (in SOL): derivative of curve at current point
    const currentPriceSol = currentVirtualSol / currentVirtualTokens;
    const currentPriceUsd = currentPriceSol * solUsd;

    // Current market cap (using the spot price × supply that has moved out)
    const currentMcapUsd = currentPriceUsd * TOTAL_TOKEN_SUPPLY;

    // Buy: how many tokens for buyAmount SOL?
    const newVirtualSol = currentVirtualSol + buyAmount;
    const newVirtualTokens = k / newVirtualSol;
    const tokensReceived = currentVirtualTokens - newVirtualTokens;

    // Effective price (per token, in SOL)
    const effectivePriceSol = buyAmount / tokensReceived;
    const effectivePriceUsd = effectivePriceSol * solUsd;

    // Slippage vs spot
    const slippagePct = currentPriceSol > 0 ? ((effectivePriceSol - currentPriceSol) / currentPriceSol) * 100 : 0;

    // Post-buy market cap
    const postBuyPriceSol = newVirtualSol / newVirtualTokens;
    const postBuyMcapUsd = postBuyPriceSol * solUsd * TOTAL_TOKEN_SUPPLY;

    // Distance to graduation: spot price of the curve once GRADUATION_SOL has entered it
    const gradVirtualSol = VIRTUAL_SOL_RESERVE + GRADUATION_SOL;
    const gradPriceSol = gradVirtualSol / (k / gradVirtualSol);
    const graduationMcapUsd = gradPriceSol * solUsd * TOTAL_TOKEN_SUPPLY;
    const remainingMcap = Math.max(0, graduationMcapUsd - currentMcapUsd);
    const remainingMcapPct = graduationMcapUsd > 0 ? (remainingMcap / graduationMcapUsd) * 100 : 100;

    const solNeededToGraduate = Math.max(0, GRADUATION_SOL - currentSol);

    // Position value at graduation (assuming you held to graduation point)
    const graduationPriceUsd = gradPriceSol * solUsd;
    const positionValueAtGrad = tokensReceived * graduationPriceUsd;
    const buyAmountUsd = buyAmount * solUsd;
    const profitAtGrad = positionValueAtGrad - buyAmountUsd;
    const roiAtGrad = buyAmountUsd > 0 ? (profitAtGrad / buyAmountUsd) * 100 : 0;

    let rating = '';
    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    if (currentSol >= GRADUATION_SOL) { rating = 'Already graduated'; zone = 'neutral'; }
    else if (slippagePct > 50) { rating = 'High slippage'; zone = 'loss'; }
    else if (currentSol < 5) { rating = 'Early entry'; zone = 'profit'; }
    else if (currentSol < 50) { rating = 'Mid curve'; zone = 'neutral'; }
    else { rating = 'Late entry'; zone = 'loss'; }

    return {
      tokensReceived, currentPriceUsd, effectivePriceUsd, slippagePct,
      currentMcapUsd, postBuyMcapUsd, remainingMcap, remainingMcapPct,
      solNeededToGraduate, graduationPriceUsd, positionValueAtGrad,
      buyAmountUsd, profitAtGrad, roiAtGrad, rating, zone,
      tokensSold, tokensSoldPct: (tokensSold / VIRTUAL_TOKEN_RESERVE) * 100,
    };
  }, [solInvested, solPriceUsd, currentSolInCurve]);

  const reset = () => {
    setSolInvested('1'); setSolPriceUsd('72'); setCurrentSolInCurve('20');
  };

  const formatUSD = (v: number) =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: v < 0.01 ? 8 : 2, maximumFractionDigits: v < 0.01 ? 10 : 2,
    }).format(v);

  const formatTokens = (v: number) => {
    if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(2)}K`;
    return v.toFixed(2);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {PUMPFUN_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pf-sol-invested">{getUiString(lang, 'SOL to Invest')}</label>
            <div className="pills-row">
              {['0.1', '0.5', '1', '5', '10'].map((p) => (
                <button key={p}
                  className={`pill-btn ${solInvested === p ? 'active' : ''}`}
                  onClick={() => setSolInvested(p)}>
                  {p} SOL
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-sol-invested" value={solInvested}
              onChange={(e) => setSolInvested(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-sol-price">{getUiString(lang, 'SOL Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="pf-sol-price" value={solPriceUsd}
              onChange={(e) => setSolPriceUsd(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pf-curve-state">{getUiString(lang, 'Current SOL in Bonding Curve')}</label>
            <div className="pills-row">
              {['0', '5', '20', '50', '80'].map((p) => (
                <button key={p}
                  className={`pill-btn ${currentSolInCurve === p ? 'active' : ''}`}
                  onClick={() => setCurrentSolInCurve(p)}>
                  {p} SOL
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="pf-curve-state" value={currentSolInCurve}
              onChange={(e) => setCurrentSolInCurve(e.target.value)} min="0" max="85" step="any"
              onFocus={(e) => e.target.select()} />
            <span className="input-hint">
              {getUiString(lang, 'Curve graduates to PumpSwap at ~85 SOL (about 411 SOL of market cap).')}
            </span>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Pump.fun bonding curve: 30 SOL × 1.073B tokens virtual reserves. Earlier entry = more tokens per SOL.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone === 'profit' ? 'profit' : result.zone === 'loss' ? 'loss' : ''}`}>
                <span className="result-hero-label">{getUiString(lang, 'Tokens Received')}</span>
                <span className="result-hero-value"><Rocket size={28} />{formatTokens(result.tokensReceived)}</span>
                <span className={`result-hero-roi ${result.zone === 'profit' ? 'profit' : result.zone === 'loss' ? 'loss' : ''}`}>
                  {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Spot price')}</span>
                  <span className="result-value">{formatUSD(result.currentPriceUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Effective price (your buy)')}</span>
                  <span className="result-value">{formatUSD(result.effectivePriceUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Slippage')}</span>
                  <span className={`result-value ${result.slippagePct > 5 ? 'fee' : ''}`}>
                    {result.slippagePct.toLocaleString(loc(lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Current market cap')}</span>
                  <span className="result-value">{formatUSD(result.currentMcapUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Post-buy market cap')}</span>
                  <span className="result-value">{formatUSD(result.postBuyMcapUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Remaining to graduation')}</span>
                  <span className={`result-value ${result.remainingMcap > 0 ? '' : 'profit'}`}>
                    {result.remainingMcap > 0 ? formatUSD(result.remainingMcap) : getUiString(lang, 'Graduated')}
                  </span>
                </div>
                {result.solNeededToGraduate > 0 && (
                  <div className="result-row">
                    <span className="result-label">{getUiString(lang, 'SOL needed to graduate')}</span>
                    <span className="result-value">{result.solNeededToGraduate.toFixed(2)} SOL</span>
                  </div>
                )}
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Position value at graduation')}</span>
                  <span className={`result-value ${result.profitAtGrad >= 0 ? 'profit' : 'loss'}`}>
                    {formatUSD(result.positionValueAtGrad)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'ROI at graduation')}</span>
                  <span className={`result-value ${result.roiAtGrad >= 0 ? 'profit' : 'loss'}`}>
                    {result.roiAtGrad >= 0 ? '+' : ''}{result.roiAtGrad.toLocaleString(loc(lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Pump.fun memecoins are extremely high risk. ~99% fail to graduate. Even after graduation, most lose value within days. Never invest more than you can afford to lose.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Provide SOL invested, SOL price, and current curve state.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PumpfunBondingCurveCalculator);
