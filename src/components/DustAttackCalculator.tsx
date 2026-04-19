import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    Shield,
    RotateCcw,
    Info,
    Hash,
    Cpu,
    DollarSign,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    totalDustSats: number;
    totalDustUSD: number;
    txSizeVBytes: number;
    consolidationFeeSats: number;
    consolidationFeeUSD: number;
    netValueSats: number;
    netValueUSD: number;
    feePercent: number;
    recommendation: string;
}

const BTC_PRICE_DEFAULT = 97000;

const SCENARIOS = [
    {
        label: 'Light Dust (3 UTXOs)',
        numUtxos: '3',
        avgDustSats: '546',
        feeRate: '10',
        inputSize: '68',
        outputSize: '31',
    },
    {
        label: 'Medium Dust (10)',
        numUtxos: '10',
        avgDustSats: '546',
        feeRate: '10',
        inputSize: '68',
        outputSize: '31',
    },
    {
        label: 'Heavy Dust (50)',
        numUtxos: '50',
        avgDustSats: '546',
        feeRate: '10',
        inputSize: '68',
        outputSize: '31',
    },
] as const;

function DustAttackCalculator({ lang = 'en' }: { lang?: string }) {
    const [numUtxos, setNumUtxos] = useState('5');
    const [avgDustSats, setAvgDustSats] = useState('546');
    const [feeRate, setFeeRate] = useState('10');
    const [inputSize, setInputSize] = useState('68');
    const [outputSize, setOutputSize] = useState('31');

    const loc = lang === 'en' ? 'en-US' : lang;

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setNumUtxos(s.numUtxos);
        setAvgDustSats(s.avgDustSats);
        setFeeRate(s.feeRate);
        setInputSize(s.inputSize);
        setOutputSize(s.outputSize);
    };

    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        numUtxos === s.numUtxos &&
        avgDustSats === s.avgDustSats &&
        feeRate === s.feeRate &&
        inputSize === s.inputSize &&
        outputSize === s.outputSize;

    const results = useMemo<Results | null>(() => {
        const utxos = parseInt(numUtxos) || 0;
        const dustSats = parseFloat(avgDustSats) || 0;
        const rate = parseFloat(feeRate) || 0;
        const inSize = parseFloat(inputSize) || 0;
        const outSize = parseFloat(outputSize) || 0;

        if (utxos <= 0 || dustSats <= 0 || rate <= 0 || inSize <= 0 || outSize <= 0) return null;

        const totalDustSats = utxos * dustSats;
        // Consolidation tx: N inputs + 1 output + overhead (10 vbytes)
        const txSizeVBytes = utxos * inSize + outSize + 10;
        const consolidationFeeSats = txSizeVBytes * rate;

        const satsPerBTC = 100_000_000;
        const totalDustUSD = (totalDustSats / satsPerBTC) * BTC_PRICE_DEFAULT;
        const consolidationFeeUSD = (consolidationFeeSats / satsPerBTC) * BTC_PRICE_DEFAULT;

        const netValueSats = totalDustSats - consolidationFeeSats;
        const netValueUSD = (netValueSats / satsPerBTC) * BTC_PRICE_DEFAULT;

        const feePercent = totalDustSats > 0 ? (consolidationFeeSats / totalDustSats) * 100 : 0;

        let recommendation: string;
        if (netValueSats <= 0) {
            recommendation = 'Not Worth It';
        } else if (feePercent > 50) {
            recommendation = 'Wait for Lower Fees';
        } else {
            recommendation = 'Consolidate Now';
        }

        return {
            totalDustSats,
            totalDustUSD,
            txSizeVBytes,
            consolidationFeeSats,
            consolidationFeeUSD,
            netValueSats,
            netValueUSD,
            feePercent,
            recommendation,
        };
    }, [numUtxos, avgDustSats, feeRate, inputSize, outputSize]);

    const reset = () => {
        setNumUtxos('5');
        setAvgDustSats('546');
        setFeeRate('10');
        setInputSize('68');
        setOutputSize('31');
    };

    const formatSats = (n: number) => {
        if (!Number.isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            maximumFractionDigits: 0,
        }).format(n) + ' sats';
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
        return `${n.toFixed(2)}%`;
    };

    const getRecommendationColor = (rec: string) => {
        switch (rec) {
            case 'Consolidate Now': return 'var(--color-accent-green, #22c55e)';
            case 'Wait for Lower Fees': return '#f59e0b';
            case 'Not Worth It': return '#ef4444';
            default: return 'var(--color-text-muted, #94a3b8)';
        }
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
                        <label htmlFor="dust-num-utxos">
                            <Hash size={14} /> {getUiString(lang, 'Number of Dust UTXOs')}
                        </label>
                        <input
                            type="number"
                            inputMode="numeric"
                            value={numUtxos}
                            onChange={(e) => setNumUtxos(e.target.value)}
                            id="dust-num-utxos"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dust-avg-sats">
                            <DollarSign size={14} /> {getUiString(lang, 'Average Dust Amount (sats)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={avgDustSats}
                            onChange={(e) => setAvgDustSats(e.target.value)}
                            id="dust-avg-sats"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dust-fee-rate">
                            <Cpu size={14} /> {getUiString(lang, 'Current Fee Rate (sat/vB)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={feeRate}
                            onChange={(e) => setFeeRate(e.target.value)}
                            id="dust-fee-rate"
                            step="0.1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dust-input-size">
                            <Cpu size={14} /> {getUiString(lang, 'Input Size (vbytes)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={inputSize}
                            onChange={(e) => setInputSize(e.target.value)}
                            id="dust-input-size"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="dust-output-size">
                            <Cpu size={14} /> {getUiString(lang, 'Output Size (vbytes)')}
                        </label>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={outputSize}
                            onChange={(e) => setOutputSize(e.target.value)}
                            id="dust-output-size"
                            step="1"
                            min="1"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Analyze dust UTXOs and determine if consolidation is cost-effective.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero" style={{ borderColor: getRecommendationColor(results.recommendation) }}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Recommendation')}
                                </span>
                                <span className="result-hero-value" style={{ color: getRecommendationColor(results.recommendation) }}>
                                    <Shield size={28} />
                                    {getUiString(lang, results.recommendation)}
                                </span>
                                <span className="result-hero-roi">
                                    {getUiString(lang, 'Fee is')} {formatPercent(results.feePercent)} {getUiString(lang, 'of dust value')}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Dust Value')}</span>
                                    <span className="result-value">{formatSats(results.totalDustSats)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Total Dust Value (USD)')}</span>
                                    <span className="result-value">{formatUSD(results.totalDustUSD)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Consolidation Tx Size')}</span>
                                    <span className="result-value">{results.txSizeVBytes} vB</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Consolidation Fee')}</span>
                                    <span className="result-value">{formatSats(results.consolidationFeeSats)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Consolidation Fee (USD)')}</span>
                                    <span className="result-value">{formatUSD(results.consolidationFeeUSD)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <strong>{getUiString(lang, 'Net Value After Consolidation')}</strong>
                                    </span>
                                    <span className="result-value" style={{ color: results.netValueSats > 0 ? 'var(--color-accent-green, #22c55e)' : '#ef4444' }}>
                                        <strong>{formatSats(results.netValueSats)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Net Value (USD)')}</span>
                                    <span className="result-value" style={{ color: results.netValueUSD > 0 ? 'var(--color-accent-green, #22c55e)' : '#ef4444' }}>
                                        {formatUSD(results.netValueUSD)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Fee as % of Dust')}</span>
                                    <span className="result-value">{formatPercent(results.feePercent)}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Based on BTC price of ~$97,000. Actual fees depend on network congestion. Input size assumes P2WPKH (SegWit) transactions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Shield size={40} /></div>
                            <h3>{getUiString(lang, 'Analyze Dust UTXOs')}</h3>
                            <p>{getUiString(lang, 'Enter your dust UTXO details to see if consolidating them is cost-effective at current fee rates.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(DustAttackCalculator);
