import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Cpu, Info, RotateCcw, Pickaxe } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';
import { loc } from '../i18n/format';

// Model constants re-derived from live network state on 2026-09-10. `dailyPerHash`
// is no longer a tuned figure: it is (daily network emission / network hashrate),
// so hashRate x dailyPerHash is the real expected coin yield for that hash rate.
// Prices are a hand-refreshed spot snapshot (still not fetched at runtime), which
// is why the UI labels them as a dated snapshot rather than a live quote.
//
// Why this was re-derived: the previous constants were calibrated by hand and had
// drifted apart from the chains by 1.4x (ERG) to ~500x (KAS). Because the page
// exists to RANK coins, that inverted the ranking - it advertised KAS as the #2
// GPU coin when a GPU on Kaspa now earns fractions of a cent per day. The net
// $/day still looked plausible only because at $0.10/kWh the electricity bill
// swamps every altcoin's revenue.
//
// Network state, two independent reads each (2026-09-10):
//   BTC  difficulty 127,450,789,715,843 (mempool.space == blockchain.info),
//        3.125 BTC/block -> 1/(D x 2^32) x 86400 x 3.125 = 4.93247e-7 BTC per TH/s
//   KAS  hashrate 3.23569e17 H/s (api.kaspa.org; == difficulty 1.6125e16 x 2 x 10 BPS),
//        2.18267645 KAS/block x 10 BPS x 86400 = 1,885,832 KAS/day -> 0.005828216 per GH/s
//   RVN  hashrate 628.8 / 655.0 GH/s (whattomine / 2miners), 1250 RVN per 60s block
//        = 1,800,000 RVN/day -> 2.804003 per MH/s
//   ERG  hashrate 538.4 / 536.4 GH/s (whattomine / ergoplatform node), 3 ERG per
//        117s block = 2,215 ERG/day -> 0.004122396 per MH/s
//   ALPH hashrate 5.19025e15 H/s (alephium backend); emission measured directly from
//        the supply series, 23,215 / 23,537 / 24,137 ALPH over three days
//        -> 23,630 ALPH/day -> 0.004552680 per GH/s
//
// KAS and ALPH are kept in the table precisely because the honest numbers are tiny:
// both chains are ASIC-dominated (an Antminer KS7 is 40 TH/s against a 4090's
// 1.79 GH/s), so a GPU earns ~$0.0004/day on Kaspa. Showing that is the useful
// answer to "should I point my GPU at Kaspa?", and it is three orders of magnitude
// below Ravencoin - not the near-tie the old constants implied.
//
// KAS tracks Kaspa's monthly "chromatic halving": month 52 (since 2026-09-05) pays
// 2.18267645/block. Month 53 opens at DAA 557,505,000 (~2026-10-05) -> 2.06017223,
// which scales dailyPerHash by 2^(-1/12) to 0.005501475 if the hashrate is unchanged
// - but re-read the hashrate too, since that is now a real input. Handled by the
// cryptocalk-kaspa-emission-* scheduled task.
// FLUX removed 2026-09-10: the PoUW v2 hard fork at block 2,020,000 (Oct 2025)
// ended GPU mining entirely - blocks are produced by FluxNodes (Proof of Nodes).
// Verified on-chain: the coinbase pays 14 FLUX split across node tiers + dev
// fund with no miner output at all. Same removal as GpuMiningCalculator (2026-06-30).
const PRICE_SNAPSHOT = '2026-09-10';

// Device hash rates are measured third-party benchmarks, not nameplate figures:
// minerstat (per-algorithm, updated 2026-08-29) and 2CryptoCalc, averaged where both
// carry the algorithm. Two minerstat entries were rejected as internally impossible
// and the other source used instead: RTX 4090 KAWPOW 120 MH/s (its own ProgPoW-family
// siblings sit at 64-68 MH/s, and KawPow is memory-bandwidth-bound while a 4090 has
// only 1.08x a 3090's bandwidth), and RTX 4080 Blake3 3.6 GH/s (above its own 4090
// figure of 2.8) - the 4080 is scaled from the 4090 by the same-architecture
// kHeavyHash ratio instead. Power stays at card TDP / vendor spec, so these are
// stock-cooling numbers; an undervolted rig does better than the page shows.
// Antminer KS5 corrected 29 TH/s -> 20 TH/s (Bitmain spec, 20 Th/s at 3150 W;
// minerstat lists the same 20 TH/s). 29 TH/s matched no shipped KS-series model.
const HARDWARE = [
  { id: 'rtx-4090', label: 'RTX 4090', power: '450', hashes: { kaspa: '1.79', ravencoin: '65', ergo: '325', alephium: '2.8' } },
  { id: 'rtx-4080', label: 'RTX 4080', power: '320', hashes: { kaspa: '1.42', ravencoin: '45', ergo: '168', alephium: '2.2' } },
  { id: 'rtx-3090', label: 'RTX 3090', power: '350', hashes: { kaspa: '0.99', ravencoin: '64', ergo: '248', alephium: '1.6' } },
  { id: 'rtx-3080', label: 'RTX 3080', power: '320', hashes: { kaspa: '0.83', ravencoin: '52', ergo: '192', alephium: '1.3' } },
  { id: 'antminer-s21', label: 'Antminer S21 (BTC)', power: '3500', hashes: { bitcoin: '200' } },
  { id: 'antminer-ks5', label: 'Antminer KS5 (KAS)', power: '3150', hashes: { kaspa: '20000' } },
] as const;

const COINS = [
  { id: 'bitcoin', label: 'BTC', algo: 'SHA-256', price: '78080', dailyPerHash: 0.000000493247, hashUnit: 'TH/s' },
  { id: 'kaspa', label: 'KAS', algo: 'kHeavyHash', price: '0.036', dailyPerHash: 0.005828216, hashUnit: 'GH/s' },
  { id: 'ravencoin', label: 'RVN', algo: 'KAWPOW', price: '0.0030', dailyPerHash: 2.804003, hashUnit: 'MH/s' },
  { id: 'ergo', label: 'ERG', algo: 'Autolykos', price: '0.2483', dailyPerHash: 0.004122396, hashUnit: 'MH/s' },
  { id: 'alephium', label: 'ALPH', algo: 'Blake3', price: '0.0554', dailyPerHash: 0.004552680, hashUnit: 'GH/s' },
] as const;

function MiningCoinSwitcherCalculator({ lang = 'en' }: { lang?: string }) {
  const [hardware, setHardware] = useState<typeof HARDWARE[number]['id']>('rtx-4090');
  const [electricityRate, setElectricityRate] = useState('0.10');
  const [poolFee, setPoolFee] = useState('1');
  const [efficiency, setEfficiency] = useState('100');

  const applyHardware = (id: typeof HARDWARE[number]['id']) => setHardware(id);

  const result = useMemo(() => {
    const hw = HARDWARE.find((x) => x.id === hardware);
    if (!hw) return null;

    const power = Number(hw.power);
    const er = Number(electricityRate);
    const fee = Number(poolFee) / 100;
    const eff = Number(efficiency) / 100;

    if (![power, er, fee, eff].every(Number.isFinite)) return null;
    if (power <= 0 || er < 0 || eff <= 0) return null;

    const dailyKwh = (power * 24) / 1000;
    const dailyElectricity = dailyKwh * er;

    const coinResults = COINS.map((coin) => {
      const hashStr = (hw.hashes as Record<string, string | undefined>)[coin.id];
      if (!hashStr) return null;
      const hashRate = Number(hashStr) * eff;
      const dailyGrossCoin = hashRate * coin.dailyPerHash;
      const dailyGrossUsd = dailyGrossCoin * Number(coin.price);
      const dailyAfterPoolFee = dailyGrossUsd * (1 - fee);
      const dailyNet = dailyAfterPoolFee - dailyElectricity;
      const monthlyNet = dailyNet * 30;
      const yearlyNet = dailyNet * 365;
      const profitMargin = dailyGrossUsd > 0 ? (dailyNet / dailyGrossUsd) * 100 : 0;
      return {
        ...coin, hashRate, dailyGrossCoin, dailyGrossUsd, dailyAfterPoolFee,
        dailyNet, monthlyNet, yearlyNet, profitMargin,
      };
    }).filter((x): x is NonNullable<typeof x> => x !== null);

    coinResults.sort((a, b) => b.dailyNet - a.dailyNet);
    const best = coinResults[0];
    const second = coinResults[1];
    const advantage = second ? best.dailyNet - second.dailyNet : 0;
    // A percentage is only meaningful against a positive baseline: when the #2 coin is itself
    // losing money, `advantage / second.dailyNet` flips sign and reads as nonsense. The old guard
    // returned 0, which printed a flat "(0.0%)" next to a real dollar advantage — worse than
    // printing nothing. Track whether the ratio is meaningful and omit it when it is not.
    const advantagePct = second && second.dailyNet > 0 ? (advantage / second.dailyNet) * 100 : 0;
    const advantagePctMeaningful = !!second && second.dailyNet > 0;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (best && best.dailyNet > dailyElectricity * 2) { zone = 'profit'; rating = 'Highly profitable'; }
    else if (best && best.dailyNet > 0) { zone = 'profit'; rating = 'Profitable'; }
    else if (best && best.dailyNet > -dailyElectricity * 0.3) { zone = 'neutral'; rating = 'Marginal'; }
    else { zone = 'loss'; rating = 'Unprofitable at this rate'; }

    return {
      dailyKwh, dailyElectricity, coinResults, best, second, advantage, advantagePct,
      advantagePctMeaningful, zone, rating, hardwareLabel: hw.label,
    };
  }, [hardware, electricityRate, poolFee, efficiency]);

  const reset = () => { setHardware('rtx-4090'); setElectricityRate('0.10'); setPoolFee('1'); setEfficiency('100'); };

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
            <label>{getUiString(lang, 'Mining Hardware')}</label>
            <div className="pills-row">
              {HARDWARE.map((h) => (
                <button key={h.id}
                  className={`pill-btn ${hardware === h.id ? 'active' : ''}`}
                  onClick={() => applyHardware(h.id)}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ms-power">{getUiString(lang, 'Power Draw')} (W)</label>
            <input type="number" inputMode="decimal" id="ms-power" value={HARDWARE.find((x) => x.id === hardware)?.power || ''}
              readOnly disabled />
          </div>

          <div className="input-group">
            <label htmlFor="ms-rate">{getUiString(lang, 'Electricity Rate')} (USD/kWh)</label>
            <div className="pills-row">
              {['0.05', '0.10', '0.12', '0.15', '0.25', '0.40'].map((p) => (
                <button key={p}
                  className={`pill-btn ${electricityRate === p ? 'active' : ''}`}
                  onClick={() => setElectricityRate(p)}>
                  ${p}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ms-rate" value={electricityRate}
              onChange={(e) => setElectricityRate(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ms-fee">{getUiString(lang, 'Pool Fee')} (%)</label>
            <input type="number" inputMode="decimal" id="ms-fee" value={poolFee}
              onChange={(e) => setPoolFee(e.target.value)} min="0" max="20" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ms-eff">{getUiString(lang, 'Hash Rate Efficiency')} (%)</label>
            <input type="number" inputMode="decimal" id="ms-eff" value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)} min="50" max="120" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Estimates use a dated snapshot of network difficulty and prices, not live quotes. Actual yields fluctuate hourly with difficulty, price, and network share.')}
          </span>
          <span className="input-hint">
            {getUiString(lang, 'Coin prices are a reference snapshot, not live quotes')} — {PRICE_SNAPSHOT}
          </span>
        </div>

        <div className="calc-results-panel">
          {result && result.best ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Best Coin to Mine Now')}</span>
                <span className="result-hero-value"><Pickaxe size={28} />
                  {result.best.label}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.best.dailyNet >= 0 ? '+' : ''}{formatUSD(result.best.dailyNet)}/day · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Hardware')}</span>
                  <span className="result-value">{result.hardwareLabel}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily power use')}</span>
                  <span className="result-value">{result.dailyKwh.toFixed(2)} kWh</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily electricity cost')}</span>
                  <span className="result-value fee">−{formatUSD(result.dailyElectricity)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Switching advantage vs #2')}</span>
                  <span className="result-value">
                    {result.second
                      ? `+${formatUSD(result.advantage)}/day${result.advantagePctMeaningful
                          ? ` (${result.advantagePct.toLocaleString(loc(lang), { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%)`
                          : ''}`
                      : '—'}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label" style={{ fontWeight: 600 }}>{getUiString(lang, 'Coin profitability ranking')}</span>
                  <span className="result-value"></span>
                </div>
                {result.coinResults.map((c, idx) => (
                  <div key={c.id} className="result-row">
                    <span className="result-label">
                      {idx + 1}. {c.label} ({c.algo})
                    </span>
                    <span className={`result-value ${c.dailyNet >= 0 ? 'profit' : 'loss'}`}>
                      {c.dailyNet >= 0 ? '+' : ''}{formatUSD(c.dailyNet)}/day
                    </span>
                  </div>
                ))}
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Best coin: monthly net')}</span>
                  <span className={`result-value ${result.best.monthlyNet >= 0 ? 'profit' : 'loss'}`}>
                    {result.best.monthlyNet >= 0 ? '+' : ''}{formatUSD(result.best.monthlyNet)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Best coin: yearly net')}</span>
                  <span className={`result-value ${result.best.yearlyNet >= 0 ? 'profit' : 'loss'}`}>
                    {result.best.yearlyNet >= 0 ? '+' : ''}{formatUSD(result.best.yearlyNet)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Best coin: profit margin')}</span>
                  <span className="result-value">{result.best.profitMargin.toLocaleString(loc(lang), { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Auto-switchers (NiceHash, Hive OS) handle this in real-time. Frequent switching adds DAG-load delay and pool re-share periods. Compare with stake-based passive options.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Cpu size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Select hardware and ensure electricity rate and efficiency are valid.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(MiningCoinSwitcherCalculator);
