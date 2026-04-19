import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Fuel,
    RotateCcw,
    Info,
    Hash,
    DollarSign,
    Layers,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    individualTotalCost: number;
    batchedTotalCost: number;
    savings: number;
    savingsPercent: number;
    costPerTxIndividual: number;
    costPerTxBatched: number;
    numBatches: number;
    optimalGasThreshold: string;
}

const SCENARIOS = [
    {
        label: 'Simple Transfers',
        numTxs: '10',
        gasPerTx: '21000',
        gasPrice: '15',
        ethPrice: '2400',
        batchSize: '5',
    },
    {
        label: 'DeFi Swaps (150K gas)',
        numTxs: '10',
        gasPerTx: '150000',
        gasPrice: '15',
        ethPrice: '2400',
        batchSize: '5',
    },
    {
        label: 'NFT Mints (200K gas)',
        numTxs: '10',
        gasPerTx: '200000',
        gasPrice: '15',
        ethPrice: '2400',
        batchSize: '5',
    },
] as const;

function GasOptimizationCalculator({ lang = 'en' }: { lang?: string }) {
    const [numTxs, setNumTxs] = useState('10');
    const [gasPerTx, setGasPerTx] = useState('21000');
    const [gasPrice, setGasPrice] = useState('15');
    const [ethPrice, setEthPrice] = useState('2400');
    const [batchSize, setBatchSize] = useState('5');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setNumTxs(s.numTxs);
        setGasPerTx(s.gasPerTx);
        setGasPrice(s.gasPrice);
        setEthPrice(s.ethPrice);
        setBatchSize(s.batchSize);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        numTxs === s.numTxs &&
        gasPerTx === s.gasPerTx &&
        gasPrice === s.gasPrice &&
        ethPrice === s.ethPrice &&
        batchSize === s.batchSize;

    const results = useMemo<Results | null>(() => {
        const txCount = parseInt(numTxs) || 0;
        const gas = parseFloat(gasPerTx) || 0;
        const price = parseFloat(gasPrice) || 0;
        const eth = parseFloat(ethPrice) || 0;
        const batch = parseInt(batchSize) || 1;

        if (txCount <= 0 || gas <= 0 || price <= 0 || eth <= 0 || batch <= 0) return null;

        // Individual transactions: each pays base overhead (21000) + execution gas
        // Overhead per tx: 21000 gas (base transaction cost)
        const baseTxOverhead = 21000;
        const individualGasPerTx = gas; // already includes base for simple transfers
        const individualTotalGas = txCount * individualGasPerTx;

        // Batched: one base overhead per batch, then execution gas for each tx in batch
        // Batching saves ~21000 gas per tx (minus 1 per batch) since there's only 1 base per batch
        const numBatches = Math.ceil(txCount / batch);
        // Each batch: 1 base overhead + batchSize * (gas - baseTxOverhead) for non-simple, or gas for simple
        // For simple transfers (gas = 21000), batching via multicall has different overhead
        // We model: batch overhead = 30000 (multicall base) + each sub-call saves ~15000 gas
        const batchOverhead = 30000; // multicall contract base cost
        const perCallInBatch = gas > baseTxOverhead ? gas - baseTxOverhead + 8000 : gas * 0.7;
        const batchedTotalGas = numBatches * batchOverhead + txCount * perCallInBatch;

        // Convert gas to ETH to USD
        const gweiToEth = 1e-9;
        const individualTotalCost = individualTotalGas * price * gweiToEth * eth;
        const batchedTotalCost = batchedTotalGas * price * gweiToEth * eth;

        const savings = individualTotalCost - batchedTotalCost;
        const savingsPercent = individualTotalCost > 0 ? (savings / individualTotalCost) * 100 : 0;

        const costPerTxIndividual = txCount > 0 ? individualTotalCost / txCount : 0;
        const costPerTxBatched = txCount > 0 ? batchedTotalCost / txCount : 0;

        // Optimal gas threshold: at what gas price does individual tx cost < $1
        // gas * gasPrice * 1e-9 * ethPrice < 1 → gasPrice < 1 / (gas * 1e-9 * ethPrice)
        const thresholdGwei = gas > 0 && eth > 0 ? 1 / (gas * 1e-9 * eth) : 0;
        let optimalGasThreshold: string;
        if (thresholdGwei < 1) {
            optimalGasThreshold = '<1 Gwei';
        } else if (thresholdGwei > 1000) {
            optimalGasThreshold = '>1000 Gwei';
        } else {
            optimalGasThreshold = `${thresholdGwei.toFixed(1)} Gwei`;
        }

        return {
            individualTotalCost,
            batchedTotalCost,
            savings: Math.max(0, savings),
            savingsPercent: Math.max(0, savingsPercent),
            costPerTxIndividual,
            costPerTxBatched,
            numBatches,
            optimalGasThreshold,
        };
    }, [numTxs, gasPerTx, gasPrice, ethPrice, batchSize]);

    const reset = () => {
        setNumTxs('10');
        setGasPerTx('21000');
        setGasPrice('15');
        setEthPrice('2400');
        setBatchSize('5');
    };

    const formatUSD = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(n);
    };

    const formatPercent = (n: number) => {
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
                        <label htmlFor="gasopt-num-txs">
                            <Hash size={14} /> {getUiString(lang, 'Number of Transactions')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={numTxs}
                            onChange={(e) => setNumTxs(e.target.value)}
                            id="gasopt-num-txs"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gasopt-gas-per-tx">
                            <Fuel size={14} /> {getUiString(lang, 'Average Gas per Tx')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={gasPerTx}
                            onChange={(e) => setGasPerTx(e.target.value)}
                            id="gasopt-gas-per-tx"
                            step="1000"
                            min="21000"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gasopt-gas-price">
                            <Fuel size={14} /> {getUiString(lang, 'Gas Price (Gwei)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={gasPrice}
                            onChange={(e) => setGasPrice(e.target.value)}
                            id="gasopt-gas-price"
                            step="0.1"
                            min="0.1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gasopt-eth-price">
                            <DollarSign size={14} /> {getUiString(lang, 'ETH Price ($)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={ethPrice}
                            onChange={(e) => setEthPrice(e.target.value)}
                            id="gasopt-eth-price"
                            step="any"
                            min="0"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="gasopt-batch-size">
                            <Layers size={14} /> {getUiString(lang, 'Batch Size')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={batchSize}
                            onChange={(e) => setBatchSize(e.target.value)}
                            id="gasopt-batch-size"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Compare gas costs between individual transactions and batched strategies.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: results.savings > 0 ? 'var(--color-accent-green, #22c55e)' : 'var(--color-text-muted, #94a3b8)' }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Savings from Batching')}
                                </span>
                                <span className="result-hero-value" style={{ color: results.savings > 0 ? 'var(--color-accent-green, #22c55e)' : 'var(--color-text-muted, #94a3b8)' }}>
                                    <Fuel size={28} />
                                    {formatUSD(results.savings)}
                                </span>
                                <span className="result-hero-roi">
                                    {formatPercent(results.savingsPercent)} {getUiString(lang, 'saved')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row" style={{ fontWeight: 600 }}>
                                    <span className="result-label">{getUiString(lang, 'Individual Transactions')}</span>
                                    <span className="result-value">{formatUSD(results.individualTotalCost)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label" style={{ paddingLeft: '1rem' }}>{getUiString(lang, 'Cost per Tx')}</span>
                                    <span className="result-value">{formatUSD(results.costPerTxIndividual)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row" style={{ fontWeight: 600 }}>
                                    <span className="result-label">{getUiString(lang, 'Batched Transactions')}</span>
                                    <span className="result-value">{formatUSD(results.batchedTotalCost)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label" style={{ paddingLeft: '1rem' }}>{getUiString(lang, 'Cost per Tx')}</span>
                                    <span className="result-value">{formatUSD(results.costPerTxBatched)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label" style={{ paddingLeft: '1rem' }}>{getUiString(lang, 'Number of Batches')}</span>
                                    <span className="result-value">{results.numBatches}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Target Gas Price (for <$1/tx)')}</span>
                                    <span className="result-value">{results.optimalGasThreshold}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Batching savings assume multicall-style contracts. Actual savings vary by contract and network conditions. Base overhead is ~30K gas per batch.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Fuel size={40} /></div>
                            <h3>{getUiString(lang, 'Optimize Gas Costs')}</h3>
                            <p>{getUiString(lang, 'Enter transaction details to compare individual vs. batched gas costs and find optimal strategies.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(GasOptimizationCalculator);
