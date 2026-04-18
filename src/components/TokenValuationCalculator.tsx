import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ChevronDown, Coins, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface ComparableProject {
  name: string;
  marketCap: number;
  fdv: number;
  price: number;
  supply: number;
}

const COMPARABLES: Record<string, ComparableProject> = {
  ethereum: { name: 'Ethereum', marketCap: 290e9, fdv: 290e9, price: 2400, supply: 120e6 },
  solana: { name: 'Solana', marketCap: 65e9, fdv: 82e9, price: 140, supply: 585e6 },
  arbitrum: { name: 'Arbitrum', marketCap: 2.5e9, fdv: 8e9, price: 0.75, supply: 10e9 },
  optimism: { name: 'Optimism', marketCap: 2e9, fdv: 7.5e9, price: 1.5, supply: 5e9 },
  uniswap: { name: 'Uniswap', marketCap: 5.5e9, fdv: 5.5e9, price: 9, supply: 1e9 },
  aave: { name: 'Aave', marketCap: 3e9, fdv: 3.2e9, price: 200, supply: 16e6 },
  doge: { name: 'Dogecoin', marketCap: 24e9, fdv: 24e9, price: 0.17, supply: 144e9 },
  shib: { name: 'Shiba Inu', marketCap: 8e9, fdv: 8e9, price: 0.000014, supply: 589e12 },
};

const SCENARIOS = [
  {
    label: 'New L2 Token',
    totalSupply: '10000000000',
    circulatingSupply: '2000000000',
    tokenPrice: '0.5',
    targetMarketCap: '5000000000',
    comparable: 'arbitrum',
    revenue: '50000000',
    peRatio: '100',
  },
  {
    label: 'DeFi Protocol',
    totalSupply: '100000000',
    circulatingSupply: '60000000',
    tokenPrice: '15',
    targetMarketCap: '3000000000',
    comparable: 'aave',
    revenue: '80000000',
    peRatio: '40',
  },
  {
    label: 'Meme Coin',
    totalSupply: '1000000000000',
    circulatingSupply: '800000000000',
    tokenPrice: '0.00001',
    targetMarketCap: '10000000000',
    comparable: 'doge',
    revenue: '',
    peRatio: '',
  },
] as const;

function TokenValuationCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (value: number): string => {
    if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(2)}K`;
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6,
    }).format(value);
  };

  const fmtNum = (value: number, digits = 2): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      minimumFractionDigits: digits, maximumFractionDigits: digits,
    }).format(value);

  const fmtPrice = (value: number): string => {
    const digits = value < 0.001 ? 8 : value < 1 ? 6 : value < 100 ? 4 : 2;
    return `$${fmtNum(value, digits)}`;
  };

  const [totalSupply, setTotalSupply] = useState('10000000000');
  const [circulatingSupply, setCirculatingSupply] = useState('2000000000');
  const [tokenPrice, setTokenPrice] = useState('0.5');
  const [targetMarketCap, setTargetMarketCap] = useState('5000000000');
  const [comparable, setComparable] = useState('arbitrum');
  const [revenue, setRevenue] = useState('50000000');
  const [peRatio, setPeRatio] = useState('100');

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setTotalSupply(s.totalSupply); setCirculatingSupply(s.circulatingSupply);
    setTokenPrice(s.tokenPrice); setTargetMarketCap(s.targetMarketCap);
    setComparable(s.comparable); setRevenue(s.revenue); setPeRatio(s.peRatio);
  };

  const isActive = (s: (typeof SCENARIOS)[number]) =>
    totalSupply === s.totalSupply && circulatingSupply === s.circulatingSupply &&
    tokenPrice === s.tokenPrice && targetMarketCap === s.targetMarketCap &&
    comparable === s.comparable && revenue === s.revenue && peRatio === s.peRatio;

  const comp = COMPARABLES[comparable];

  const result = useMemo(() => {
    const total = parseFloat(totalSupply) || 0;
    const circ = parseFloat(circulatingSupply) || 0;
    const price = parseFloat(tokenPrice) || 0;
    const target = parseFloat(targetMarketCap) || 0;
    const rev = parseFloat(revenue) || 0;
    const pe = parseFloat(peRatio) || 0;

    if (total <= 0 || circ <= 0 || price <= 0) return null;

    const marketCap = circ * price;
    const fdv = total * price;
    const mcFdvRatio = marketCap / fdv;
    const priceAtTarget = circ > 0 ? target / circ : 0;
    const requiredGrowth = marketCap > 0 ? ((target - marketCap) / marketCap) * 100 : 0;
    const impliedPE = rev > 0 && marketCap > 0 ? marketCap / rev : null;
    const peValuation = rev > 0 && pe > 0 ? rev * pe : null;
    const peImpliedPrice = peValuation && circ > 0 ? peValuation / circ : null;

    const compPriceIfSameMC = comp && circ > 0 ? comp.marketCap / circ : null;
    const compGrowth = compPriceIfSameMC && price > 0 ? ((compPriceIfSameMC - price) / price) * 100 : null;

    return {
      marketCap, fdv, mcFdvRatio, priceAtTarget, requiredGrowth,
      impliedPE, peValuation, peImpliedPrice, compPriceIfSameMC, compGrowth,
      dilutionRisk: (1 - mcFdvRatio) * 100,
    };
  }, [totalSupply, circulatingSupply, tokenPrice, targetMarketCap, revenue, peRatio, comp]);

  const reset = () => {
    setTotalSupply('10000000000'); setCirculatingSupply('2000000000');
    setTokenPrice('0.5'); setTargetMarketCap('5000000000');
    setComparable('arbitrum'); setRevenue('50000000'); setPeRatio('100');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="tv-total">{getUiString(lang, 'Total Supply')}</label>
            <input type="number" inputMode="decimal" id="tv-total" value={totalSupply} onChange={(e) => setTotalSupply(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="tv-circ">{getUiString(lang, 'Circulating Supply')}</label>
            <input type="number" inputMode="decimal" id="tv-circ" value={circulatingSupply} onChange={(e) => setCirculatingSupply(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="tv-price">{getUiString(lang, 'Token Price (USD)')}</label>
            <input type="number" inputMode="decimal" id="tv-price" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="tv-target">{getUiString(lang, 'Target Market Cap (USD)')}</label>
            <input type="number" inputMode="decimal" id="tv-target" value={targetMarketCap} onChange={(e) => setTargetMarketCap(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="tv-comp">{getUiString(lang, 'Comparable Project')}</label>
            <div className="select-wrap">
              <select id="tv-comp" value={comparable} onChange={(e) => setComparable(e.target.value)} className="select-input">
                {Object.entries(COMPARABLES).map(([key, c]) => (
                  <option key={key} value={key}>{c.name} ({fmtUSD(c.marketCap)})</option>
                ))}
              </select>
              <ChevronDown size={14} className="select-icon" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="tv-revenue">{getUiString(lang, 'Annual Revenue (USD, optional)')}</label>
            <input type="number" inputMode="decimal" id="tv-revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="tv-pe">{getUiString(lang, 'P/E Ratio (optional)')}</label>
            <input type="number" inputMode="decimal" id="tv-pe" value={peRatio} onChange={(e) => setPeRatio(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Revenue and P/E ratio are optional for fundamental valuation.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero">
                <span className="result-hero-label">{getUiString(lang, 'Market Cap')}</span>
                <span className="result-hero-value"><Coins size={28} />{fmtUSD(result.marketCap)}</span>
                <span className="result-hero-roi">FDV: {fmtUSD(result.fdv)}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'MC / FDV Ratio')}</span><span className="result-value">{fmtNum(result.mcFdvRatio * 100)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Dilution Risk')}</span><span className={`result-value ${result.dilutionRisk > 50 ? 'fee' : ''}`}>{fmtNum(result.dilutionRisk)}%</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Price at Target MC')}</span><span className="result-value profit">{fmtPrice(result.priceAtTarget)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Required Growth')}</span><span className={`result-value ${result.requiredGrowth >= 0 ? 'profit' : 'loss'}`}>{result.requiredGrowth >= 0 ? '+' : ''}{fmtNum(result.requiredGrowth)}%</span></div>

                {result.impliedPE !== null && (
                  <>
                    <div className="result-divider" />
                    <div className="result-row"><span className="result-label">{getUiString(lang, 'Implied P/E')}</span><span className="result-value">{fmtNum(result.impliedPE, 1)}x</span></div>
                  </>
                )}
                {result.peImpliedPrice !== null && (
                  <div className="result-row"><span className="result-label">{getUiString(lang, 'P/E Implied Price')}</span><span className="result-value">{fmtPrice(result.peImpliedPrice)}</span></div>
                )}
              </div>

              {result.compPriceIfSameMC !== null && (
                <div className="result-breakdown" style={{ marginTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>{getUiString(lang, 'Comparable Analysis')}: {comp.name}</h4>
                  <div className="result-row"><span className="result-label">{comp.name} {getUiString(lang, 'Market Cap')}</span><span className="result-value">{fmtUSD(comp.marketCap)}</span></div>
                  <div className="result-row"><span className="result-label">{getUiString(lang, 'Your Price at')} {comp.name} MC</span><span className="result-value">{fmtPrice(result.compPriceIfSameMC)}</span></div>
                  {result.compGrowth !== null && (
                    <div className="result-row"><span className="result-label">{getUiString(lang, 'Growth to Match')}</span><span className={`result-value ${result.compGrowth >= 0 ? 'profit' : 'loss'}`}>{result.compGrowth >= 0 ? '+' : ''}{fmtNum(result.compGrowth)}%</span></div>
                  )}
                </div>
              )}

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Token valuations are speculative. Market cap and FDV do not reflect liquidity or realizable value. Always do your own research.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter Token Details')}</h3>
              <p>{getUiString(lang, 'Provide supply, price, and target market cap to analyze token valuation and compare with existing projects.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(TokenValuationCalculator);
