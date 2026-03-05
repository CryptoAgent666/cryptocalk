import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    Trophy,
    BarChart3,
    Activity,
    Calendar,
    Repeat,
} from 'lucide-react';

interface Results {
    hodlFinalValue: number;
    hodlROI: number;
    hodlProfit: number;
    tradingFinalValue: number;
    tradingROI: number;
    tradingProfit: number;
    totalTrades: number;
    totalFeesPaid: number;
    winner: 'hodl' | 'trading' | 'tie';
    differenceUSD: number;
    differencePercent: number;
}
const PRICE_CHANGE_PILLS = ['-30', '-10', '20', '50', '100'];
const AVG_PROFIT_PILLS = ['1', '2', '3', '5'];
const AVG_LOSS_PILLS = ['1', '2', '3', '5'];
const TRADING_FEE_PILLS = ['0.05', '0.1', '0.2', '0.5'];
const HODL_VS_TRADE_SCENARIOS = [
    {
        label: 'Bull HODL',
        startingCapital: '5000',
        priceChange: '100',
        winRate: '50',
        avgProfit: '2',
        avgLoss: '2',
        tradesPerMonth: '10',
        tradingPeriod: '6',
        tradingFee: '0.1',
    },
    {
        label: 'Active Edge',
        startingCapital: '5000',
        priceChange: '20',
        winRate: '60',
        avgProfit: '3',
        avgLoss: '1',
        tradesPerMonth: '20',
        tradingPeriod: '6',
        tradingFee: '0.1',
    },
    {
        label: 'Choppy Tape',
        startingCapital: '5000',
        priceChange: '-10',
        winRate: '45',
        avgProfit: '2',
        avgLoss: '3',
        tradesPerMonth: '20',
        tradingPeriod: '6',
        tradingFee: '0.1',
    },
] as const;

export default function HodlVsTradeCalculator({ lang = 'en' }: { lang?: string }) {
    const [startingCapital, setStartingCapital] = useState('');
    const [priceChange, setPriceChange] = useState('');
    const [winRate, setWinRate] = useState('50');
    const [avgProfit, setAvgProfit] = useState('');
    const [avgLoss, setAvgLoss] = useState('');
    const [tradesPerMonth, setTradesPerMonth] = useState('10');
    const [tradingPeriod, setTradingPeriod] = useState('6');
    const [tradingFee, setTradingFee] = useState('0.1');
    const [results, setResults] = useState<Results | null>(null);

    const calculate = useCallback(() => {
        const capital = parseFloat(startingCapital);
        const change = parseFloat(priceChange);
        const wr = parseFloat(winRate);
        const profit = parseFloat(avgProfit);
        const loss = parseFloat(avgLoss);
        const tpm = parseFloat(tradesPerMonth);
        const months = parseFloat(tradingPeriod);
        const fee = parseFloat(tradingFee);

        if (
            isNaN(capital) || capital <= 0 ||
            isNaN(change) ||
            isNaN(wr) || wr < 0 || wr > 100 ||
            isNaN(profit) || profit <= 0 ||
            isNaN(loss) || loss <= 0 ||
            isNaN(tpm) || tpm <= 0 ||
            isNaN(months) || months <= 0 ||
            isNaN(fee) || fee < 0
        ) {
            setResults(null);
            return;
        }

        // HODL calculation
        const hodlFinalValue = capital * (1 + change / 100);
        const hodlProfit = hodlFinalValue - capital;
        const hodlROI = (hodlProfit / capital) * 100;

        // Trading simulation month by month
        let balance = capital;
        let totalTrades = 0;
        let totalFeesPaid = 0;

        for (let m = 0; m < months; m++) {
            const trades = Math.round(tpm);
            const wins = Math.round(trades * wr / 100);
            const losses = trades - wins;

            // Process winning trades
            for (let w = 0; w < wins; w++) {
                const feeAmount = balance * (fee / 100);
                totalFeesPaid += feeAmount;
                balance = balance * (1 + profit / 100) - feeAmount;
                if (balance <= 0) { balance = 0; break; }
            }

            // Process losing trades
            if (balance > 0) {
                for (let l = 0; l < losses; l++) {
                    const feeAmount = balance * (fee / 100);
                    totalFeesPaid += feeAmount;
                    balance = balance * (1 - loss / 100) - feeAmount;
                    if (balance <= 0) { balance = 0; break; }
                }
            }

            totalTrades += trades;
        }

        const tradingFinalValue = Math.max(0, balance);
        const tradingProfit = tradingFinalValue - capital;
        const tradingROI = (tradingProfit / capital) * 100;

        // Determine winner
        let winner: 'hodl' | 'trading' | 'tie';
        if (Math.abs(hodlFinalValue - tradingFinalValue) < 0.01) {
            winner = 'tie';
        } else if (hodlFinalValue > tradingFinalValue) {
            winner = 'hodl';
        } else {
            winner = 'trading';
        }

        const differenceUSD = Math.abs(hodlFinalValue - tradingFinalValue);
        const loserValue = Math.min(hodlFinalValue, tradingFinalValue);
        const differencePercent = loserValue > 0 ? (differenceUSD / loserValue) * 100 : 0;

        setResults({
            hodlFinalValue,
            hodlROI,
            hodlProfit,
            tradingFinalValue,
            tradingROI,
            tradingProfit,
            totalTrades,
            totalFeesPaid,
            winner,
            differenceUSD,
            differencePercent,
        });
    }, [startingCapital, priceChange, winRate, avgProfit, avgLoss, tradesPerMonth, tradingPeriod, tradingFee]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setStartingCapital('');
        setPriceChange('');
        setWinRate('50');
        setAvgProfit('');
        setAvgLoss('');
        setTradesPerMonth('10');
        setTradingPeriod('6');
        setTradingFee('0.1');
        setResults(null);
    };
    const applyScenario = (scenario: (typeof HODL_VS_TRADE_SCENARIOS)[number]) => {
        setStartingCapital(scenario.startingCapital);
        setPriceChange(scenario.priceChange);
        setWinRate(scenario.winRate);
        setAvgProfit(scenario.avgProfit);
        setAvgLoss(scenario.avgLoss);
        setTradesPerMonth(scenario.tradesPerMonth);
        setTradingPeriod(scenario.tradingPeriod);
        setTradingFee(scenario.tradingFee);
    };
    const isScenarioActive = (scenario: (typeof HODL_VS_TRADE_SCENARIOS)[number]) => (
        startingCapital === scenario.startingCapital
        && priceChange === scenario.priceChange
        && winRate === scenario.winRate
        && avgProfit === scenario.avgProfit
        && avgLoss === scenario.avgLoss
        && tradesPerMonth === scenario.tradesPerMonth
        && tradingPeriod === scenario.tradingPeriod
        && tradingFee === scenario.tradingFee
    );

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatPercent = (n: number) => `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;

    const getWinnerColor = (winner: string) => {
        if (winner === 'hodl') return '#f59e0b';
        if (winner === 'trading') return 'var(--color-accent-green)';
        return 'var(--color-text-muted)';
    };

    const getWinnerLabel = (winner: string) => {
        if (winner === 'hodl') return getUiString(lang, 'HODL Wins!');
        if (winner === 'trading') return getUiString(lang, 'Trading Wins!');
        return getUiString(lang, "It's a Tie!");
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {HODL_VS_TRADE_SCENARIOS.map((scenario) => (
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

                    {/* Starting Capital */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Starting Capital')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={startingCapital}
                                onChange={(e) => setStartingCapital(e.target.value)}
                                placeholder=""
                                id="hodl-capital"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {['500', '1000', '5000', '10000'].map((a) => (
                                <button
                                    key={a}
                                    className={`pill-btn ${startingCapital === a ? 'active' : ''}`}
                                    onClick={() => setStartingCapital(a)}
                                >
                                    ${Number(a).toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* HODL Section Header */}
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#f59e0b',
                        marginTop: '8px',
                        marginBottom: '-4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <TrendingUp size={14} />
                        {getUiString(lang, 'HODL Strategy')}
                    </div>

                    {/* Price Change */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            {getUiString(lang, 'Price Change (%)')}
                        </label>
                        <div className="pills-row">
                            {PRICE_CHANGE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${priceChange === preset ? 'active' : ''} ${Number(preset) < 0 ? 'pill-danger' : ''}`}
                                    onClick={() => setPriceChange(preset)}
                                >
                                    {Number(preset) > 0 ? '+' : ''}{preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={priceChange}
                                onChange={(e) => setPriceChange(e.target.value)}
                                placeholder=""
                                id="hodl-price-change"
                                step="any"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Trading Section Header */}
                    <div style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--color-accent-green)',
                        marginTop: '8px',
                        marginBottom: '-4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <Activity size={14} />
                        {getUiString(lang, 'Trading Strategy')}
                    </div>

                    {/* Win Rate */}
                    <div className="input-group">
                        <label>
                            <BarChart3 size={14} />
                            {getUiString(lang, 'Win Rate (%)')}
                        </label>
                        <div className="pills-row">
                            {['40', '50', '60', '70'].map((w) => (
                                <button
                                    key={w}
                                    className={`pill-btn ${winRate === w ? 'active' : ''}`}
                                    onClick={() => setWinRate(w)}
                                >
                                    {w}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={winRate}
                                onChange={(e) => setWinRate(e.target.value)}
                                placeholder=""
                                id="hodl-win-rate"
                                step="1"
                                min="0"
                                max="100"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Average Profit per Trade */}
                    <div className="input-group">
                        <label>
                            <TrendingUp size={14} />
                            {getUiString(lang, 'Avg Profit per Trade (%)')}
                        </label>
                        <div className="pills-row">
                            {AVG_PROFIT_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${avgProfit === preset ? 'active' : ''}`}
                                    onClick={() => setAvgProfit(preset)}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={avgProfit}
                                onChange={(e) => setAvgProfit(e.target.value)}
                                placeholder=""
                                id="hodl-avg-profit"
                                step="0.1"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Average Loss per Trade */}
                    <div className="input-group">
                        <label>
                            <TrendingDown size={14} />
                            {getUiString(lang, 'Avg Loss per Trade (%)')}
                        </label>
                        <div className="pills-row">
                            {AVG_LOSS_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${avgLoss === preset ? 'active' : ''}`}
                                    onClick={() => setAvgLoss(preset)}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={avgLoss}
                                onChange={(e) => setAvgLoss(e.target.value)}
                                placeholder=""
                                id="hodl-avg-loss"
                                step="0.1"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Number of Trades per Month */}
                    <div className="input-group">
                        <label>
                            <Repeat size={14} />
                            {getUiString(lang, 'Trades per Month')}
                        </label>
                        <div className="pills-row">
                            {['5', '10', '20', '50'].map((t) => (
                                <button
                                    key={t}
                                    className={`pill-btn ${tradesPerMonth === t ? 'active' : ''}`}
                                    onClick={() => setTradesPerMonth(t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tradesPerMonth}
                                onChange={(e) => setTradesPerMonth(e.target.value)}
                                placeholder=""
                                id="hodl-trades-month"
                                step="1"
                                min="1"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Trading Period */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            {getUiString(lang, 'Trading Period (months)')}
                        </label>
                        <div className="pills-row">
                            {['1', '3', '6', '12'].map((m) => (
                                <button
                                    key={m}
                                    className={`pill-btn ${tradingPeriod === m ? 'active' : ''}`}
                                    onClick={() => setTradingPeriod(m)}
                                >
                                    {m}mo
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tradingPeriod}
                                onChange={(e) => setTradingPeriod(e.target.value)}
                                placeholder=""
                                id="hodl-period"
                                step="1"
                                min="1"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Trading Fee per Trade */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            {getUiString(lang, 'Trading Fee per Trade (%)')}
                        </label>
                        <div className="pills-row">
                            {TRADING_FEE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${tradingFee === preset ? 'active' : ''}`}
                                    onClick={() => setTradingFee(preset)}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={tradingFee}
                                onChange={(e) => setTradingFee(e.target.value)}
                                placeholder=""
                                id="hodl-fee"
                                step="0.01"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use presets to stress-test HODL vs active trading outcomes.')}
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {results ? (
                        <>
                            {/* Hero: Winner Declaration */}
                            <div
                                className="result-hero"
                                style={{ borderColor: getWinnerColor(results.winner) }}
                            >
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Strategy Comparison')}
                                </span>
                                <span
                                    className="result-hero-value"
                                    style={{ color: getWinnerColor(results.winner) }}
                                >
                                    <Trophy size={28} />
                                    {getWinnerLabel(results.winner)}
                                </span>
                                <span
                                    className="result-hero-roi"
                                    style={{ color: getWinnerColor(results.winner) }}
                                >
                                    {results.winner !== 'tie'
                                        ? `${getUiString(lang, 'by')} ${formatUSD(results.differenceUSD)} (${results.differencePercent.toFixed(2)}% ${getUiString(lang, 'margin')})`
                                        : getUiString(lang, 'Both strategies ended at the same value')}
                                </span>
                            </div>

                            {/* Side-by-side comparison cards */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                margin: '16px 0',
                            }}>
                                {/* HODL Card */}
                                <div style={{
                                    padding: '14px',
                                    background: results.winner === 'hodl' ? 'rgba(245,158,11,0.06)' : 'var(--color-bg-card)',
                                    border: `1px solid ${results.winner === 'hodl' ? 'rgba(245,158,11,0.3)' : 'var(--color-border)'}`,
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                }}>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: results.winner === 'hodl' ? '#f59e0b' : 'var(--color-text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px',
                                    }}>
                                        <TrendingUp size={12} />
                                        HODL
                                        {results.winner === 'hodl' && <Trophy size={12} />}
                                    </div>
                                    <div style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: results.winner === 'hodl' ? '#f59e0b' : 'var(--color-text)',
                                    }}>
                                        {formatUSD(results.hodlFinalValue)}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: results.hodlROI >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                        fontWeight: 600,
                                        marginTop: '2px',
                                    }}>
                                        {formatPercent(results.hodlROI)} ROI
                                    </div>
                                </div>

                                {/* Trading Card */}
                                <div style={{
                                    padding: '14px',
                                    background: results.winner === 'trading' ? 'rgba(34,197,94,0.06)' : 'var(--color-bg-card)',
                                    border: `1px solid ${results.winner === 'trading' ? 'rgba(34,197,94,0.3)' : 'var(--color-border)'}`,
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                }}>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: results.winner === 'trading' ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        marginBottom: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px',
                                    }}>
                                        <Activity size={12} />
                                        {getUiString(lang, 'Trading')}
                                        {results.winner === 'trading' && <Trophy size={12} />}
                                    </div>
                                    <div style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        color: results.winner === 'trading' ? 'var(--color-accent-green)' : 'var(--color-text)',
                                    }}>
                                        {formatUSD(results.tradingFinalValue)}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: results.tradingROI >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                        fontWeight: 600,
                                        marginTop: '2px',
                                    }}>
                                        {formatPercent(results.tradingROI)} ROI
                                    </div>
                                </div>
                            </div>

                            {/* HODL Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label">
                                        <strong>
                                            <TrendingUp size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {getUiString(lang, 'HODL Strategy')}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Starting Capital')}</span>
                                    <span className="result-value">{formatUSD(parseFloat(startingCapital))}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Price Change')}</span>
                                    <span className={`result-value ${parseFloat(priceChange) >= 0 ? 'profit' : 'fee'}`}>
                                        {formatPercent(parseFloat(priceChange))}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Final Value')}</strong></span>
                                    <span className={`result-value ${results.hodlProfit >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{formatUSD(results.hodlFinalValue)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Net Profit')}</span>
                                    <span className={`result-value ${results.hodlProfit >= 0 ? 'profit' : 'fee'}`}>
                                        {results.hodlProfit >= 0 ? '+' : ''}{formatUSD(results.hodlProfit)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'ROI')}</span>
                                    <span className={`result-value ${results.hodlROI >= 0 ? 'profit' : 'fee'}`}>
                                        {formatPercent(results.hodlROI)}
                                    </span>
                                </div>
                            </div>

                            {/* Trading Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label">
                                        <strong>
                                            <Activity size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                            {getUiString(lang, 'Trading Strategy')}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Starting Capital')}</span>
                                    <span className="result-value">{formatUSD(parseFloat(startingCapital))}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Win Rate')}</span>
                                    <span className="result-value">{winRate}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Avg Profit / Loss per Trade')}</span>
                                    <span className="result-value">
                                        <span className="profit">+{avgProfit}%</span> / <span className="fee">-{avgLoss}%</span>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Trading Period')}</span>
                                    <span className="result-value">{tradingPeriod} {getUiString(lang, 'months')}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Final Value')}</strong></span>
                                    <span className={`result-value ${results.tradingProfit >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{formatUSD(results.tradingFinalValue)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Net Profit')}</span>
                                    <span className={`result-value ${results.tradingProfit >= 0 ? 'profit' : 'fee'}`}>
                                        {results.tradingProfit >= 0 ? '+' : ''}{formatUSD(results.tradingProfit)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'ROI')}</span>
                                    <span className={`result-value ${results.tradingROI >= 0 ? 'profit' : 'fee'}`}>
                                        {formatPercent(results.tradingROI)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Trades')}</span>
                                    <span className="result-value">{results.totalTrades}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Fees Paid')}</span>
                                    <span className="result-value fee">-{formatUSD(results.totalFeesPaid)}</span>
                                </div>
                            </div>

                            {/* Difference Summary */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Difference')}</strong></span>
                                    <span className="result-value" style={{ color: getWinnerColor(results.winner), fontWeight: 600 }}>
                                        {formatUSD(results.differenceUSD)} ({results.differencePercent.toFixed(2)}%)
                                    </span>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'This is a simplified simulation. Actual trading results depend on market conditions, execution, slippage, and emotional discipline. Not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Trophy size={40} />
                            </div>
                            <h3>{getUiString(lang, 'HODL vs Active Trading')}</h3>
                            <p>{getUiString(lang, 'Enter your starting capital, HODL price change, and trading parameters to compare which strategy would come out ahead.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
