import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    TrendingUp,
    TrendingDown,
    RotateCcw,
    Info,
    DollarSign,
    Percent,
    Calendar,
    ArrowUpDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    basisAbsolute: number;
    basisPct: number;
    annualizedBasis: number;
    cashCarryYield: number;
    isContango: boolean;
    basisProfit: number;
    breakEvenFee: number;
    totalFees: number;
}

const SCENARIOS = [
    {
        label: 'BTC Quarterly',
        spotPrice: '77300',
        futuresPrice: '79000',
        daysToExpiry: '90',
        positionSize: '10000',
        tradingFee: '0.05',
    },
    {
        label: 'ETH Monthly',
        spotPrice: '2400',
        futuresPrice: '2430',
        daysToExpiry: '30',
        positionSize: '10000',
        tradingFee: '0.05',
    },
    {
        label: 'Contango Hot',
        spotPrice: '77300',
        futuresPrice: '82000',
        daysToExpiry: '60',
        positionSize: '10000',
        tradingFee: '0.05',
    },
] as const;

const POSITION_PILLS = ['5000', '10000', '25000', '50000'];

function FuturesBasisCalculator({ lang = 'en' }: { lang?: string }) {
    const [spotPrice, setSpotPrice] = useState('77300');
    const [futuresPrice, setFuturesPrice] = useState('78500');
    const [daysToExpiry, setDaysToExpiry] = useState('30');
    const [positionSize, setPositionSize] = useState('10000');
    const [tradingFee, setTradingFee] = useState('0.05');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setSpotPrice(s.spotPrice);
        setFuturesPrice(s.futuresPrice);
        setDaysToExpiry(s.daysToExpiry);
        setPositionSize(s.positionSize);
        setTradingFee(s.tradingFee);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        spotPrice === s.spotPrice &&
        futuresPrice === s.futuresPrice &&
        daysToExpiry === s.daysToExpiry &&
        positionSize === s.positionSize &&
        tradingFee === s.tradingFee;

    const results = useMemo<Results | null>(() => {
        const spot = parseFloat(spotPrice) || 0;
        const futures = parseFloat(futuresPrice) || 0;
        const days = parseFloat(daysToExpiry) || 0;
        const size = parseFloat(positionSize) || 0;
        const feePct = parseFloat(tradingFee) || 0;

        if (spot <= 0 || futures <= 0 || days <= 0 || size <= 0) return null;

        const basisAbsolute = futures - spot;
        const basisPct = (basisAbsolute / spot) * 100;
        const annualizedBasis = days > 0 ? (basisPct / days) * 365 : 0;
        const isContango = basisAbsolute > 0;

        // Fees: per side means 2 sides (buy spot + sell futures, then reverse at expiry = 4 legs)
        // Cash-and-carry: buy spot + sell futures at open, then deliver at expiry = 2 sides
        const totalFees = size * (feePct / 100) * 2;

        // Profit from basis trade
        const basisProfit = (Math.abs(basisPct) / 100) * size - totalFees;

        // Cash-and-carry yield (annualized, after fees)
        const netBasisPct = Math.abs(basisPct) - (totalFees / size) * 100;
        const cashCarryYield = days > 0 ? (netBasisPct / days) * 365 : 0;

        // Break-even fee: max fee per side before trade is unprofitable
        // totalFees = size * (feePerSide/100) * 2 = basisAbsolute/spot * size
        const breakEvenFee = spot > 0 ? ((Math.abs(basisAbsolute) / spot) * 100) / 2 : 0;

        return {
            basisAbsolute,
            basisPct,
            annualizedBasis,
            cashCarryYield,
            isContango,
            basisProfit,
            breakEvenFee,
            totalFees,
        };
    }, [spotPrice, futuresPrice, daysToExpiry, positionSize, tradingFee]);

    const reset = () => {
        setSpotPrice('77300');
        setFuturesPrice('78500');
        setDaysToExpiry('30');
        setPositionSize('10000');
        setTradingFee('0.05');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);
    };

    const formatPercent = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(3)}%`;
    };

    const formatPercentApy = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(2)}%`;
    };

    const isProfitable = results ? results.basisProfit > 0 : true;

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
                        <label htmlFor="basis-spot-price">
                            <DollarSign size={14} /> {getUiString(lang, 'Spot Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={spotPrice}
                            onChange={(e) => setSpotPrice(e.target.value)}
                            id="basis-spot-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="basis-futures-price">
                            <DollarSign size={14} /> {getUiString(lang, 'Futures Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={futuresPrice}
                            onChange={(e) => setFuturesPrice(e.target.value)}
                            id="basis-futures-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="basis-days">
                            <Calendar size={14} /> {getUiString(lang, 'Days to Expiry')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={daysToExpiry}
                            onChange={(e) => setDaysToExpiry(e.target.value)}
                            id="basis-days"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="basis-position-size">
                            <DollarSign size={14} /> {getUiString(lang, 'Position Size ($)')}
                        </label>
                        <div className="pills-row">
                            {POSITION_PILLS.map((v) => (
                                <button
                                    key={v}
                                    className={`pill-btn ${positionSize === v ? 'active' : ''}`}
                                    onClick={() => setPositionSize(v)}
                                >
                                    ${Number(v).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={positionSize}
                            onChange={(e) => setPositionSize(e.target.value)}
                            id="basis-position-size"
                            step="any"
                            min="0"
                            style={{ marginTop: '8px' }}
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="basis-fee">
                            <Percent size={14} /> {getUiString(lang, 'Trading Fee per Side (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={tradingFee}
                            onChange={(e) => setTradingFee(e.target.value)}
                            id="basis-fee"
                            step="0.01"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare spot and futures prices to evaluate basis trade opportunities.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className={`result-hero ${isProfitable ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {results.isContango
                                        ? getUiString(lang, 'Contango (Futures Premium)')
                                        : getUiString(lang, 'Backwardation (Futures Discount)')}
                                </span>
                                <span className="result-hero-value">
                                    {results.isContango ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {formatPercent(Math.abs(results.basisPct))}
                                </span>
                                <span className="result-hero-roi">
                                    {formatPercentApy(results.annualizedBasis)} {getUiString(lang, 'annualized')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Basis (Absolute)')}</span>
                                    <span className="result-value">{formatUSD(results.basisAbsolute)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Basis (%)')}</span>
                                    <span className="result-value">{formatPercent(results.basisPct)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Annualized Basis')}</strong>
                                    </span>
                                    <span className="result-value">
                                        <strong>{formatPercentApy(results.annualizedBasis)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Trading Fees')}</span>
                                    <span className="result-value fee">{formatUSD(results.totalFees)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Cash-and-Carry Yield (APY)')}</strong>
                                    </span>
                                    <span className={`result-value ${results.cashCarryYield > 0 ? 'profit' : 'fee'}`}>
                                        <strong>{formatPercentApy(results.cashCarryYield)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Basis Trade Profit')}</strong>
                                    </span>
                                    <span className={`result-value ${isProfitable ? 'profit' : 'fee'}`}>
                                        <strong>{isProfitable ? '+' : ''}{formatUSD(results.basisProfit)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Break-Even Fee (per side)')}</span>
                                    <span className="result-value">{formatPercent(results.breakEvenFee)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Equivalent APY Comparison')}</span>
                                    <span className="result-value" />
                                </div>
                                <div className="result-row" style={{ paddingLeft: '12px' }}>
                                    <span className="result-label">{getUiString(lang, 'Basis Trade')}</span>
                                    <span className={`result-value ${results.cashCarryYield > 0 ? 'profit' : 'fee'}`}>
                                        {formatPercentApy(results.cashCarryYield)}
                                    </span>
                                </div>
                                <div className="result-row" style={{ paddingLeft: '12px' }}>
                                    <span className="result-label">{getUiString(lang, 'ETH Staking (~3.5%)')}</span>
                                    <span className="result-value">3.50%</span>
                                </div>
                                <div className="result-row" style={{ paddingLeft: '12px' }}>
                                    <span className="result-label">{getUiString(lang, 'DeFi Lending (~5%)')}</span>
                                    <span className="result-value">5.00%</span>
                                </div>
                                <div className="result-row" style={{ paddingLeft: '12px' }}>
                                    <span className="result-label">{getUiString(lang, 'T-Bills (~4.5%)')}</span>
                                    <span className="result-value">4.50%</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Basis trades carry execution risk, margin requirements, and potential funding rate costs. Past basis levels do not guarantee future returns.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowUpDown size={40} /></div>
                            <h2>{getUiString(lang, 'Analyze Futures Basis')}</h2>
                            <p>{getUiString(lang, 'Enter spot and futures prices to evaluate the basis spread and potential cash-and-carry yield.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(FuturesBasisCalculator);
