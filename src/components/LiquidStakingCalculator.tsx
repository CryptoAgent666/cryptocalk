import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Droplets, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const PROTOCOLS = ['Lido', 'Rocket Pool', 'Coinbase', 'Frax'] as const;
type Protocol = (typeof PROTOCOLS)[number];

// APYs updated 2026-05-03 (post-cycle ETH staking yields normalized).
const PROTOCOL_DEFAULTS: Record<Protocol, { apy: number; fee: number; premium: number }> = {
  Lido: { apy: 2.9, fee: 10, premium: -0.05 },
  'Rocket Pool': { apy: 2.8, fee: 14, premium: 0.1 },
  Coinbase: { apy: 2.5, fee: 25, premium: -0.2 },
  Frax: { apy: 3.2, fee: 10, premium: 0.15 },
};

const SCENARIOS = [
  { label: 'Lido 10 ETH', ethAmount: '10', duration: '365', protocol: 'Lido' as Protocol },
  { label: 'Rocket Pool 32 ETH', ethAmount: '32', duration: '365', protocol: 'Rocket Pool' as Protocol },
  { label: 'Quick Stake 1 ETH', ethAmount: '1', duration: '90', protocol: 'Lido' as Protocol },
] as const;

function LiquidStakingCalculator({ lang = 'en' }: { lang?: string }) {
  const fmt = (v: number, d = 4) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const fmtPct = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%`;

  const [ethAmount, setEthAmount] = useState('10');
  const [duration, setDuration] = useState('365');
  const [protocol, setProtocol] = useState<Protocol>('Lido');
  const [nativeApy, setNativeApy] = useState('3.5');
  const [protocolFee, setProtocolFee] = useState('10');
  const [lstPremium, setLstPremium] = useState('-0.05');
  const [defiApy, setDefiApy] = useState('5');

  const applyProtocol = (p: Protocol) => {
    setProtocol(p);
    setNativeApy(String(PROTOCOL_DEFAULTS[p].apy));
    setProtocolFee(String(PROTOCOL_DEFAULTS[p].fee));
    setLstPremium(String(PROTOCOL_DEFAULTS[p].premium));
  };

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setEthAmount(s.ethAmount);
    setDuration(s.duration);
    applyProtocol(s.protocol);
  };

  const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
    ethAmount === s.ethAmount && duration === s.duration && protocol === s.protocol;

  const result = useMemo(() => {
    const eth = parseFloat(ethAmount) || 0;
    const days = parseFloat(duration) || 0;
    const apy = parseFloat(nativeApy) || 0;
    const fee = parseFloat(protocolFee) || 0;
    const prem = parseFloat(lstPremium) || 0;
    const defi = parseFloat(defiApy) || 0;
    if (eth <= 0 || days <= 0) return null;

    const yearFrac = days / 365;
    const grossYield = eth * (apy / 100) * yearFrac;
    const feeCost = grossYield * (fee / 100);
    const netYield = grossYield - feeCost;
    const netApy = apy * (1 - fee / 100);
    const lstTokens = eth * (1 + prem / 100);
    const defiValue = eth * (defi / 100) * yearFrac;

    const comparison = PROTOCOLS.map((p) => {
      const d = PROTOCOL_DEFAULTS[p];
      const gy = eth * (d.apy / 100) * yearFrac;
      const fc = gy * (d.fee / 100);
      const ny = gy - fc;
      const na = d.apy * (1 - d.fee / 100);
      const lt = eth * (1 + d.premium / 100);
      return { protocol: p, grossYield: gy, feeCost: fc, netYield: ny, netApy: na, lstTokens: lt };
    });

    return { grossYield, feeCost, netYield, netApy, lstTokens, defiValue, comparison };
  }, [ethAmount, duration, nativeApy, protocolFee, lstPremium, defiApy]);

  const reset = () => {
    setEthAmount('10'); setDuration('365');
    applyProtocol('Lido'); setDefiApy('5');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {SCENARIOS.map((s) => (
                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`} onClick={() => applyScenario(s)}>
                  {getUiString(lang, s.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ls-eth">{getUiString(lang, 'ETH Amount')}</label>
            <input type="number" inputMode="decimal" value={ethAmount} onChange={(e) => setEthAmount(e.target.value)} min="0" step="any" id="ls-eth" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ls-duration">{getUiString(lang, 'Staking Duration (days)')}</label>
            <div className="pills-row">
              {[30, 90, 180, 365].map((d) => (
                <button key={d} className={`pill-btn ${duration === String(d) ? 'active' : ''}`} onClick={() => setDuration(String(d))}>{d}d</button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" step="1" id="ls-duration" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Protocol')}</label>
            <div className="pills-row">
              {PROTOCOLS.map((p) => (
                <button key={p} className={`pill-btn ${protocol === p ? 'active' : ''}`} onClick={() => applyProtocol(p)}>{p}</button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="ls-apy">{getUiString(lang, 'Native APY (%)')}</label>
            <input type="number" inputMode="decimal" value={nativeApy} onChange={(e) => setNativeApy(e.target.value)} min="0" step="any" id="ls-apy" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ls-fee">{getUiString(lang, 'Protocol Fee (%)')}</label>
            <input type="number" inputMode="decimal" value={protocolFee} onChange={(e) => setProtocolFee(e.target.value)} min="0" step="any" id="ls-fee" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ls-premium">{getUiString(lang, 'LST Premium/Discount (%)')}</label>
            <input type="number" inputMode="decimal" value={lstPremium} onChange={(e) => setLstPremium(e.target.value)} step="any" id="ls-premium" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="ls-defi">{getUiString(lang, 'DeFi Composability APY (%)')}</label>
            <input type="number" inputMode="decimal" value={defiApy} onChange={(e) => setDefiApy(e.target.value)} min="0" step="any" id="ls-defi" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Compare liquid staking protocols side by side.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className="result-hero profit">
                <span className="result-hero-label">{getUiString(lang, 'Net Staking Yield')}</span>
                <span className="result-hero-value"><Droplets size={28} />{fmt(result.netYield)} ETH</span>
                <span className="result-hero-roi profit">{fmtPct(result.netApy)} {getUiString(lang, 'Net APY')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross Staking Yield')}</span><span className="result-value">{fmt(result.grossYield)} ETH</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Protocol Fee Cost')}</span><span className="result-value loss">-{fmt(result.feeCost)} ETH</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'LST Tokens Received')}</span><span className="result-value">{fmt(result.lstTokens)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'DeFi Composability Value')}</span><span className="result-value profit">+{fmt(result.defiValue)} ETH</span></div>
              </div>

              <h4 style={{ margin: '1rem 0 0.5rem', fontWeight: 600 }}>{getUiString(lang, 'Protocol Comparison')}</h4>
              <div className="result-breakdown">
                {result.comparison.map((row) => (
                  <div key={row.protocol} className="result-row" style={{ flexWrap: 'wrap', gap: '0.25rem' }}>
                    <span className="result-label" style={{ fontWeight: row.protocol === protocol ? 700 : 400 }}>{row.protocol}</span>
                    <span className="result-value">{fmtPct(row.netApy)} &middot; {fmt(row.netYield)} ETH</span>
                  </div>
                ))}
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'APY rates fluctuate. Protocol fees and LST premiums change with market conditions. Not financial advice.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Enter staking parameters')}</h3>
              <p>{getUiString(lang, 'Set ETH amount and duration to compare liquid staking protocols.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(LiquidStakingCalculator);
