import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Info, PieChart, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface AssetRow {
  id: string;
  symbol: string;
  current: number;
  target: number;
}

const ADDITIONAL_CASH_PRESETS = [0, 500, 1000, 2500, 5000];
const REBALANCING_SCENARIOS = [
  {
    label: 'HODL Trim',
    assets: [
      { id: 'btc', symbol: 'BTC', current: 7000, target: 50 },
      { id: 'eth', symbol: 'ETH', current: 2000, target: 30 },
      { id: 'sol', symbol: 'SOL', current: 1000, target: 20 },
    ],
    additionalCash: '0',
    buyOnly: false,
  },
  {
    label: 'DCA Add',
    assets: [
      { id: 'btc', symbol: 'BTC', current: 6000, target: 45 },
      { id: 'eth', symbol: 'ETH', current: 2500, target: 35 },
      { id: 'sol', symbol: 'SOL', current: 1500, target: 20 },
    ],
    additionalCash: '1000',
    buyOnly: true,
  },
  {
    label: 'Alt Rotation',
    assets: [
      { id: 'btc', symbol: 'BTC', current: 5000, target: 35 },
      { id: 'eth', symbol: 'ETH', current: 2500, target: 30 },
      { id: 'sol', symbol: 'SOL', current: 1500, target: 20 },
      { id: 'arb', symbol: 'ARB', current: 1000, target: 15 },
    ],
    additionalCash: '2500',
    buyOnly: false,
  },
] as const;



function RebalancingCalculator({ lang = 'en' }: { lang?: string }) {
  function formatUSD(value: number): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  const [assets, setAssets] = useState<AssetRow[]>([
    { id: 'btc', symbol: 'BTC', current: 6000, target: 50 },
    { id: 'eth', symbol: 'ETH', current: 2500, target: 30 },
    { id: 'sol', symbol: 'SOL', current: 1500, target: 20 },
  ]);
  const [additionalCash, setAdditionalCash] = useState('0');
  const [buyOnly, setBuyOnly] = useState(false);
  const applyScenario = (scenario: (typeof REBALANCING_SCENARIOS)[number]) => {
    setAssets(scenario.assets.map((row) => ({ ...row })));
    setAdditionalCash(scenario.additionalCash);
    setBuyOnly(scenario.buyOnly);
  };
  const isScenarioActive = (scenario: (typeof REBALANCING_SCENARIOS)[number]) => {
    if (additionalCash !== scenario.additionalCash || buyOnly !== scenario.buyOnly || assets.length !== scenario.assets.length) return false;
    return scenario.assets.every((expected, idx) => {
      const current = assets[idx];
      return current
        && current.symbol === expected.symbol
        && current.current === expected.current
        && current.target === expected.target;
    });
  };

  const totals = useMemo(() => {
    const currentTotal = assets.reduce((sum, row) => sum + Math.max(0, row.current), 0);
    const targetSum = assets.reduce((sum, row) => sum + Math.max(0, row.target), 0);
    const extra = Math.max(0, Number(additionalCash) || 0);

    if (currentTotal <= 0 || targetSum <= 0) return null;

    const projectedTotal = currentTotal + extra;
    const normalized = assets.map((row) => {
      const currentValue = Math.max(0, row.current);
      const targetWeight = Math.max(0, row.target) / targetSum;
      const targetValue = projectedTotal * targetWeight;
      const delta = targetValue - currentValue;
      return {
        ...row,
        currentValue,
        targetWeight,
        targetValue,
        delta,
      };
    });

    if (buyOnly) {
      const deficits = normalized.map((row) => Math.max(0, row.delta));
      const deficitTotal = deficits.reduce((s, x) => s + x, 0);

      const actions = normalized.map((row, idx) => {
        const buy = deficitTotal > 0 ? (extra * deficits[idx]) / deficitTotal : 0;
        const after = row.currentValue + buy;
        return {
          ...row,
          buy,
          sell: 0,
          after,
          afterPct: projectedTotal > 0 ? (after / projectedTotal) * 100 : 0,
        };
      });

      return {
        currentTotal,
        projectedTotal,
        targetSum,
        actions,
      };
    }

    const actions = normalized.map((row) => {
      const buy = Math.max(0, row.delta);
      const sell = Math.max(0, -row.delta);
      const after = row.targetValue;
      return {
        ...row,
        buy,
        sell,
        after,
        afterPct: projectedTotal > 0 ? (after / projectedTotal) * 100 : 0,
      };
    });

    return {
      currentTotal,
      projectedTotal,
      targetSum,
      actions,
    };
  }, [assets, additionalCash, buyOnly]);

  const updateAsset = (id: string, key: 'symbol' | 'current' | 'target', value: string) => {
    setAssets((prev) => prev.map((row) => {
      if (row.id !== id) return row;
      if (key === 'symbol') return { ...row, symbol: value.toUpperCase().slice(0, 8) };
      return { ...row, [key]: Number(value) || 0 };
    }));
  };

  const addAsset = () => {
    const idx = assets.length + 1;
    setAssets((prev) => [...prev, { id: `asset-${idx}`, symbol: `ASSET${idx}`, current: 0, target: 0 }]);
  };

  const removeAsset = (id: string) => {
    if (assets.length <= 2) return;
    setAssets((prev) => prev.filter((row) => row.id !== id));
  };

  const reset = () => {
    setAssets([
      { id: 'btc', symbol: 'BTC', current: 6000, target: 50 },
      { id: 'eth', symbol: 'ETH', current: 2500, target: 30 },
      { id: 'sol', symbol: 'SOL', current: 1500, target: 20 },
    ]);
    setAdditionalCash('0');
    setBuyOnly(false);
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {REBALANCING_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {getUiString(lang, scenario.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label><PieChart size={14} /> {getUiString(lang, 'Portfolio Assets')}</label>
            <div className="rebal-asset-head">
              <span>{getUiString(lang, 'Asset')}</span>
              <span>{getUiString(lang, 'Current $')}</span>
              <span>{getUiString(lang, 'Target %')}</span>
              <span />
            </div>
            <div className="rebal-asset-stack">
              {assets.map((row) => (
                <div key={row.id} className="rebal-asset-row">
                  <input
                    type="text"
                    value={row.symbol}
                    onChange={(e) => updateAsset(row.id, 'symbol', e.target.value)}
                    placeholder="BTC"
                    aria-label={`Asset symbol ${row.id}`}
                    className="rebal-asset-symbol"
                  />
                  <input
                    type="number" inputMode="decimal"
                    value={String(row.current)}
                    onChange={(e) => updateAsset(row.id, 'current', e.target.value)}
                    min="0"
                    step="any"
                    aria-label={`Current value ${row.id}`}
                    className="rebal-asset-current"
                    onFocus={(e) => e.target.select()} />
                  <input
                    type="number" inputMode="decimal"
                    value={String(row.target)}
                    onChange={(e) => updateAsset(row.id, 'target', e.target.value)}
                    min="0"
                    step="any"
                    aria-label={`Target weight ${row.id}`}
                    className="rebal-asset-target"
                    onFocus={(e) => e.target.select()} />
                  <button className="pill-btn rebal-asset-remove" onClick={() => removeAsset(row.id)} aria-label={`Remove ${row.symbol}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button className="pill-btn" onClick={addAsset} style={{ width: 'fit-content' }}>
              <Plus size={14} /> {getUiString(lang, 'Add Asset')}
            </button>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Additional Investment')}</label>
            <div className="pills-row">
              {ADDITIONAL_CASH_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${additionalCash === String(preset) ? 'active' : ''}`}
                  onClick={() => setAdditionalCash(String(preset))}
                >
                  {preset === 0 ? '$0' : `$${preset >= 1000 ? `${preset / 1000}k` : preset}`}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input
                type="number" inputMode="decimal"
                value={additionalCash}
                onChange={(e) => setAdditionalCash(e.target.value)}
                min="0"
                step="any"
                id="rebalance-extra"
                onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Rebalance Mode')}</label>
            <div className="toggle-group">
              <button className={`toggle-btn ${!buyOnly ? 'active' : ''}`} onClick={() => setBuyOnly(false)}>{getUiString(lang, 'Buy + Sell')}</button>
              <button className={`toggle-btn ${buyOnly ? 'active' : ''}`} onClick={() => setBuyOnly(true)}>{getUiString(lang, 'Buy Only')}</button>
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Use Buy Only when adding cash and Buy + Sell for full target rebalance.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {totals ? (
            <>
              <div className="result-hero">
                <span className="result-hero-label">{getUiString(lang, 'Portfolio Rebalancing Plan')}</span>
                <span className="result-hero-value">
                  <PieChart size={28} />
                  {formatUSD(totals.projectedTotal)}
                </span>
                <span className="result-hero-roi">
                  {getUiString(lang, 'Current')} {formatUSD(totals.currentTotal)} • {getUiString(lang, 'Targets total')} {totals.targetSum.toFixed(2)}%
                </span>
              </div>

              <div className="result-breakdown">
                {totals.actions.map((row) => (
                  <div key={row.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div className="result-row">
                      <span className="result-label"><strong>{row.symbol}</strong></span>
                      <span className="result-value">{row.afterPct.toFixed(2)}%</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Current / Target')}</span>
                      <span className="result-value">{formatUSD(row.currentValue)} / {formatUSD(row.targetValue)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Buy')}</span>
                      <span className="result-value profit">+{formatUSD(row.buy)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Sell')}</span>
                      <span className="result-value fee">-{formatUSD(row.sell)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'This plan excludes trading fees, spreads, taxes, and minimum order size constraints. Validate execution on your exchange.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><PieChart size={40} /></div>
              <h3>{getUiString(lang, 'Add valid portfolio inputs')}</h3>
              <p>{getUiString(lang, 'Use at least two assets with non-zero current value and target weights.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(RebalancingCalculator);
