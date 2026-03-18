import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Gamepad2, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

// formatUSD is defined inside the component to access `lang` prop

const INITIAL_COST_PILLS = ['500', '1200', '2500', '5000'];
const DAILY_REWARD_PILLS = ['15', '30', '45', '80'];
const TOKEN_PRICE_PILLS = ['0.05', '0.08', '0.2', '0.5'];
const MARKETPLACE_FEE_PILLS = ['2', '5', '10', '15'];
const DAILY_EXPENSE_PILLS = ['1', '3', '5', '10'];
const ACTIVE_DAYS_PILLS = ['20', '26', '30'];
const RESALE_VALUE_PILLS = ['0', '300', '800', '1500'];
const GAMEFI_SCENARIOS = [
  {
    label: 'Casual',
    initialCost: '500',
    dailyTokenRewards: '15',
    tokenPrice: '0.05',
    marketplaceFee: '5',
    dailyExpenses: '1',
    activeDaysPerMonth: '20',
    assetResaleValue: '300',
  },
  {
    label: 'Standard',
    initialCost: '1200',
    dailyTokenRewards: '45',
    tokenPrice: '0.08',
    marketplaceFee: '5',
    dailyExpenses: '3',
    activeDaysPerMonth: '26',
    assetResaleValue: '300',
  },
  {
    label: 'High Risk',
    initialCost: '5000',
    dailyTokenRewards: '80',
    tokenPrice: '0.2',
    marketplaceFee: '10',
    dailyExpenses: '10',
    activeDaysPerMonth: '30',
    assetResaleValue: '1500',
  },
] as const;

function GamefiCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const [initialCost, setInitialCost] = useState('1200');
  const [dailyTokenRewards, setDailyTokenRewards] = useState('45');
  const [tokenPrice, setTokenPrice] = useState('0.08');
  const [marketplaceFee, setMarketplaceFee] = useState('5');
  const [dailyExpenses, setDailyExpenses] = useState('3');
  const [activeDaysPerMonth, setActiveDaysPerMonth] = useState('26');
  const [assetResaleValue, setAssetResaleValue] = useState('300');
  const applyScenario = (scenario: (typeof GAMEFI_SCENARIOS)[number]) => {
    setInitialCost(scenario.initialCost);
    setDailyTokenRewards(scenario.dailyTokenRewards);
    setTokenPrice(scenario.tokenPrice);
    setMarketplaceFee(scenario.marketplaceFee);
    setDailyExpenses(scenario.dailyExpenses);
    setActiveDaysPerMonth(scenario.activeDaysPerMonth);
    setAssetResaleValue(scenario.assetResaleValue);
  };
  const isScenarioActive = (scenario: (typeof GAMEFI_SCENARIOS)[number]) => (
    initialCost === scenario.initialCost
    && dailyTokenRewards === scenario.dailyTokenRewards
    && tokenPrice === scenario.tokenPrice
    && marketplaceFee === scenario.marketplaceFee
    && dailyExpenses === scenario.dailyExpenses
    && activeDaysPerMonth === scenario.activeDaysPerMonth
    && assetResaleValue === scenario.assetResaleValue
  );

  const result = useMemo(() => {
    const upfront = Number(initialCost);
    const rewards = Number(dailyTokenRewards);
    const price = Number(tokenPrice);
    const feePct = Number(marketplaceFee);
    const expenses = Number(dailyExpenses);
    const activeDays = Number(activeDaysPerMonth);
    const resale = Number(assetResaleValue);

    if ([upfront, rewards, price, feePct, expenses, activeDays, resale].some((v) => !Number.isFinite(v)) || upfront <= 0 || rewards < 0 || price < 0 || feePct < 0 || activeDays <= 0) {
      return null;
    }

    const grossDaily = rewards * price;
    const netDaily = grossDaily * (1 - feePct / 100) - expenses;
    const monthlyNet = netDaily * activeDays;
    const annualNet = monthlyNet * 12;

    const capitalAtRisk = Math.max(0, upfront - resale);
    const breakevenDays = netDaily > 0 ? capitalAtRisk / netDaily : null;
    const annualRoi = capitalAtRisk > 0 ? (annualNet / capitalAtRisk) * 100 : 0;

    return {
      grossDaily,
      netDaily,
      monthlyNet,
      annualNet,
      capitalAtRisk,
      breakevenDays,
      annualRoi,
    };
  }, [initialCost, dailyTokenRewards, tokenPrice, marketplaceFee, dailyExpenses, activeDaysPerMonth, assetResaleValue]);

  const reset = () => {
    setInitialCost('1200');
    setDailyTokenRewards('45');
    setTokenPrice('0.08');
    setMarketplaceFee('5');
    setDailyExpenses('3');
    setActiveDaysPerMonth('26');
    setAssetResaleValue('300');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {GAMEFI_SCENARIOS.map((scenario) => (
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
            <label>{getUiString(lang, 'Initial Setup Cost (USD)')}</label>
            <div className="pills-row">
              {INITIAL_COST_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${initialCost === value ? 'active' : ''}`}
                  onClick={() => setInitialCost(value)}
                >
                  ${Number(value).toLocaleString('en-US')}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={initialCost} onChange={(e) => setInitialCost(e.target.value)} min="0" step="any" id="gamefi-initial" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Daily Token Rewards')}</label>
            <div className="pills-row">
              {DAILY_REWARD_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${dailyTokenRewards === value ? 'active' : ''}`}
                  onClick={() => setDailyTokenRewards(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={dailyTokenRewards} onChange={(e) => setDailyTokenRewards(e.target.value)} min="0" step="any" id="gamefi-rewards" style={{ marginTop: '8px' }} onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Token Price (USD)')}</label>
            <div className="pills-row">
              {TOKEN_PRICE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${tokenPrice === value ? 'active' : ''}`}
                  onClick={() => setTokenPrice(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)} min="0" step="any" id="gamefi-price" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Marketplace / Claim Fee (%)')}</label>
            <div className="pills-row">
              {MARKETPLACE_FEE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${marketplaceFee === value ? 'active' : ''}`}
                  onClick={() => setMarketplaceFee(value)}
                >
                  {value}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={marketplaceFee} onChange={(e) => setMarketplaceFee(e.target.value)} min="0" step="any" id="gamefi-fee" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Daily In-Game Expenses (USD)')}</label>
            <div className="pills-row">
              {DAILY_EXPENSE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${dailyExpenses === value ? 'active' : ''}`}
                  onClick={() => setDailyExpenses(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={dailyExpenses} onChange={(e) => setDailyExpenses(e.target.value)} min="0" step="any" id="gamefi-expenses" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Active Days per Month')}</label>
            <div className="pills-row">
              {ACTIVE_DAYS_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${activeDaysPerMonth === value ? 'active' : ''}`}
                  onClick={() => setActiveDaysPerMonth(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={activeDaysPerMonth} onChange={(e) => setActiveDaysPerMonth(e.target.value)} min="1" step="1" id="gamefi-active-days" style={{ marginTop: '8px' }} onFocus={(e) => e.target.select()} />
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Estimated Resale Value (USD)')}</label>
            <div className="pills-row">
              {RESALE_VALUE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${assetResaleValue === value ? 'active' : ''}`}
                  onClick={() => setAssetResaleValue(value)}
                >
                  ${Number(value).toLocaleString('en-US')}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}>
              <input type="number" inputMode="decimal" value={assetResaleValue} onChange={(e) => setAssetResaleValue(e.target.value)} min="0" step="any" id="gamefi-resale" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Compare at least two token price presets before deciding.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netDaily >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Net Daily Earnings')}</span>
                <span className="result-hero-value"><Gamepad2 size={28} />{formatUSD(result.netDaily)}</span>
                <span className={`result-hero-roi ${result.annualRoi >= 0 ? 'profit' : 'loss'}`}>
                  {getUiString(lang, 'Annual ROI')} {result.annualRoi >= 0 ? '+' : ''}{result.annualRoi.toFixed(2)}%
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Gross daily rewards')}</span><span className="result-value">{formatUSD(result.grossDaily)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Net monthly earnings')}</span><span className={`result-value ${result.monthlyNet >= 0 ? 'profit' : 'loss'}`}>{formatUSD(result.monthlyNet)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Net annual earnings')}</span><span className={`result-value ${result.annualNet >= 0 ? 'profit' : 'loss'}`}>{formatUSD(result.annualNet)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Capital at risk (cost - resale)')}</span><span className="result-value">{formatUSD(result.capitalAtRisk)}</span></div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Break-even time')}</span>
                  <span className={`result-value ${result.breakevenDays && result.breakevenDays <= 180 ? 'profit' : 'fee'}`}>
                    {result.breakevenDays ? `${result.breakevenDays.toFixed(0)} ${getUiString(lang, 'days')}` : getUiString(lang, 'Not reachable with current inputs')}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Token price and in-game emissions can change quickly. Recheck scenarios after major token unlocks or economy updates.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>{getUiString(lang, 'Enter valid GameFi assumptions')}</h3><p>{getUiString(lang, 'Set cost, rewards, and token price to estimate payback and ROI.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(GamefiCalculator);
