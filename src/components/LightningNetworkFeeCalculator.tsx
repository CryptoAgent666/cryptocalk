import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Zap, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const LN_SCENARIOS = [
  { label: 'Strike Direct (1 hop)', amountSat: '100000', baseFeeMsat: '1000', ppm: '100', hops: '1' },
  { label: 'Wallet of Satoshi (~3 hops)', amountSat: '50000', baseFeeMsat: '1000', ppm: '500', hops: '3' },
  { label: 'Phoenix Self-routed', amountSat: '500000', baseFeeMsat: '0', ppm: '300', hops: '4' },
  { label: 'Tiny Tip (10 sats)', amountSat: '10', baseFeeMsat: '1000', ppm: '100', hops: '2' },
] as const;

function LightningNetworkFeeCalculator({ lang = 'en' }: { lang?: string }) {
  const [amountSat, setAmountSat] = useState('100000');
  const [baseFeeMsat, setBaseFeeMsat] = useState('1000');
  const [ppm, setPpm] = useState('100');
  const [hops, setHops] = useState('3');
  const [btcPrice, setBtcPrice] = useState('77300');

  const applyScenario = (s: (typeof LN_SCENARIOS)[number]) => {
    setAmountSat(s.amountSat); setBaseFeeMsat(s.baseFeeMsat);
    setPpm(s.ppm); setHops(s.hops);
  };
  const isScenarioActive = (s: (typeof LN_SCENARIOS)[number]) =>
    amountSat === s.amountSat && baseFeeMsat === s.baseFeeMsat &&
    ppm === s.ppm && hops === s.hops;

  const result = useMemo(() => {
    const amt = Number(amountSat);
    const baseMsat = Number(baseFeeMsat);
    const ppmRate = Number(ppm);
    const h = Number(hops);
    const price = Number(btcPrice);
    if (![amt, baseMsat, ppmRate, h, price].every(Number.isFinite) || amt <= 0 || h <= 0 || price <= 0) return null;

    // Per-hop fee: base + (amount × ppm / 1M) — both in sats (msat / 1000 → sat)
    const baseFeeSatPerHop = baseMsat / 1000;
    const proportionalSatPerHop = (amt * ppmRate) / 1_000_000;
    const feePerHopSat = baseFeeSatPerHop + proportionalSatPerHop;
    const totalFeeSat = feePerHopSat * h;

    // Convert to USD
    const totalFeeBtc = totalFeeSat / 1e8;
    const totalFeeUsd = totalFeeBtc * price;
    const amountBtc = amt / 1e8;
    const amountUsd = amountBtc * price;

    const feePctOfPayment = amt > 0 ? (totalFeeSat / amt) * 100 : 0;

    // On-chain comparison: typical 200 sats/vB × 140 vB transaction = 28000 sats
    const typicalOnchainSat = 28000;
    const typicalOnchainUsd = (typicalOnchainSat / 1e8) * price;
    const savingsVsOnchainPct = typicalOnchainSat > 0 ? ((typicalOnchainSat - totalFeeSat) / typicalOnchainSat) * 100 : 0;

    let rating = 'Reasonable';
    if (feePctOfPayment > 5) rating = 'High fee %';
    else if (feePctOfPayment > 1) rating = 'Acceptable';
    else if (feePctOfPayment > 0.1) rating = 'Low fee %';
    else rating = 'Negligible';

    return {
      feePerHopSat, totalFeeSat, totalFeeUsd, amountUsd, feePctOfPayment,
      typicalOnchainSat, typicalOnchainUsd, savingsVsOnchainPct, rating,
    };
  }, [amountSat, baseFeeMsat, ppm, hops, btcPrice]);

  const reset = () => {
    setAmountSat('100000'); setBaseFeeMsat('1000');
    setPpm('100'); setHops('3'); setBtcPrice('77300');
  };

  const formatUSD = (v: number) =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: v < 1 ? 4 : 2, maximumFractionDigits: v < 1 ? 6 : 2,
    }).format(v);

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {LN_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ln-amount">{getUiString(lang, 'Payment Amount (sats)')}</label>
            <div className="pills-row">
              {['1000', '10000', '100000', '1000000'].map((p) => (
                <button key={p}
                  className={`pill-btn ${amountSat === p ? 'active' : ''}`}
                  onClick={() => setAmountSat(p)}>
                  {parseInt(p).toLocaleString()} sat
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ln-amount" value={amountSat}
              onChange={(e) => setAmountSat(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ln-base">{getUiString(lang, 'Base Fee')} (msat)</label>
            <div className="pills-row">
              {['0', '1000', '5000'].map((p) => (
                <button key={p}
                  className={`pill-btn ${baseFeeMsat === p ? 'active' : ''}`}
                  onClick={() => setBaseFeeMsat(p)}>
                  {p === '0' ? 'Zero' : `${parseInt(p) / 1000} sat`}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ln-base" value={baseFeeMsat}
              onChange={(e) => setBaseFeeMsat(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ln-ppm">{getUiString(lang, 'PPM Rate')} ({getUiString(lang, 'parts per million')})</label>
            <div className="pills-row">
              {['10', '100', '500', '1000'].map((p) => (
                <button key={p}
                  className={`pill-btn ${ppm === p ? 'active' : ''}`}
                  onClick={() => setPpm(p)}>
                  {p} ppm
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ln-ppm" value={ppm}
              onChange={(e) => setPpm(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ln-hops">{getUiString(lang, 'Number of Hops')}</label>
            <div className="pills-row">
              {['1', '2', '3', '4', '5'].map((p) => (
                <button key={p}
                  className={`pill-btn ${hops === p ? 'active' : ''}`}
                  onClick={() => setHops(p)}>
                  {p} hop{p === '1' ? '' : 's'}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ln-hops" value={hops}
              onChange={(e) => setHops(e.target.value)} min="1" step="1"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ln-btc">{getUiString(lang, 'BTC Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="ln-btc" value={btcPrice}
              onChange={(e) => setBtcPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Fee = base_fee + (amount × ppm / 1,000,000) per hop. Multi-hop = sum across path.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.feePctOfPayment < 1 ? 'profit' : result.feePctOfPayment < 5 ? '' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Total LN Fee')}</span>
                <span className="result-hero-value"><Zap size={28} />{result.totalFeeSat.toFixed(2)} sat</span>
                <span className={`result-hero-roi ${result.feePctOfPayment < 1 ? 'profit' : result.feePctOfPayment < 5 ? '' : 'loss'}`}>
                  {formatUSD(result.totalFeeUsd)} · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Fee per hop')}</span>
                  <span className="result-value">{result.feePerHopSat.toFixed(2)} sat</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Fee % of payment')}</span>
                  <span className={`result-value ${result.feePctOfPayment > 1 ? 'fee' : ''}`}>
                    {result.feePctOfPayment.toFixed(4)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Payment value')}</span>
                  <span className="result-value">{formatUSD(result.amountUsd)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Typical on-chain fee')}</span>
                  <span className="result-value">{result.typicalOnchainSat.toLocaleString()} sat ({formatUSD(result.typicalOnchainUsd)})</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'LN savings vs on-chain')}</span>
                  <span className={`result-value ${result.savingsVsOnchainPct > 0 ? 'profit' : 'loss'}`}>
                    {result.savingsVsOnchainPct > 0 ? '+' : ''}{result.savingsVsOnchainPct.toFixed(2)}%
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Routing fees vary by path. Self-hosted nodes can route at near-zero cost. Custodial wallets typically charge 0.1-1% spread on top of LN fees.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter valid inputs')}</h3>
              <p>{getUiString(lang, 'Provide payment amount, base fee, ppm rate, and hops.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(LightningNetworkFeeCalculator);
