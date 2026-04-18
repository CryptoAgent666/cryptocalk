import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Activity, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const SCENARIOS = [
  {
    label: 'Bull Peak 2021',
    btcPrice: '69000',
    marketCap: '1300000000000',
    realizedCap: '370000000000',
    onChainVolume: '40000000000',
    activeAddresses: '1100000',
    txCount: '350000',
  },
  {
    label: 'Bear Bottom 2022',
    btcPrice: '16500',
    marketCap: '317000000000',
    realizedCap: '380000000000',
    onChainVolume: '8000000000',
    activeAddresses: '850000',
    txCount: '250000',
  },
  {
    label: 'Current Estimate',
    btcPrice: '84000',
    marketCap: '1650000000000',
    realizedCap: '650000000000',
    onChainVolume: '25000000000',
    activeAddresses: '950000',
    txCount: '400000',
  },
] as const;

function OnChainMetricsCalculator({ lang = 'en' }: { lang?: string }) {
  const fmt = (value: number, digits = 2): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);

  const fmtUSD = (value: number): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      notation: value >= 1e9 ? 'compact' : 'standard',
      maximumFractionDigits: 2,
    }).format(value);

  const [btcPrice, setBtcPrice] = useState('84000');
  const [marketCap, setMarketCap] = useState('1650000000000');
  const [realizedCap, setRealizedCap] = useState('650000000000');
  const [onChainVolume, setOnChainVolume] = useState('25000000000');
  const [activeAddresses, setActiveAddresses] = useState('950000');
  const [txCount, setTxCount] = useState('400000');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setBtcPrice(s.btcPrice);
    setMarketCap(s.marketCap);
    setRealizedCap(s.realizedCap);
    setOnChainVolume(s.onChainVolume);
    setActiveAddresses(s.activeAddresses);
    setTxCount(s.txCount);
  };

  const isActive = (s: (typeof SCENARIOS)[number]) =>
    btcPrice === s.btcPrice && marketCap === s.marketCap && realizedCap === s.realizedCap &&
    onChainVolume === s.onChainVolume && activeAddresses === s.activeAddresses && txCount === s.txCount;

  const result = useMemo(() => {
    const mc = parseFloat(marketCap) || 0;
    const rc = parseFloat(realizedCap) || 0;
    const vol = parseFloat(onChainVolume) || 0;
    const tx = parseFloat(txCount) || 0;

    if (mc <= 0 || rc <= 0) return null;

    const mvrv = mc / rc;
    const nvt = vol > 0 ? mc / (vol * 365) : 0;
    const nvtSignal = vol > 0 ? mc / (vol * 90) : 0;
    const sopr = mvrv > 1 ? 1.02 : mvrv < 1 ? 0.97 : 1.0;

    let mvrvZone: 'green' | 'yellow' | 'red' = 'yellow';
    let mvrvLabel = 'Fair Value';
    if (mvrv > 3.5) { mvrvZone = 'red'; mvrvLabel = 'Overbought'; }
    else if (mvrv > 2.5) { mvrvZone = 'yellow'; mvrvLabel = 'Elevated'; }
    else if (mvrv >= 1) { mvrvZone = 'yellow'; mvrvLabel = 'Fair Value'; }
    else { mvrvZone = 'green'; mvrvLabel = 'Undervalued'; }

    let nvtZone: 'green' | 'yellow' | 'red' = 'yellow';
    let nvtLabel = 'Normal';
    if (nvt > 65) { nvtZone = 'red'; nvtLabel = 'Overvalued'; }
    else if (nvt < 25) { nvtZone = 'green'; nvtLabel = 'Undervalued'; }

    let soprLabel = 'Neutral';
    let soprZone: 'green' | 'yellow' | 'red' = 'yellow';
    if (sopr > 1.05) { soprLabel = 'Profit Taking'; soprZone = 'red'; }
    else if (sopr > 1) { soprLabel = 'In Profit'; soprZone = 'green'; }
    else if (sopr < 1) { soprLabel = 'In Loss'; soprZone = 'red'; }

    let overallSignal: 'green' | 'yellow' | 'red' = 'yellow';
    let overallLabel = 'Hold';
    const redCount = [mvrvZone, nvtZone, soprZone].filter(z => z === 'red').length;
    const greenCount = [mvrvZone, nvtZone, soprZone].filter(z => z === 'green').length;
    if (redCount >= 2) { overallSignal = 'red'; overallLabel = 'Sell Signal'; }
    else if (greenCount >= 2) { overallSignal = 'green'; overallLabel = 'Buy Signal'; }

    return {
      mvrv, nvt, nvtSignal, sopr,
      mvrvZone, mvrvLabel, nvtZone, nvtLabel,
      soprZone, soprLabel, overallSignal, overallLabel,
      networkValue: tx > 0 ? mc / tx : 0,
    };
  }, [marketCap, realizedCap, onChainVolume, txCount]);

  const reset = () => {
    setBtcPrice('84000'); setMarketCap('1650000000000'); setRealizedCap('650000000000');
    setOnChainVolume('25000000000'); setActiveAddresses('950000'); setTxCount('400000');
  };

  const zoneColor = (zone: string) =>
    zone === 'green' ? '#22c55e' : zone === 'red' ? '#ef4444' : '#eab308';

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ocm-price">{getUiString(lang, 'BTC Price (USD)')}</label>
            <input type="number" inputMode="decimal" id="ocm-price" value={btcPrice} onChange={(e) => setBtcPrice(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ocm-mcap">{getUiString(lang, 'BTC Market Cap (USD)')}</label>
            <input type="number" inputMode="decimal" id="ocm-mcap" value={marketCap} onChange={(e) => setMarketCap(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ocm-rcap">{getUiString(lang, 'Realized Cap (USD)')}</label>
            <input type="number" inputMode="decimal" id="ocm-rcap" value={realizedCap} onChange={(e) => setRealizedCap(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ocm-vol">{getUiString(lang, '24h On-Chain Volume (USD)')}</label>
            <input type="number" inputMode="decimal" id="ocm-vol" value={onChainVolume} onChange={(e) => setOnChainVolume(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ocm-addr">{getUiString(lang, 'Active Addresses')}</label>
            <input type="number" inputMode="decimal" id="ocm-addr" value={activeAddresses} onChange={(e) => setActiveAddresses(e.target.value)} min="0" step="1" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ocm-tx">{getUiString(lang, 'Transaction Count (24h)')}</label>
            <input type="number" inputMode="decimal" id="ocm-tx" value={txCount} onChange={(e) => setTxCount(e.target.value)} min="0" step="1" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Enter on-chain data from Glassnode, CoinMetrics, or similar providers.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero" style={{ borderLeft: `4px solid ${zoneColor(result.overallSignal)}` }}>
                <span className="result-hero-label">{getUiString(lang, 'On-Chain Signal')}</span>
                <span className="result-hero-value"><Activity size={28} />{getUiString(lang, result.overallLabel)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'MVRV Ratio')}</span>
                  <span className="result-value" style={{ color: zoneColor(result.mvrvZone) }}>{fmt(result.mvrv)} — {getUiString(lang, result.mvrvLabel)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'NVT Ratio')}</span>
                  <span className="result-value" style={{ color: zoneColor(result.nvtZone) }}>{fmt(result.nvt)} — {getUiString(lang, result.nvtLabel)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'NVT Signal (90d)')}</span>
                  <span className="result-value">{fmt(result.nvtSignal)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'SOPR Estimate')}</span>
                  <span className="result-value" style={{ color: zoneColor(result.soprZone) }}>{fmt(result.sopr, 4)} — {getUiString(lang, result.soprLabel)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Value per Transaction')}</span>
                  <span className="result-value">{fmtUSD(result.networkValue)}</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'On-chain metrics are lagging indicators derived from blockchain data. They do not predict future price action. Use alongside other analysis.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter On-Chain Data')}</h3>
              <p>{getUiString(lang, 'Provide market cap, realized cap, and transaction data to compute MVRV, NVT, and SOPR metrics.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(OnChainMetricsCalculator);
