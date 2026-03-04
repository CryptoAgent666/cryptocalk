import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ArrowRightLeft, Info, RotateCcw, Shield } from 'lucide-react';

interface BridgeDef {
  name: string;
  feePercent: number;
  fixedFee: number;
  avgMinutes: number;
  securityScore: number;
  maxAmount: number;
}

const BRIDGES: BridgeDef[] = [
  { name: 'Across', feePercent: 0.04, fixedFee: 0.7, avgMinutes: 3, securityScore: 4.6, maxAmount: 500000 },
  { name: 'Stargate', feePercent: 0.06, fixedFee: 1.2, avgMinutes: 5, securityScore: 4.5, maxAmount: 750000 },
  { name: 'Hop', feePercent: 0.08, fixedFee: 0.9, avgMinutes: 8, securityScore: 4.3, maxAmount: 250000 },
  { name: 'Synapse', feePercent: 0.09, fixedFee: 1.1, avgMinutes: 6, securityScore: 4.2, maxAmount: 200000 },
  { name: 'LayerZero OFT', feePercent: 0.05, fixedFee: 1.5, avgMinutes: 10, securityScore: 4.7, maxAmount: 1000000 },
];

const CHAINS = ['Ethereum', 'Arbitrum', 'Optimism', 'Base', 'Polygon', 'BSC'];

function formatUSD(value: number): string {
  return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BridgeComparator({ lang = 'en' }: { lang?: string }) {
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Arbitrum');
  const [token, setToken] = useState('USDC');
  const [amount, setAmount] = useState('1000');

  const results = useMemo(() => {
    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0 || fromChain === toChain) return [];

    const sourceGas = fromChain === 'Ethereum' ? 4.5 : 0.8;
    const destinationGas = toChain === 'Ethereum' ? 3.5 : 0.6;

    return BRIDGES.map((bridge) => {
      const protocolFee = amountNum * (bridge.feePercent / 100) + bridge.fixedFee;
      const networkFee = sourceGas + destinationGas;
      const totalFee = protocolFee + networkFee;
      const received = Math.max(0, amountNum - totalFee);

      return {
        ...bridge,
        protocolFee,
        networkFee,
        totalFee,
        received,
        feePercentEffective: (totalFee / amountNum) * 100,
      };
    }).sort((a, b) => a.totalFee - b.totalFee);
  }, [amount, fromChain, toChain]);

  const best = results[0];

  const reset = () => {
    setFromChain('Ethereum');
    setToChain('Arbitrum');
    setToken('USDC');
    setAmount('1000');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label><ArrowRightLeft size={14} /> Route</label>
            <div className="toggle-group" style={{ marginBottom: '8px' }}>
              <button className="toggle-btn active" type="button">From</button>
              <button className="toggle-btn" type="button">To</button>
            </div>
            <div className="select-wrap" style={{ marginBottom: '8px' }}>
              <select className="input-select" value={fromChain} onChange={(e) => setFromChain(e.target.value)} id="bridge-from">
                {CHAINS.map((chain) => <option key={`from-${chain}`} value={chain}>{chain}</option>)}
              </select>
            </div>
            <div className="select-wrap">
              <select className="input-select" value={toChain} onChange={(e) => setToChain(e.target.value)} id="bridge-to">
                {CHAINS.map((chain) => <option key={`to-${chain}`} value={chain}>{chain}</option>)}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Token</label>
            <div className="pills-row">
              {['USDC', 'USDT', 'ETH', 'DAI'].map((symbol) => (
                <button
                  key={symbol}
                  className={`pill-btn ${token === symbol ? 'active' : ''}`}
                  onClick={() => setToken(symbol)}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Amount</label>
            <div className="input-with-prefix">
              <input
                type="number" inputMode="decimal"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="bridge-amount"
               onFocus={(e) => e.target.select()} />
              <span className="input-unit">{token}</span>
            </div>
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="calc-results-panel">
          {results.length > 0 ? (
            <>
              <div className="result-hero profit">
                <span className="result-hero-label">{getUiString(lang, 'Best Route')}</span>
                <span className="result-hero-value">
                  <Shield size={28} />
                  {best.name}
                </span>
                <span className="result-hero-roi profit">
                  {getUiString(lang, 'Total fee')} {formatUSD(best.totalFee)} ({best.feePercentEffective.toFixed(2)}%)
                </span>
              </div>

              <div className="result-breakdown">
                {results.map((row) => (
                  <div key={row.name} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div className="result-row">
                      <span className="result-label"><strong>{row.name}</strong></span>
                      <span className="result-value">{formatUSD(row.received)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Protocol fee')}</span>
                      <span className="result-value fee">-{formatUSD(row.protocolFee)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Network fee')}</span>
                      <span className="result-value fee">-{formatUSD(row.networkFee)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'ETA')}</span>
                      <span className="result-value">~{row.avgMinutes} {getUiString(lang, 'min')}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">{getUiString(lang, 'Security score')}</span>
                      <span className="result-value">{row.securityScore.toFixed(1)} / 5</span>
                    </div>
                  </div>
                ))}
              </div><p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'Fees and speed are estimates for comparison. Always verify current route quotes on the bridge before sending funds.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
              <h3>{getUiString(lang, 'Select two different networks')}</h3>
              <p>{getUiString(lang, 'Choose source and destination chains to compare bridge routes.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
