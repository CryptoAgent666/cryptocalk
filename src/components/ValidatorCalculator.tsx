import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ChevronDown, Info, RotateCcw, Server, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface NetworkConfig {
  name: string;
  ticker: string;
  defaultApy: number;
  defaultPrice: number;
  minStake: number;
  defaultHardware: number;
  slashRisk: string;
}

const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: { name: 'Ethereum', ticker: 'ETH', defaultApy: 3.5, defaultPrice: 2400, minStake: 32, defaultHardware: 50, slashRisk: 'Medium' },
  solana: { name: 'Solana', ticker: 'SOL', defaultApy: 7.0, defaultPrice: 140, minStake: 1, defaultHardware: 300, slashRisk: 'Low' },
  polkadot: { name: 'Polkadot', ticker: 'DOT', defaultApy: 14.0, defaultPrice: 5, minStake: 250, defaultHardware: 30, slashRisk: 'Medium' },
  cosmos: { name: 'Cosmos', ticker: 'ATOM', defaultApy: 18.0, defaultPrice: 7, minStake: 1, defaultHardware: 20, slashRisk: 'Low' },
  avalanche: { name: 'Avalanche', ticker: 'AVAX', defaultApy: 8.0, defaultPrice: 28, minStake: 2000, defaultHardware: 100, slashRisk: 'Low' },
};

const SCENARIOS = [
  {
    label: 'ETH 32 Solo',
    network: 'ethereum',
    stakeAmount: '32',
    tokenPrice: '2400',
    apy: '3.5',
    hardwareCost: '50',
    commission: '0',
    uptime: '99.5',
  },
  {
    label: 'SOL Validator',
    network: 'solana',
    stakeAmount: '50000',
    tokenPrice: '140',
    apy: '7',
    hardwareCost: '300',
    commission: '8',
    uptime: '99',
  },
  {
    label: 'DOT Nominator',
    network: 'polkadot',
    stakeAmount: '5000',
    tokenPrice: '5',
    apy: '14',
    hardwareCost: '0',
    commission: '10',
    uptime: '100',
  },
] as const;

function ValidatorCalculator({ lang = 'en' }: { lang?: string }) {
  const fmtUSD = (value: number): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(value);

  const fmtNum = (value: number, digits = 2): string =>
    new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      minimumFractionDigits: digits, maximumFractionDigits: digits,
    }).format(value);

  const [network, setNetwork] = useState('ethereum');
  const [stakeAmount, setStakeAmount] = useState('32');
  const [tokenPrice, setTokenPrice] = useState('2400');
  const [apy, setApy] = useState('3.5');
  const [hardwareCost, setHardwareCost] = useState('50');
  const [commission, setCommission] = useState('0');
  const [uptime, setUptime] = useState('99.5');

  const config = NETWORKS[network];

  const applyScenario = (s: (typeof SCENARIOS)[number]) => {
    setNetwork(s.network); setStakeAmount(s.stakeAmount); setTokenPrice(s.tokenPrice);
    setApy(s.apy); setHardwareCost(s.hardwareCost); setCommission(s.commission); setUptime(s.uptime);
  };

  const isActive = (s: (typeof SCENARIOS)[number]) =>
    network === s.network && stakeAmount === s.stakeAmount && tokenPrice === s.tokenPrice &&
    apy === s.apy && hardwareCost === s.hardwareCost && commission === s.commission && uptime === s.uptime;

  const handleNetworkChange = (net: string) => {
    setNetwork(net);
    const c = NETWORKS[net];
    setTokenPrice(String(c.defaultPrice));
    setApy(String(c.defaultApy));
    setHardwareCost(String(c.defaultHardware));
    setStakeAmount(String(c.minStake));
  };

  const result = useMemo(() => {
    const stake = parseFloat(stakeAmount) || 0;
    const price = parseFloat(tokenPrice) || 0;
    const annualRate = (parseFloat(apy) || 0) / 100;
    const hardware = (parseFloat(hardwareCost) || 0) * 12;
    const comm = (parseFloat(commission) || 0) / 100;
    const up = (parseFloat(uptime) || 0) / 100;

    if (stake <= 0 || price <= 0 || annualRate <= 0) return null;

    const grossRewardsTokens = stake * annualRate * up;
    const netRewardsTokens = grossRewardsTokens * (1 - comm);
    const grossRewardsUSD = grossRewardsTokens * price;
    const netRewardsUSD = netRewardsTokens * price;
    const operatingCosts = hardware;
    const netProfit = netRewardsUSD - operatingCosts;
    const stakeValueUSD = stake * price;
    const roi = stakeValueUSD > 0 ? (netProfit / stakeValueUSD) * 100 : 0;
    const monthlyNetProfit = netProfit / 12;
    const breakEven = monthlyNetProfit > 0 ? operatingCosts / monthlyNetProfit : Infinity;

    const delegateApy = annualRate * (1 - 0.10) * 100;
    const delegateRewardsUSD = stake * (delegateApy / 100) * price;

    return {
      grossRewardsTokens, netRewardsTokens, grossRewardsUSD, netRewardsUSD,
      operatingCosts, netProfit, roi, breakEvenMonths: breakEven,
      stakeValueUSD, delegateApy, delegateRewardsUSD,
    };
  }, [stakeAmount, tokenPrice, apy, hardwareCost, commission, uptime]);

  const reset = () => {
    setNetwork('ethereum'); setStakeAmount('32'); setTokenPrice('2400');
    setApy('3.5'); setHardwareCost('50'); setCommission('0'); setUptime('99.5');
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
            <label htmlFor="val-network">{getUiString(lang, 'Network')}</label>
            <div className="select-wrap">
              <select id="val-network" value={network} onChange={(e) => handleNetworkChange(e.target.value)} className="select-input">
                {Object.entries(NETWORKS).map(([key, n]) => (
                  <option key={key} value={key}>{n.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="select-icon" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="val-stake">{getUiString(lang, 'Stake Amount')} ({config.ticker})</label>
            <input type="number" inputMode="decimal" id="val-stake" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="val-price">{getUiString(lang, 'Token Price (USD)')}</label>
            <input type="number" inputMode="decimal" id="val-price" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="val-apy">{getUiString(lang, 'Annual Rewards APY (%)')}</label>
            <input type="number" inputMode="decimal" id="val-apy" value={apy} onChange={(e) => setApy(e.target.value)} min="0" step="0.1" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="val-hardware">{getUiString(lang, 'Hardware Cost ($/month)')}</label>
            <input type="number" inputMode="decimal" id="val-hardware" value={hardwareCost} onChange={(e) => setHardwareCost(e.target.value)} min="0" step="any" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="val-commission">{getUiString(lang, 'Commission Rate (%)')}</label>
            <input type="number" inputMode="decimal" id="val-commission" value={commission} onChange={(e) => setCommission(e.target.value)} min="0" max="100" step="0.1" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="val-uptime">{getUiString(lang, 'Uptime (%)')}</label>
            <input type="number" inputMode="decimal" id="val-uptime" value={uptime} onChange={(e) => setUptime(e.target.value)} min="0" max="100" step="0.1" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">{getUiString(lang, 'Auto-calculates as you type. Commission rate applies to delegators\' rewards; set 0% for solo staking.')}</span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netProfit >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Annual Net Profit')}</span>
                <span className="result-hero-value"><Server size={28} />{fmtUSD(result.netProfit)}</span>
                <span className={`result-hero-roi ${result.roi >= 0 ? 'profit' : 'loss'}`}>{result.roi >= 0 ? '+' : ''}{fmtNum(result.roi)}% ROI</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross Rewards')}</span><span className="result-value">{fmtNum(result.grossRewardsTokens, 4)} {config.ticker} ({fmtUSD(result.grossRewardsUSD)})</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Net Rewards (after commission)')}</span><span className="result-value">{fmtNum(result.netRewardsTokens, 4)} {config.ticker}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Operating Costs (annual)')}</span><span className="result-value fee">{fmtUSD(result.operatingCosts)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Stake Value')}</span><span className="result-value">{fmtUSD(result.stakeValueUSD)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Break-Even')}</span><span className="result-value">{Number.isFinite(result.breakEvenMonths) ? `${fmtNum(result.breakEvenMonths, 1)} ${getUiString(lang, 'months')}` : '—'}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Slashing Risk')}</span><span className="result-value">{getUiString(lang, NETWORKS[network].slashRisk)}</span></div>
              </div>

              <div className="result-breakdown" style={{ marginTop: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>{getUiString(lang, 'Self-Stake vs Delegate')}</h4>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Self-Stake Net Profit')}</span><span className="result-value profit">{fmtUSD(result.netProfit)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Delegate Rewards (10% fee)')}</span><span className="result-value">{fmtUSD(result.delegateRewardsUSD)}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Validator economics depend on network conditions, token price, and uptime. Slashing can result in loss of staked tokens. This is an estimate, not a guarantee.')}</p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><TrendingUp size={40} /></div>
              <h3>{getUiString(lang, 'Configure Validator Setup')}</h3>
              <p>{getUiString(lang, 'Select a network, enter stake amount and costs to estimate validator profitability.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(ValidatorCalculator);
