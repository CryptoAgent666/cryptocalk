import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Vote, Info, RotateCcw, Percent } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const PM_PRESETS = [
  { label: 'Trump 2024 Final', priceYes: '0.65', betSize: '500', side: 'yes' as const },
  { label: 'Coin Flip', priceYes: '0.50', betSize: '100', side: 'yes' as const },
  { label: 'Long Shot 10%', priceYes: '0.10', betSize: '50', side: 'yes' as const },
  { label: 'Heavy Favorite 90%', priceYes: '0.90', betSize: '900', side: 'yes' as const },
] as const;

function PolymarketOddsCalculator({ lang = 'en' }: { lang?: string }) {
  const [priceYes, setPriceYes] = useState('0.65');
  const [betSize, setBetSize] = useState('500');
  const [side, setSide] = useState<'yes' | 'no'>('yes');
  const [trueProbability, setTrueProbability] = useState('70');
  const [hedgePrice, setHedgePrice] = useState('');

  const applyPreset = (p: typeof PM_PRESETS[number]) => {
    setPriceYes(p.priceYes); setBetSize(p.betSize); setSide(p.side);
  };
  const isPresetActive = (p: typeof PM_PRESETS[number]) =>
    priceYes === p.priceYes && betSize === p.betSize && side === p.side;

  const result = useMemo(() => {
    const py = Number(priceYes);
    const bs = Number(betSize);
    const tp = Number(trueProbability) / 100;
    const hp = hedgePrice.trim() === '' ? py : Number(hedgePrice);

    if (![py, bs, tp, hp].every(Number.isFinite)) return null;
    if (py <= 0 || py >= 1 || bs <= 0 || tp < 0 || tp > 1) return null;

    const priceNo = 1 - py;
    const sidePrice = side === 'yes' ? py : priceNo;
    const oppositePrice = side === 'yes' ? priceNo : py;

    const sharesPurchased = bs / sidePrice;
    const payoutIfWin = sharesPurchased; // each share pays $1
    const profitIfWin = payoutIfWin - bs;
    const lossIfLose = bs;

    const impliedProb = sidePrice * 100;
    const decimalOdds = 1 / sidePrice;
    const americanOdds = sidePrice >= 0.5
      ? -100 * sidePrice / (1 - sidePrice)
      : 100 * (1 - sidePrice) / sidePrice;
    const fractionalOdds = `${(1 - sidePrice).toFixed(2)} / ${sidePrice.toFixed(2)}`;

    const sideTrueProb = side === 'yes' ? tp : 1 - tp;
    const expectedValue = (sideTrueProb * profitIfWin) - ((1 - sideTrueProb) * lossIfLose);
    const evPct = (expectedValue / bs) * 100;
    const edge = sideTrueProb - sidePrice;
    const edgePct = edge * 100;

    // Kelly criterion: f = (bp - q) / b where b = decimal_odds - 1, p = true prob, q = 1 - p
    const b = decimalOdds - 1;
    const kellyFraction = b > 0 ? (b * sideTrueProb - (1 - sideTrueProb)) / b : 0;
    const kellyBetSize = Math.max(0, kellyFraction);

    // Hedge: bet on opposite side at hedgePrice to lock profit
    const hpOpp = side === 'yes' ? 1 - hp : hp;
    const hedgeBet = hpOpp > 0 ? payoutIfWin * hpOpp : 0;
    const hedgeShares = hedgeBet / hpOpp;
    const lockedProfit = hedgeShares - bs - hedgeBet;

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (evPct > 10) { zone = 'profit'; rating = 'Strong +EV'; }
    else if (evPct > 0) { zone = 'profit'; rating = 'Positive EV'; }
    else if (evPct > -5) { zone = 'neutral'; rating = 'Marginal'; }
    else { zone = 'loss'; rating = 'Negative EV'; }

    return {
      priceNo, sidePrice, oppositePrice, sharesPurchased, payoutIfWin, profitIfWin, lossIfLose,
      impliedProb, decimalOdds, americanOdds, fractionalOdds,
      expectedValue, evPct, edge, edgePct, kellyFraction: kellyFraction * 100, kellyBetSize: kellyBetSize * 100,
      hedgeBet, lockedProfit, zone, rating,
    };
  }, [priceYes, betSize, side, trueProbability, hedgePrice]);

  const reset = () => {
    setPriceYes('0.65'); setBetSize('500'); setSide('yes'); setTrueProbability('70'); setHedgePrice('');
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
              {PM_PRESETS.map((p) => (
                <button key={p.label}
                  className={`pill-btn ${isPresetActive(p) ? 'active' : ''}`}
                  onClick={() => applyPreset(p)}>
                  {getUiString(lang, p.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Bet Side')}</label>
            <div className="pills-row">
              <button className={`pill-btn ${side === 'yes' ? 'active' : ''}`} onClick={() => setSide('yes')}>
                {getUiString(lang, 'YES')}
              </button>
              <button className={`pill-btn ${side === 'no' ? 'active' : ''}`} onClick={() => setSide('no')}>
                {getUiString(lang, 'NO')}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="pm-price">{getUiString(lang, 'YES Market Price')} (USD, 0–1)</label>
            <input type="number" inputMode="decimal" id="pm-price" value={priceYes}
              onChange={(e) => setPriceYes(e.target.value)} min="0.01" max="0.99" step="0.01"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pm-size">{getUiString(lang, 'Bet Size')} (USD)</label>
            <input type="number" inputMode="decimal" id="pm-size" value={betSize}
              onChange={(e) => setBetSize(e.target.value)} min="0" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pm-trueprob">{getUiString(lang, 'Your YES Probability Estimate')} (%)</label>
            <input type="number" inputMode="decimal" id="pm-trueprob" value={trueProbability}
              onChange={(e) => setTrueProbability(e.target.value)} min="0" max="100" step="any"
              onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="pm-hedge">{getUiString(lang, 'Hedge at Future YES Price (optional)')}</label>
            <input type="number" inputMode="decimal" id="pm-hedge" value={hedgePrice}
              onChange={(e) => setHedgePrice(e.target.value)} min="0.01" max="0.99" step="0.01"
              onFocus={(e) => e.target.select()}
              placeholder={getUiString(lang, 'Leave blank to skip hedge')} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Polymarket prices in USDC: $0.65 means market thinks YES is 65% likely. NO price = 1 − YES.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Profit If You Win')}</span>
                <span className="result-hero-value"><Percent size={28} />
                  {formatUSD(result.profitIfWin)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.decimalOdds.toFixed(2)}× · EV {result.evPct >= 0 ? '+' : ''}{result.evPct.toFixed(2)}% · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'YES price')}</span>
                  <span className="result-value">${Number(priceYes).toFixed(2)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'NO price')}</span>
                  <span className="result-value">${result.priceNo.toFixed(2)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Implied probability')}</span>
                  <span className="result-value">{result.impliedProb.toFixed(2)}%</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Shares purchased')}</span>
                  <span className="result-value">{result.sharesPurchased.toFixed(2)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Payout if win')}</span>
                  <span className="result-value profit">{formatUSD(result.payoutIfWin)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Profit if win')}</span>
                  <span className="result-value profit">+{formatUSD(result.profitIfWin)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Loss if lose')}</span>
                  <span className="result-value loss">−{formatUSD(result.lossIfLose)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Decimal odds')}</span>
                  <span className="result-value">{result.decimalOdds.toFixed(3)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'American odds')}</span>
                  <span className="result-value">{result.americanOdds > 0 ? '+' : ''}{Math.round(result.americanOdds)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Fractional odds')}</span>
                  <span className="result-value">{result.fractionalOdds}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Expected value (EV)')}</span>
                  <span className={`result-value ${result.expectedValue >= 0 ? 'profit' : 'loss'}`}>
                    {result.expectedValue >= 0 ? '+' : ''}{formatUSD(result.expectedValue)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Your edge vs market')}</span>
                  <span className={`result-value ${result.edge >= 0 ? 'profit' : 'loss'}`}>
                    {result.edge >= 0 ? '+' : ''}{result.edgePct.toFixed(2)}%
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Kelly bet size (% bankroll)')}</span>
                  <span className={`result-value ${result.kellyFraction > 0 ? 'profit' : 'fee'}`}>
                    {result.kellyFraction.toFixed(2)}%
                  </span>
                </div>
                {hedgePrice.trim() !== '' && (
                  <>
                    <div className="result-divider" />
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Hedge bet required')}</span>
                      <span className="result-value">{formatUSD(result.hedgeBet)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Locked profit (both outcomes)')}</span>
                      <span className={`result-value ${result.lockedProfit >= 0 ? 'profit' : 'loss'}`}>
                        {result.lockedProfit >= 0 ? '+' : ''}{formatUSD(result.lockedProfit)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Prediction markets are taxed as gambling income in many jurisdictions. Polymarket charges 2% on winnings; UMA disputes can affect resolution. US-restricted (use VPN at own legal risk).')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Vote size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'YES price must be between 0.01 and 0.99. Bet size and probability must be valid numbers.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(PolymarketOddsCalculator);
