import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Info,
  RotateCcw,
  Pizza,
  Coins,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BTC_FALLBACK_PRICE = 77300;
const ORIGINAL_BTC = 10000;
const ORIGINAL_PIZZAS = 2;
const ORIGINAL_DATE = 'May 22, 2010';

const SCENARIOS = [
  { label: 'Original 2010 Deal', pizzas: '2', pizzaPrice: '15', btcAmount: '10000' },
  { label: "Today's Prices", pizzas: '2', pizzaPrice: '20', btcAmount: '10000' },
  { label: 'Custom', pizzas: '1', pizzaPrice: '25', btcAmount: '1' },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function PizzaDayCalculator({ lang = 'en' }: { lang?: string }) {
  const [pizzas, setPizzas] = useState('2');
  const [pizzaPrice, setPizzaPrice] = useState('15');
  const [btcAmount, setBtcAmount] = useState('10000');
  const [btcPrice, setBtcPrice] = useState('');
  const [networkError, setNetworkError] = useState(false);

  // Auto-fetch BTC price
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${import.meta.env.PUBLIC_COINGECKO_API_KEY || ''}`)
      .then(r => r.json())
      .then(d => { if (d.bitcoin?.usd) setBtcPrice(String(d.bitcoin.usd)); })
      .catch(() => { setNetworkError(true); setBtcPrice(String(BTC_FALLBACK_PRICE)); });
  }, []);

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
  };

  const formatBig = (n: number) => new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(n);

  const results = useMemo(() => {
    const nPizzas = parseFloat(pizzas) || 0;
    const pPrice = parseFloat(pizzaPrice) || 0;
    const btc = parseFloat(btcAmount) || 0;
    const price = parseFloat(btcPrice) || BTC_FALLBACK_PRICE;
    if (nPizzas <= 0 || btc <= 0) return null;

    const totalPizzaCostUsd = nPizzas * pPrice;
    const currentBtcValue = btc * price;
    const costPerPizzaBtc = btc / nPizzas;
    const costPerPizzaUsd = pPrice;
    const satsPerPizza = costPerPizzaBtc * 1e8;
    const pizzasYouCouldBuy = (btc * price) / pPrice;
    const pricePerSatInPizza = pPrice / satsPerPizza;
    const opportunityCost = currentBtcValue - totalPizzaCostUsd;

    return {
      nPizzas,
      totalPizzaCostUsd,
      currentBtcValue,
      costPerPizzaBtc,
      costPerPizzaUsd,
      satsPerPizza,
      pizzasYouCouldBuy,
      pricePerSatInPizza,
      opportunityCost,
      btcPrice: price,
    };
  }, [pizzas, pizzaPrice, btcAmount, btcPrice]);

  const applyScenario = (s: typeof SCENARIOS[number]) => {
    setPizzas(s.pizzas);
    setPizzaPrice(s.pizzaPrice);
    setBtcAmount(s.btcAmount);
  };

  const reset = () => {
    setPizzas('2');
    setPizzaPrice('15');
    setBtcAmount('10000');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* Number of Pizzas */}
          <div className="input-group">
            <label htmlFor="pizza-count"><Pizza size={14} /> {getUiString(lang, 'Number of Pizzas')}</label>
            <input type="number" inputMode="decimal" id="pizza-count" value={pizzas}
              onChange={e => setPizzas(e.target.value)} min="1" step="1" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {['1', '2', '5', '10'].map(v => (
                <button key={v} className={`pill-btn ${pizzas === v ? 'active' : ''}`} onClick={() => setPizzas(v)}>{v}</button>
              ))}
            </div>
          </div>

          {/* Pizza Price Today */}
          <div className="input-group">
            <label htmlFor="pizza-price"><DollarSign size={14} /> {getUiString(lang, 'Pizza Price Today')}</label>
            <input type="number" inputMode="decimal" id="pizza-price" value={pizzaPrice}
              onChange={e => setPizzaPrice(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {['10', '15', '20', '30'].map(v => (
                <button key={v} className={`pill-btn ${pizzaPrice === v ? 'active' : ''}`} onClick={() => setPizzaPrice(v)}>
                  ${v}
                </button>
              ))}
            </div>
          </div>

          {/* BTC Amount */}
          <div className="input-group">
            <label htmlFor="pizza-btc"><Coins size={14} /> {getUiString(lang, 'BTC Amount')}</label>
            <input type="number" inputMode="decimal" id="pizza-btc" value={btcAmount}
              onChange={e => setBtcAmount(e.target.value)} min="0" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {['1', '100', '1000', '10000'].map(v => (
                <button key={v} className={`pill-btn ${btcAmount === v ? 'active' : ''}`} onClick={() => setBtcAmount(v)}>
                  {formatBig(Number(v))} BTC
                </button>
              ))}
            </div>
          </div>

          {/* Current BTC Price */}
          <div className="input-group">
            <label htmlFor="pizza-btc-price">
              <DollarSign size={14} /> {getUiString(lang, 'Current BTC Price')}
              {btcPrice && !networkError && <span className="label-hint">{getUiString(lang, 'Auto-filled')}</span>}
              {networkError && <span className="label-hint" style={{ color: 'var(--color-accent-red, #ef4444)' }}>{getUiString(lang, 'Price fetch failed — enter manually')}</span>}
            </label>
            <input type="number" inputMode="decimal" id="pizza-btc-price" value={btcPrice}
              onChange={e => setBtcPrice(e.target.value)} placeholder={getUiString(lang, 'Fetching...')} min="0" step="any" onFocus={e => e.target.select()} />
          </div>

          {/* Scenarios */}
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s, i) => (
                <button key={i} className={`pill-btn ${pizzas === s.pizzas && pizzaPrice === s.pizzaPrice && btcAmount === s.btcAmount ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Relive the most expensive pizza purchase in history.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              {/* Hero: Current value of those BTC */}
              <div className="result-hero" style={{ borderColor: 'var(--color-accent-green, #10b981)' }}>
                <span className="result-hero-label">
                  {formatBig(parseFloat(btcAmount) || 0)} BTC {getUiString(lang, 'is worth today')}
                </span>
                <span className="result-hero-value" style={{ color: 'var(--color-accent-green, #10b981)' }}>
                  {formatUSD(results.currentBtcValue)}
                </span>
                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'Originally paid for')} {results.nPizzas} {getUiString(lang, 'pizza(s) on')} {ORIGINAL_DATE}
                </span>
              </div>

              {/* Pizza Economics */}
              <div className="result-breakdown">
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  {getUiString(lang, 'Pizza Economics')}
                </h4>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Original Pizza Cost')}</span>
                  <span className="result-value">{formatBig(parseFloat(btcAmount) || 0)} BTC (~{formatUSD(results.totalPizzaCostUsd)})</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Cost Per Pizza (Then)')}</span>
                  <span className="result-value">{formatBig(results.costPerPizzaBtc)} BTC</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Cost Per Pizza (Now)')}</span>
                  <span className="result-value">{formatUSD(results.costPerPizzaUsd)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Satoshis Per Pizza')}</span>
                  <span className="result-value">{formatBig(results.satsPerPizza)} sats</span>
                </div>
              </div>

              <div className="result-divider" />

              {/* The Big Numbers */}
              <div className="result-breakdown">
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  {getUiString(lang, 'Most Expensive Pizza in History')}
                </h4>
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Current Value of BTC')}</strong></span>
                  <span className="result-value profit"><strong>{formatUSD(results.currentBtcValue)}</strong></span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Opportunity Cost')}</span>
                  <span className="result-value fee">{formatUSD(results.opportunityCost)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Pizzas You Could Buy Today')}</span>
                  <span className="result-value profit">{formatBig(results.pizzasYouCouldBuy)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'BTC Price at Time')}</span>
                  <span className="result-value">{getUiString(lang, 'Essentially $0')}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'BTC Price Today')}</span>
                  <span className="result-value">{formatUSD(results.btcPrice)}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'On May 22, 2010, Laszlo Hanyecz paid 10,000 BTC for two Papa John\'s pizzas. This is celebrated as Bitcoin Pizza Day. Not financial advice.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Pizza size={40} /></div>
              <h3>{getUiString(lang, 'Bitcoin Pizza Day')}</h3>
              <p>{getUiString(lang, 'Explore the most expensive pizza purchase in history. On May 22, 2010, someone paid 10,000 BTC for two pizzas.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PizzaDayCalculator);
