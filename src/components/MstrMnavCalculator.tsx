import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Building2, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';
import { loc } from '../i18n/format';

interface CompanyPreset {
  name: string;
  ticker: string;
  marketCap: string;
  btcHoldings: string;
  debt: string;
}

// Preset snapshot 2026-10-13 (bitcointreasuries.net company pages) — approximate, for illustration only.
// Until then these were labelled "May 2026" but held December-2024 figures (440,000 BTC, $95B), which
// put MSTR at a 2.79x "Extreme Premium" while it actually traded near NAV. Semler Scientific merged into
// Strive (ASST), so its row now shows the combined company. Debt is MSTR's convertible notes only.
const COMPANY_PRESETS: CompanyPreset[] = [
  { name: 'Strategy (MSTR)', ticker: 'MSTR', marketCap: '62900000000', btcHoldings: '848250', debt: '8000000000' },
  { name: 'MetaPlanet (3350.T)', ticker: '3350', marketCap: '1900000000', btcHoldings: '44000', debt: '0' },
  { name: 'Strive (ASST, incl. Semler)', ticker: 'ASST', marketCap: '2600000000', btcHoldings: '29462', debt: '0' },
  { name: 'Custom', ticker: 'CUSTOM', marketCap: '', btcHoldings: '', debt: '0' },
];

// Illustrative multiples on the default 848,250 BTC x $83,600 (~$70.9B NAV): 1.0x / 1.5x / 2.5x / 0.8x.
const MNAV_SCENARIOS = [
  { label: 'Pure NAV (1.0×)', marketCap: '70900000000', btcHoldings: '848250', debt: '0' },
  { label: 'Healthy Premium', marketCap: '106000000000', btcHoldings: '848250', debt: '0' },
  { label: 'High Premium', marketCap: '177000000000', btcHoldings: '848250', debt: '8000000000' },
  { label: 'Discount to NAV', marketCap: '56700000000', btcHoldings: '848250', debt: '0' },
] as const;

function MstrMnavCalculator({ lang = 'en' }: { lang?: string }) {
  const [marketCap, setMarketCap] = useState('62900000000');
  const [btcHoldings, setBtcHoldings] = useState('848250');
  const [btcPrice, setBtcPrice] = useState('83600');
  const [debt, setDebt] = useState('8000000000');
  // No verified share count for the 2026-10-13 snapshot, so the optional per-share rows start empty
  // rather than showing a share price derived from a stale count.
  const [sharesOut, setSharesOut] = useState('');

  const applyPreset = (p: CompanyPreset) => {
    if (!p.marketCap) return; // Custom = no-op
    setMarketCap(p.marketCap);
    setBtcHoldings(p.btcHoldings);
    setDebt(p.debt);
  };
  const applyScenario = (s: (typeof MNAV_SCENARIOS)[number]) => {
    setMarketCap(s.marketCap); setBtcHoldings(s.btcHoldings); setDebt(s.debt);
  };
  const isScenarioActive = (s: (typeof MNAV_SCENARIOS)[number]) =>
    marketCap === s.marketCap && btcHoldings === s.btcHoldings && debt === s.debt;

  const result = useMemo(() => {
    const mc = Number(marketCap);
    const btc = Number(btcHoldings);
    const price = Number(btcPrice);
    const liab = Number(debt) || 0;
    const shares = Number(sharesOut) || 0;
    if (![mc, btc, price].every(Number.isFinite) || mc <= 0 || btc <= 0 || price <= 0) return null;

    const btcNav = btc * price;
    const enterpriseNav = btcNav - liab;
    const mnav = mc / btcNav;
    const enterpriseMnav = enterpriseNav > 0 ? mc / enterpriseNav : Infinity;
    const premiumPct = (mnav - 1) * 100;
    const btcPerShare = shares > 0 ? btc / shares : 0;
    const sharePrice = shares > 0 ? mc / shares : 0;
    const impliedBtcInPrice = btcPerShare > 0 ? sharePrice / btcPerShare : 0;
    const premiumDollar = mc - btcNav;

    let zone: 'discount' | 'fair' | 'premium' | 'overheated';
    let zoneLabel = '';
    if (mnav < 0.9) { zone = 'discount'; zoneLabel = 'Discount to NAV'; }
    else if (mnav < 1.2) { zone = 'fair'; zoneLabel = 'Near NAV (Fair)'; }
    else if (mnav < 2.0) { zone = 'premium'; zoneLabel = 'Premium'; }
    else { zone = 'overheated'; zoneLabel = 'Extreme Premium'; }

    return { btcNav, enterpriseNav, mnav, enterpriseMnav, premiumPct, btcPerShare, sharePrice, impliedBtcInPrice, premiumDollar, zone, zoneLabel };
  }, [marketCap, btcHoldings, btcPrice, debt, sharesOut]);

  const reset = () => {
    setMarketCap('62900000000'); setBtcHoldings('848250'); setBtcPrice('83600');
    setDebt('8000000000'); setSharesOut('');
  };

  const formatBig = (v: number) => {
    if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
    if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
    if (Math.abs(v) >= 1e3) return `$${(v / 1e3).toFixed(2)}K`;
    return `$${v.toFixed(2)}`;
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {MNAV_SCENARIOS.map((s) => (
                <button key={s.label}
                  className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                  onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Company Preset')}</label>
            <div className="pills-row">
              {COMPANY_PRESETS.map((p) => (
                <button key={p.ticker}
                  className="pill-btn"
                  onClick={() => applyPreset(p)}>
                  {p.ticker}
                </button>
              ))}
            </div>
            <span className="input-hint">
              {getUiString(lang, 'Preset values approximate — verify with current data.')}
            </span>
          </div>

          <div className="input-group">
            <label htmlFor="mnav-mc">{getUiString(lang, 'Company Market Cap')} (USD)</label>
            <input type="number" inputMode="decimal" id="mnav-mc" value={marketCap}
              onChange={(e) => setMarketCap(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="mnav-btc">{getUiString(lang, 'BTC Holdings')}</label>
            <input type="number" inputMode="decimal" id="mnav-btc" value={btcHoldings}
              onChange={(e) => setBtcHoldings(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="mnav-price">{getUiString(lang, 'BTC Price')} (USD)</label>
            <input type="number" inputMode="decimal" id="mnav-price" value={btcPrice}
              onChange={(e) => setBtcPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="mnav-debt">{getUiString(lang, 'Total Debt')} (USD, {getUiString(lang, 'optional')})</label>
            <input type="number" inputMode="decimal" id="mnav-debt" value={debt}
              onChange={(e) => setDebt(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="mnav-shares">{getUiString(lang, 'Shares Outstanding')} ({getUiString(lang, 'optional')})</label>
            <input type="number" inputMode="decimal" id="mnav-shares" value={sharesOut}
              onChange={(e) => setSharesOut(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'mNAV = Market Cap / (BTC × BTC Price). Above 1.5 = premium, below 1.0 = discount.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone === 'discount' ? 'profit' : result.zone === 'overheated' ? 'loss' : ''}`}>
                <span className="result-hero-label">{getUiString(lang, 'mNAV (multiple)')}</span>
                <span className="result-hero-value"><Building2 size={28} />{result.mnav.toFixed(2)}×</span>
                <span className={`result-hero-roi ${result.zone === 'discount' ? 'profit' : result.zone === 'overheated' ? 'loss' : ''}`}>
                  {getUiString(lang, result.zoneLabel)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'BTC NAV (holdings × price)')}</span>
                  <span className="result-value">{formatBig(result.btcNav)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Enterprise NAV (− debt)')}</span>
                  <span className="result-value">{formatBig(result.enterpriseNav)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Premium / Discount')}</span>
                  <span className={`result-value ${result.premiumPct >= 0 ? 'fee' : 'profit'}`}>
                    {result.premiumPct >= 0 ? '+' : ''}{result.premiumPct.toLocaleString(loc(lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Premium amount')}</span>
                  <span className={`result-value ${result.premiumDollar >= 0 ? 'fee' : 'profit'}`}>
                    {formatBig(result.premiumDollar)}
                  </span>
                </div>
                {result.btcPerShare > 0 && (
                  <>
                    <div className="result-divider" />
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'BTC per share')}</span>
                      <span className="result-value">{result.btcPerShare.toFixed(8)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Implied BTC price in stock')}</span>
                      <span className="result-value">{formatBig(result.impliedBtcInPrice)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Share price')}</span>
                      <span className="result-value">{formatBig(result.sharePrice)}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'mNAV ignores operating business value, future BTC purchases, and convertible debt complexity. Treasury companies often trade at premium due to anticipated accretion.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Provide market cap, BTC holdings, and BTC price.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(MstrMnavCalculator);
