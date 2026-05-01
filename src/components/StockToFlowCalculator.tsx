import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    Layers,
    Activity,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const BLOCKS_PER_DAY = 144;
const CURRENT_REWARD = 3.125;
const DEFAULT_SUPPLY = '19800000';
const DEFAULT_FLOW = String(Math.round(CURRENT_REWARD * BLOCKS_PER_DAY * 365)); // 164,250

const SCENARIOS = [
    {
        label: 'Current',
        supply: DEFAULT_SUPPLY,
        annualFlow: DEFAULT_FLOW,
    },
    {
        label: 'Post-Halving 2028',
        supply: '20200000',
        annualFlow: String(Math.round(1.5625 * BLOCKS_PER_DAY * 365)), // 82,125
    },
    {
        label: 'Post-Halving 2032',
        supply: '20500000',
        annualFlow: String(Math.round(0.78125 * BLOCKS_PER_DAY * 365)), // 41,063
    },
] as const;

function StockToFlowCalculator({ lang = 'en' }: { lang?: string }) {
    const [supply, setSupply] = useState(DEFAULT_SUPPLY);
    const [annualFlow, setAnnualFlow] = useState(DEFAULT_FLOW);
    const [btcPrice, setBtcPrice] = useState('');
    const [fetchingPrice, setFetchingPrice] = useState(false);
    const [priceError, setPriceError] = useState('');
    const fetchedRef = useRef(false);

    const CG_KEY = import.meta.env.PUBLIC_COINGECKO_API_KEY || '';

    // Auto-fetch BTC price on mount
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        (async () => {
            setFetchingPrice(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${CG_KEY}`);
                if (!res.ok) throw new Error('fetch failed');
                const data = await res.json();
                if (data.bitcoin?.usd) setBtcPrice(String(data.bitcoin.usd));
            } catch {
                setPriceError(getUiString(lang, 'Failed to fetch price. Please enter manually.'));
            }
            setFetchingPrice(false);
        })();
    }, []);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setSupply(s.supply);
        setAnnualFlow(s.annualFlow);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        supply === s.supply && annualFlow === s.annualFlow;

    // S2F calculations
    const supplyNum = parseFloat(supply) || 0;
    const flowNum = parseFloat(annualFlow) || 0;
    const price = parseFloat(btcPrice) || 0;

    const s2fRatio = flowNum > 0 ? supplyNum / flowNum : 0;
    // PlanB S2F model: price = e^(3.21 * ln(S2F) - 1.71)
    const modelPrice = s2fRatio > 0 ? Math.exp(3.21 * Math.log(s2fRatio) - 1.71) : 0;
    const deviation = modelPrice > 0 && price > 0 ? ((price - modelPrice) / modelPrice) * 100 : 0;

    // Post-halving projection (flow halved)
    const halvingFlow = flowNum / 2;
    const halvingS2f = halvingFlow > 0 ? supplyNum / halvingFlow : 0;
    const halvingModelPrice = halvingS2f > 0 ? Math.exp(3.21 * Math.log(halvingS2f) - 1.71) : 0;
    const halvingUplift = modelPrice > 0 ? ((halvingModelPrice - modelPrice) / modelPrice) * 100 : 0;

    const hasInputs = supplyNum > 0 && flowNum > 0;

    const reset = () => {
        setSupply(DEFAULT_SUPPLY);
        setAnnualFlow(DEFAULT_FLOW);
        setBtcPrice('');
        setPriceError('');
        fetchedRef.current = false;
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
            style: 'currency', currency: 'USD', maximumFractionDigits: 0,
        }).format(n);
    };

    const formatNumber = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang).format(Math.round(n));
    };

    const isOvervalued = deviation > 0;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button key={s.label} className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}>
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="s2f-supply"><Layers size={14} /> {getUiString(lang, 'Current BTC Supply')}</label>
                        <input type="number" inputMode="decimal" value={supply} onChange={(e) => setSupply(e.target.value)}
                            id="s2f-supply" step="any" min="0" onFocus={(e) => e.target.select()} />
                        <span className="input-hint">{getUiString(lang, 'Total bitcoins mined to date')}</span>
                    </div>

                    <div className="input-group">
                        <label htmlFor="s2f-flow"><Activity size={14} /> {getUiString(lang, 'Annual New BTC Mined')}</label>
                        <input type="number" inputMode="decimal" value={annualFlow} onChange={(e) => setAnnualFlow(e.target.value)}
                            id="s2f-flow" step="any" min="0" onFocus={(e) => e.target.select()} />
                        <span className="input-hint">
                            {getUiString(lang, 'At 3.125 BTC/block, 144 blocks/day = ~164,250/year')}
                        </span>
                    </div>

                    <div className="input-group">
                        <label htmlFor="s2f-price">
                            <DollarSign size={14} /> {getUiString(lang, 'BTC Price ($)')}
                            {fetchingPrice && <span className="label-hint">{getUiString(lang, 'Fetching...')}</span>}
                            {price > 0 && !fetchingPrice && <span className="label-hint">{getUiString(lang, 'Auto-fetched')}</span>}
                        </label>
                        <input type="number" inputMode="decimal" value={btcPrice} onChange={(e) => setBtcPrice(e.target.value)}
                            id="s2f-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                        {priceError && <span className="input-hint" style={{ color: '#f97316' }}>{priceError}</span>}
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. BTC price fetched automatically from CoinGecko.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            <div className="result-hero" style={{ borderColor: 'var(--color-primary)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Stock-to-Flow Ratio')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <Layers size={28} />
                                    {s2fRatio.toFixed(1)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                                    {getUiString(lang, 'Supply')} / {getUiString(lang, 'Flow')} = {formatNumber(supplyNum)} / {formatNumber(flowNum)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'S2F Ratio')}</span>
                                    <span className="result-value">{s2fRatio.toFixed(2)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Model Price')}</strong></span>
                                    <span className="result-value"><strong>{formatUSD(modelPrice)}</strong></span>
                                </div>
                                {price > 0 && (
                                    <>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Actual Price')}</span>
                                            <span className="result-value">{formatUSD(price)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Deviation from Model')}</span>
                                            <span className={`result-value ${isOvervalued ? 'fee' : 'profit'}`}>
                                                {deviation >= 0 ? '+' : ''}{deviation.toFixed(1)}% ({isOvervalued ? getUiString(lang, 'Overvalued') : getUiString(lang, 'Undervalued')})
                                            </span>
                                        </div>
                                    </>
                                )}
                                <div className="result-divider" />
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, margin: '8px 0 4px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Next Halving Impact')}
                                </h4>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Post-Halving Flow')}</span>
                                    <span className="result-value">{formatNumber(halvingFlow)} BTC/{getUiString(lang, 'year')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Post-Halving S2F')}</span>
                                    <span className="result-value">{halvingS2f.toFixed(1)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Post-Halving Model Price')}</strong></span>
                                    <span className="result-value profit"><strong>{formatUSD(halvingModelPrice)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Projected Uplift')}</span>
                                    <span className="result-value profit">
                                        <TrendingUp size={14} /> +{halvingUplift.toFixed(1)}%
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'The S2F model is theoretical. Past correlation does not guarantee future prices. Use for educational purposes only.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Layers size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Stock-to-Flow')}</h3>
                            <p>{getUiString(lang, 'Enter BTC supply and flow to see the S2F ratio, model price, and halving projections.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(StockToFlowCalculator);
