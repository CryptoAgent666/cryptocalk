import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ArrowRightLeft, Info, RotateCcw, TrendingUp } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const DEPOSIT_PRESETS = [1000, 5000, 10000, 25000];
const POOL_TVL_PRESETS = [500000, 1000000, 5000000, 10000000];
const DAILY_VOLUME_PRESETS = [250000, 1000000, 2000000, 5000000];
const PRICE_MOVE_PRESETS = [-30, -10, 0, 10, 20, 50];
const FARMING_DAY_PRESETS = [7, 30, 90, 180];
const UNISWAP_SCENARIOS = [
  { label: 'Stable Pair', deposit: '5000', poolTvl: '10000000', dailyVolume: '1000000', feeTier: '0.05', priceMovePct: '5', days: '30' },
  { label: 'Blue-Chip LP', deposit: '10000', poolTvl: '5000000', dailyVolume: '2000000', feeTier: '0.3', priceMovePct: '20', days: '30' },
  { label: 'High-Vol LP', deposit: '25000', poolTvl: '2000000', dailyVolume: '1000000', feeTier: '1', priceMovePct: '50', days: '90' },
] as const;

function UniswapCalculator({ lang = 'en' }: { lang?: string }) {
  function formatUSD(value: number): string {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const [deposit, setDeposit] = useState('10000');
  const [poolTvl, setPoolTvl] = useState('5000000');
  const [dailyVolume, setDailyVolume] = useState('2000000');
  const [feeTier, setFeeTier] = useState('0.3');
  const [priceMovePct, setPriceMovePct] = useState('20');
  const [days, setDays] = useState('30');
  const applyScenario = (scenario: (typeof UNISWAP_SCENARIOS)[number]) => {
    setDeposit(scenario.deposit);
    setPoolTvl(scenario.poolTvl);
    setDailyVolume(scenario.dailyVolume);
    setFeeTier(scenario.feeTier);
    setPriceMovePct(scenario.priceMovePct);
    setDays(scenario.days);
  };
  const isScenarioActive = (scenario: (typeof UNISWAP_SCENARIOS)[number]) => (
    deposit === scenario.deposit
    && poolTvl === scenario.poolTvl
    && dailyVolume === scenario.dailyVolume
    && feeTier === scenario.feeTier
    && priceMovePct === scenario.priceMovePct
    && days === scenario.days
  );

  const result = useMemo(() => {
    const dep = Number(deposit);
    const tvl = Number(poolTvl);
    const vol = Number(dailyVolume);
    const fee = Number(feeTier);
    const move = Number(priceMovePct);
    const period = Number(days);

    if ([dep, tvl, vol, fee, period].some((v) => !Number.isFinite(v)) || dep <= 0 || tvl <= 0 || period <= 0) {
      return null;
    }

    const share = dep / tvl;
    const dailyFeeIncome = vol * (fee / 100) * share;
    const grossFees = dailyFeeIncome * period;

    const ratio = Math.max(0.01, 1 + move / 100);
    const ilFraction = 2 * Math.sqrt(ratio) / (1 + ratio) - 1;
    const ilLoss = Math.abs(ilFraction) * dep;

    const netPnL = grossFees - ilLoss;
    const finalValue = dep + netPnL;
    const breakEvenDays = dailyFeeIncome > 0 ? ilLoss / dailyFeeIncome : null;

    return {
      share,
      dailyFeeIncome,
      grossFees,
      ilLoss,
      netPnL,
      finalValue,
      breakEvenDays,
    };
  }, [deposit, poolTvl, dailyVolume, feeTier, priceMovePct, days]);

  const reset = () => {
    setDeposit('10000');
    setPoolTvl('5000000');
    setDailyVolume('2000000');
    setFeeTier('0.3');
    setPriceMovePct('20');
    setDays('30');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {UNISWAP_SCENARIOS.map((scenario) => (
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
            <label>{getUiString(lang, 'Deposit Amount (USD)')}</label>
            <div className="pills-row">
              {DEPOSIT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${deposit === String(preset) ? 'active' : ''}`}
                  onClick={() => setDeposit(String(preset))}
                >
                  ${preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={deposit} onChange={(e) => setDeposit(e.target.value)} min="1" step="any" id="uni-deposit" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Pool TVL (USD)')}</label>
            <div className="pills-row">
              {POOL_TVL_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${poolTvl === String(preset) ? 'active' : ''}`}
                  onClick={() => setPoolTvl(String(preset))}
                >
                  ${preset >= 1000000 ? `${preset / 1000000}m` : `${preset / 1000}k`}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={poolTvl} onChange={(e) => setPoolTvl(e.target.value)} min="1" step="any" id="uni-tvl" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Pool Daily Volume (USD)')}</label>
            <div className="pills-row">
              {DAILY_VOLUME_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${dailyVolume === String(preset) ? 'active' : ''}`}
                  onClick={() => setDailyVolume(String(preset))}
                >
                  ${preset >= 1000000 ? `${preset / 1000000}m` : `${preset / 1000}k`}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={dailyVolume} onChange={(e) => setDailyVolume(e.target.value)} min="1" step="any" id="uni-volume" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Fee Tier')}</label>
            <div className="pills-row">
              {['0.01', '0.05', '0.3', '1'].map((tier) => (
                <button key={tier} className={`pill-btn ${feeTier === tier ? 'active' : ''}`} onClick={() => setFeeTier(tier)}>
                  {tier}%
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Price Move')} (%)</label>
            <div className="pills-row">
              {PRICE_MOVE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${priceMovePct === String(preset) ? 'active' : ''} ${preset < 0 ? 'pill-danger' : ''}`}
                  onClick={() => setPriceMovePct(String(preset))}
                >
                  {preset > 0 ? '+' : ''}
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <input type="number" inputMode="decimal" value={priceMovePct} onChange={(e) => setPriceMovePct(e.target.value)} step="any" id="uni-price-move" onFocus={(e) => e.target.select()} />
            </div>
          </div>

          <div className="input-group">
            <label>{getUiString(lang, 'Farming Period (days)')}</label>
            <div className="pills-row">
              {FARMING_DAY_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${days === String(preset) ? 'active' : ''}`}
                  onClick={() => setDays(String(preset))}
                >
                  {preset}d
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={days} onChange={(e) => setDays(e.target.value)} min="1" step="1" id="uni-days" onFocus={(e) => e.target.select()} />
          </div>

          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
          </button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Start with pool TVL and volume presets to quickly estimate realistic LP outcomes.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.netPnL >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{getUiString(lang, 'Estimated LP Outcome')}</span>
                <span className="result-hero-value">
                  <TrendingUp size={28} />
                  {formatUSD(result.finalValue)}
                </span>
                <span className={`result-hero-roi ${result.netPnL >= 0 ? 'profit' : 'loss'}`}>
                  {getUiString(lang, 'Net')} {result.netPnL >= 0 ? '+' : ''}{formatUSD(result.netPnL)}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'LP share of pool')}</span>
                  <span className="result-value">{(result.share * 100).toFixed(4)}%</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Daily fee income')}</span>
                  <span className="result-value profit">{formatUSD(result.dailyFeeIncome)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Gross fees (period)')}</span>
                  <span className="result-value profit">{formatUSD(result.grossFees)}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Estimated impermanent loss')}</span>
                  <span className="result-value fee">-{formatUSD(result.ilLoss)}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label"><strong>{getUiString(lang, 'Break-even time')}</strong></span>
                  <span className="result-value">
                    {result.breakEvenDays ? `${result.breakEvenDays.toFixed(1)} ${getUiString(lang, 'days')}` : getUiString(lang, 'N/A')}
                  </span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'This is a simplified model. Actual LP returns depend on pool composition, rebalancing path, gas costs, and live market volatility.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
              <h3>{getUiString(lang, 'Enter valid values')}</h3>
              <p>{getUiString(lang, 'Add deposit, TVL, and volume assumptions to estimate Uniswap LP performance.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(UniswapCalculator);
