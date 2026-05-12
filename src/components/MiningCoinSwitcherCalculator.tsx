import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Cpu, Info, RotateCcw, Pickaxe } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const HARDWARE = [
  { id: 'rtx-4090', label: 'RTX 4090', power: '450', hashes: { kaspa: '1450', ravencoin: '70', ergo: '320', flux: '90', alephium: '12' } },
  { id: 'rtx-4080', label: 'RTX 4080', power: '320', hashes: { kaspa: '1100', ravencoin: '52', ergo: '240', flux: '70', alephium: '9' } },
  { id: 'rtx-3090', label: 'RTX 3090', power: '350', hashes: { kaspa: '900', ravencoin: '50', ergo: '200', flux: '60', alephium: '7' } },
  { id: 'rtx-3080', label: 'RTX 3080', power: '320', hashes: { kaspa: '650', ravencoin: '45', ergo: '180', flux: '50', alephium: '6' } },
  { id: 'antminer-s21', label: 'Antminer S21 (BTC)', power: '3500', hashes: { bitcoin: '200000000' } },
  { id: 'antminer-ks5', label: 'Antminer KS5 (KAS)', power: '3000', hashes: { kaspa: '21000000' } },
] as const;

const COINS = [
  { id: 'bitcoin', label: 'BTC', algo: 'SHA-256', price: '100000', dailyPerHash: 0.00000000095, hashUnit: 'h/s' },
  { id: 'kaspa', label: 'KAS', algo: 'kHeavyHash', price: '0.18', dailyPerHash: 0.00018, hashUnit: 'kh/s' },
  { id: 'ravencoin', label: 'RVN', algo: 'KAWPOW', price: '0.022', dailyPerHash: 0.0085, hashUnit: 'mh/s' },
  { id: 'ergo', label: 'ERG', algo: 'Autolykos', price: '1.10', dailyPerHash: 0.000018, hashUnit: 'mh/s' },
  { id: 'flux', label: 'FLUX', algo: 'ZelHash', price: '0.65', dailyPerHash: 0.00009, hashUnit: 'sol/s' },
  { id: 'alephium', label: 'ALPH', algo: 'Blake3', price: '1.85', dailyPerHash: 0.00012, hashUnit: 'mh/s' },
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
    const advantagePct = second && second.dailyNet > 0 ? (advantage / second.dailyNet) * 100 : 0;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (best && best.dailyNet > dailyElectricity * 2) { zone = 'profit'; rating = 'Highly profitable'; }
    else if (best && best.dailyNet > 0) { zone = 'profit'; rating = 'Profitable'; }
    else if (best && best.dailyNet > -dailyElectricity * 0.3) { zone = 'neutral'; rating = 'Marginal'; }
    else { zone = 'loss'; rating = 'Unprofitable at this rate'; }

    return {
      dailyKwh, dailyElectricity, coinResults, best, second, advantage, advantagePct,
      zone, rating, hardwareLabel: hw.label,
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
            {getUiString(lang, 'Estimates use illustrative network difficulty and prices. Actual yields fluctuate hourly with difficulty, price, and network share.')}
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
                    {result.second ? `+${formatUSD(result.advantage)}/day (${result.advantagePct.toFixed(1)}%)` : '—'}
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
                  <span className="result-value">{result.best.profitMargin.toFixed(1)}%</span>
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
