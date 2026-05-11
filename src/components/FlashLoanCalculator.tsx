import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Zap,
    RotateCcw,
    Info,
    DollarSign,
    Percent,
    ArrowRightLeft,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    grossProfit: number;
    protocolFeeAmount: number;
    gasCostTotal: number;
    netProfit: number;
    roiOnGas: number;
    minimumProfitableSpread: number;
    breakEvenLoanAmount: number;
}

const SCENARIOS = [
    {
        label: 'Aave Simple',
        loanAmount: '100000',
        arbSpread: '0.5',
        protocolFee: '0.09',
        gasCost: '50',
        numHops: '2',
    },
    {
        label: 'dYdX Multi-Hop',
        loanAmount: '250000',
        arbSpread: '0.3',
        protocolFee: '0',
        gasCost: '120',
        numHops: '4',
    },
    {
        label: 'Large Arb',
        loanAmount: '1000000',
        arbSpread: '0.8',
        protocolFee: '0.09',
        gasCost: '200',
        numHops: '3',
    },
] as const;

function FlashLoanCalculator({ lang = 'en' }: { lang?: string }) {
    const [loanAmount, setLoanAmount] = useState('100000');
    const [arbSpread, setArbSpread] = useState('0.5');
    const [protocolFee, setProtocolFee] = useState('0.09');
    const [gasCost, setGasCost] = useState('50');
    const [numHops, setNumHops] = useState('2');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setLoanAmount(s.loanAmount);
        setArbSpread(s.arbSpread);
        setProtocolFee(s.protocolFee);
        setGasCost(s.gasCost);
        setNumHops(s.numHops);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        loanAmount === s.loanAmount &&
        arbSpread === s.arbSpread &&
        protocolFee === s.protocolFee &&
        gasCost === s.gasCost &&
        numHops === s.numHops;

    const results = useMemo<Results | null>(() => {
        const loan = parseFloat(loanAmount) || 0;
        const spread = parseFloat(arbSpread) || 0;
        const fee = parseFloat(protocolFee) || 0;
        const gas = parseFloat(gasCost) || 0;
        const hops = parseInt(numHops) || 1;

        if (loan <= 0 || spread < 0) return null;

        const grossProfit = loan * (spread / 100);
        const protocolFeeAmount = loan * (fee / 100);
        const gasCostTotal = gas * hops;

        const netProfit = grossProfit - protocolFeeAmount - gasCostTotal;

        // ROI on gas cost (the only capital actually at risk)
        const roiOnGas = gasCostTotal > 0 ? (netProfit / gasCostTotal) * 100 : netProfit > 0 ? Infinity : 0;

        // Minimum spread to break even: (protocolFee% * loan + gasCost * hops) / loan * 100
        const minSpread = loan > 0 ? ((protocolFeeAmount + gasCostTotal) / loan) * 100 : 0;

        // Break-even loan amount at current spread: costs / (spread% - fee%)
        const netSpreadPct = (spread - fee) / 100;
        const breakEvenLoan = netSpreadPct > 0 ? gasCostTotal / netSpreadPct : Infinity;

        return {
            grossProfit,
            protocolFeeAmount,
            gasCostTotal,
            netProfit,
            roiOnGas,
            minimumProfitableSpread: minSpread,
            breakEvenLoanAmount: breakEvenLoan,
        };
    }, [loanAmount, arbSpread, protocolFee, gasCost, numHops]);

    const reset = () => {
        setLoanAmount('100000');
        setArbSpread('0.5');
        setProtocolFee('0.09');
        setGasCost('50');
        setNumHops('2');
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
        return `${n.toFixed(4)}%`;
    };

    const formatROI = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return `${n.toFixed(1)}%`;
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
                        <label htmlFor="flash-loan-amount">
                            <DollarSign size={14} /> {getUiString(lang, 'Loan Amount ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            id="flash-loan-amount"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="flash-arb-spread">
                            <Percent size={14} /> {getUiString(lang, 'Arbitrage Spread (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={arbSpread}
                            onChange={(e) => setArbSpread(e.target.value)}
                            id="flash-arb-spread"
                            step="0.01"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="flash-protocol-fee">
                            <Percent size={14} /> {getUiString(lang, 'Protocol Fee (%)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={protocolFee}
                            onChange={(e) => setProtocolFee(e.target.value)}
                            id="flash-protocol-fee"
                            step="0.01"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="flash-gas-cost">
                            <DollarSign size={14} /> {getUiString(lang, 'Gas Cost per Hop ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={gasCost}
                            onChange={(e) => setGasCost(e.target.value)}
                            id="flash-gas-cost"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="flash-num-hops">
                            <ArrowRightLeft size={14} /> {getUiString(lang, 'Number of Hops')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={numHops}
                            onChange={(e) => setNumHops(e.target.value)}
                            id="flash-num-hops"
                            step="1"
                            min="1"
                            max="5"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Estimate flash loan arbitrage profitability across DeFi protocols.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: results.netProfit > 0 ? 'var(--color-accent-green, #22c55e)' : '#ef4444' }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Net Profit')}
                                </span>
                                <span className="result-hero-value" style={{ color: results.netProfit > 0 ? 'var(--color-accent-green, #22c55e)' : '#ef4444' }}>
                                    <Zap size={28} />
                                    {formatUSD(results.netProfit)}
                                </span>
                                <span className="result-hero-roi">
                                    {getUiString(lang, 'ROI on Gas')}: {formatROI(results.roiOnGas)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gross Profit')}</span>
                                    <span className="result-value" style={{ color: 'var(--color-accent-green, #22c55e)' }}>
                                        {formatUSD(results.grossProfit)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Protocol Fee')}</span>
                                    <span className="result-value" style={{ color: '#ef4444' }}>
                                        −{formatUSD(results.protocolFeeAmount)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Gas Cost')}</span>
                                    <span className="result-value" style={{ color: '#ef4444' }}>
                                        −{formatUSD(results.gasCostTotal)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Net Profit')}</strong>
                                    </span>
                                    <span className="result-value" style={{ color: results.netProfit > 0 ? 'var(--color-accent-green, #22c55e)' : '#ef4444' }}>
                                        <strong>{formatUSD(results.netProfit)}</strong>
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Min Profitable Spread')}</span>
                                    <span className="result-value">{formatPercent(results.minimumProfitableSpread)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Break-Even Loan Amount')}</span>
                                    <span className="result-value">{formatUSD(results.breakEvenLoanAmount)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Flash loans are repaid in the same transaction. If arbitrage fails, the transaction reverts and only gas is lost. Actual profitability depends on DEX liquidity and slippage.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Zap size={40} /></div>
                            <h2>{getUiString(lang, 'Estimate Flash Loan Profit')}</h2>
                            <p>{getUiString(lang, 'Enter loan parameters and arbitrage spread to calculate potential flash loan profitability.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(FlashLoanCalculator);
