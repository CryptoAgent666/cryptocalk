import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Info,
  RotateCcw,
  Rainbow,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

// Genesis block: January 3, 2009
const GENESIS_DATE = new Date(2009, 0, 3);

// Logarithmic regression coefficients: log10(price) = a * log10(daysSinceGenesis) + b
// Calibrated against historical halvings (Trolololo-style Bitcoin Rainbow Chart).
const COEFF_A = 5.84;
const COEFF_B = -17.01;

// Rainbow bands (multiplier ranges relative to model price, from top to bottom)
const BANDS = [
  { key: 'Maximum Bubble',     minMult: 3.0,  maxMult: Infinity, color: '#dc2626' },
  { key: 'Sell. Seriously.',   minMult: 2.0,  maxMult: 3.0,      color: '#ea580c' },
  { key: 'FOMO Intensifies',   minMult: 1.5,  maxMult: 2.0,      color: '#d97706' },
  { key: 'Is This a Bubble?',  minMult: 1.1,  maxMult: 1.5,      color: '#eab308' },
  { key: 'HODL!',              minMult: 0.85, maxMult: 1.1,       color: '#84cc16' },
  { key: 'Still Cheap',        minMult: 0.6,  maxMult: 0.85,      color: '#22c55e' },
  { key: 'Accumulate',         minMult: 0.4,  maxMult: 0.6,       color: '#14b8a6' },
  { key: 'BUY!',               minMult: 0.25, maxMult: 0.4,       color: '#3b82f6' },
  { key: 'Fire Sale',          minMult: 0,    maxMult: 0.25,      color: '#1e3a5f' },
] as const;

const SCENARIOS = [
  { label: 'Current BTC', btcPrice: '77300', investment: '10000' },
  { label: 'BTC at $50K', btcPrice: '50000', investment: '10000' },
  { label: 'BTC at $150K', btcPrice: '150000', investment: '10000' },
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function daysSinceGenesis(): number {
  const now = new Date();
  const diffMs = now.getTime() - GENESIS_DATE.getTime();
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

function modelPrice(days: number): number {
  if (days <= 0) return 0;
  // Use log10 (not natural log) — formula calibrated for log10/log10 regression.
  // Bug fix 2026-05-03: was using Math.log() (ln) which yielded nonsensical 10^34 prices.
  const log10Price = COEFF_A * Math.log10(days) + COEFF_B;
  return Math.pow(10, log10Price);
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function RainbowChartCalculator({ lang = 'en' }: { lang?: string }) {
  const [btcPrice, setBtcPrice] = useState('77300');
  const [investment, setInvestment] = useState('10000');

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
  };

  const formatPercent = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    return (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
  };

  const results = useMemo(() => {
    const price = parseFloat(btcPrice) || 0;
    const invest = parseFloat(investment) || 0;
    if (price <= 0) return null;

    const days = daysSinceGenesis();
    const mPrice = modelPrice(days);
    if (mPrice <= 0) return null;

    const ratio = price / mPrice;
    const deviation = ((price - mPrice) / mPrice) * 100;

    // Determine which band the price falls in
    let currentBandIndex = BANDS.length - 1; // default to lowest band
    for (let i = 0; i < BANDS.length; i++) {
      if (ratio >= BANDS[i].minMult) {
        currentBandIndex = i;
        break;
      }
    }

    // Band boundaries (price ranges)
    const bandBoundaries = BANDS.map(band => ({
      key: band.key,
      color: band.color,
      minPrice: band.minMult * mPrice,
      maxPrice: band.maxMult === Infinity ? Infinity : band.maxMult * mPrice,
    }));

    // If price were at model, how much BTC could investment buy?
    const btcAtModel = invest > 0 && mPrice > 0 ? invest / mPrice : 0;
    const btcAtCurrent = invest > 0 && price > 0 ? invest / price : 0;

    return {
      modelPrice: mPrice,
      deviation,
      ratio,
      currentBandIndex,
      bandBoundaries,
      days,
      btcAtModel,
      btcAtCurrent,
    };
  }, [btcPrice, investment]);

  const applyScenario = (s: typeof SCENARIOS[number]) => {
    setBtcPrice(s.btcPrice);
    setInvestment(s.investment);
  };

  const reset = () => {
    setBtcPrice('77300');
    setInvestment('10000');
  };

  const isScenarioActive = (s: typeof SCENARIOS[number]) =>
    btcPrice === s.btcPrice && investment === s.investment;

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* BTC Price */}
          <div className="input-group">
            <label htmlFor="rb-price"><DollarSign size={14} /> {getUiString(lang, 'Current BTC Price')}</label>
            <input type="number" inputMode="decimal" id="rb-price" value={btcPrice}
              onChange={e => setBtcPrice(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Investment Amount */}
          <div className="input-group">
            <label htmlFor="rb-invest"><DollarSign size={14} /> {getUiString(lang, 'Investment Amount')}</label>
            <input type="number" inputMode="decimal" id="rb-invest" value={investment}
              onChange={e => setInvestment(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Scenarios */}
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s, i) => (
                <button key={i} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">{getUiString(lang, 'Based on the Bitcoin Rainbow Chart logarithmic regression model. The model uses historical price data to estimate fair value bands.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              {/* Current Band Hero */}
              <div className="result-hero" style={{ borderColor: BANDS[results.currentBandIndex].color }}>
                <span className="result-hero-label">
                  <Rainbow size={16} /> {getUiString(lang, 'Current Band')}
                </span>
                <span className="result-hero-value" style={{ color: BANDS[results.currentBandIndex].color }}>
                  {getUiString(lang, BANDS[results.currentBandIndex].key)}
                </span>
                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'Deviation')}: {formatPercent(results.deviation)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Model Price')}</span>
                  <span className="result-value">{formatUSD(results.modelPrice)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Deviation from Model')}</span>
                  <span className="result-value" style={{ color: results.deviation >= 0 ? 'var(--color-accent-orange, #f59e0b)' : 'var(--color-accent-green, #10b981)' }}>
                    {formatPercent(results.deviation)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Price / Model Ratio')}</span>
                  <span className="result-value">{results.ratio.toFixed(2)}x</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'BTC at Current Price')}</span>
                  <span className="result-value">{results.btcAtCurrent.toFixed(6)} BTC</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'BTC at Model Price')}</span>
                  <span className="result-value">{results.btcAtModel.toFixed(6)} BTC</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Days Since Genesis')}</span>
                  <span className="result-value">{results.days.toLocaleString(loc)}</span>
                </div>
              </div>

              {/* Band Boundaries Table */}
              <div style={{ marginTop: '16px' }}>
                <h2 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  <TrendingUp size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {getUiString(lang, 'Rainbow Bands')}
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Band')}</th>
                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Price Range')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.bandBoundaries.map((band, idx) => (
                        <tr key={idx} style={{
                          borderBottom: '1px solid var(--color-border)',
                          background: idx === results.currentBandIndex ? 'rgba(255,255,255,0.05)' : 'transparent',
                        }}>
                          <td style={{ padding: '8px', fontWeight: idx === results.currentBandIndex ? 700 : 400 }}>
                            <span style={{
                              display: 'inline-block',
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              backgroundColor: band.color,
                              marginRight: '6px',
                              verticalAlign: 'middle',
                            }} />
                            {getUiString(lang, band.key)}
                            {idx === results.currentBandIndex && (
                              <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: band.color, fontWeight: 700 }}>
                                {'\u25C0'}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                            {band.maxPrice === Infinity
                              ? '> ' + formatUSD(band.minPrice)
                              : formatUSD(band.minPrice) + ' \u2013 ' + formatUSD(band.maxPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'The Rainbow Chart is a fun visualization, not financial advice. Logarithmic regression is based on historical data and cannot predict the future. Always do your own research.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Rainbow size={40} /></div>
              <h2>{getUiString(lang, 'Bitcoin Rainbow Chart')}</h2>
              <p>{getUiString(lang, 'Enter the current BTC price to see which rainbow band it falls in and how it compares to the logarithmic regression model.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(RainbowChartCalculator);
