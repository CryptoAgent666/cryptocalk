import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { CreditCard, Info, RotateCcw, Award } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const CARDS = [
  { id: 'gemini', label: 'Gemini Credit Card', annualFee: '0', baseRate: '1', categoryRates: { gas: 4, dining: 3, groceries: 2 }, minSpend: '0' },
  { id: 'coinbase', label: 'Coinbase One Card', annualFee: '0', baseRate: '4', categoryRates: { gas: 4, dining: 4, groceries: 4 }, minSpend: '0' },
  { id: 'venmo', label: 'Venmo Credit Card', annualFee: '0', baseRate: '1', categoryRates: { dining: 3, groceries: 2, gas: 1 }, minSpend: '0' },
  { id: 'bitcoin-rewards', label: 'Bitcoin Rewards Visa (Fold)', annualFee: '0', baseRate: '1.5', categoryRates: {}, minSpend: '0' },
  { id: 'crypto-com', label: 'Crypto.com Visa (Ruby)', annualFee: '0', baseRate: '1', categoryRates: { netflix: 100, spotify: 100 }, minSpend: '0' },
  { id: 'amex-gold', label: 'Amex Gold (Comparison)', annualFee: '325', baseRate: '1', categoryRates: { dining: 4, groceries: 4 }, minSpend: '0' },
] as const;

function CryptoCardCashbackCalculator({ lang = 'en' }: { lang?: string }) {
  const [card, setCard] = useState<typeof CARDS[number]['id']>('gemini');
  const [annualFee, setAnnualFee] = useState('0');
  const [baseRate, setBaseRate] = useState('1');
  const [bonusRate, setBonusRate] = useState('4');
  const [bonusCategory, setBonusCategory] = useState('Gas');
  const [bonusSpendPct, setBonusSpendPct] = useState('30');
  const [monthlySpend, setMonthlySpend] = useState('3000');
  const [btcPrice, setBtcPrice] = useState('100000');
  const [appreciation, setAppreciation] = useState('20');

  const applyCard = (id: typeof CARDS[number]['id']) => {
    const c = CARDS.find((x) => x.id === id);
    if (!c) return;
    setCard(id);
    setAnnualFee(c.annualFee);
    setBaseRate(c.baseRate);
    const cats = Object.entries(c.categoryRates);
    if (cats.length > 0) {
      const [topCat, topRate] = cats[0];
      setBonusCategory(topCat.charAt(0).toUpperCase() + topCat.slice(1));
      setBonusRate(String(topRate));
    } else {
      setBonusCategory('—');
      setBonusRate(c.baseRate);
    }
  };

  const result = useMemo(() => {
    const fee = Number(annualFee);
    const base = Number(baseRate) / 100;
    const bonus = Number(bonusRate) / 100;
    const bonusPct = Number(bonusSpendPct) / 100;
    const monthly = Number(monthlySpend);
    const btc = Number(btcPrice);
    const app = Number(appreciation) / 100;

    if (![fee, base, bonus, bonusPct, monthly, btc, app].every(Number.isFinite)) return null;
    if (monthly < 0 || btc <= 0 || base < 0 || bonus < 0) return null;

    const annualSpend = monthly * 12;
    const bonusSpend = annualSpend * bonusPct;
    const baseSpend = annualSpend - bonusSpend;
    const baseRewards = baseSpend * base;
    const bonusRewards = bonusSpend * bonus;
    const totalRewards = baseRewards + bonusRewards;
    const netRewards = totalRewards - fee;
    const effectiveRate = annualSpend > 0 ? (netRewards / annualSpend) * 100 : 0;

    const btcEarned = totalRewards / btc;
    const btcAfterAppreciation = btcEarned * btc * (1 + app);
    const appreciationGain = btcAfterAppreciation - totalRewards;

    const fiveYearRewards = netRewards * 5;
    const tenYearRewards = netRewards * 10;
    const tenYearBtcEarned = (totalRewards * 10) / btc;
    const tenYearAtAppreciation = (totalRewards * 10) * Math.pow(1 + app, 10);

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (effectiveRate > 3) { zone = 'profit'; rating = 'Excellent rewards rate'; }
    else if (effectiveRate > 1.5) { zone = 'profit'; rating = 'Good rewards rate'; }
    else if (effectiveRate > 0) { zone = 'neutral'; rating = 'Average'; }
    else { zone = 'loss'; rating = 'Fee exceeds rewards'; }

    return {
      annualSpend, bonusSpend, baseSpend, baseRewards, bonusRewards, totalRewards, netRewards,
      effectiveRate, btcEarned, btcAfterAppreciation, appreciationGain,
      fiveYearRewards, tenYearRewards, tenYearBtcEarned, tenYearAtAppreciation,
      zone, rating,
    };
  }, [annualFee, baseRate, bonusRate, bonusSpendPct, monthlySpend, btcPrice, appreciation]);

  const reset = () => {
    applyCard('gemini'); setMonthlySpend('3000'); setBonusSpendPct('30'); setBtcPrice('100000'); setAppreciation('20');
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
            <label>{getUiString(lang, 'Crypto Card')}</label>
            <div className="pills-row">
              {CARDS.map((c) => (
                <button key={c.id}
                  className={`pill-btn ${card === c.id ? 'active' : ''}`}
                  onClick={() => applyCard(c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="cc-fee">{getUiString(lang, 'Annual Fee')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-fee" value={annualFee}
              onChange={(e) => setAnnualFee(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-base">{getUiString(lang, 'Base Rewards Rate')} (%)</label>
            <input type="number" inputMode="decimal" id="cc-base" value={baseRate}
              onChange={(e) => setBaseRate(e.target.value)} min="0" max="10" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-bonus">{getUiString(lang, 'Bonus Category Rate')} (%)</label>
            <input type="number" inputMode="decimal" id="cc-bonus" value={bonusRate}
              onChange={(e) => setBonusRate(e.target.value)} min="0" max="10" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-bonuspct">{getUiString(lang, 'Bonus Category Spend Share')} (%)</label>
            <input type="number" inputMode="decimal" id="cc-bonuspct" value={bonusSpendPct}
              onChange={(e) => setBonusSpendPct(e.target.value)} min="0" max="100" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-monthly">{getUiString(lang, 'Monthly Spend')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-monthly" value={monthlySpend}
              onChange={(e) => setMonthlySpend(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-btc">{getUiString(lang, 'BTC Price (or chosen reward asset)')} (USD)</label>
            <input type="number" inputMode="decimal" id="cc-btc" value={btcPrice}
              onChange={(e) => setBtcPrice(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="cc-app">{getUiString(lang, 'Annual Crypto Appreciation')} (%)</label>
            <input type="number" inputMode="decimal" id="cc-app" value={appreciation}
              onChange={(e) => setAppreciation(e.target.value)} step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Crypto card rewards are taxable upon receipt at fair market value, then again at sale (capital gains).')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Annual Net Rewards')}</span>
                <span className="result-hero-value"><Award size={28} />
                  {formatUSD(result.netRewards)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.effectiveRate.toFixed(2)}% {getUiString(lang, 'effective')} · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual spend')}</span>
                  <span className="result-value">{formatUSD(result.annualSpend)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Base spend')}</span>
                  <span className="result-value">{formatUSD(result.baseSpend)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Bonus category spend')}</span>
                  <span className="result-value">{formatUSD(result.bonusSpend)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Base rewards')}</span>
                  <span className="result-value profit">+{formatUSD(result.baseRewards)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Bonus rewards')}</span>
                  <span className="result-value profit">+{formatUSD(result.bonusRewards)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Gross rewards')}</span>
                  <span className="result-value profit">+{formatUSD(result.totalRewards)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Annual fee')}</span>
                  <span className="result-value fee">−{formatUSD(Number(annualFee))}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Net rewards')}</span>
                  <span className={`result-value ${result.netRewards >= 0 ? 'profit' : 'loss'}`}>
                    {result.netRewards >= 0 ? '+' : ''}{formatUSD(result.netRewards)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Crypto earned annually')}</span>
                  <span className="result-value">{result.btcEarned.toFixed(8)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Value after 1y appreciation')}</span>
                  <span className="result-value profit">{formatUSD(result.btcAfterAppreciation)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Appreciation gain')}</span>
                  <span className={`result-value ${result.appreciationGain >= 0 ? 'profit' : 'loss'}`}>
                    {result.appreciationGain >= 0 ? '+' : ''}{formatUSD(result.appreciationGain)}
                  </span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, '5-year net rewards')}</span>
                  <span className="result-value">{formatUSD(result.fiveYearRewards)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, '10-year net rewards (no growth)')}</span>
                  <span className="result-value">{formatUSD(result.tenYearRewards)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, '10-year crypto earned')}</span>
                  <span className="result-value">{result.tenYearBtcEarned.toFixed(8)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, '10-year value with appreciation')}</span>
                  <span className="result-value profit">{formatUSD(result.tenYearAtAppreciation)}</span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Don\'t spend more just to earn rewards. Crypto rewards add tax complexity (income + capital gains). Consider a flat 2% USD-back card if you wouldn\'t buy crypto separately.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><CreditCard size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Spend, BTC price must be positive. Rates between 0–10%.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(CryptoCardCashbackCalculator);
