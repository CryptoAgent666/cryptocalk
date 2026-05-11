import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Activity, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const PRICE_PRESETS = ['50000', '77000', '100000', '150000'];
const MA_PRESETS = ['45000', '70000', '85000', '100000'];

const MAYER_SCENARIOS = [
  { label: 'Bear Bottom', currentPrice: '40000', ma200: '60000' },
  { label: 'Accumulation', currentPrice: '70000', ma200: '70000' },
  { label: 'Bull Cycle', currentPrice: '120000', ma200: '80000' },
  { label: 'Mania Top', currentPrice: '250000', ma200: '90000' },
] as const;

function MayerMultipleCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (v: number) =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(v);

  const [currentPrice, setCurrentPrice] = useState('77000');
  const [ma200, setMa200] = useState('70000');

  const applyScenario = (s: (typeof MAYER_SCENARIOS)[number]) => {
    setCurrentPrice(s.currentPrice);
    setMa200(s.ma200);
  };
  const isScenarioActive = (s: (typeof MAYER_SCENARIOS)[number]) =>
    currentPrice === s.currentPrice && ma200 === s.ma200;

  const result = useMemo(() => {
    const price = Number(currentPrice);
    const ma = Number(ma200);
    if (![price, ma].every(Number.isFinite) || price <= 0 || ma <= 0) return null;

    const multiple = price / ma;
    const deviationPct = ((price - ma) / ma) * 100;

    let zone: 'undervalued' | 'normal' | 'elevated' | 'overheated';
    let zoneLabel = '';
    let rating = '';
    if (multiple < 1.0) { zone = 'undervalued'; zoneLabel = 'Undervalued'; rating = 'Buy zone'; }
    else if (multiple < 1.5) { zone = 'normal'; zoneLabel = 'Normal'; rating = 'Fair value'; }
    else if (multiple < 2.4) { zone = 'elevated'; zoneLabel = 'Elevated'; rating = 'Caution'; }
    else { zone = 'overheated'; zoneLabel = 'Overheated'; rating = 'Historical sell zone'; }

    // Distance to next zone boundary
    const nextThreshold = multiple < 1.0 ? 1.0 : multiple < 1.5 ? 1.5 : multiple < 2.4 ? 2.4 : null;
    const priceAtThreshold = nextThreshold ? ma * nextThreshold : null;

    return { multiple, deviationPct, zone, zoneLabel, rating, priceAtThreshold, nextThreshold };
  }, [currentPrice, ma200]);

  const reset = () => {
    setCurrentPrice('77000');
    setMa200('70000');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {MAYER_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="mm-price">{getUiString(lang, 'Current BTC Price')} (USD)</label>
            <div className="pills-row">
              {PRICE_PRESETS.map((p) => (
                <button key={p}
                  className={`pill-btn ${currentPrice === p ? 'active' : ''}`}
                  onClick={() => setCurrentPrice(p)}>
                  ${(parseInt(p) / 1000)}K
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="mm-price" value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="mm-ma">{getUiString(lang, '200-Day Moving Average')} (USD)</label>
            <div className="pills-row">
              {MA_PRESETS.map((p) => (
                <button key={p}
                  className={`pill-btn ${ma200 === p ? 'active' : ''}`}
                  onClick={() => setMa200(p)}>
                  ${(parseInt(p) / 1000)}K
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" id="mm-ma" value={ma200}
              onChange={(e) => setMa200(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Mayer Multiple = current price / 200-day moving average. Above 2.4 historically signals overbought; below 1.0 is undervalued.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone === 'undervalued' ? 'profit' : result.zone === 'overheated' ? 'loss' : ''}`}>
                <span className="result-hero-label">{getUiString(lang, 'Mayer Multiple')}</span>
                <span className="result-hero-value"><Activity size={28} />{result.multiple.toFixed(3)}</span>
                <span className={`result-hero-roi ${result.zone === 'undervalued' ? 'profit' : result.zone === 'overheated' ? 'loss' : ''}`}>
                  {getUiString(lang, result.zoneLabel)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Zone')}</span>
                  <span className="result-value">{getUiString(lang, result.rating)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Price vs 200d MA')}</span>
                  <span className={`result-value ${result.deviationPct >= 0 ? 'profit' : 'loss'}`}>
                    {result.deviationPct >= 0 ? '+' : ''}{result.deviationPct.toFixed(2)}%
                  </span>
                </div>
                {result.priceAtThreshold && (
                  <div className="result-row">
                    <span className="result-label">{getUiString(lang, 'Next zone at')} {result.nextThreshold?.toFixed(1)}×</span>
                    <span className="result-value">{formatUSD(result.priceAtThreshold)}</span>
                  </div>
                )}
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Undervalued')} (&lt;1.0)</span>
                  <span className="result-value">&lt; {formatUSD(Number(ma200))}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Normal')} (1.0–1.5)</span>
                  <span className="result-value">{formatUSD(Number(ma200))} – {formatUSD(Number(ma200) * 1.5)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Overheated')} (&gt;2.4)</span>
                  <span className="result-value">&gt; {formatUSD(Number(ma200) * 2.4)}</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Mayer Multiple is a historical indicator. Only ~18% of days BTC closed above 2.4×; ~22% below 1.0×. Not a guarantee — combine with other signals.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Provide current BTC price and 200-day moving average.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(MayerMultipleCalculator);
