import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    ArrowRightLeft,
    Clock,
    ChevronDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface Results {
    bridgeFeeUsd: number;
    gasFeeTotal: number;
    totalCost: number;
    costPct: number;
    effectiveAmount: number;
    estimatedTime: string;
}

type ChainName = 'Ethereum' | 'Arbitrum' | 'Optimism' | 'Polygon' | 'BSC' | 'Solana' | 'Base' | 'Avalanche';

const CHAINS: ChainName[] = ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'BSC', 'Solana', 'Base', 'Avalanche'];

const TRANSFER_TIMES: Record<string, string> = {
    'Ethereum-Arbitrum': '~10 min',
    'Ethereum-Optimism': '~10 min',
    'Ethereum-Polygon': '~15 min',
    'Ethereum-BSC': '~15 min',
    'Ethereum-Solana': '~20 min',
    'Ethereum-Base': '~10 min',
    'Ethereum-Avalanche': '~10 min',
    'Arbitrum-Optimism': '~5 min',
    'Arbitrum-Polygon': '~10 min',
    'Arbitrum-BSC': '~10 min',
    'Arbitrum-Solana': '~15 min',
    'BSC-Polygon': '~5 min',
    'Solana-BSC': '~15 min',
    'default': '~15 min',
};

function getTransferTime(from: ChainName, to: ChainName): string {
    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;
    return TRANSFER_TIMES[key1] || TRANSFER_TIMES[key2] || TRANSFER_TIMES['default'];
}

const SCENARIOS = [
    {
        label: 'ETH\u2192Arbitrum',
        transferAmount: '5000', sourceChain: 'Ethereum' as ChainName, destChain: 'Arbitrum' as ChainName,
        bridgeFee: '0.1', gasFeeSource: '5', gasFeeDest: '0.10',
    },
    {
        label: 'ETH\u2192Solana',
        transferAmount: '10000', sourceChain: 'Ethereum' as ChainName, destChain: 'Solana' as ChainName,
        bridgeFee: '0.15', gasFeeSource: '5', gasFeeDest: '0.01',
    },
    {
        label: 'BSC\u2192Polygon',
        transferAmount: '2000', sourceChain: 'BSC' as ChainName, destChain: 'Polygon' as ChainName,
        bridgeFee: '0.05', gasFeeSource: '0.30', gasFeeDest: '0.01',
    },
] as const;

function CrossChainBridgeCalculator({ lang = 'en' }: { lang?: string }) {
    const loc = lang === 'en' ? 'en-US' : lang;
    const [transferAmount, setTransferAmount] = useState('');
    const [sourceChain, setSourceChain] = useState<ChainName>('Ethereum');
    const [destChain, setDestChain] = useState<ChainName>('Arbitrum');
    const [bridgeFee, setBridgeFee] = useState('0.1');
    const [gasFeeSource, setGasFeeSource] = useState('5');
    const [gasFeeDest, setGasFeeDest] = useState('0.50');
    const [results, setResults] = useState<Results | null>(null);

    const applyScenario = (s: (typeof SCENARIOS)[number]) => {
        setTransferAmount(s.transferAmount);
        setSourceChain(s.sourceChain);
        setDestChain(s.destChain);
        setBridgeFee(s.bridgeFee);
        setGasFeeSource(s.gasFeeSource);
        setGasFeeDest(s.gasFeeDest);
    };
    const isScenarioActive = (s: (typeof SCENARIOS)[number]) =>
        transferAmount === s.transferAmount && sourceChain === s.sourceChain &&
        destChain === s.destChain && bridgeFee === s.bridgeFee &&
        gasFeeSource === s.gasFeeSource && gasFeeDest === s.gasFeeDest;

    const calculate = useCallback(() => {
        const amt = parseFloat(transferAmount) || 0;
        const feePct = parseFloat(bridgeFee) || 0;
        const gasSrc = parseFloat(gasFeeSource) || 0;
        const gasDst = parseFloat(gasFeeDest) || 0;

        if (amt <= 0) { setResults(null); return; }

        const bridgeFeeUsd = amt * (feePct / 100);
        const gasFeeTotal = gasSrc + gasDst;
        const totalCost = bridgeFeeUsd + gasFeeTotal;
        const costPct = amt > 0 ? (totalCost / amt) * 100 : 0;
        const effectiveAmount = amt - totalCost;
        const estimatedTime = getTransferTime(sourceChain, destChain);

        setResults({ bridgeFeeUsd, gasFeeTotal, totalCost, costPct, effectiveAmount, estimatedTime });
    }, [transferAmount, bridgeFee, gasFeeSource, gasFeeDest, sourceChain, destChain]);

    useEffect(() => { calculate(); }, [calculate]);

    const reset = () => {
        setTransferAmount(''); setSourceChain('Ethereum'); setDestChain('Arbitrum');
        setBridgeFee('0.1'); setGasFeeSource('5'); setGasFeeDest('0.50'); setResults(null);
    };

    const formatUSD = (n: number) => {
        if (!isFinite(n)) return '\u2014';
        return new Intl.NumberFormat(loc, {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

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
                        <label htmlFor="bridge-amount"><DollarSign size={14} /> {getUiString(lang, 'Transfer Amount ($)')}</label>
                        <input type="number" inputMode="decimal" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)}
                            id="bridge-amount" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="bridge-source"><ChevronDown size={14} /> {getUiString(lang, 'Source Chain')}</label>
                        <select id="bridge-source" value={sourceChain} onChange={(e) => setSourceChain(e.target.value as ChainName)}>
                            {CHAINS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="bridge-dest"><ChevronDown size={14} /> {getUiString(lang, 'Destination Chain')}</label>
                        <select id="bridge-dest" value={destChain} onChange={(e) => setDestChain(e.target.value as ChainName)}>
                            {CHAINS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="bridge-fee"><Percent size={14} /> {getUiString(lang, 'Bridge Fee (%)')}</label>
                        <input type="number" inputMode="decimal" value={bridgeFee} onChange={(e) => setBridgeFee(e.target.value)}
                            id="bridge-fee" step="0.01" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="bridge-gas-src"><DollarSign size={14} /> {getUiString(lang, 'Gas Fee Source ($)')}</label>
                        <input type="number" inputMode="decimal" value={gasFeeSource} onChange={(e) => setGasFeeSource(e.target.value)}
                            id="bridge-gas-src" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="bridge-gas-dst"><DollarSign size={14} /> {getUiString(lang, 'Gas Fee Destination ($)')}</label>
                        <input type="number" inputMode="decimal" value={gasFeeDest} onChange={(e) => setGasFeeDest(e.target.value)}
                            id="bridge-gas-dst" step="any" min="0" onFocus={(e) => e.target.select()} />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Estimate cross-chain bridge costs and transfer times.')}
                    </span>
                </div>

                <div className="calc-results-panel">
                    {results ? (
                        <>
                            <div className="result-hero profit">
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Effective Transfer Amount')}
                                </span>
                                <span className="result-hero-value">
                                    <ArrowRightLeft size={28} />
                                    {formatUSD(results.effectiveAmount)}
                                </span>
                            </div>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Bridge Fee')}</span>
                                    <span className="result-value fee">{formatUSD(results.bridgeFeeUsd)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas Fees (Total)')}</span>
                                    <span className="result-value fee">{formatUSD(results.gasFeeTotal)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Cost')}</strong></span>
                                    <span className="result-value fee"><strong>{formatUSD(results.totalCost)}</strong></span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Cost as % of Transfer')}</span>
                                    <span className="result-value">{results.costPct.toFixed(3)}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">
                                        <Clock size={14} style={{ marginRight: 4, verticalAlign: 'text-bottom' }} />
                                        {getUiString(lang, 'Estimated Transfer Time')}
                                    </span>
                                    <span className="result-value">{results.estimatedTime}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Route')}</span>
                                    <span className="result-value">{sourceChain} \u2192 {destChain}</span>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Bridge fees and transfer times vary by protocol and network congestion. Always verify fees on the bridge interface before confirming.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
                            <h3>{getUiString(lang, 'Estimate Bridge Costs')}</h3>
                            <p>{getUiString(lang, 'Enter transfer details to estimate cross-chain bridge fees and transfer time.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(CrossChainBridgeCalculator);
