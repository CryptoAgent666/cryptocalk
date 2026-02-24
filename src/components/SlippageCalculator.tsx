import { useMemo, useState } from 'react';
import { ArrowRightLeft, Info, RotateCcw, TrendingUp } from 'lucide-react';

const TVL_PRESETS = [500000, 1000000, 2000000, 5000000];
const TRADE_PRESETS = [1000, 5000, 10000, 25000];
const DEX_FEE_PRESETS = [0.05, 0.1, 0.3, 1];
const TOLERANCE_PRESETS = [0.1, 0.5, 1, 2];
const SLIPPAGE_SCENARIOS = [
  { label: 'Small Swap', poolTvl: '5000000', tradeSize: '1000', dexFee: '0.05', slippageTolerance: '0.5' },
  { label: 'Balanced Swap', poolTvl: '2000000', tradeSize: '10000', dexFee: '0.3', slippageTolerance: '1' },
  { label: 'Large Impact', poolTvl: '500000', tradeSize: '25000', dexFee: '1', slippageTolerance: '2' },
] as const;

function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function SlippageCalculator() {
  const [poolTvl, setPoolTvl] = useState('2000000');
  const [tradeSize, setTradeSize] = useState('10000');
  const [dexFee, setDexFee] = useState('0.3');
  const [slippageTolerance, setSlippageTolerance] = useState('1');
  const applyScenario = (scenario: (typeof SLIPPAGE_SCENARIOS)[number]) => {
    setPoolTvl(scenario.poolTvl);
    setTradeSize(scenario.tradeSize);
    setDexFee(scenario.dexFee);
    setSlippageTolerance(scenario.slippageTolerance);
  };
  const isScenarioActive = (scenario: (typeof SLIPPAGE_SCENARIOS)[number]) => (
    poolTvl === scenario.poolTvl
    && tradeSize === scenario.tradeSize
    && dexFee === scenario.dexFee
    && slippageTolerance === scenario.slippageTolerance
  );

  const result = useMemo(() => {
    const tvl = Number(poolTvl);
    const trade = Number(tradeSize);
    const feePct = Number(dexFee);
    const tolerance = Number(slippageTolerance);

    if ([tvl, trade, feePct, tolerance].some((v) => !Number.isFinite(v)) || tvl <= 0 || trade <= 0 || feePct < 0 || tolerance < 0) {
      return null;
    }

    const reserve = tvl / 2;
    const netInput = trade * (1 - feePct / 100);
    const expectedNoImpact = netInput;
    const expectedOut = (reserve * netInput) / (reserve + netInput);
    const slippagePct = (1 - expectedOut / expectedNoImpact) * 100;

    const priceImpactCost = expectedNoImpact - expectedOut;
    const tradingFeeCost = trade - netInput;
    const totalExecutionCost = priceImpactCost + tradingFeeCost;

    const minReceived = expectedOut * (1 - tolerance / 100);
    const passTolerance = slippagePct <= tolerance;
    const tradeSharePct = (trade / tvl) * 100;

    return {
      expectedOut,
      slippagePct,
      tradeSharePct,
      priceImpactCost,
      tradingFeeCost,
      totalExecutionCost,
      minReceived,
      passTolerance,
    };
  }, [poolTvl, tradeSize, dexFee, slippageTolerance]);

  const reset = () => {
    setPoolTvl('2000000');
    setTradeSize('10000');
    setDexFee('0.3');
    setSlippageTolerance('1');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>Quick Scenarios</label>
            <div className="pills-row">
              {SLIPPAGE_SCENARIOS.map((scenario) => (
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
            <label>Pool TVL (USD)</label>
            <div className="pills-row">
              {TVL_PRESETS.map((preset) => (
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
              <span className="input-prefix">$</span>
              <input type="number" value={poolTvl} onChange={(e) => setPoolTvl(e.target.value)} min="0" step="any" id="slippage-tvl" />
            </div>
          </div>

          <div className="input-group">
            <label>Trade Size (USD)</label>
            <div className="pills-row">
              {TRADE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${tradeSize === String(preset) ? 'active' : ''}`}
                  onClick={() => setTradeSize(String(preset))}
                >
                  ${preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <span className="input-prefix">$</span>
              <input type="number" value={tradeSize} onChange={(e) => setTradeSize(e.target.value)} min="0" step="any" id="slippage-trade" />
            </div>
          </div>

          <div className="input-group">
            <label>DEX Fee (%)</label>
            <div className="pills-row">
              {DEX_FEE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${dexFee === String(preset) ? 'active' : ''}`}
                  onClick={() => setDexFee(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <span className="input-prefix">%</span>
              <input type="number" value={dexFee} onChange={(e) => setDexFee(e.target.value)} min="0" step="any" id="slippage-fee" />
            </div>
          </div>

          <div className="input-group">
            <label>Slippage Tolerance (%)</label>
            <div className="pills-row">
              {TOLERANCE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  className={`pill-btn ${slippageTolerance === String(preset) ? 'active' : ''}`}
                  onClick={() => setSlippageTolerance(String(preset))}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <div className="input-with-prefix">
              <span className="input-prefix">%</span>
              <input type="number" value={slippageTolerance} onChange={(e) => setSlippageTolerance(e.target.value)} min="0" step="any" id="slippage-tolerance" />
            </div>
          </div>

          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> Reset</button>
          <span className="input-hint">
            Auto-calculates as you type. Keep trade size small relative to pool TVL to minimise execution cost.
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.passTolerance ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">Estimated Slippage</span>
                <span className="result-hero-value"><ArrowRightLeft size={28} />{result.slippagePct.toFixed(3)}%</span>
                <span className={`result-hero-roi ${result.passTolerance ? 'profit' : 'loss'}`}>
                  {result.passTolerance ? 'Within tolerance' : 'Above tolerance'}
                </span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">Trade share of pool</span><span className="result-value">{result.tradeSharePct.toFixed(2)}%</span></div>
                <div className="result-row"><span className="result-label">Expected amount received</span><span className="result-value">{formatUSD(result.expectedOut)}</span></div>
                <div className="result-row"><span className="result-label">Minimum received (tolerance)</span><span className="result-value">{formatUSD(result.minReceived)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">Price impact cost</span><span className="result-value fee">-{formatUSD(result.priceImpactCost)}</span></div>
                <div className="result-row"><span className="result-label">Trading fee cost</span><span className="result-value fee">-{formatUSD(result.tradingFeeCost)}</span></div>
                <div className="result-row"><span className="result-label"><strong>Total execution cost</strong></span><span className="result-value fee"><strong>-{formatUSD(result.totalExecutionCost)}</strong></span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />This is a constant-product estimate. Real execution can differ due to routing, MEV, oracle lag, and liquidity changes.</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><TrendingUp size={40} /></div><h3>Enter valid trade assumptions</h3><p>Set pool size, trade amount, and fee to estimate slippage and execution cost.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
