import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Info, RotateCcw, ServerCog, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const STAKED_TOKEN_PRESETS = [1000, 5000, 10000, 25000];
const TOKEN_PRICE_PRESETS = [1, 2.2, 5, 10];
const APR_PRESETS = [5, 8, 12, 20];
const VALIDATOR_FEE_PRESETS = [2, 5, 8, 10];
const UPTIME_PRESETS = [95, 98, 99, 99.9];
const INFRA_COST_PRESETS = [50, 120, 250, 500];
const NODE_SCENARIOS = [
  { label: 'Lean', stakedTokens: '3000', apr: '8', validatorFee: '10', uptime: '97', monthlyInfraCost: '50' },
  { label: 'Balanced', stakedTokens: '5000', apr: '12', validatorFee: '8', uptime: '98', monthlyInfraCost: '120' },
  { label: 'Pro', stakedTokens: '10000', apr: '20', validatorFee: '5', uptime: '99', monthlyInfraCost: '250' },
];



function NodeCalculator({ lang = 'en' }: { lang?: string }) {
  const locale = lang === 'en' ? 'en-US' : lang;
  const formatUSD = (value: number): string =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  const formatNumber = (value: number, digits = 4): string =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: digits }).format(value);
  const [stakedTokens, setStakedTokens] = useState('5000');
  const [tokenPrice, setTokenPrice] = useState('2.2');
  const [apr, setApr] = useState('12');
  const [validatorFee, setValidatorFee] = useState('8');
  const [uptime, setUptime] = useState('98');
  const [monthlyInfraCost, setMonthlyInfraCost] = useState('120');
  const applyScenario = (scenario: (typeof NODE_SCENARIOS)[number]) => {
    setStakedTokens(scenario.stakedTokens);
    setApr(scenario.apr);
    setValidatorFee(scenario.validatorFee);
    setUptime(scenario.uptime);
    setMonthlyInfraCost(scenario.monthlyInfraCost);
  };
  const isScenarioActive = (scenario: (typeof NODE_SCENARIOS)[number]) => (
    stakedTokens === scenario.stakedTokens
    && apr === scenario.apr
    && validatorFee === scenario.validatorFee
    && uptime === scenario.uptime
    && monthlyInfraCost === scenario.monthlyInfraCost
  );

  const result = useMemo(() => {
    const tokens = Number(stakedTokens);
    const price = Number(tokenPrice);
    const aprPct = Number(apr);
    const feePct = Number(validatorFee);
    const uptimePct = Number(uptime);
    const infra = Number(monthlyInfraCost);

    if ([tokens, price, aprPct, feePct, uptimePct, infra].some((v) => !Number.isFinite(v)) || tokens <= 0 || price <= 0 || aprPct < 0 || feePct < 0 || uptimePct <= 0 || uptimePct > 100 || infra < 0) {
      return null;
    }

    const stakeValue = tokens * price;
    const grossAnnualRewardsTokens = tokens * (aprPct / 100);
    const grossAnnualRewardsUsd = grossAnnualRewardsTokens * price;

    const postValidatorUsd = grossAnnualRewardsUsd * (1 - feePct / 100);
    const uptimeAdjustedUsd = postValidatorUsd * (uptimePct / 100);
    const infraAnnualCost = infra * 12;

    const netAnnualUsd = uptimeAdjustedUsd - infraAnnualCost;
    const netMonthlyUsd = netAnnualUsd / 12;
    const effectiveApr = stakeValue > 0 ? (netAnnualUsd / stakeValue) * 100 : 0;
    const netAnnualTokens = netAnnualUsd / price;

    const rewardYieldFactor = (aprPct / 100) * (1 - feePct / 100) * (uptimePct / 100);
    const breakEvenStakeValue = rewardYieldFactor > 0 ? infraAnnualCost / rewardYieldFactor : null;

    return {
      stakeValue,
      grossAnnualRewardsTokens,
      grossAnnualRewardsUsd,
      infraAnnualCost,
      netAnnualUsd,
      netMonthlyUsd,
      effectiveApr,
      netAnnualTokens,
      breakEvenStakeValue,
    };
  }, [stakedTokens, tokenPrice, apr, validatorFee, uptime, monthlyInfraCost]);

  const reset = () => {
    setStakedTokens('5000');
    setTokenPrice('2.2');
    setApr('12');
    setValidatorFee('8');
    setUptime('98');
    setMonthlyInfraCost('120');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {NODE_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.label}
                  className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                  onClick={() => applyScenario(scenario)}
                >
                  {getUiString(lang, scenario.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="node-staked">{getUiString(lang, 'Staked Tokens')}</label>
            <div className="pills-row">
              {STAKED_TOKEN_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${stakedTokens === String(preset) ? 'active' : ''}`}
                  onClick={() => setStakedTokens(String(preset))}
                >
                  {preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={stakedTokens} onChange={(e) => setStakedTokens(e.target.value)} min="0" step="any" id="node-staked" onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label htmlFor="node-price">{getUiString(lang, 'Token Price (USD)')}</label>
            <div className="pills-row">
              {TOKEN_PRICE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${tokenPrice === String(preset) ? 'active' : ''}`}
                  onClick={() => setTokenPrice(String(preset))}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)} min="0" step="any" id="node-price" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="node-apr">{getUiString(lang, 'Network APR (%)')}</label>
            <div className="pills-row">
              {APR_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${apr === String(preset) ? 'active' : ''}`}
                  onClick={() => setApr(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={apr} onChange={(e) => setApr(e.target.value)} min="0" step="any" id="node-apr" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="node-fee">{getUiString(lang, 'Validator Commission (%)')}</label>
            <div className="pills-row">
              {VALIDATOR_FEE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${validatorFee === String(preset) ? 'active' : ''}`}
                  onClick={() => setValidatorFee(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={validatorFee} onChange={(e) => setValidatorFee(e.target.value)} min="0" step="any" id="node-fee" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="node-uptime">{getUiString(lang, 'Node Uptime (%)')}</label>
            <div className="pills-row">
              {UPTIME_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${uptime === String(preset) ? 'active' : ''}`}
                  onClick={() => setUptime(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={uptime} onChange={(e) => setUptime(e.target.value)} min="0" max="100" step="any" id="node-uptime" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="node-infra">{getUiString(lang, 'Monthly Infrastructure Cost (USD)')}</label>
            <div className="pills-row">
              {INFRA_COST_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${monthlyInfraCost === String(preset) ? 'active' : ''}`}
                  onClick={() => setMonthlyInfraCost(String(preset))}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={monthlyInfraCost} onChange={(e) => setMonthlyInfraCost(e.target.value)} min="0" step="any" id="node-infra" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Small uptime drops and validator fees can materially reduce net node APR.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netMonthlyUsd >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net Monthly Node Income')}</span>
                <span className="result-hero-value"><ServerCog size={28} />{formatUSD(result.netMonthlyUsd)}</span>
                <span className={`result-hero-roi ${result.effectiveApr >= 0 ? 'profit' : 'loss'}`}>
                  {getUiString(lang, 'Effective APR')} {result.effectiveApr >= 0 ? '+' : ''}{result.effectiveApr.toFixed(2)}%
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Stake value')}</span><span className="result-value">{formatUSD(result.stakeValue)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross annual rewards')}</span><span className="result-value">{formatUSD(result.grossAnnualRewardsUsd)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Infrastructure cost (annual)')}</span><span className="result-value fee">-{formatUSD(result.infraAnnualCost)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label"><strong>{getUiString(lang, 'Net annual income')}</strong></span><span className={`result-value ${result.netAnnualUsd >= 0 ? 'profit' : 'loss'}`}><strong>{formatUSD(result.netAnnualUsd)}</strong></span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Net annual rewards')}</span><span className="result-value">{formatNumber(result.netAnnualTokens)} {getUiString(lang, 'tokens')}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Break-even stake value')}</span><span className="result-value">{result.breakEvenStakeValue ? formatUSD(result.breakEvenStakeValue) : getUiString(lang, 'N/A')}</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Real validator rewards depend on inflation, commission policy, missed blocks, and slashing events. Keep a safety margin in planning.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h2>{getUiString(lang, 'Enter valid node assumptions')}</h2><p>{getUiString(lang, 'Set stake, APR, uptime, and costs to estimate validator profitability.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(NodeCalculator);
