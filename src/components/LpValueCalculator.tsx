import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Droplets, Info, RotateCcw, Layers } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const LP_PRESETS = [
  { label: 'ETH/USDC V2', tokenAQty: '5', tokenAPrice: '3500', tokenBQty: '17500', tokenBPrice: '1', initialAPrice: '3000', initialBPrice: '1', feesEarned: '450', daysHeld: '90' },
  { label: 'WBTC/ETH V2', tokenAQty: '0.3', tokenAPrice: '95000', tokenBPrice: '3500', tokenBQty: '8.14', initialAPrice: '90000', initialBPrice: '3500', feesEarned: '380', daysHeld: '60' },
  { label: 'Stable Pair', tokenAQty: '5000', tokenAPrice: '1', tokenBQty: '5000', tokenBPrice: '1', initialAPrice: '1', initialBPrice: '1', feesEarned: '120', daysHeld: '180' },
  { label: 'SOL/USDC', tokenAQty: '50', tokenAPrice: '180', tokenBQty: '9000', tokenBPrice: '1', initialAPrice: '150', initialBPrice: '1', feesEarned: '270', daysHeld: '120' },
] as const;

function LpValueCalculator({ lang = 'en' }: { lang?: string }) {
  const [tokenAQty, setTokenAQty] = useState('5');
  const [tokenAPrice, setTokenAPrice] = useState('3500');
  const [tokenBQty, setTokenBQty] = useState('17500');
  const [tokenBPrice, setTokenBPrice] = useState('1');
  const [initialAPrice, setInitialAPrice] = useState('3000');
  const [initialBPrice, setInitialBPrice] = useState('1');
  const [feesEarned, setFeesEarned] = useState('450');
  const [daysHeld, setDaysHeld] = useState('90');

  const applyPreset = (p: typeof LP_PRESETS[number]) => {
    setTokenAQty(p.tokenAQty); setTokenAPrice(p.tokenAPrice);
    setTokenBQty(p.tokenBQty); setTokenBPrice(p.tokenBPrice);
    setInitialAPrice(p.initialAPrice); setInitialBPrice(p.initialBPrice);
    setFeesEarned(p.feesEarned); setDaysHeld(p.daysHeld);
  };
  const isPresetActive = (p: typeof LP_PRESETS[number]) =>
    tokenAQty === p.tokenAQty && tokenAPrice === p.tokenAPrice &&
    tokenBQty === p.tokenBQty && tokenBPrice === p.tokenBPrice;

  const result = useMemo(() => {
    const aQ = Number(tokenAQty);
    const aP = Number(tokenAPrice);
    const bQ = Number(tokenBQty);
    const bP = Number(tokenBPrice);
    const aPi = Number(initialAPrice);
    const bPi = Number(initialBPrice);
    const fees = Number(feesEarned);
    const days = Number(daysHeld);

    if (![aQ, aP, bQ, bP, aPi, bPi, fees, days].every(Number.isFinite)) return null;
    if (aQ < 0 || aP <= 0 || bQ < 0 || bP <= 0 || aPi <= 0 || bPi <= 0 || days <= 0) return null;

    const currentLpValue = aQ * aP + bQ * bP;
    // Initial LP assumes equal value of both tokens (V2 50/50)
    const initialLpValue = aQ * aPi + bQ * bPi;
    // Constant product invariant k = aQ_initial * bQ_initial. To track HODL:
    // HODL: keep initial token quantities, value at current prices
    const hodlValue = aQ * aP + bQ * bP;
    // Wait — in V2, quantities of each token CHANGE as prices move (constant product k).
    // Let's compute properly using k invariant:
    // k = aQ × bQ at current state. If prices changed, original quantities were:
    // aQ_initial × aPi = bQ_initial × bPi (50/50 assumption)
    // We know current aQ, bQ. Actually for the calc, user enters CURRENT values.
    // To estimate "original" quantities, we use the price ratio shift.
    const k = aQ * bQ;
    // Original price ratio aPi/bPi → original aQ/bQ = sqrt(k * bPi / aPi)
    const aQ0 = Math.sqrt(k * (bPi / aPi));
    const bQ0 = Math.sqrt(k * (aPi / bPi));
    const initialDeposit = aQ0 * aPi + bQ0 * bPi;
    const hodlValueProper = aQ0 * aP + bQ0 * bP;

    const ilUsd = currentLpValue - hodlValueProper;
    const ilPct = hodlValueProper > 0 ? (ilUsd / hodlValueProper) * 100 : 0;

    const totalReturn = currentLpValue + fees - initialDeposit;
    const totalReturnPct = initialDeposit > 0 ? (totalReturn / initialDeposit) * 100 : 0;
    const hodlReturn = hodlValueProper - initialDeposit;
    const hodlReturnPct = initialDeposit > 0 ? (hodlReturn / initialDeposit) * 100 : 0;
    const lpVsHodl = totalReturn - hodlReturn;
    const lpVsHodlPct = hodlValueProper > 0 ? (lpVsHodl / initialDeposit) * 100 : 0;

    const annualizedReturn = days > 0 ? totalReturnPct * (365 / days) : 0;
    const feesApr = days > 0 && initialDeposit > 0 ? (fees / initialDeposit) * (365 / days) * 100 : 0;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (lpVsHodl > 0) { zone = 'profit'; rating = 'Beating HODL'; }
    else if (totalReturn > 0) { zone = 'neutral'; rating = 'Positive but trailing HODL'; }
    else { zone = 'loss'; rating = 'Net loss'; }

    return {
      currentLpValue, initialDeposit, hodlValueProper, ilUsd, ilPct,
      totalReturn, totalReturnPct, hodlReturn, hodlReturnPct,
      lpVsHodl, lpVsHodlPct, annualizedReturn, feesApr,
      aQ0, bQ0, zone, rating,
    };
  }, [tokenAQty, tokenAPrice, tokenBQty, tokenBPrice, initialAPrice, initialBPrice, feesEarned, daysHeld]);

  const reset = () => applyPreset(LP_PRESETS[0]);

  const formatUSD = (v: number) => {
    if (!Number.isFinite(v)) return '—';
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(v);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {LP_PRESETS.map((p) => (
                <button key={p.label}
                  className={`pill-btn ${isPresetActive(p) ? 'active' : ''}`}
                  onClick={() => applyPreset(p)}>
                  {getUiString(lang, p.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="lp-aqty">{getUiString(lang, 'Token A Quantity (current)')}</label>
            <input type="number" inputMode="decimal" id="lp-aqty" value={tokenAQty}
              onChange={(e) => setTokenAQty(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-aprice">{getUiString(lang, 'Token A Price (current)')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-aprice" value={tokenAPrice}
              onChange={(e) => setTokenAPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-bqty">{getUiString(lang, 'Token B Quantity (current)')}</label>
            <input type="number" inputMode="decimal" id="lp-bqty" value={tokenBQty}
              onChange={(e) => setTokenBQty(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-bprice">{getUiString(lang, 'Token B Price (current)')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-bprice" value={tokenBPrice}
              onChange={(e) => setTokenBPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-aiprice">{getUiString(lang, 'Token A Initial Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-aiprice" value={initialAPrice}
              onChange={(e) => setInitialAPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-biprice">{getUiString(lang, 'Token B Initial Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-biprice" value={initialBPrice}
              onChange={(e) => setInitialBPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-fees">{getUiString(lang, 'Fees Earned to Date')} (USD)</label>
            <input type="number" inputMode="decimal" id="lp-fees" value={feesEarned}
              onChange={(e) => setFeesEarned(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="lp-days">{getUiString(lang, 'Days Held')}</label>
            <input type="number" inputMode="decimal" id="lp-days" value={daysHeld}
              onChange={(e) => setDaysHeld(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'V2 LPs follow x×y=k. Quantities shift as prices move. We back-calculate initial deposit from current state and price ratio.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net P&L vs HODL')}</span>
                <span className="result-hero-value"><Layers size={28} />
                  {result.lpVsHodl >= 0 ? '+' : ''}{formatUSD(result.lpVsHodl)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.lpVsHodlPct >= 0 ? '+' : ''}{result.lpVsHodlPct.toFixed(2)}% · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Current LP value')}</span>
                  <span className="result-value">{formatUSD(result.currentLpValue)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Initial deposit (estimated)')}</span>
                  <span className="result-value">{formatUSD(result.initialDeposit)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'HODL value (no LP)')}</span>
                  <span className="result-value">{formatUSD(result.hodlValueProper)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Impermanent loss')}</span>
                  <span className={`result-value ${result.ilUsd >= 0 ? 'profit' : 'loss'}`}>
                    {result.ilUsd >= 0 ? '+' : ''}{formatUSD(result.ilUsd)} ({result.ilPct >= 0 ? '+' : ''}{result.ilPct.toFixed(2)}%)
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Fees earned')}</span>
                  <span className="result-value profit">+{formatUSD(Number(feesEarned))}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total LP return')}</span>
                  <span className={`result-value ${result.totalReturn >= 0 ? 'profit' : 'loss'}`}>
                    {result.totalReturn >= 0 ? '+' : ''}{formatUSD(result.totalReturn)} ({result.totalReturnPct >= 0 ? '+' : ''}{result.totalReturnPct.toFixed(2)}%)
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'HODL return')}</span>
                  <span className={`result-value ${result.hodlReturn >= 0 ? 'profit' : 'loss'}`}>
                    {result.hodlReturn >= 0 ? '+' : ''}{formatUSD(result.hodlReturn)} ({result.hodlReturnPct >= 0 ? '+' : ''}{result.hodlReturnPct.toFixed(2)}%)
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annualized total return')}</span>
                  <span className={`result-value ${result.annualizedReturn >= 0 ? 'profit' : 'loss'}`}>
                    {result.annualizedReturn >= 0 ? '+' : ''}{result.annualizedReturn.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Fees-only APR')}</span>
                  <span className="result-value profit">+{result.feesApr.toFixed(2)}%</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'V3 concentrated liquidity has different IL math (see our Concentrated Liquidity calculator). This calc uses V2 constant-product. Initial deposit is estimated from current state.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Droplets size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'All quantities and prices must be positive numbers.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(LpValueCalculator);
