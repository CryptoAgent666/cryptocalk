import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    ArrowRightLeft,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    grossSpread: number;
    grossSpreadPct: number;
    feeA: number;
    feeB: number;
    withdrawalFee: number;
    totalFees: number;
    netProfit: number;
    netRoi: number;
    breakEvenSpread: number;
}

const SCENARIOS = [
    {
        label: 'BTC Binance→Coinbase',
        buyPrice: '67500',
        sellPrice: '67850',
        feeA: '0.1',
        feeB: '0.15',
        withdrawalFee: '5',
        tradeAmount: '5000',
    },
    {
        label: 'ETH OKX→Kraken',
        buyPrice: '2410',
        sellPrice: '2428',
        feeA: '0.08',
        feeB: '0.12',
        withdrawalFee: '2',
        tradeAmount: '3000',
    },
    {
        label: 'SOL Bybit→KuCoin',
        buyPrice: '88.50',
        sellPrice: '89.30',
        feeA: '0.1',
        feeB: '0.1',
        withdrawalFee: '0.5',
        tradeAmount: '2000',
    },
] as const;

const AMOUNT_PILLS = ['1000', '2500', '5000', '10000'];

function ArbitrageCalculator({ lang = 'en' }: { lang?: string }) {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [feeA, setFeeA] = useState('0.1');
    const [feeB, setFeeB] = useState('0.1');
    const [withdrawalFee, setWithdrawalFee] = useState('5');
    const [tradeAmount, setTradeAmount] = useState('');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setBuyPrice(s.buyPrice);
        setSellPrice(s.sellPrice);
        setFeeA(s.feeA);
        setFeeB(s.feeB);
        setWithdrawalFee(s.withdrawalFee);
        setTradeAmount(s.tradeAmount);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        buyPrice === s.buyPrice && sellPrice === s.sellPrice && feeA === s.feeA &&
        feeB === s.feeB && withdrawalFee === s.withdrawalFee && tradeAmount === s.tradeAmount;

    const calculate = useCallback(() => {
        const buy = parseFloat(buyPrice) || 0;
        const sell = parseFloat(sellPrice) || 0;
        const amount = parseFloat(tradeAmount) || 0;
        const fAPct = parseFloat(feeA) || 0;
        const fBPct = parseFloat(feeB) || 0;
        const wFee = parseFloat(withdrawalFee) || 0;

        if (buy <= 0 || sell <= 0 || amount <= 0) { setResults(null); return; }

        const qty = amount / buy;
        const grossSpread = (sell - buy) * qty;
        const grossSpreadPct = ((sell - buy) / buy) * 100;
        const costFeeA = amount * (fAPct / 100);
        const costFeeB = (qty * sell) * (fBPct / 100);
        const totalFees = costFeeA + costFeeB + wFee;
        const netProfit = grossSpread - totalFees;
        const netRoi = amount > 0 ? (netProfit / amount) * 100 : 0;
        const breakEvenSpread = buy > 0 ? ((totalFees / qty) / buy) * 100 : 0;

        setResults({
            grossSpread, grossSpreadPct, feeA: costFeeA, feeB: costFeeB,
            withdrawalFee: wFee, totalFees, netProfit, netRoi, breakEvenSpread,
        });
    }, [buyPrice, sellPrice, tradeAmount, feeA, feeB, withdrawalFee]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setBuyPrice(''); setSellPrice(''); setFeeA('0.1'); setFeeB('0.1');
        setWithdrawalFee('5'); setTradeAmount(''); setResults(null);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const isProfit = results ? results.netProfit >= 0 : true;

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
                        <label htmlFor="arb-buy-price"><DollarSign size={14} /> {getUiString(lang, 'Buy Price (Exchange A)')}</label>
                        <input type="number" inputMode="decimal" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)}
                            id="arb-buy-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="arb-sell-price"><DollarSign size={14} /> {getUiString(lang, 'Sell Price (Exchange B)')}</label>
                        <input type="number" inputMode="decimal" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)}
                            id="arb-sell-price" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="arb-fee-a"><Percent size={14} /> {getUiString(lang, 'Trading Fee A (%)')}</label>
                        <input type="number" inputMode="decimal" value={feeA} onChange={(e) => setFeeA(e.target.value)}
                            id="arb-fee-a" step="0.01" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="arb-fee-b"><Percent size={14} /> {getUiString(lang, 'Trading Fee B (%)')}</label>
                        <input type="number" inputMode="decimal" value={feeB} onChange={(e) => setFeeB(e.target.value)}
                            id="arb-fee-b" step="0.01" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="arb-withdrawal"><DollarSign size={14} /> {getUiString(lang, 'Withdrawal Fee ($)')}</label>
                        <input type="number" inputMode="decimal" value={withdrawalFee} onChange={(e) => setWithdrawalFee(e.target.value)}
                            id="arb-withdrawal" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="arb-amount"><DollarSign size={14} /> {getUiString(lang, 'Trade Amount ($)')}</label>
                        <div className="pills-row">
                            {AMOUNT_PILLS.map((v) => (
                                <button key={v} className={`pill-btn ${tradeAmount === v ? 'active' : ''}`}
                                    onClick={() => setTradeAmount(v)}>
                                    ${Number(v).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <input type="number" inputMode="decimal" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)}
                            id="arb-amount" step="any" min="0" onFocus={(e) => e.target.select()} style={{ marginTop: '8px' }} />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare buy/sell prices across exchanges to find arbitrage opportunities.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    {isProfit ? getUiString(lang, 'Net Arbitrage Profit') : getUiString(lang, 'Net Arbitrage Loss')}
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {formatUSD(Math.abs(results.netProfit))}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
                                    {results.netRoi >= 0 ? '+' : ''}{results.netRoi.toFixed(2)}% {getUiString(lang, 'ROI')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gross Spread')}</span>
                                    <span className="result-value">{formatUSD(results.grossSpread)} ({results.grossSpreadPct.toFixed(3)}%)</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Exchange A Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.feeA)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Exchange B Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.feeB)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Withdrawal Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.withdrawalFee)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Fees')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(results.totalFees)}</strong></span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Break-Even Spread')}</span>
                                    <span className="result-value">{results.breakEvenSpread.toFixed(3)}%</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net Profit')}</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'fee'}`}>
                                        <strong>{isProfit ? '+' : ''}{formatUSD(results.netProfit)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net ROI')}</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'fee'}`}>
                                        <strong>{results.netRoi >= 0 ? '+' : ''}{results.netRoi.toFixed(2)}%</strong>
                                    </span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Arbitrage opportunities are fleeting. Prices change in seconds. Transfer times and slippage can eliminate profits.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate Arbitrage Profit')}</h3>
                            <p>{getUiString(lang, 'Enter buy and sell prices on two exchanges to see if the spread covers fees.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(ArbitrageCalculator);
