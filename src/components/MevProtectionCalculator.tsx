import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { AlertTriangle, Info, RotateCcw, Shield } from 'lucide-react';

type Network = 'Ethereum' | 'Arbitrum' | 'Base' | 'BSC';

const SWAP_AMOUNT_PRESETS = [1000, 5000, 10000, 25000];
const SLIPPAGE_PRESETS = [0.5, 1, 2, 3];
const MEV_SCENARIOS = [
  { label: 'Retail Swap', swapAmount: '1000', slippage: '0.5', network: 'Arbitrum', dex: 'Uniswap' },
  { label: 'Large ETH', swapAmount: '10000', slippage: '1', network: 'Ethereum', dex: 'Uniswap' },
  { label: 'Stable Route', swapAmount: '25000', slippage: '0.5', network: 'Ethereum', dex: 'Curve' },
] as const;



const networkRisk: Record<Network, number> = {
  Ethereum: 1,
  Arbitrum: 0.7,
  Base: 0.65,
  BSC: 0.8,
};

export default function MevProtectionCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value);
  const [swapAmount, setSwapAmount] = useState('5000');
  const [slippage, setSlippage] = useState('1');
  const [network, setNetwork] = useState<Network>('Ethereum');
  const [dex, setDex] = useState('Uniswap');
  const applyScenario = (scenario: (typeof MEV_SCENARIOS)[number]) => {
    setSwapAmount(scenario.swapAmount);
    setSlippage(scenario.slippage);
    setNetwork(scenario.network);
    setDex(scenario.dex);
  };
  const isScenarioActive = (scenario: (typeof MEV_SCENARIOS)[number]) => (
    swapAmount === scenario.swapAmount
    && slippage === scenario.slippage
    && network === scenario.network
    && dex === scenario.dex
  );

  const result = useMemo(() => {
    const amount = Number(swapAmount);
    const slip = Number(slippage);
    if (!Number.isFinite(amount) || !Number.isFinite(slip) || amount <= 0 || slip <= 0) return null;

    const netFactor = networkRisk[network];
    const dexFactor = dex.toLowerCase().includes('curve') ? 0.8 : 1;

    const riskScore = Math.min(100, slip * 18 * netFactor * dexFactor + (amount / 2000) * 4);
    const maxLossPct = Math.min(slip, 3.5) * 0.35 * netFactor * dexFactor;
    const estLoss = amount * (maxLossPct / 100);
    const protectedLoss = estLoss * 0.25;
    const savings = estLoss - protectedLoss;

    let level = 'Low';
    if (riskScore >= 65) level = 'High';
    else if (riskScore >= 35) level = 'Medium';

    return {
      riskScore,
      level,
      estLoss,
      protectedLoss,
      savings,
    };
  }, [swapAmount, slippage, network, dex]);

  const reset = () => {
    setSwapAmount('5000');
    setSlippage('1');
    setNetwork('Ethereum');
    setDex('Uniswap');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {MEV_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Swap Amount')}</label>
            <div className="pills-row">
              {SWAP_AMOUNT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${swapAmount === String(preset) ? 'active' : ''}`}
                  onClick={() => setSwapAmount(String(preset))}
                >
                  ${preset.toLocaleString('en-US')}
                </button>
              ))}
            </div>
            <div className="input-with-prefix"><input type="number" inputMode="decimal" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} min="0" step="any" id="mev-amount" onFocus={(e) => e.target.select()} /></div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'Slippage Tolerance (%)')}</label>
            <div className="pills-row">
              {SLIPPAGE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${slippage === String(preset) ? 'active' : ''}`}
                  onClick={() => setSlippage(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={slippage} onChange={(e) => setSlippage(e.target.value)} min="0.1" step="any" id="mev-slippage" onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'Network')}</label>
            <div className="pills-row">
              {(Object.keys(networkRisk) as Network[]).map((name) => (
                <button key={name} className={`pill-btn ${network === name ? 'active' : ''}`} onClick={() => setNetwork(name)}>
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'DEX')}</label>
            <div className="pills-row">
              {['Uniswap', 'PancakeSwap', 'Curve'].map((name) => (
                <button key={name} className={`pill-btn ${dex === name ? 'active' : ''}`} onClick={() => setDex(name)}>{name}</button>
              ))}
            </div>
          </div>
          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Lower slippage and private orderflow usually reduce MEV exposure.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.level === 'High' ? 'loss' : result.level === 'Medium' ? 'fee' : 'profit'}`}>
                <span className="result-hero-label">{getUiString(lang, 'MEV Risk Score')}</span>
                <span className="result-hero-value"><AlertTriangle size={28} />{result.riskScore.toFixed(0)} / 100</span>
                <span className={`result-hero-roi ${result.level === 'High' ? 'loss' : result.level === 'Medium' ? 'fee' : 'profit'}`}>{getUiString(lang, result.level)} {getUiString(lang, 'risk')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Estimated max MEV loss')}</span><span className="result-value fee">-{formatUSD(result.estLoss)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'With private orderflow')}</span><span className="result-value">{formatUSD(result.protectedLoss)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Potential savings')}</span><span className="result-value profit">{formatUSD(result.savings)}</span></div>
              </div><p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Model is heuristic and conservative. Real MEV impact depends on pool depth, mempool activity, and execution path.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><Shield size={40} /></div><h3>{getUiString(lang, 'Enter swap settings')}</h3><p>{getUiString(lang, 'Set amount, slippage, and network to estimate MEV exposure.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
