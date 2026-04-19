import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    RotateCcw,
    Info,
    Unlock,
    DollarSign,
    Percent,
    Calendar,
    TrendingDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    postUnlockSupply: number;
    dilutionPct: number;
    estimatedSellPressure: number;
    projectedPriceImpact: number;
    projectedPrice: number;
    newMarketCap: number;
    fdv: number;
    currentMarketCap: number;
    unlockPctOfCirculating: number;
}

const SCENARIOS = [
    {
        label: 'Small Unlock (5%)',
        circulatingSupply: '500000000',
        totalSupply: '1000000000',
        unlockAmount: '50000000',
        daysUntilUnlock: '30',
        currentPrice: '1.00',
        sellPressurePct: '30',
    },
    {
        label: 'Medium (10%)',
        circulatingSupply: '400000000',
        totalSupply: '1000000000',
        unlockAmount: '100000000',
        daysUntilUnlock: '14',
        currentPrice: '2.50',
        sellPressurePct: '35',
    },
    {
        label: 'Cliff Unlock (25%)',
        circulatingSupply: '300000000',
        totalSupply: '1000000000',
        unlockAmount: '250000000',
        daysUntilUnlock: '7',
        currentPrice: '0.80',
        sellPressurePct: '40',
    },
] as const;

function TokenUnlockCalculator({ lang = 'en' }: { lang?: string }) {
    const [circulatingSupply, setCirculatingSupply] = useState('500000000');
    const [totalSupply, setTotalSupply] = useState('1000000000');
    const [unlockAmount, setUnlockAmount] = useState('50000000');
    const [daysUntilUnlock, setDaysUntilUnlock] = useState('30');
    const [currentPrice, setCurrentPrice] = useState('1');
    const [sellPressurePct, setSellPressurePct] = useState('30');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setCirculatingSupply(s.circulatingSupply);
        setTotalSupply(s.totalSupply);
        setUnlockAmount(s.unlockAmount);
        setDaysUntilUnlock(s.daysUntilUnlock);
        setCurrentPrice(s.currentPrice);
        setSellPressurePct(s.sellPressurePct);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        circulatingSupply === s.circulatingSupply &&
        totalSupply === s.totalSupply &&
        unlockAmount === s.unlockAmount &&
        daysUntilUnlock === s.daysUntilUnlock &&
        currentPrice === s.currentPrice &&
        sellPressurePct === s.sellPressurePct;

    const results = useMemo<Results | null>(() => {
        const circ = parseFloat(circulatingSupply) || 0;
        const total = parseFloat(totalSupply) || 0;
        const unlock = parseFloat(unlockAmount) || 0;
        const price = parseFloat(currentPrice) || 0;
        const sellPct = parseFloat(sellPressurePct) || 0;

        if (circ <= 0 || total <= 0 || unlock <= 0 || price <= 0) return null;

        const postUnlockSupply = circ + unlock;
        const dilutionPct = circ > 0 ? (unlock / circ) * 100 : 0;
        const unlockPctOfCirculating = circ > 0 ? (unlock / circ) * 100 : 0;

        // Estimated tokens that will be sold
        const tokensSold = unlock * (sellPct / 100);
        const estimatedSellPressure = tokensSold * price;

        // Simple price impact model:
        // Assume sell pressure as percentage of current market cap creates proportional price decline
        const currentMarketCap = circ * price;
        // Price impact = sell pressure / (market cap * depth factor)
        // Using a simplified elasticity model where 1% of market cap sold = ~1% price drop
        const projectedPriceImpact = currentMarketCap > 0
            ? -(estimatedSellPressure / currentMarketCap) * 100
            : 0;

        const projectedPrice = price * (1 + projectedPriceImpact / 100);
        const newMarketCap = postUnlockSupply * Math.max(0, projectedPrice);
        const fdv = total * Math.max(0, projectedPrice);

        return {
            postUnlockSupply,
            dilutionPct,
            estimatedSellPressure,
            projectedPriceImpact,
            projectedPrice,
            newMarketCap,
            fdv,
            currentMarketCap,
            unlockPctOfCirculating,
        };
    }, [circulatingSupply, totalSupply, unlockAmount, currentPrice, sellPressurePct]);

    const reset = () => {
        setCirculatingSupply('500000000');
        setTotalSupply('1000000000');
        setUnlockAmount('50000000');
        setDaysUntilUnlock('30');
        setCurrentPrice('1');
        setSellPressurePct('30');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        if (Math.abs(n) >= 1e9) {
            return `$${(n / 1e9).toFixed(2)}B`;
        }
        if (Math.abs(n) >= 1e6) {
            return `$${(n / 1e6).toFixed(2)}M`;
        }
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPrice = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        }).format(n);
    };

    const formatNumber = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
        if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
        return new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {SCENARIOS.map((s) => (
                                <button
                                    key={s.label}
                                    className={`pill-btn ${isScenarioActive(s) ? 'active' : ''}`}
                                    onClick={() => applyScenario(s)}
                                >
                                    {getUiString(lang, s.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-circ-supply">
                            <Unlock size={14} /> {getUiString(lang, 'Current Circulating Supply')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={circulatingSupply}
                            onChange={(e) => setCirculatingSupply(e.target.value)}
                            id="unlock-circ-supply"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-total-supply">
                            <Unlock size={14} /> {getUiString(lang, 'Total Supply')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={totalSupply}
                            onChange={(e) => setTotalSupply(e.target.value)}
                            id="unlock-total-supply"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-amount">
                            <Unlock size={14} /> {getUiString(lang, 'Upcoming Unlock Amount (tokens)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={unlockAmount}
                            onChange={(e) => setUnlockAmount(e.target.value)}
                            id="unlock-amount"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-days">
                            <Calendar size={14} /> {getUiString(lang, 'Days Until Unlock')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={daysUntilUnlock}
                            onChange={(e) => setDaysUntilUnlock(e.target.value)}
                            id="unlock-days"
                            step="1"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-price">
                            <DollarSign size={14} /> {getUiString(lang, 'Current Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={currentPrice}
                            onChange={(e) => setCurrentPrice(e.target.value)}
                            id="unlock-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="unlock-sell-pressure">
                            <Percent size={14} /> {getUiString(lang, 'Historical Sell Pressure (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={sellPressurePct}
                            onChange={(e) => setSellPressurePct(e.target.value)}
                            id="unlock-sell-pressure"
                            step="1"
                            min="0"
                            max="100"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Model the price impact of upcoming token unlocks and vesting cliffs.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero loss">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Projected Price Impact')}
                                </span>
                                <span className="result-hero-value">
                                    <TrendingDown size={28} />
                                    {formatPercent(results.projectedPriceImpact)}
                                </span>
                                <span className="result-hero-roi">
                                    {formatPrice(results.projectedPrice)} {getUiString(lang, 'projected price')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Post-Unlock Circulating Supply')}</span>
                                    <span className="result-value">{formatNumber(results.postUnlockSupply)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Dilution')}</span>
                                    <span className="result-value fee">{formatPercent(results.dilutionPct)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Unlock % of Circulating')}</span>
                                    <span className="result-value">{formatPercent(results.unlockPctOfCirculating)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Estimated Sell Pressure')}</strong>
                                    </span>
                                    <span className="result-value fee">
                                        <strong>{formatUSD(results.estimatedSellPressure)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Market Cap')}</span>
                                    <span className="result-value">{formatUSD(results.currentMarketCap)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'New Market Cap')}</span>
                                    <span className="result-value">{formatUSD(results.newMarketCap)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'FDV (Fully Diluted Valuation)')}</span>
                                    <span className="result-value">{formatUSD(results.fdv)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Token unlock impact depends on market conditions, OTC deals, and staking lockups. Actual price impact may differ significantly from projections.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Unlock size={40} /></div>
                            <h3>{getUiString(lang, 'Analyze Token Unlock Impact')}</h3>
                            <p>{getUiString(lang, 'Enter token supply and unlock details to project the price impact of upcoming vesting events.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(TokenUnlockCalculator);
