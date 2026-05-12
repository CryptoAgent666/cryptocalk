import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Wallet, Info, RotateCcw, Coins } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

type Holding = { chain: string; token: string; qty: string; price: string };

const PRESETS: { label: string; holdings: Holding[] }[] = [
  {
    label: 'BTC + ETH Only',
    holdings: [
      { chain: 'Bitcoin', token: 'BTC', qty: '0.5', price: '100000' },
      { chain: 'Ethereum', token: 'ETH', qty: '5', price: '3500' },
    ],
  },
  {
    label: 'Multi-Chain Diversified',
    holdings: [
      { chain: 'Bitcoin', token: 'BTC', qty: '0.25', price: '100000' },
      { chain: 'Ethereum', token: 'ETH', qty: '3', price: '3500' },
      { chain: 'Solana', token: 'SOL', qty: '50', price: '180' },
      { chain: 'Polygon', token: 'MATIC', qty: '5000', price: '0.45' },
      { chain: 'BSC', token: 'BNB', qty: '10', price: '650' },
      { chain: 'Ethereum', token: 'USDC', qty: '5000', price: '1' },
    ],
  },
  {
    label: 'DeFi Heavy',
    holdings: [
      { chain: 'Ethereum', token: 'ETH', qty: '4', price: '3500' },
      { chain: 'Ethereum', token: 'UNI', qty: '500', price: '12' },
      { chain: 'Ethereum', token: 'AAVE', qty: '50', price: '180' },
      { chain: 'Ethereum', token: 'LINK', qty: '300', price: '20' },
      { chain: 'Arbitrum', token: 'ARB', qty: '2000', price: '1.20' },
    ],
  },
  {
    label: 'Stablecoin Heavy',
    holdings: [
      { chain: 'Ethereum', token: 'USDC', qty: '20000', price: '1' },
      { chain: 'Ethereum', token: 'USDT', qty: '15000', price: '1' },
      { chain: 'Ethereum', token: 'DAI', qty: '5000', price: '1' },
      { chain: 'Bitcoin', token: 'BTC', qty: '0.05', price: '100000' },
    ],
  },
];

function WalletNetWorthCalculator({ lang = 'en' }: { lang?: string }) {
  const [holdings, setHoldings] = useState<Holding[]>(PRESETS[1].holdings);

  const applyPreset = (idx: number) => setHoldings([...PRESETS[idx].holdings]);

  const updateHolding = (i: number, field: keyof Holding, value: string) => {
    const updated = [...holdings];
    updated[i] = { ...updated[i], [field]: value };
    setHoldings(updated);
  };
  const addHolding = () => setHoldings([...holdings, { chain: 'Ethereum', token: '', qty: '0', price: '0' }]);
  const removeHolding = (i: number) => setHoldings(holdings.filter((_, idx) => idx !== i));

  const result = useMemo(() => {
    const positions = holdings.map((h) => {
      const qty = Number(h.qty);
      const price = Number(h.price);
      const value = Number.isFinite(qty) && Number.isFinite(price) && qty >= 0 && price >= 0 ? qty * price : 0;
      return { ...h, qty, price, value };
    });
    const validPositions = positions.filter((p) => p.value > 0);
    const totalValue = validPositions.reduce((s, p) => s + p.value, 0);
    if (totalValue <= 0) return null;

    const positionsWithShare = validPositions.map((p) => ({
      ...p, share: (p.value / totalValue) * 100,
    })).sort((a, b) => b.value - a.value);

    // Chain breakdown
    const chains: Record<string, number> = {};
    positionsWithShare.forEach((p) => {
      chains[p.chain] = (chains[p.chain] || 0) + p.value;
    });
    const chainBreakdown = Object.entries(chains)
      .map(([chain, value]) => ({ chain, value, share: (value / totalValue) * 100 }))
      .sort((a, b) => b.value - a.value);

    // Stablecoin vs volatile
    const stables = ['USDC', 'USDT', 'DAI', 'TUSD', 'BUSD', 'FRAX', 'USDY', 'PYUSD'];
    const stableValue = positionsWithShare
      .filter((p) => stables.includes(p.token.toUpperCase()))
      .reduce((s, p) => s + p.value, 0);
    const volatileValue = totalValue - stableValue;
    const stablePct = (stableValue / totalValue) * 100;

    // Concentration HHI
    const hhi = positionsWithShare.reduce((s, p) => s + Math.pow(p.share, 2), 0);
    const concentration = hhi < 1500 ? 'Diversified' : hhi < 2500 ? 'Moderate' : 'Concentrated';

    // Top holdings
    const top1 = positionsWithShare[0];
    const top3Pct = positionsWithShare.slice(0, 3).reduce((s, p) => s + p.share, 0);

    let zone: 'profit' | 'neutral' | 'loss' = 'neutral';
    let rating = '';
    if (totalValue > 100000) { zone = 'profit'; rating = 'Whale tier'; }
    else if (totalValue > 10000) { zone = 'profit'; rating = 'Solid stack'; }
    else if (totalValue > 1000) { zone = 'neutral'; rating = 'Building up'; }
    else { zone = 'neutral'; rating = 'Small wallet'; }

    return {
      totalValue, positions: positionsWithShare, chainBreakdown,
      stableValue, volatileValue, stablePct, hhi, concentration,
      top1, top3Pct, zone, rating, count: positionsWithShare.length, chainCount: chainBreakdown.length,
    };
  }, [holdings]);

  const reset = () => applyPreset(1);

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
              {PRESETS.map((p, i) => (
                <button key={p.label}
                  className="pill-btn"
                  onClick={() => applyPreset(i)}>
                  {getUiString(lang, p.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Wallet Holdings')}</label>
            {holdings.map((h, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '6px', marginBottom: '8px', alignItems: 'center' }}>
                <input type="text" value={h.chain} placeholder={getUiString(lang, 'Chain')}
                  onChange={(e) => updateHolding(i, 'chain', e.target.value)} />
                <input type="text" value={h.token} placeholder={getUiString(lang, 'Token')}
                  onChange={(e) => updateHolding(i, 'token', e.target.value)} />
                <input type="number" inputMode="decimal" value={h.qty} placeholder={getUiString(lang, 'Quantity')}
                  onChange={(e) => updateHolding(i, 'qty', e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
                <input type="number" inputMode="decimal" value={h.price} placeholder={getUiString(lang, 'Price USD')}
                  onChange={(e) => updateHolding(i, 'price', e.target.value)} min="0" step="any"
                  onFocus={(e) => e.target.select()} />
                <button onClick={() => removeHolding(i)} className="portfolio-asset-remove"
                  aria-label={getUiString(lang, 'Remove')}>×</button>
              </div>
            ))}
            <button onClick={addHolding} className="reset-btn" style={{ marginTop: '4px' }}>
              + {getUiString(lang, 'Add Holding')}
            </button>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Enter your wallet holdings manually. For live multi-chain pricing, use Zerion, DeBank, or Zapper. This calc tracks net worth and concentration.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.zone}`}>
                <span className="result-hero-label">{getUiString(lang, 'Total Net Worth')}</span>
                <span className="result-hero-value"><Coins size={28} />
                  {formatUSD(result.totalValue)}
                </span>
                <span className={`result-hero-roi ${result.zone}`}>
                  {result.count} {getUiString(lang, 'positions across')} {result.chainCount} {getUiString(lang, 'chains')} · {getUiString(lang, result.rating)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Largest holding')}</span>
                  <span className="result-value">
                    {result.top1.token} ({result.top1.share.toFixed(1)}%) · {formatUSD(result.top1.value)}
                  </span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Top-3 concentration')}</span>
                  <span className="result-value">{result.top3Pct.toFixed(1)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Concentration (HHI)')}</span>
                  <span className="result-value">{Math.round(result.hhi)} ({getUiString(lang, result.concentration)})</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Stablecoin value')}</span>
                  <span className="result-value">{formatUSD(result.stableValue)} ({result.stablePct.toFixed(1)}%)</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Volatile asset value')}</span>
                  <span className="result-value">{formatUSD(result.volatileValue)} ({(100 - result.stablePct).toFixed(1)}%)</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label" style={{ fontWeight: 600 }}>{getUiString(lang, 'Top holdings')}</span>
                  <span className="result-value"></span>
                </div>
                {result.positions.slice(0, 10).map((p, idx) => (
                  <div key={`${p.token}-${idx}`} className="result-row">
                    <span className="result-label">
                      {idx + 1}. {p.token} ({p.chain})
                    </span>
                    <span className="result-value">
                      {formatUSD(p.value)} ({p.share.toFixed(1)}%)
                    </span>
                  </div>
                ))}
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label" style={{ fontWeight: 600 }}>{getUiString(lang, 'Per-chain breakdown')}</span>
                  <span className="result-value"></span>
                </div>
                {result.chainBreakdown.map((c) => (
                  <div key={c.chain} className="result-row">
                    <span className="result-label">{c.chain}</span>
                    <span className="result-value">{formatUSD(c.value)} ({c.share.toFixed(1)}%)</span>
                  </div>
                ))}
              </div>

              <p className="calc-disclaimer"><Info size={14} />
                {getUiString(lang, 'Public wallet addresses are visible on-chain — anyone can track your holdings. Use multiple wallets, hardware storage, and avoid linking to KYC accounts where possible.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Wallet size={40} /></div>
              <h2>{getUiString(lang, 'Enter valid inputs')}</h2>
              <p>{getUiString(lang, 'Add at least one holding with positive quantity and price.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(WalletNetWorthCalculator);
