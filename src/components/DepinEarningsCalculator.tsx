import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Wifi, Info, RotateCcw, DollarSign } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const DEPIN_NETWORKS = [
  { id: 'helium', label: 'Helium IoT', dailyToken: '0.5', tokenSymbol: 'HNT', tokenPrice: '4.50', hardwareCost: '500', powerWatts: '5', electricityRate: '0.12' },
  { id: 'helium-mobile', label: 'Helium Mobile', dailyToken: '120', tokenSymbol: 'MOBILE', tokenPrice: '0.0003', hardwareCost: '250', powerWatts: '8', electricityRate: '0.12' },
  { id: 'hivemapper', label: 'Hivemapper', dailyToken: '40', tokenSymbol: 'HONEY', tokenPrice: '0.025', hardwareCost: '549', powerWatts: '6', electricityRate: '0.12' },
  { id: 'natix', label: 'NATIX (Drive&)', dailyToken: '15', tokenSymbol: 'NATIX', tokenPrice: '0.002', hardwareCost: '120', powerWatts: '4', electricityRate: '0.12' },
  { id: 'geodnet', label: 'Geodnet GPS', dailyToken: '8', tokenSymbol: 'GEOD', tokenPrice: '0.32', hardwareCost: '720', powerWatts: '6', electricityRate: '0.12' },
  { id: 'xnet', label: 'XNET 5G', dailyToken: '60', tokenSymbol: 'XNET', tokenPrice: '0.015', hardwareCost: '799', powerWatts: '15', electricityRate: '0.12' },
] as const;

function DepinEarningsCalculator({ lang = 'en' }: { lang?: string }) {
  const [network, setNetwork] = useState<typeof DEPIN_NETWORKS[number]['id']>('helium');
  const [dailyToken, setDailyToken] = useState('0.5');
  const [tokenSymbol, setTokenSymbol] = useState('HNT');
  const [tokenPrice, setTokenPrice] = useState('4.50');
  const [hardwareCost, setHardwareCost] = useState('500');
  const [powerWatts, setPowerWatts] = useState('5');
  const [electricityRate, setElectricityRate] = useState('0.12');
  const [internetCost, setInternetCost] = useState('0');
  const [tokenAppreciation, setTokenAppreciation] = useState('0');

  const applyNetwork = (id: typeof DEPIN_NETWORKS[number]['id']) => {
    const n = DEPIN_NETWORKS.find((x) => x.id === id);
    if (!n) return;
    setNetwork(id);
    setDailyToken(n.dailyToken); setTokenSymbol(n.tokenSymbol); setTokenPrice(n.tokenPrice);
    setHardwareCost(n.hardwareCost); setPowerWatts(n.powerWatts); setElectricityRate(n.electricityRate);
  };

  const result = useMemo(() => {
    const dt = Number(dailyToken);
    const tp = Number(tokenPrice);
    const hc = Number(hardwareCost);
    const pw = Number(powerWatts);
    const er = Number(electricityRate);
    const ic = Number(internetCost);
    const ta = Number(tokenAppreciation) / 100;

    if (![dt, tp, hc, pw, er, ic, ta].every(Number.isFinite)) return null;
    if (dt < 0 || tp < 0 || hc < 0) return null;

    const dailyKwh = (pw * 24) / 1000;
    const dailyElectricity = dailyKwh * er;
    const monthlyElectricity = dailyElectricity * 30;
    const dailyInternet = ic / 30;

    const dailyGrossUsd = dt * tp;
    const dailyNetUsd = dailyGrossUsd - dailyElectricity - dailyInternet;
    const monthlyGrossUsd = dailyGrossUsd * 30;
    const monthlyNetUsd = dailyNetUsd * 30;
    const yearlyGrossUsd = dailyGrossUsd * 365;
    const yearlyNetUsd = dailyNetUsd * 365;

    const yearlyTokens = dt * 365;
    const adjustedYearlyValue = ta !== 0
      ? yearlyTokens * tp * (1 + ta / 2)
      : yearlyGrossUsd;
    const yearlyAdjustedNet = adjustedYearlyValue - (dailyElectricity + dailyInternet) * 365;

    const paybackDays = dailyNetUsd > 0 ? hc / dailyNetUsd : Infinity;
    const paybackMonths = paybackDays / 30;
    const roiYear1 = ((yearlyNetUsd - hc) / hc) * 100;
    const roi5Year = (((dailyNetUsd * 365 * 5) - hc) / hc) * 100;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (paybackMonths < 6 && dailyNetUsd > 0) { zone = 'profit'; rating = 'Excellent ROI'; }
    else if (paybackMonths < 12 && dailyNetUsd > 0) { zone = 'profit'; rating = 'Good ROI'; }
    else if (paybackMonths < 24 && dailyNetUsd > 0) { zone = 'neutral'; rating = 'Acceptable'; }
    else if (dailyNetUsd > 0) { zone = 'neutral'; rating = 'Slow payback'; }
    else { zone = 'loss'; rating = 'Negative carry'; }

    const profitMargin = dailyGrossUsd > 0 ? (dailyNetUsd / dailyGrossUsd) * 100 : 0;

    return {
      dailyKwh, dailyElectricity, monthlyElectricity, dailyInternet,
      dailyGrossUsd, dailyNetUsd, monthlyGrossUsd, monthlyNetUsd,
      yearlyGrossUsd, yearlyNetUsd, yearlyTokens, yearlyAdjustedNet,
      paybackDays, paybackMonths, roiYear1, roi5Year, profitMargin,
      zone, rating,
    };
  }, [dailyToken, tokenPrice, hardwareCost, powerWatts, electricityRate, internetCost, tokenAppreciation]);

  const reset = () => applyNetwork('helium');

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
            <label>{getUiString(lang, 'DePIN Network')}</label>
            <div className="pills-row">
              {DEPIN_NETWORKS.map((n) => (
                <button key={n.id}
                  className={`pill-btn ${network === n.id ? 'active' : ''}`}
                  onClick={() => applyNetwork(n.id)}>
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="depin-daily">{getUiString(lang, 'Daily Token Earnings')} ({tokenSymbol})</label>
            <input type="number" inputMode="decimal" id="depin-daily" value={dailyToken}
              onChange={(e) => setDailyToken(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-price">{getUiString(lang, 'Token Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="depin-price" value={tokenPrice}
              onChange={(e) => setTokenPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-hw">{getUiString(lang, 'Hardware Cost')} (USD)</label>
            <input type="number" inputMode="decimal" id="depin-hw" value={hardwareCost}
              onChange={(e) => setHardwareCost(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-watts">{getUiString(lang, 'Power Consumption')} (W)</label>
            <input type="number" inputMode="decimal" id="depin-watts" value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-rate">{getUiString(lang, 'Electricity Rate')} (USD/kWh)</label>
            <input type="number" inputMode="decimal" id="depin-rate" value={electricityRate}
              onChange={(e) => setElectricityRate(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-net">{getUiString(lang, 'Monthly Internet Cost')} (USD)</label>
            <input type="number" inputMode="decimal" id="depin-net" value={internetCost}
              onChange={(e) => setInternetCost(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="depin-app">{getUiString(lang, 'Annual Token Price Change')} (%)</label>
            <input type="number" inputMode="decimal" id="depin-app" value={tokenAppreciation}
              onChange={(e) => setTokenAppreciation(e.target.value)} step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Token rewards depend on coverage area, network density, and protocol issuance schedules. Estimates only.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Monthly Net Earnings')}</span>
                <span className="result-hero-value"><DollarSign size={28} />
                  {formatUSD(result.monthlyNetUsd)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {Number.isFinite(result.paybackMonths) ? `${result.paybackMonths.toFixed(1)} ${getUiString(lang, 'months payback')}` : getUiString(lang, 'No payback')} · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily gross earnings')}</span>
                  <span className="result-value profit">{formatUSD(result.dailyGrossUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily electricity cost')}</span>
                  <span className="result-value fee">−{formatUSD(result.dailyElectricity)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily internet (allocated)')}</span>
                  <span className="result-value fee">−{formatUSD(result.dailyInternet)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily net earnings')}</span>
                  <span className={`result-value ${result.dailyNetUsd >= 0 ? 'profit' : 'loss'}`}>
                    {result.dailyNetUsd >= 0 ? '+' : ''}{formatUSD(result.dailyNetUsd)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily kWh')}</span>
                  <span className="result-value">{result.dailyKwh.toFixed(3)} kWh</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit margin')}</span>
                  <span className="result-value">{result.profitMargin.toFixed(1)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Monthly gross')}</span>
                  <span className="result-value profit">{formatUSD(result.monthlyGrossUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Yearly gross (current price)')}</span>
                  <span className="result-value">{formatUSD(result.yearlyGrossUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Yearly net')}</span>
                  <span className={`result-value ${result.yearlyNetUsd >= 0 ? 'profit' : 'loss'}`}>
                    {result.yearlyNetUsd >= 0 ? '+' : ''}{formatUSD(result.yearlyNetUsd)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Yearly tokens earned')}</span>
                  <span className="result-value">{result.yearlyTokens.toLocaleString(undefined, { maximumFractionDigits: 2 })} {tokenSymbol}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Hardware payback')}</span>
                  <span className="result-value">
                    {Number.isFinite(result.paybackDays) ? `${result.paybackDays.toFixed(0)} ${getUiString(lang, 'days')} (${result.paybackMonths.toFixed(1)} ${getUiString(lang, 'months')})` : '∞'}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'ROI Year 1')}</span>
                  <span className={`result-value ${result.roiYear1 > 0 ? 'profit' : 'loss'}`}>
                    {result.roiYear1 >= 0 ? '+' : ''}{result.roiYear1.toFixed(1)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'ROI 5-year')}</span>
                  <span className={`result-value ${result.roi5Year > 0 ? 'profit' : 'loss'}`}>
                    {result.roi5Year >= 0 ? '+' : ''}{result.roi5Year.toFixed(1)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Yearly net (with price change)')}</span>
                  <span className={`result-value ${result.yearlyAdjustedNet >= 0 ? 'profit' : 'loss'}`}>
                    {result.yearlyAdjustedNet >= 0 ? '+' : ''}{formatUSD(result.yearlyAdjustedNet)}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'DePIN earnings vary by location, network density, and token price volatility. Hardware can become obsolete, and protocols may change reward formulas. Treat as speculative passive income.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Wifi size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'All values must be non-negative numbers.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(DepinEarningsCalculator);
