import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Search,
    X,
    AlertTriangle,
    Droplets,
    ArrowUpDown,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';

interface CoinSuggestion {
    id: string;
    name: string;
    symbol: string;
    thumb?: string;
}

const PRICE_CHANGE_PRESETS = [-75, -50, -25, 0, 25, 50, 100, 200, 500];
const LIQUIDITY_PRESETS = [500, 1000, 5000, 10000, 25000];
const POOL_FEE_PRESETS = [5, 10, 20, 50, 100];
const HOLDING_DAY_PRESETS = [7, 30, 90, 180, 365];
const IL_SCENARIOS = [
    { label: 'Stable Pair', investmentAmount: '1000', priceChangeA: '0', priceChangeB: '0', poolFeeApr: '8', holdingDays: '30' },
    { label: 'ETH Rally', investmentAmount: '5000', priceChangeA: '50', priceChangeB: '0', poolFeeApr: '20', holdingDays: '30' },
    { label: 'Volatile Season', investmentAmount: '10000', priceChangeA: '100', priceChangeB: '-25', poolFeeApr: '50', holdingDays: '180' },
] as const;

export default function ImpermanentLossCalculator({ lang = 'en' }: { lang?: string }) {
    const [tokenASearch, setTokenASearch] = useState('');
    const [tokenBSearch, setTokenBSearch] = useState('');
    const [selectedTokenA, setSelectedTokenA] = useState<CoinSuggestion | null>(null);
    const [selectedTokenB, setSelectedTokenB] = useState<CoinSuggestion | null>(null);
    const [suggestionsA, setSuggestionsA] = useState<CoinSuggestion[]>([]);
    const [suggestionsB, setSuggestionsB] = useState<CoinSuggestion[]>([]);
    const [showSuggestionsA, setShowSuggestionsA] = useState(false);
    const [showSuggestionsB, setShowSuggestionsB] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState('1000');
    const [priceChangeA, setPriceChangeA] = useState('50');
    const [priceChangeB, setPriceChangeB] = useState('0');
    const [poolFeeApr, setPoolFeeApr] = useState('20');
    const [holdingDays, setHoldingDays] = useState('30');
    const [loading, setLoading] = useState(false);

    const searchTimeoutA = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchTimeoutB = useRef<ReturnType<typeof setTimeout> | null>(null);
    const sugRefA = useRef<HTMLDivElement>(null);
    const sugRefB = useRef<HTMLDivElement>(null);
    const applyScenario = (scenario: (typeof IL_SCENARIOS)[number]) => {
        setInvestmentAmount(scenario.investmentAmount);
        setPriceChangeA(scenario.priceChangeA);
        setPriceChangeB(scenario.priceChangeB);
        setPoolFeeApr(scenario.poolFeeApr);
        setHoldingDays(scenario.holdingDays);
    };
    const isScenarioActive = (scenario: (typeof IL_SCENARIOS)[number]) => (
        investmentAmount === scenario.investmentAmount
        && priceChangeA === scenario.priceChangeA
        && priceChangeB === scenario.priceChangeB
        && poolFeeApr === scenario.poolFeeApr
        && holdingDays === scenario.holdingDays
    );

    const searchCoins = useCallback(async (query: string, setter: (v: CoinSuggestion[]) => void, showSetter: (v: boolean) => void) => {
        if (query.length < 2) { setter([]); return; }
        setLoading(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=CG-Zeo2WrX3r7J1oUoX1kSnutmz`);
            if (!res.ok) throw new Error('Search failed');
            const data = await res.json();
            setter((data.coins || []).slice(0, 6).map((c: any) => ({
                id: c.id, name: c.name, symbol: c.symbol, thumb: c.thumb,
            })));
            showSetter(true);
        } catch { setter([]); }
        setLoading(false);
    }, []);

    const handleSearchA = (v: string) => {
        setTokenASearch(v);
        if (searchTimeoutA.current) clearTimeout(searchTimeoutA.current);
        searchTimeoutA.current = setTimeout(() => searchCoins(v, setSuggestionsA, setShowSuggestionsA), 400);
    };
    const handleSearchB = (v: string) => {
        setTokenBSearch(v);
        if (searchTimeoutB.current) clearTimeout(searchTimeoutB.current);
        searchTimeoutB.current = setTimeout(() => searchCoins(v, setSuggestionsB, setShowSuggestionsB), 400);
    };

    const selectTokenA = (coin: CoinSuggestion) => { setSelectedTokenA(coin); setTokenASearch(coin.name); setShowSuggestionsA(false); };
    const selectTokenB = (coin: CoinSuggestion) => { setSelectedTokenB(coin); setTokenBSearch(coin.name); setShowSuggestionsB(false); };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (sugRefA.current && !sugRefA.current.contains(e.target as Node)) setShowSuggestionsA(false);
            if (sugRefB.current && !sugRefB.current.contains(e.target as Node)) setShowSuggestionsB(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Calculations
    const investment = parseFloat(investmentAmount) || 0;
    const changeA = parseFloat(priceChangeA) || 0;
    const changeB = parseFloat(priceChangeB) || 0;
    const feeApr = parseFloat(poolFeeApr) || 0;
    const days = parseFloat(holdingDays) || 30;

    const hasInputs = investment > 0;

    // Price ratio change
    const priceRatioA = Math.max(0, 1 + changeA / 100);
    const priceRatioB = Math.max(0, 1 + changeB / 100);
    // For IL calculation, what matters is the relative price change
    const relativeRatio = priceRatioB > 0 ? priceRatioA / priceRatioB : priceRatioA;

    // IL formula: IL = 2 * sqrt(r) / (1 + r) - 1, where r = price ratio
    const sqrtR = Math.sqrt(relativeRatio);
    const ilPercent = (2 * sqrtR / (1 + relativeRatio) - 1) * 100;
    const ilAbsolute = (ilPercent / 100) * investment;

    // HODL value: half in token A, half in token B
    const hodlValue = investment * (priceRatioA * 0.5 + priceRatioB * 0.5);

    // LP value = hodlValue * (1 + IL)
    // Actually: LP value = investment * 2 * sqrt(priceRatioA * priceRatioB) / (1 + relativeRatio) ... simplified:
    // LP_value = investment * sqrt(priceRatioA) * sqrt(priceRatioB) * 2 / (sqrt(priceRatioA/priceRatioB) + sqrt(priceRatioB/priceRatioA))
    // Simpler: LP_value = hodlValue + ilAbsolute
    const lpValueBeforeFees = hodlValue + ilAbsolute;

    // Fee earnings (prorated for holding period)
    const feeEarnings = investment * (feeApr / 100) * (days / 365);

    // Total LP value with fees
    const lpValueWithFees = lpValueBeforeFees + feeEarnings;

    // Net outcome vs HODL
    const netVsHodl = lpValueWithFees - hodlValue;
    const netVsHodlPercent = hodlValue > 0 ? (netVsHodl / hodlValue) * 100 : 0;

    // Net outcome vs initial
    const totalReturn = lpValueWithFees - investment;
    const totalReturnPercent = investment > 0 ? (totalReturn / investment) * 100 : 0;

    const isFeesOvercomeIL = feeEarnings > Math.abs(ilAbsolute);

    // IL data for different price changes (chart data)
    const ilCurve = [-90, -75, -50, -25, 0, 25, 50, 100, 200, 300, 500].map(pct => {
        const r = (1 + pct / 100);
        const il = r > 0 ? (2 * Math.sqrt(r) / (1 + r) - 1) * 100 : -100;
        return { pct, il };
    });

    const reset = () => {
        setInvestmentAmount('1000'); setPriceChangeA('50'); setPriceChangeB('0');
        setPoolFeeApr('20'); setHoldingDays('30');
        setSelectedTokenA(null); setSelectedTokenB(null);
        setTokenASearch(''); setTokenBSearch('');
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    const formatPercent = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    const tokenALabel = selectedTokenA ? selectedTokenA.symbol.toUpperCase() : 'Token A';
    const tokenBLabel = selectedTokenB ? selectedTokenB.symbol.toUpperCase() : 'Token B';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {IL_SCENARIOS.map((scenario) => (
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

                    {/* Token A Search */}
                    <div className="input-group" ref={sugRefA}>
                        <label><Search size={14} /> Token A (optional)</label>
                        <div className="coin-search-wrapper">
                            <input type="text" value={tokenASearch} onChange={(e) => handleSearchA(e.target.value)}
                                placeholder="e.g. Ethereum" id="il-token-a" />
                            {selectedTokenA && (
                                <button className="coin-clear" onClick={() => { setSelectedTokenA(null); setTokenASearch(''); }} aria-label="Clear"><X size={14} /></button>
                            )}
                        </div>
                        {showSuggestionsA && suggestionsA.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestionsA.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectTokenA(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Token B Search */}
                    <div className="input-group" ref={sugRefB}>
                        <label><Search size={14} /> Token B (optional)</label>
                        <div className="coin-search-wrapper">
                            <input type="text" value={tokenBSearch} onChange={(e) => handleSearchB(e.target.value)}
                                placeholder="e.g. USDC" id="il-token-b" />
                            {selectedTokenB && (
                                <button className="coin-clear" onClick={() => { setSelectedTokenB(null); setTokenBSearch(''); }} aria-label="Clear"><X size={14} /></button>
                            )}
                        </div>
                        {showSuggestionsB && suggestionsB.length > 0 && (
                            <div className="suggestions-dropdown">
                                {suggestionsB.map((coin) => (
                                    <button key={coin.id} className="suggestion-item" onClick={() => selectTokenB(coin)}>
                                        {coin.thumb && <img src={coin.thumb} alt="" width={20} height={20} />}
                                        <span className="suggestion-name">{coin.name}</span>
                                        <span className="suggestion-symbol">{coin.symbol.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Investment */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Total Liquidity Provided</label>
                        <div className="pills-row">
                            {LIQUIDITY_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${investmentAmount === String(preset) ? 'active' : ''}`}
                                    onClick={() => setInvestmentAmount(String(preset))}
                                >
                                    ${preset >= 1000 ? `${preset / 1000}k` : preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <span className="input-prefix">$</span>
                            <input type="number" inputMode="decimal" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)}
                                placeholder="1,000" id="il-investment" step="any" min="0" />
                        </div>
                    </div>

                    {/* Token A Price Change */}
                    <div className="input-group">
                        <label><ArrowUpDown size={14} /> {tokenALabel} Price Change (%)</label>
                        <div className="pills-row">
                            {PRICE_CHANGE_PRESETS.map((p) => (
                                <button key={p} className={`pill-btn ${priceChangeA === String(p) ? 'active' : ''} ${p < 0 ? 'pill-danger' : ''}`}
                                    onClick={() => setPriceChangeA(String(p))}>
                                    {p > 0 ? '+' : ''}{p}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">%</span>
                            <input type="number" inputMode="decimal" value={priceChangeA} onChange={(e) => setPriceChangeA(e.target.value)}
                                placeholder="50" id="il-change-a" step="1" />
                        </div>
                    </div>

                    {/* Token B Price Change */}
                    <div className="input-group">
                        <label><ArrowUpDown size={14} /> {tokenBLabel} Price Change (%)</label>
                        <div className="pills-row">
                            {PRICE_CHANGE_PRESETS.map((p) => (
                                <button key={p} className={`pill-btn ${priceChangeB === String(p) ? 'active' : ''} ${p < 0 ? 'pill-danger' : ''}`}
                                    onClick={() => setPriceChangeB(String(p))}>
                                    {p > 0 ? '+' : ''}{p}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">%</span>
                            <input type="number" inputMode="decimal" value={priceChangeB} onChange={(e) => setPriceChangeB(e.target.value)}
                                placeholder="0" id="il-change-b" step="1" />
                        </div>
                    </div>

                    {/* Pool Fee APR */}
                    <div className="input-group">
                        <label><Percent size={14} /> Pool Fee APR</label>
                        <div className="pills-row">
                            {POOL_FEE_PRESETS.map((f) => (
                                <button key={f} className={`pill-btn ${poolFeeApr === String(f) ? 'active' : ''}`}
                                    onClick={() => setPoolFeeApr(String(f))}>
                                    {f}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">%</span>
                            <input type="number" inputMode="decimal" value={poolFeeApr} onChange={(e) => setPoolFeeApr(e.target.value)}
                                placeholder="20" id="il-fee" step="1" min="0" />
                        </div>
                    </div>

                    {/* Holding Period */}
                    <div className="input-group">
                        <label>Holding Period (days)</label>
                        <div className="pills-row">
                            {HOLDING_DAY_PRESETS.map((d) => (
                                <button key={d} className={`pill-btn ${holdingDays === String(d) ? 'active' : ''}`}
                                    onClick={() => setHoldingDays(String(d))}>
                                    {d === 365 ? '1yr' : d === 180 ? '6mo' : d === 90 ? '3mo' : d === 30 ? '1mo' : '1w'}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={holdingDays} onChange={(e) => setHoldingDays(e.target.value)}
                                placeholder="30" id="il-days" step="1" min="1" />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Test multiple price-ratio scenarios to see when fee APR can or cannot offset impermanent loss.
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* IL Hero */}
                            <div className="result-hero" style={{ borderColor: ilPercent < -5 ? '#ef4444' : ilPercent < -1 ? '#f59e0b' : 'var(--color-accent-green)' }}>
                                <span className="result-hero-label">Impermanent Loss</span>
                                <span className="result-hero-value" style={{ color: '#ef4444' }}>
                                    <Droplets size={28} />
                                    {ilPercent.toFixed(2)}%
                                </span>
                                <span className="result-hero-roi" style={{ color: '#ef4444' }}>
                                    {formatUSD(Math.abs(ilAbsolute))} lost vs HODLing
                                </span>
                            </div>

                            {/* Net Outcome */}
                            <div className="calc-two-col-grid" style={{ margin: '16px 0' }}>
                                <div style={{
                                    padding: '14px', background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)', borderRadius: '12px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                                        HODL Value
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>
                                        {formatUSD(hodlValue)}
                                    </div>
                                </div>
                                <div style={{
                                    padding: '14px',
                                    background: isFeesOvercomeIL ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
                                    border: `1px solid ${isFeesOvercomeIL ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                    borderRadius: '12px', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: isFeesOvercomeIL ? 'var(--color-accent-green)' : '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                                        LP Value (with fees)
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: isFeesOvercomeIL ? 'var(--color-accent-green)' : '#ef4444' }}>
                                        {formatUSD(lpValueWithFees)}
                                    </div>
                                </div>
                            </div>

                            {/* Fees vs IL Banner */}
                            <div style={{
                                padding: '10px 14px',
                                background: isFeesOvercomeIL ? 'rgba(34,197,94,0.1)' : 'rgba(249,115,22,0.1)',
                                border: `1px solid ${isFeesOvercomeIL ? 'rgba(34,197,94,0.3)' : 'rgba(249,115,22,0.3)'}`,
                                borderRadius: '10px', fontSize: '0.85rem',
                                color: isFeesOvercomeIL ? 'var(--color-accent-green)' : '#f97316',
                                display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px',
                            }}>
                                {isFeesOvercomeIL ? <TrendingUp size={16} /> : <AlertTriangle size={16} />}
                                {isFeesOvercomeIL
                                    ? `Fee earnings (${formatUSD(feeEarnings)}) overcome IL (${formatUSD(Math.abs(ilAbsolute))}) — LP is profitable vs HODL!`
                                    : `Fee earnings (${formatUSD(feeEarnings)}) do NOT overcome IL (${formatUSD(Math.abs(ilAbsolute))}) — HODL is better.`
                                }
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Initial Investment')}</span>
                                    <span className="result-value">{formatUSD(investment)}</span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label">{tokenALabel} Price Change</span>
                                    <span className={`result-value ${changeA >= 0 ? 'profit' : 'fee'}`}>{formatPercent(changeA)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{tokenBLabel} Price Change</span>
                                    <span className={`result-value ${changeB >= 0 ? 'profit' : 'fee'}`}>{formatPercent(changeB)}</span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label"><strong>Impermanent Loss</strong></span>
                                    <span className="result-value fee"><strong>{ilPercent.toFixed(2)}% ({formatUSD(Math.abs(ilAbsolute))})</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">LP Value (before fees)</span>
                                    <span className="result-value">{formatUSD(lpValueBeforeFees)}</span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label">Fee Earnings ({days} days)</span>
                                    <span className="result-value profit">+{formatUSD(feeEarnings)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>LP Value (with fees)</strong></span>
                                    <span className={`result-value ${lpValueWithFees >= investment ? 'profit' : 'fee'}`}>
                                        <strong>{formatUSD(lpValueWithFees)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />

                                <div className="result-row">
                                    <span className="result-label"><strong>Net vs HODL</strong></span>
                                    <span className={`result-value ${netVsHodl >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{netVsHodl >= 0 ? '+' : ''}{formatUSD(netVsHodl)} ({formatPercent(netVsHodlPercent)})</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Return')}</strong></span>
                                    <span className={`result-value ${totalReturn >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{totalReturn >= 0 ? '+' : ''}{formatUSD(totalReturn)} ({formatPercent(totalReturnPercent)})</strong>
                                    </span>
                                </div>
                            </div>

                            {/* IL Reference Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    IL at Different Price Changes (Token A vs B)
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Price Δ')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'IL %')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'IL $')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ilCurve.map((d) => (
                                                <tr key={d.pct} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: d.pct === changeA ? 'rgba(99,102,241,0.06)' : undefined,
                                                }}>
                                                    <td style={{ padding: '8px', fontWeight: d.pct === changeA ? 600 : 400 }}>
                                                        {d.pct > 0 ? '+' : ''}{d.pct}%
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: '#ef4444', fontWeight: 500 }}>
                                                        {d.il.toFixed(2)}%
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: '#ef4444' }}>
                                                        {formatUSD(Math.abs(d.il / 100 * investment))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                Based on constant product AMM (Uniswap V2 style). Concentrated liquidity pools (V3) have different IL characteristics.
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Droplets size={40} /></div>
                            <h3>Calculate Impermanent Loss</h3>
                            <p>Enter your liquidity and expected price changes to see how impermanent loss compares to fee earnings in an AMM pool.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
