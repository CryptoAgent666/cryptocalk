import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Info,
  RotateCcw,
  Coins,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Hardcoded historical prices (approximate, no API needed)          */
/* ------------------------------------------------------------------ */

type CoinId = 'BTC' | 'ETH' | 'SOL' | 'BNB' | 'ADA' | 'DOT' | 'DOGE';

interface DatePreset {
  key: string;
  label: string;
  year: number;
  prices: Record<CoinId, number | null>;
}

// Prices updated 2026-05-03 (used as fallback when API fails — should reflect current market).
const CURRENT_PRICES: Record<CoinId, number> = {
  BTC: 77300, ETH: 2419, SOL: 145, BNB: 643, ADA: 0.55, DOT: 4.20, DOGE: 0.15,
};

const DATE_PRESETS: DatePreset[] = [
  { key: 'btc-launch', label: 'Bitcoin Launch 2009', year: 2009,
    prices: { BTC: 0.001, ETH: null, SOL: null, BNB: null, ADA: null, DOT: null, DOGE: null } },
  { key: 'btc-1', label: 'BTC $1 (2011)', year: 2011,
    prices: { BTC: 1, ETH: null, SOL: null, BNB: null, ADA: null, DOT: null, DOGE: null } },
  { key: 'eth-ico', label: 'ETH ICO (2015)', year: 2015,
    prices: { BTC: 300, ETH: 0.30, SOL: null, BNB: null, ADA: null, DOT: null, DOGE: 0.0002 } },
  { key: 'bnb-launch', label: 'BNB Launch (2017)', year: 2017,
    prices: { BTC: 1000, ETH: 10, SOL: null, BNB: 0.10, ADA: 0.02, DOT: null, DOGE: 0.0002 } },
  { key: 'covid', label: 'COVID Crash (Mar 2020)', year: 2020,
    prices: { BTC: 5000, ETH: 130, SOL: 1.50, BNB: 12, ADA: 0.03, DOT: 3, DOGE: 0.002 } },
  { key: 'ath-2021', label: 'BTC ATH (Nov 2021)', year: 2021,
    prices: { BTC: 69000, ETH: 4800, SOL: 260, BNB: 650, ADA: 3.10, DOT: 55, DOGE: 0.73 } },
  { key: 'ftx', label: 'FTX Crash (Nov 2022)', year: 2022,
    prices: { BTC: 16000, ETH: 1100, SOL: 10, BNB: 250, ADA: 0.30, DOT: 5, DOGE: 0.08 } },
  // Updated 2026-05-03 — labelled relative to current date.
  { key: '1y-ago', label: '1 Year Ago (May 2025)', year: 2025,
    prices: { BTC: 95000, ETH: 2700, SOL: 175, BNB: 615, ADA: 0.78, DOT: 5.50, DOGE: 0.22 } },
  { key: '6m-ago', label: '6 Months Ago (Nov 2025)', year: 2025,
    prices: { BTC: 92000, ETH: 3100, SOL: 200, BNB: 670, ADA: 0.82, DOT: 5.20, DOGE: 0.32 } },
];

const COINS: CoinId[] = ['BTC', 'ETH', 'SOL', 'BNB', 'ADA', 'DOT', 'DOGE'];

const SCENARIOS = [
  { label: 'BTC $100 in 2011', coin: 'BTC' as CoinId, amount: '100', dateKey: 'btc-1' },
  { label: 'ETH $1000 at ICO', coin: 'ETH' as CoinId, amount: '1000', dateKey: 'eth-ico' },
  { label: 'SOL $500 in 2020', coin: 'SOL' as CoinId, amount: '500', dateKey: 'covid' },
];

const AMOUNT_PILLS = ['100', '500', '1000', '5000', '10000'];
const TESLA_PRICE = 250;
const MONTHLY_RENT = 1800;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function IfIHadBoughtCalculator({ lang = 'en' }: { lang?: string }) {
  const [coin, setCoin] = useState<CoinId>('BTC');
  const [amount, setAmount] = useState('1000');
  const [dateKey, setDateKey] = useState('covid');

  const loc = lang === 'en' ? 'en-US' : lang;

  const formatUSD = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
  };

  const formatPercent = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    return (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
  };

  const formatCoins = (n: number) => {
    if (!isFinite(n)) return '\u2014';
    if (n >= 1) return n.toLocaleString(loc, { maximumFractionDigits: 4 });
    return n.toFixed(8);
  };

  const results = useMemo(() => {
    const inv = parseFloat(amount) || 0;
    if (inv <= 0) return null;
    const preset = DATE_PRESETS.find(d => d.key === dateKey);
    if (!preset) return null;
    const priceThen = preset.prices[coin];
    if (priceThen === null || priceThen <= 0) return null;
    const priceNow = CURRENT_PRICES[coin];
    const coinsBought = inv / priceThen;
    const currentValue = coinsBought * priceNow;
    const totalReturn = currentValue - inv;
    const totalReturnPct = ((currentValue - inv) / inv) * 100;
    const yearsHeld = Math.max(0.5, 2026 - preset.year);
    const annualized = (Math.pow(currentValue / inv, 1 / yearsHeld) - 1) * 100;
    const teslaShares = Math.floor(currentValue / TESLA_PRICE);
    const monthsRent = Math.floor(currentValue / MONTHLY_RENT);
    return { coinsBought, currentValue, totalReturn, totalReturnPct, annualized, priceThen, priceNow, teslaShares, monthsRent, yearsHeld, dateName: preset.label };
  }, [coin, amount, dateKey]);

  const coinAvailable = (c: CoinId) => {
    const preset = DATE_PRESETS.find(d => d.key === dateKey);
    return preset ? preset.prices[c] !== null : false;
  };

  const applyScenario = (s: typeof SCENARIOS[0]) => {
    setCoin(s.coin);
    setAmount(s.amount);
    setDateKey(s.dateKey);
  };

  const reset = () => { setCoin('BTC'); setAmount('1000'); setDateKey('covid'); };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        {/* ===== Input Panel ===== */}
        <div className="calc-input-panel">
          {/* Coin Select */}
          <div className="input-group">
            <label><Coins size={14} /> {getUiString(lang, 'Cryptocurrency')}</label>
            <div className="pills-row">
              {COINS.map(c => (
                <button key={c} className={`pill-btn ${coin === c ? 'active' : ''} ${!coinAvailable(c) ? 'disabled' : ''}`}
                  onClick={() => coinAvailable(c) && setCoin(c)} disabled={!coinAvailable(c)}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Investment Amount */}
          <div className="input-group">
            <label htmlFor="ihb-amount"><DollarSign size={14} /> {getUiString(lang, 'Investment Amount')}</label>
            <input type="number" inputMode="decimal" id="ihb-amount" value={amount}
              onChange={e => setAmount(e.target.value)} min="1" step="any" onFocus={e => e.target.select()} />
            <div className="pills-row">
              {AMOUNT_PILLS.map(v => (
                <button key={v} className={`pill-btn ${amount === v ? 'active' : ''}`} onClick={() => setAmount(v)}>
                  ${Number(v).toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Date */}
          <div className="input-group">
            <label><Calendar size={14} /> {getUiString(lang, 'Purchase Date')}</label>
            <div className="pills-row" style={{ flexWrap: 'wrap' }}>
              {DATE_PRESETS.map(d => (
                <button key={d.key} className={`pill-btn ${dateKey === d.key ? 'active' : ''}`}
                  onClick={() => setDateKey(d.key)}>
                  {getUiString(lang, d.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s, i) => (
                <button key={i} className="pill-btn" onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Pick a coin, amount, and historical date to see what your investment would be worth today.')}</span>
        </div>

        {/* ===== Results Panel ===== */}
        <div className="calc-results-panel">
          {results ? (
            <>
              <div className="result-hero" style={{ borderColor: results.totalReturn >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-red, #ef4444)' }}>
                <span className="result-hero-label">{getUiString(lang, 'Your investment of') + ' $' + Number(amount).toLocaleString(loc) + ' ' + getUiString(lang, 'would be worth')}</span>
                <span className="result-hero-value" style={{ color: results.totalReturn >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-red, #ef4444)' }}>
                  {formatUSD(results.currentValue)}
                </span>
                <span className="result-hero-roi" style={{ color: results.totalReturn >= 0 ? 'var(--color-accent-green, #10b981)' : 'var(--color-accent-red, #ef4444)' }}>
                  <TrendingUp size={16} /> {formatPercent(results.totalReturnPct)} {getUiString(lang, 'Total Return')}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Coins Purchased')}</span>
                  <span className="result-value">{formatCoins(results.coinsBought)} {coin}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Price Then')}</span>
                  <span className="result-value">{formatUSD(results.priceThen)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Price Now')}</span>
                  <span className="result-value">{formatUSD(results.priceNow)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Total Return')}</strong></span>
                  <span className={`result-value ${results.totalReturn >= 0 ? 'profit' : 'fee'}`}>
                    <strong>{results.totalReturn >= 0 ? '+' : ''}{formatUSD(results.totalReturn)}</strong>
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Total Return (%)')}</span>
                  <span className={`result-value ${results.totalReturnPct >= 0 ? 'profit' : 'fee'}`}>{formatPercent(results.totalReturnPct)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annualized Return')}</span>
                  <span className={`result-value ${results.annualized >= 0 ? 'profit' : 'fee'}`}>{formatPercent(results.annualized)}</span>
                </div>
              </div>

              {/* Fun comparisons */}
              <div className="result-breakdown" style={{ marginTop: '16px' }}>
                <h2 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-muted)' }}>
                  {getUiString(lang, 'Fun Comparisons')}
                </h2>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Tesla Shares Equivalent')}</span>
                  <span className="result-value">{results.teslaShares.toLocaleString()} {getUiString(lang, 'shares')}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Months of Rent')}</span>
                  <span className="result-value">{results.monthsRent.toLocaleString()} {getUiString(lang, 'months')}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={12} />
                {getUiString(lang, 'Past performance does not guarantee future results. This is for educational purposes only.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'See What Could Have Been')}</h2>
              <p>{getUiString(lang, 'Pick a cryptocurrency, enter an amount, and select a historical date to discover what your investment would be worth today.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(IfIHadBoughtCalculator);
