import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Brain, Info, RotateCcw, Sparkles } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const AI_TOKENS = [
  { id: 'tao', label: 'Bittensor (TAO)', price: '350', mcap: '3000000000', subsector: 'compute' },
  { id: 'render', label: 'Render (RENDER)', price: '7.50', mcap: '3900000000', subsector: 'compute' },
  { id: 'fet', label: 'Fetch.ai (FET)', price: '1.20', mcap: '3100000000', subsector: 'agents' },
  { id: 'near', label: 'NEAR (AI L1)', price: '4.50', mcap: '5300000000', subsector: 'infra' },
  { id: 'wld', label: 'Worldcoin (WLD)', price: '2.40', mcap: '4800000000', subsector: 'identity' },
  { id: 'akt', label: 'Akash (AKT)', price: '3.20', mcap: '850000000', subsector: 'compute' },
  { id: 'ocean', label: 'Ocean Protocol (OCEAN)', price: '0.55', mcap: '350000000', subsector: 'data' },
  { id: 'agix', label: 'SingularityNET (AGIX)', price: '0.40', mcap: '500000000', subsector: 'agents' },
] as const;

const PRESETS = [
  { label: 'Pure Compute (TAO+RENDER)', allocations: { tao: '50', render: '50', fet: '0', near: '0', wld: '0', akt: '0', ocean: '0', agix: '0' } },
  { label: 'Diversified Top-5', allocations: { tao: '20', render: '20', fet: '20', near: '20', wld: '20', akt: '0', ocean: '0', agix: '0' } },
  { label: 'Agents Focus', allocations: { tao: '0', render: '0', fet: '50', near: '0', wld: '0', akt: '0', ocean: '0', agix: '50' } },
  { label: 'Equal Weight All', allocations: { tao: '12.5', render: '12.5', fet: '12.5', near: '12.5', wld: '12.5', akt: '12.5', ocean: '12.5', agix: '12.5' } },
] as const;

function AiTokenSectorCalculator({ lang = 'en' }: { lang?: string }) {
  const [totalUsd, setTotalUsd] = useState('10000');
  const [allocations, setAllocations] = useState<Record<string, string>>({
    tao: '20', render: '20', fet: '20', near: '20', wld: '20', akt: '0', ocean: '0', agix: '0',
  });
  const [scenarioPct, setScenarioPct] = useState('100');

  const applyPreset = (p: typeof PRESETS[number]) => {
    setAllocations({ ...p.allocations });
  };

  const result = useMemo(() => {
    const tu = Number(totalUsd);
    const sp = Number(scenarioPct) / 100;
    if (![tu, sp].every(Number.isFinite) || tu <= 0) return null;

    const totalAlloc = Object.values(allocations).reduce((s, v) => s + (Number(v) || 0), 0);
    if (totalAlloc <= 0) return null;

    const positions = AI_TOKENS.map((token) => {
      const allocPct = Number(allocations[token.id]) || 0;
      const normalizedPct = (allocPct / totalAlloc) * 100;
      const usdAllocated = (allocPct / totalAlloc) * tu;
      const tokenPrice = Number(token.price);
      const qty = tokenPrice > 0 ? usdAllocated / tokenPrice : 0;
      const newPrice = tokenPrice * sp;
      const newValue = qty * newPrice;
      const pnl = newValue - usdAllocated;
      const pnlPct = usdAllocated > 0 ? (pnl / usdAllocated) * 100 : 0;
      return {
        ...token, allocPct, normalizedPct, usdAllocated, qty, newPrice, newValue, pnl, pnlPct,
      };
    });

    const sectorMcap = AI_TOKENS.reduce((s, t) => s + Number(t.mcap), 0);
    const sectorMcapBn = sectorMcap / 1e9;

    const totalUsdAllocated = positions.reduce((s, p) => s + p.usdAllocated, 0);
    const totalNewValue = positions.reduce((s, p) => s + p.newValue, 0);
    const totalPnl = totalNewValue - totalUsdAllocated;
    const totalPnlPct = totalUsdAllocated > 0 ? (totalPnl / totalUsdAllocated) * 100 : 0;

    // Subsector breakdown
    const subsectors: Record<string, number> = {};
    positions.forEach((p) => {
      subsectors[p.subsector] = (subsectors[p.subsector] || 0) + p.normalizedPct;
    });

    // Sector concentration (HHI)
    const hhi = positions.reduce((s, p) => s + Math.pow(p.normalizedPct, 2), 0);
    const concentration = hhi < 1500 ? 'Diversified' : hhi < 2500 ? 'Moderate' : 'Concentrated';

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (totalPnlPct > 50) { zone = 'profit'; rating = 'Strong sector rally'; }
    else if (totalPnlPct > 0) { zone = 'profit'; rating = 'Positive return'; }
    else if (totalPnlPct > -20) { zone = 'neutral'; rating = 'Modest decline'; }
    else { zone = 'loss'; rating = 'Sector drawdown'; }

    return {
      positions, sectorMcap, sectorMcapBn, totalUsdAllocated, totalNewValue,
      totalPnl, totalPnlPct, subsectors, hhi, concentration, zone, rating,
    };
  }, [totalUsd, allocations, scenarioPct]);

  const reset = () => {
    setTotalUsd('10000');
    setAllocations({ tao: '20', render: '20', fet: '20', near: '20', wld: '20', akt: '0', ocean: '0', agix: '0' });
    setScenarioPct('100');
  };

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
              {PRESETS.map((p) => (
                <button key={p.label}
                  className={`pill-btn`}
                  onClick={() => applyPreset(p)}>
                  {getUiString(lang, p.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ai-total">{getUiString(lang, 'Total Investment')} (USD)</label>
            <input type="number" inputMode="decimal" id="ai-total" value={totalUsd}
              onChange={(e) => setTotalUsd(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          {AI_TOKENS.map((t) => (
            <div className="input-group" key={t.id}>
              <label htmlFor={`ai-${t.id}`}>{t.label} {getUiString(lang, 'allocation')} (%)</label>
              <input type="number" inputMode="decimal" id={`ai-${t.id}`} value={allocations[t.id]}
                onChange={(e) => setAllocations({ ...allocations, [t.id]: e.target.value })} min="0" max="100" step="any"
                onFocus={(e) => e.target.select()} />
            </div>
          ))}

          <div className="input-group">
            <label htmlFor="ai-scenario">{getUiString(lang, 'Sector Price Scenario')} (%)</label>
            <div className="pills-row">
              {['50', '75', '100', '150', '200', '300'].map((p) => (
                <button key={p}
                  className={`pill-btn ${scenarioPct === p ? 'active' : ''}`}
                  onClick={() => setScenarioPct(p)}>
                  {p}%
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="ai-scenario" value={scenarioPct}
              onChange={(e) => setScenarioPct(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Allocations will be normalized to sum to 100%. Scenario applies a uniform price multiplier across all selected tokens.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Portfolio Value at Scenario')}</span>
                <span className="result-hero-value"><Sparkles size={28} />
                  {formatUSD(result.totalNewValue)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.totalPnl >= 0 ? '+' : ''}{formatUSD(result.totalPnl)} ({result.totalPnlPct >= 0 ? '+' : ''}{result.totalPnlPct.toFixed(2)}%) · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'AI sector market cap')}</span>
                  <span className="result-value">${result.sectorMcapBn.toFixed(2)}B</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Concentration (HHI)')}</span>
                  <span className="result-value">{Math.round(result.hhi)} ({getUiString(lang, result.concentration)})</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label" style={{ fontWeight: 600 }}>{getUiString(lang, 'Per-token P&L')}</span>
                  <span className="result-value"></span>
                </div>
                {result.positions.filter((p) => p.normalizedPct > 0).map((p) => (
                  <div key={p.id} className="result-row">
                    <span className="result-label">
                      {p.label} ({p.normalizedPct.toFixed(1)}%)
                    </span>
                    <span className={`result-value ${p.pnl >= 0 ? 'profit' : 'loss'}`}>
                      {p.pnl >= 0 ? '+' : ''}{formatUSD(p.pnl)} ({p.pnlPct >= 0 ? '+' : ''}{p.pnlPct.toFixed(0)}%)
                    </span>
                  </div>
                ))}
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label" style={{ fontWeight: 600 }}>{getUiString(lang, 'Subsector breakdown')}</span>
                  <span className="result-value"></span>
                </div>
                {Object.entries(result.subsectors).map(([sub, pct]) => (
                  <div key={sub} className="result-row">
                    <span className="result-label">{getUiString(lang, sub.charAt(0).toUpperCase() + sub.slice(1))}</span>
                    <span className="result-value">{pct.toFixed(1)}%</span>
                  </div>
                ))}
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'AI tokens are highly correlated during sector rotations and crash together. Real returns will diverge by individual token narrative, tokenomics, and team execution.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Brain size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Total investment and at least one allocation must be positive.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(AiTokenSectorCalculator);
