import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    Calendar,
    BarChart3,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    breakEven: number;
    maxProfit: number;
    maxLoss: number;
    intrinsicValue: number;
    timeValue: number;
    pnlAtExpiry: number;
    fairValue: number;        // Black-Scholes theoretical price (uses IV + days to expiry)
    delta: number;            // ∂price/∂spot
    impliedMispricing: number; // (premium - fairValue) / fairValue × 100
}

interface PayoffRow {
    label: string;
    spotPrice: number;
    pnl: number;
}

// Standard normal CDF (Abramowitz & Stegun 7.1.26 approximation, error < 7.5e-8).
function normalCDF(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const ax = Math.abs(x) / Math.sqrt(2);
    const t = 1.0 / (1.0 + p * ax);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
    return 0.5 * (1.0 + sign * y);
}

// Black-Scholes pricing with risk-free rate r=0 (close enough for short-dated crypto options).
// Returns { price, delta }.
function blackScholes(spot: number, strike: number, daysToExpiry: number, ivPct: number, isCall: boolean): { price: number; delta: number } {
    if (spot <= 0 || strike <= 0 || daysToExpiry <= 0 || ivPct <= 0) {
        return { price: 0, delta: 0 };
    }
    const T = daysToExpiry / 365;
    const sigma = ivPct / 100;
    const sqrtT = Math.sqrt(T);
    const d1 = (Math.log(spot / strike) + (0.5 * sigma * sigma) * T) / (sigma * sqrtT);
    const d2 = d1 - sigma * sqrtT;
    if (isCall) {
        const price = spot * normalCDF(d1) - strike * normalCDF(d2);
        return { price, delta: normalCDF(d1) };
    } else {
        const price = strike * normalCDF(-d2) - spot * normalCDF(-d1);
        return { price, delta: normalCDF(d1) - 1 };
    }
}

const SCENARIOS = [
    {
        label: 'BTC Call ATM',
        optionType: 'call' as const,
        spotPrice: '67500',
        strikePrice: '67500',
        premium: '3200',
        contracts: '1',
        daysToExpiry: '30',
        iv: '55',
    },
    {
        label: 'ETH Put OTM',
        optionType: 'put' as const,
        spotPrice: '2400',
        strikePrice: '2200',
        premium: '80',
        contracts: '5',
        daysToExpiry: '14',
        iv: '65',
    },
    {
        label: 'BTC Call Deep ITM',
        optionType: 'call' as const,
        spotPrice: '67500',
        strikePrice: '55000',
        premium: '13500',
        contracts: '1',
        daysToExpiry: '60',
        iv: '50',
    },
] as const;

function OptionsCalculator({ lang = 'en' }: { lang?: string }) {
    const [optionType, setOptionType] = useState<'call' | 'put'>('call');
    const [spotPrice, setSpotPrice] = useState('');
    const [strikePrice, setStrikePrice] = useState('');
    const [premium, setPremium] = useState('');
    const [contracts, setContracts] = useState('1');
    const [daysToExpiry, setDaysToExpiry] = useState('30');
    const [iv, setIv] = useState('55');
    const [results, setResults] = useState<Results | null>(null);
    const [payoffTable, setPayoffTable] = useState<PayoffRow[]>([]);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setOptionType(s.optionType);
        setSpotPrice(s.spotPrice);
        setStrikePrice(s.strikePrice);
        setPremium(s.premium);
        setContracts(s.contracts);
        setDaysToExpiry(s.daysToExpiry);
        setIv(s.iv);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        optionType === s.optionType && spotPrice === s.spotPrice && strikePrice === s.strikePrice &&
        premium === s.premium && contracts === s.contracts && daysToExpiry === s.daysToExpiry && iv === s.iv;

    const calculate = useCallback(() => {
        const spot = parseFloat(spotPrice) || 0;
        const strike = parseFloat(strikePrice) || 0;
        const prem = parseFloat(premium) || 0;
        const qty = parseFloat(contracts) || 0;
        const days = parseFloat(daysToExpiry) || 0;
        const ivPct = parseFloat(iv) || 0;

        if (spot <= 0 || strike <= 0 || prem <= 0 || qty <= 0) { setResults(null); setPayoffTable([]); return; }

        const totalPremium = prem * qty;

        // Intrinsic value
        const intrinsicValue = optionType === 'call'
            ? Math.max(spot - strike, 0)
            : Math.max(strike - spot, 0);
        const timeValue = Math.max(prem - intrinsicValue, 0);

        // Break-even
        const breakEven = optionType === 'call' ? strike + prem : strike - prem;

        // P&L at expiry (at current spot)
        const pnlPerContract = optionType === 'call'
            ? Math.max(spot - strike, 0) - prem
            : Math.max(strike - spot, 0) - prem;
        const pnlAtExpiry = pnlPerContract * qty;

        // Max profit / loss
        const maxLoss = totalPremium;
        const maxProfit = optionType === 'put' ? (strike - prem) * qty : Infinity;

        // Black-Scholes fair value (uses IV and days to expiry)
        const bs = blackScholes(spot, strike, days, ivPct, optionType === 'call');
        const fairValue = bs.price;
        const delta = bs.delta;
        const impliedMispricing = fairValue > 0 ? ((prem - fairValue) / fairValue) * 100 : 0;

        setResults({
            breakEven, maxProfit, maxLoss, intrinsicValue, timeValue, pnlAtExpiry,
            fairValue, delta, impliedMispricing,
        });

        // Payoff table at different spot prices
        const offsets = [-50, -30, -20, -10, 0, 10, 20, 30, 50];
        const rows: PayoffRow[] = offsets.map((pct) => {
            const futureSpot = spot * (1 + pct / 100);
            const futurePnl = optionType === 'call'
                ? (Math.max(futureSpot - strike, 0) - prem) * qty
                : (Math.max(strike - futureSpot, 0) - prem) * qty;
            return {
                label: `${pct >= 0 ? '+' : ''}${pct}%`,
                spotPrice: futureSpot,
                pnl: futurePnl,
            };
        });
        setPayoffTable(rows);
    }, [spotPrice, strikePrice, premium, contracts, optionType, daysToExpiry, iv]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setOptionType('call'); setSpotPrice(''); setStrikePrice(''); setPremium('');
        setContracts('1'); setDaysToExpiry('30'); setIv('55');
        setResults(null); setPayoffTable([]);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return getUiString(lang, 'Unlimited');
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const isProfit = results ? results.pnlAtExpiry >= 0 : true;

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
                        <label>{getUiString(lang, 'Option Type')}</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${optionType === 'call' ? 'active' : ''}`}
                                onClick={() => setOptionType('call')}>
                                <TrendingUp size={14} /> {getUiString(lang, 'Call')}
                            </button>
                            <button className={`toggle-btn toggle-short ${optionType === 'put' ? 'active' : ''}`}
                                onClick={() => setOptionType('put')}>
                                <TrendingDown size={14} /> {getUiString(lang, 'Put')}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-spot"><DollarSign size={14} /> {getUiString(lang, 'Spot Price ($)')}</label>
                        <input type="number" inputMode="decimal" value={spotPrice} onChange={(e) => setSpotPrice(e.target.value)}
                            id="opt-spot" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-strike"><DollarSign size={14} /> {getUiString(lang, 'Strike Price ($)')}</label>
                        <input type="number" inputMode="decimal" value={strikePrice} onChange={(e) => setStrikePrice(e.target.value)}
                            id="opt-strike" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-premium"><DollarSign size={14} /> {getUiString(lang, 'Premium Paid ($)')}</label>
                        <input type="number" inputMode="decimal" value={premium} onChange={(e) => setPremium(e.target.value)}
                            id="opt-premium" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-contracts">{getUiString(lang, 'Contracts')}</label>
                        <div className="pills-row">
                            {['1', '2', '5', '10'].map((v) => (
                                <button key={v} className={`pill-btn ${contracts === v ? 'active' : ''}`}
                                    onClick={() => setContracts(v)}>{v}</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={contracts} onChange={(e) => setContracts(e.target.value)}
                            id="opt-contracts" step="1" min="1" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-days"><Calendar size={14} /> {getUiString(lang, 'Days to Expiry')}</label>
                        <div className="pills-row">
                            {['7', '14', '30', '60', '90'].map((v) => (
                                <button key={v} className={`pill-btn ${daysToExpiry === v ? 'active' : ''}`}
                                    onClick={() => setDaysToExpiry(v)}>{v}d</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={daysToExpiry} onChange={(e) => setDaysToExpiry(e.target.value)}
                            id="opt-days" step="1" min="1" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="opt-iv"><Percent size={14} /> {getUiString(lang, 'Implied Volatility (%)')}</label>
                        <div className="pills-row">
                            {['30', '45', '55', '70', '100'].map((v) => (
                                <button key={v} className={`pill-btn ${iv === v ? 'active' : ''}`}
                                    onClick={() => setIv(v)}>{v}%</button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={iv} onChange={(e) => setIv(e.target.value)}
                            id="opt-iv" step="1" min="0" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Toggle Call/Put and use presets for common crypto options strategies.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'P&L at Expiry (Current Spot)')}
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {isProfit ? '+' : ''}{formatUSD(results.pnlAtExpiry)}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
                                    {optionType === 'call' ? getUiString(lang, 'Call') : getUiString(lang, 'Put')} &middot; {contracts} {getUiString(lang, 'contract(s)')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Break-Even Price')}</span>
                                    <span className="result-value">{formatUSD(results.breakEven)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Max Loss')}</span>
                                    <span className="result-value fee">{formatUSD(results.maxLoss)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Max Profit')}</span>
                                    <span className="result-value profit">{formatUSD(results.maxProfit)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Intrinsic Value')}</span>
                                    <span className="result-value">{formatUSD(results.intrinsicValue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Time Value')}</span>
                                    <span className="result-value">{formatUSD(results.timeValue)}</span>
                                </div>
                            </div>

                            {/* Payoff Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    <BarChart3 size={14} style={{ marginRight: '6px', verticalAlign: '-2px' }} />
                                    {getUiString(lang, 'Payoff at Expiry')}
                                </h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Move')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Spot Price')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'P&L')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payoffTable.map((row) => (
                                                <tr key={row.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 500 }}>{row.label}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right' }}>{formatUSD(row.spotPrice)}</td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 600,
                                                        color: row.pnl >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                                    }}>
                                                        {row.pnl >= 0 ? '+' : ''}{formatUSD(row.pnl)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Options pricing is complex. This simplified calculator shows payoff at expiry only. Actual P&L depends on Greeks, liquidity, and market conditions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><BarChart3 size={40} /></div>
                            <h2>{getUiString(lang, 'Calculate Options P&L')}</h2>
                            <p>{getUiString(lang, 'Enter option details to see break-even, max profit/loss, and payoff at different price levels.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(OptionsCalculator);
