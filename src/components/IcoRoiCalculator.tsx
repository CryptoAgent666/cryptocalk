import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { Info, Rocket, RotateCcw } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';


const ICO_PRICE_PILLS = ['0.01', '0.05', '0.1', '0.5'];
const CURRENT_PRICE_PILLS = ['0.1', '0.42', '1', '2'];
const ATH_PRICE_PILLS = ['1', '1.4', '3', '5'];
const TOKEN_AMOUNT_PILLS = ['1000', '5000', '20000', '50000'];
const ICO_SCENARIOS = [
  { label: 'Steady', tokenName: 'TOKEN', icoPrice: '0.05', currentPrice: '0.42', athPrice: '1.40', tokens: '20000' },
  { label: 'Moonshot', tokenName: 'GEM', icoPrice: '0.01', currentPrice: '1', athPrice: '5', tokens: '50000' },
  { label: 'Recovery', tokenName: 'ALT', icoPrice: '0.1', currentPrice: '0.1', athPrice: '3', tokens: '5000' },
] as const;

function IcoRoiCalculator({ lang = 'en' }: { lang?: string }) {
  const formatUSD = (value: number): string =>
    new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const [tokenName, setTokenName] = useState('TOKEN');
  const [icoPrice, setIcoPrice] = useState('0.05');
  const [currentPrice, setCurrentPrice] = useState('0.42');
  const [athPrice, setAthPrice] = useState('1.40');
  const [tokens, setTokens] = useState('20000');
  const applyScenario = (scenario: (typeof ICO_SCENARIOS)[number]) => {
    setTokenName(scenario.tokenName);
    setIcoPrice(scenario.icoPrice);
    setCurrentPrice(scenario.currentPrice);
    setAthPrice(scenario.athPrice);
    setTokens(scenario.tokens);
  };
  const isScenarioActive = (scenario: (typeof ICO_SCENARIOS)[number]) => (
    tokenName === scenario.tokenName
    && icoPrice === scenario.icoPrice
    && currentPrice === scenario.currentPrice
    && athPrice === scenario.athPrice
    && tokens === scenario.tokens
  );

  const result = useMemo(() => {
    const ico = Number(icoPrice);
    const now = Number(currentPrice);
    const ath = Number(athPrice);
    const qty = Number(tokens);

    if ([ico, now, ath, qty].some((v) => !Number.isFinite(v)) || ico <= 0 || qty <= 0) return null;

    const invested = ico * qty;
    const currentValue = now * qty;
    const athValue = ath * qty;

    const currentRoi = ((currentValue - invested) / invested) * 100;
    const athRoi = ((athValue - invested) / invested) * 100;

    return {
      invested,
      currentValue,
      athValue,
      currentRoi,
      athRoi,
      xNow: now / ico,
      xAth: ath / ico,
    };
  }, [icoPrice, currentPrice, athPrice, tokens]);

  const reset = () => {
    setTokenName('TOKEN');
    setIcoPrice('0.05');
    setCurrentPrice('0.42');
    setAthPrice('1.40');
    setTokens('20000');
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label>{getUiString(lang, 'Quick Scenarios')}</label>
            <div className="pills-row">
              {ICO_SCENARIOS.map((scenario) => (
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
            <label>{getUiString(lang, 'Token Symbol')}</label>
            <input type="text" value={tokenName} onChange={(e) => setTokenName(e.target.value.toUpperCase().slice(0, 12))} id="ico-token" />
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'ICO / IDO Price')}</label>
            <div className="pills-row">
              {ICO_PRICE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${icoPrice === value ? 'active' : ''}`}
                  onClick={() => setIcoPrice(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}><input type="number" inputMode="decimal" value={icoPrice} onChange={(e) => setIcoPrice(e.target.value)} min="0" step="any" id="ico-price" onFocus={(e) => e.target.select()} /></div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'Current Price')}</label>
            <div className="pills-row">
              {CURRENT_PRICE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${currentPrice === value ? 'active' : ''}`}
                  onClick={() => setCurrentPrice(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}><input type="number" inputMode="decimal" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} min="0" step="any" id="ico-current" onFocus={(e) => e.target.select()} /></div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'ATH Price')}</label>
            <div className="pills-row">
              {ATH_PRICE_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${athPrice === value ? 'active' : ''}`}
                  onClick={() => setAthPrice(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            <div className="input-with-prefix" style={{ marginTop: '8px' }}><input type="number" inputMode="decimal" value={athPrice} onChange={(e) => setAthPrice(e.target.value)} min="0" step="any" id="ico-ath" onFocus={(e) => e.target.select()} /></div>
          </div>
          <div className="input-group">
            <label>{getUiString(lang, 'Token Amount')}</label>
            <div className="pills-row">
              {TOKEN_AMOUNT_PILLS.map((value) => (
                <button
                  key={value}
                  className={`pill-btn ${tokens === value ? 'active' : ''}`}
                  onClick={() => setTokens(value)}
                >
                  {Number(value).toLocaleString('en-US')}
                </button>
              ))}
            </div>
            <input type="number" inputMode="decimal" value={tokens} onChange={(e) => setTokens(e.target.value)} min="0" step="any" id="ico-amount" style={{ marginTop: '8px' }} onFocus={(e) => e.target.select()} />
          </div>
          <button className="reset-btn" onClick={reset}><RotateCcw size={14} /> {getUiString(lang, 'Reset')}</button>
          <span className="input-hint">
            {getUiString(lang, 'Auto-calculates as you type. Check current ROI and ATH ROI against the same token amount.')}
          </span>
        </div>

        <div className="calc-results-panel">
          {result ? (
            <>
              <div className={`result-hero ${result.currentRoi >= 0 ? 'profit' : 'loss'}`}>
                <span className="result-hero-label">{tokenName || 'TOKEN'} {getUiString(lang, 'Current ROI')}</span>
                <span className="result-hero-value"><Rocket size={28} />{result.currentRoi.toFixed(2)}%</span>
                <span className={`result-hero-roi ${result.currentRoi >= 0 ? 'profit' : 'loss'}`}>{result.xNow.toFixed(2)}x {getUiString(lang, 'from ICO price')}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Initial investment')}</span><span className="result-value">{formatUSD(result.invested)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'Current value')}</span><span className="result-value">{formatUSD(result.currentValue)}</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'ATH value')}</span><span className="result-value">{formatUSD(result.athValue)}</span></div>
                <div className="result-divider" />
                <div className="result-row"><span className="result-label">{getUiString(lang, 'ATH ROI')}</span><span className={`result-value ${result.athRoi >= 0 ? 'profit' : 'fee'}`}>{result.athRoi.toFixed(2)}%</span></div>
                <div className="result-row"><span className="result-label">{getUiString(lang, 'ATH multiple')}</span><span className="result-value">{result.xAth.toFixed(2)}x</span></div>
              </div>

              <p className="calc-disclaimer"><Info size={14} />{getUiString(lang, 'Historical ROI does not imply future returns. Use with market cap and liquidity checks before entering positions.')}</p>
            </>
          ) : (
            <div className="results-empty"><div className="results-empty-icon"><Rocket size={40} /></div><h3>{getUiString(lang, 'Enter valid ICO assumptions')}</h3><p>{getUiString(lang, 'Set ICO, current, ATH price and token amount to calculate ROI.')}</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(IcoRoiCalculator);
