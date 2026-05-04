import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { TrendingUp, Info, RotateCcw, BarChart3 } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const IC_SCENARIOS = [
  { label: 'Tight Wings', spot: '77000', shortPut: '70000', longPut: '65000', shortCall: '85000', longCall: '90000',
    putPremiumShort: '1500', putPremiumLong: '700', callPremiumShort: '1400', callPremiumLong: '600', contracts: '1' },
  { label: 'Wide Wings', spot: '77000', shortPut: '60000', longPut: '50000', shortCall: '95000', longCall: '105000',
    putPremiumShort: '700', putPremiumLong: '300', callPremiumShort: '650', callPremiumLong: '250', contracts: '1' },
  { label: 'High IV Crush', spot: '77000', shortPut: '67000', longPut: '60000', shortCall: '88000', longCall: '95000',
    putPremiumShort: '2500', putPremiumLong: '1100', callPremiumShort: '2300', callPremiumLong: '1000', contracts: '1' },
] as const;

function IronCondorCalculator({ lang = 'en' }: { lang?: string }) {
  const [spot, setSpot] = useState('77000');
  const [shortPut, setShortPut] = useState('70000');
  const [longPut, setLongPut] = useState('65000');
  const [shortCall, setShortCall] = useState('85000');
  const [longCall, setLongCall] = useState('90000');
  const [putPremiumShort, setPutPremiumShort] = useState('1500');
  const [putPremiumLong, setPutPremiumLong] = useState('700');
  const [callPremiumShort, setCallPremiumShort] = useState('1400');
  const [callPremiumLong, setCallPremiumLong] = useState('600');
  const [contracts, setContracts] = useState('1');

  const applyScenario = (s: (typeof IC_SCENARIOS)[number]) => {
    setSpot(s.spot); setShortPut(s.shortPut); setLongPut(s.longPut);
    setShortCall(s.shortCall); setLongCall(s.longCall);
    setPutPremiumShort(s.putPremiumShort); setPutPremiumLong(s.putPremiumLong);
    setCallPremiumShort(s.callPremiumShort); setCallPremiumLong(s.callPremiumLong);
    setContracts(s.contracts);
  };
  const isScenarioActive = (s: (typeof IC_SCENARIOS)[number]) =>
    spot === s.spot && shortPut === s.shortPut && longPut === s.longPut &&
    shortCall === s.shortCall && longCall === s.longCall &&
    putPremiumShort === s.putPremiumShort && putPremiumLong === s.putPremiumLong &&
    callPremiumShort === s.callPremiumShort && callPremiumLong === s.callPremiumLong &&
    contracts === s.contracts;

  const result = useMemo(() => {
    const sp = Number(spot);
    const sPut = Number(shortPut);
    const lPut = Number(longPut);
    const sCall = Number(shortCall);
    const lCall = Number(longCall);
    const pPs = Number(putPremiumShort);
    const pPl = Number(putPremiumLong);
    const pCs = Number(callPremiumShort);
    const pCl = Number(callPremiumLong);
    const qty = Number(contracts);

    if ([sp, sPut, lPut, sCall, lCall, pPs, pPl, pCs, pCl, qty].some((v) => !Number.isFinite(v))) return null;
    if (qty <= 0 || sp <= 0) return null;
    // Iron condor structure validation: longPut < shortPut < spot < shortCall < longCall
    if (!(lPut < sPut && sPut < sp && sp < sCall && sCall < lCall)) return null;

    // Net premium received (credit)
    const netPremiumPerContract = (pPs - pPl) + (pCs - pCl);
    const netPremium = netPremiumPerContract * qty;

    // Wing widths (must be equal for symmetric IC, but we allow asymmetric)
    const putWingWidth = sPut - lPut;
    const callWingWidth = lCall - sCall;
    const maxWingWidth = Math.max(putWingWidth, callWingWidth);

    // Max profit = net premium (occurs when spot stays between short strikes at expiry)
    const maxProfit = netPremium;

    // Max loss = wing width − net premium per contract (occurs at long strikes)
    const maxLossPerContractPut = putWingWidth - netPremiumPerContract;
    const maxLossPerContractCall = callWingWidth - netPremiumPerContract;
    const maxLossPerContract = Math.max(maxLossPerContractPut, maxLossPerContractCall);
    const maxLoss = Math.max(0, maxLossPerContract * qty);

    // Breakevens
    const breakevenLow = sPut - netPremiumPerContract;
    const breakevenHigh = sCall + netPremiumPerContract;

    // Profit zone width
    const profitZoneWidth = breakevenHigh - breakevenLow;
    const profitZoneWidthPct = sp > 0 ? (profitZoneWidth / sp) * 100 : 0;

    // Risk:Reward ratio (max loss : max profit)
    const riskReward = maxProfit > 0 ? maxLoss / maxProfit : Infinity;

    // Capital required (max loss is the margin requirement for credit IC)
    const capitalRequired = maxLoss;
    const returnOnCapital = capitalRequired > 0 ? (maxProfit / capitalRequired) * 100 : 0;

    // Distance from spot to breakevens (% room)
    const downsideRoomPct = ((sp - breakevenLow) / sp) * 100;
    const upsideRoomPct = ((breakevenHigh - sp) / sp) * 100;

    // Payoff at various spot prices
    const offsets = [-30, -20, -10, -5, 0, 5, 10, 20, 30];
    const payoffPoints = offsets.map((pct) => {
      const futureSpot = sp * (1 + pct / 100);
      // Per contract:
      // Short put PnL: max(0, sPut - futureSpot) capped negatively
      const putShortPnl = -Math.max(0, sPut - futureSpot) + pPs;
      const putLongPnl = Math.max(0, lPut - futureSpot) - pPl;
      const callShortPnl = -Math.max(0, futureSpot - sCall) + pCs;
      const callLongPnl = Math.max(0, futureSpot - lCall) - pCl;
      const totalPnl = (putShortPnl + putLongPnl + callShortPnl + callLongPnl) * qty;
      return { pct, futureSpot, totalPnl };
    });

    return {
      netPremium, maxProfit, maxLoss, breakevenLow, breakevenHigh, profitZoneWidth,
      profitZoneWidthPct, riskReward, capitalRequired, returnOnCapital,
      putWingWidth, callWingWidth, maxWingWidth, downsideRoomPct, upsideRoomPct, payoffPoints,
    };
  }, [spot, shortPut, longPut, shortCall, longCall, putPremiumShort, putPremiumLong, callPremiumShort, callPremiumLong, contracts]);

  const reset = () => {
    setSpot('77000'); setShortPut('70000'); setLongPut('65000');
    setShortCall('85000'); setLongCall('90000');
    setPutPremiumShort('1500'); setPutPremiumLong('700');
    setCallPremiumShort('1400'); setCallPremiumLong('600');
    setContracts('1');
  };

  const formatUSD = (v: number) => {
    if (!Number.isFinite(v)) return '—';
    return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
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
              {IC_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ic-spot">{getUiString(lang, 'Current Spot Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="ic-spot" value={spot}
              onChange={(e) => setSpot(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Put Spread (lower wing)')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label htmlFor="ic-spk" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Short Put Strike')}</label>
                <input type="number" inputMode="decimal" id="ic-spk" value={shortPut}
                  onChange={(e) => setShortPut(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-lpk" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Long Put Strike (lower)')}</label>
                <input type="number" inputMode="decimal" id="ic-lpk" value={longPut}
                  onChange={(e) => setLongPut(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-sps" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Short Put Premium')}</label>
                <input type="number" inputMode="decimal" id="ic-sps" value={putPremiumShort}
                  onChange={(e) => setPutPremiumShort(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-lps" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Long Put Premium')}</label>
                <input type="number" inputMode="decimal" id="ic-lps" value={putPremiumLong}
                  onChange={(e) => setPutPremiumLong(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Call Spread (upper wing)')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label htmlFor="ic-sck" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Short Call Strike')}</label>
                <input type="number" inputMode="decimal" id="ic-sck" value={shortCall}
                  onChange={(e) => setShortCall(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-lck" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Long Call Strike (higher)')}</label>
                <input type="number" inputMode="decimal" id="ic-lck" value={longCall}
                  onChange={(e) => setLongCall(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-scs" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Short Call Premium')}</label>
                <input type="number" inputMode="decimal" id="ic-scs" value={callPremiumShort}
                  onChange={(e) => setCallPremiumShort(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
              <div>
                <label htmlFor="ic-lcs" style={{ fontSize: '0.75rem' }}>{getUiString(lang, 'Long Call Premium')}</label>
                <input type="number" inputMode="decimal" id="ic-lcs" value={callPremiumLong}
                  onChange={(e) => setCallPremiumLong(e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ic-contracts">{getUiString(lang, 'Number of Contracts')}</label>
            <input type="number" inputMode="decimal" id="ic-contracts" value={contracts}
              onChange={(e) => setContracts(e.target.value)} min="0.01" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Iron Condor: 4 legs (sell put + buy further OTM put + sell call + buy further OTM call). Profits when price stays between short strikes.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.maxProfit > 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net Premium (Max Profit)')}</span>
                <span className="result-hero-value"><BarChart3 size={28} />{formatUSD(result.maxProfit)}</span>
                <span className="result-hero-roi">
                  {getUiString(lang, 'Profit zone')}: {formatUSD(result.breakevenLow)} – {formatUSD(result.breakevenHigh)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Max Profit')}</span>
                  <span className="result-value profit">{formatUSD(result.maxProfit)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Max Loss')}</span>
                  <span className="result-value fee">−{formatUSD(result.maxLoss)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Risk:Reward')}</span>
                  <span className="result-value">{result.riskReward.toFixed(2)}:1</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Return on Capital')}</span>
                  <span className="result-value profit">{result.returnOnCapital.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Breakeven (low)')}</span>
                  <span className="result-value">{formatUSD(result.breakevenLow)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Breakeven (high)')}</span>
                  <span className="result-value">{formatUSD(result.breakevenHigh)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit Zone Width')}</span>
                  <span className="result-value">{formatUSD(result.profitZoneWidth)} ({result.profitZoneWidthPct.toFixed(2)}%)</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Downside room from spot')}</span>
                  <span className="result-value">−{result.downsideRoomPct.toFixed(2)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Upside room from spot')}</span>
                  <span className="result-value">+{result.upsideRoomPct.toFixed(2)}%</span>
                </div>
              </div>

              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '12px', marginBottom: '6px' }}>
                {getUiString(lang, 'Payoff at expiry')}
              </h4>
              <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '4px' }}>{getUiString(lang, 'Spot move')}</th>
                    <th style={{ textAlign: 'right', padding: '4px' }}>{getUiString(lang, 'Spot price')}</th>
                    <th style={{ textAlign: 'right', padding: '4px' }}>{getUiString(lang, 'P&L')}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.payoffPoints.map((pt) => (
                    <tr key={pt.pct} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                      <td style={{ padding: '4px' }}>{pt.pct >= 0 ? '+' : ''}{pt.pct}%</td>
                      <td style={{ textAlign: 'right', padding: '4px' }}>{formatUSD(pt.futureSpot)}</td>
                      <td style={{ textAlign: 'right', padding: '4px', color: pt.totalPnl >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)' }}>
                        {pt.totalPnl >= 0 ? '+' : ''}{formatUSD(pt.totalPnl)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Iron Condors profit from time decay and low volatility. Exit before assignment risk peaks (typically 21-7 days to expiry).')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter valid Iron Condor inputs')}</h3>
              <p>{getUiString(lang, 'Strikes must satisfy: Long Put < Short Put < Spot < Short Call < Long Call.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(IronCondorCalculator);
