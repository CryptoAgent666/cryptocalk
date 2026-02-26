import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    Fuel,
    Zap,
    ArrowRight,
} from 'lucide-react';

const TX_TYPES = [
    { id: 'transfer', label: 'ETH Transfer', gas: 21000 },
    { id: 'erc20', label: 'ERC-20 Transfer', gas: 65000 },
    { id: 'erc20_approve', label: 'ERC-20 Approve', gas: 46000 },
    { id: 'swap_simple', label: 'DEX Swap (simple)', gas: 150000 },
    { id: 'swap_multi', label: 'DEX Swap (multi-hop)', gas: 300000 },
    { id: 'nft_mint', label: 'NFT Mint', gas: 180000 },
    { id: 'nft_transfer', label: 'NFT Transfer', gas: 85000 },
    { id: 'bridge', label: 'Bridge Transfer', gas: 250000 },
    { id: 'stake', label: 'Stake/Unstake', gas: 120000 },
    { id: 'contract_deploy', label: 'Contract Deploy', gas: 1500000 },
    { id: 'custom', label: 'Custom Gas', gas: 0 },
];

const NETWORKS = [
    { id: 'ethereum', label: 'Ethereum', symbol: 'ETH', baseGwei: 15, defaultPrice: 3000, color: '#627EEA' },
    { id: 'polygon', label: 'Polygon', symbol: 'MATIC', baseGwei: 30, defaultPrice: 0.5, color: '#8247E5' },
    { id: 'arbitrum', label: 'Arbitrum', symbol: 'ETH', baseGwei: 0.1, defaultPrice: 3000, color: '#28A0F0' },
    { id: 'optimism', label: 'Optimism', symbol: 'ETH', baseGwei: 0.01, defaultPrice: 3000, color: '#FF0420' },
    { id: 'bsc', label: 'BNB Chain', symbol: 'BNB', baseGwei: 3, defaultPrice: 600, color: '#F3BA2F' },
    { id: 'avalanche', label: 'Avalanche', symbol: 'AVAX', baseGwei: 25, defaultPrice: 35, color: '#E84142' },
    { id: 'base', label: 'Base', symbol: 'ETH', baseGwei: 0.01, defaultPrice: 3000, color: '#0052FF' },
];

const SPEED_MULTIPLIERS = [
    { id: 'slow', label: '🐢 Slow', mult: 0.8 },
    { id: 'standard', label: '⚡ Standard', mult: 1.0 },
    { id: 'fast', label: '🚀 Fast', mult: 1.3 },
    { id: 'instant', label: '💎 Instant', mult: 1.8 },
];
const GAS_SCENARIOS = [
    { label: 'Cheap Transfer', network: 'arbitrum', txType: 'transfer', speed: 'standard', txCount: '1' },
    { label: 'Swap Burst', network: 'ethereum', txType: 'swap_simple', speed: 'fast', txCount: '10' },
    { label: 'NFT Mint', network: 'base', txType: 'nft_mint', speed: 'fast', txCount: '1' },
] as const;

export default function GasFeeCalculator({ lang = 'en' }: { lang?: string }) {
    const [network, setNetwork] = useState('ethereum');
    const [txType, setTxType] = useState('transfer');
    const [customGas, setCustomGas] = useState('21000');
    const [gasPrice, setGasPrice] = useState('15');
    const [ethPrice, setEthPrice] = useState('3000');
    const [speed, setSpeed] = useState('standard');
    const [txCount, setTxCount] = useState('1');

    const currentNetwork = NETWORKS.find(n => n.id === network)!;
    const currentTx = TX_TYPES.find(t => t.id === txType)!;
    const currentSpeed = SPEED_MULTIPLIERS.find(s => s.id === speed)!;
    const gasPricePresetValues = [0.7, 1, 1.5, 2.5].map((mult) => {
        const raw = currentNetwork.baseGwei * mult;
        const precision = currentNetwork.baseGwei < 1 ? 2 : 1;
        return Number(raw.toFixed(precision));
    });

    const gasLimit = txType === 'custom' ? (parseFloat(customGas) || 0) : currentTx.gas;
    const gasPriceGwei = parseFloat(gasPrice) || 0;
    const nativePrice = parseFloat(ethPrice) || 0;
    const count = parseInt(txCount) || 1;

    const effectiveGwei = gasPriceGwei * currentSpeed.mult;
    const gasCostETH = (gasLimit * effectiveGwei) / 1e9;
    const gasCostUSD = gasCostETH * nativePrice;
    const totalCostUSD = gasCostUSD * count;

    const hasInputs = gasLimit > 0 && gasPriceGwei > 0 && nativePrice > 0;

    // Handle network change
    const handleNetworkChange = (id: string) => {
        setNetwork(id);
        const net = NETWORKS.find(n => n.id === id)!;
        setGasPrice(String(net.baseGwei));
        setEthPrice(String(net.defaultPrice));
    };
    const applyScenario = (scenario: (typeof GAS_SCENARIOS)[number]) => {
        handleNetworkChange(scenario.network);
        setTxType(scenario.txType);
        setSpeed(scenario.speed);
        setTxCount(scenario.txCount);
    };
    const isScenarioActive = (scenario: (typeof GAS_SCENARIOS)[number]) => (
        network === scenario.network
        && txType === scenario.txType
        && speed === scenario.speed
        && txCount === scenario.txCount
    );

    // Comparison table: all tx types on current network
    const comparisonRows = TX_TYPES.filter(t => t.id !== 'custom').map((t) => {
        const cost = (t.gas * effectiveGwei / 1e9) * nativePrice;
        return { label: t.label, gas: t.gas, cost };
    });

    const reset = () => {
        setNetwork('ethereum'); setTxType('transfer'); setCustomGas('21000');
        setGasPrice('15'); setEthPrice('3000'); setSpeed('standard'); setTxCount('1');
    };

    const formatUSD = (n: number) => {
        if (n < 0.01 && n > 0) return `$${n.toFixed(6)}`;
        if (n < 1) return `$${n.toFixed(4)}`;
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const formatETH = (n: number) => {
        if (n < 0.000001) return `${(n * 1e9).toFixed(4)} Gwei`;
        if (n < 0.001) return `${n.toFixed(8)} ${currentNetwork.symbol}`;
        return `${n.toFixed(6)} ${currentNetwork.symbol}`;
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {GAS_SCENARIOS.map((scenario) => (
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

                    {/* Network */}
                    <div className="input-group">
                        <label><Fuel size={14} /> Network</label>
                        <div className="network-grid">
                            {NETWORKS.map((n) => (
                                <button key={n.id} onClick={() => handleNetworkChange(n.id)} className={`network-btn ${network === n.id ? 'active' : ''}`}
                                    style={{
                                        borderColor: network === n.id ? n.color : undefined,
                                        background: network === n.id ? `${n.color}15` : undefined,
                                        color: network === n.id ? n.color : undefined,
                                    }}>
                                    {n.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Transaction Type */}
                    <div className="input-group">
                        <label><ArrowRight size={14} /> Transaction Type</label>
                        <div className="select-wrap">
                            <select value={txType} onChange={(e) => setTxType(e.target.value)} id="gas-tx-type" className="input-select">
                            {TX_TYPES.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.label} {t.gas > 0 ? `(${t.gas.toLocaleString()} gas)` : ''}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>

                    {/* Custom Gas */}
                    {txType === 'custom' && (
                        <div className="input-group">
                            <label>Custom Gas Limit</label>
                            <input type="number" inputMode="decimal" value={customGas} onChange={(e) => setCustomGas(e.target.value)}
                                placeholder="" id="gas-custom" step="1000" min="21000" />
                        </div>
                    )}

                    {/* Gas Price */}
                    <div className="input-group">
                        <label><Zap size={14} /> Gas Price (Gwei)</label>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)}
                                placeholder="" id="gas-price-gwei" step="0.1" min="0" />
                        </div>
                        <div className="pills-row">
                            {gasPricePresetValues.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${gasPrice === String(value) ? 'active' : ''}`}
                                    onClick={() => setGasPrice(String(value))}
                                >
                                    {value} Gwei
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Speed */}
                    <div className="input-group">
                        <label>Transaction Speed</label>
                        <div className="pills-row">
                            {SPEED_MULTIPLIERS.map((s) => (
                                <button key={s.id} className={`pill-btn ${speed === s.id ? 'active' : ''}`}
                                    onClick={() => setSpeed(s.id)}>
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Native Price */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> {currentNetwork.symbol} Price (USD)</label>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={ethPrice} onChange={(e) => setEthPrice(e.target.value)}
                                placeholder="" id="gas-eth-price" step="any" min="0" />
                        </div>
                    </div>

                    {/* Transaction Count */}
                    <div className="input-group">
                        <label>Number of Transactions</label>
                        <div className="pills-row">
                            {[1, 5, 10, 50, 100].map((c) => (
                                <button key={c} className={`pill-btn ${txCount === String(c) ? 'active' : ''}`}
                                    onClick={() => setTxCount(String(c))}>
                                    {c}
                                </button>
                            ))}
                        </div>
                        <input
                            type="number" inputMode="decimal"
                            value={txCount}
                            onChange={(e) => setTxCount(e.target.value)}
                            min="1"
                            step="1"
                            id="gas-tx-count"
                            style={{ marginTop: '8px' }}
                        />
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Compare speed levels to avoid overpaying for urgency.
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: currentNetwork.color }}>
                                <span className="result-hero-label">{getUiString(lang, 'Gas Cost')} — {currentTx.label}</span>
                                <span className="result-hero-value" style={{ color: currentNetwork.color }}>
                                    <Fuel size={28} />
                                    {formatUSD(gasCostUSD)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    {formatETH(gasCostETH)} {getUiString(lang, 'on')} {currentNetwork.label}
                                </span>
                            </div>

                            {/* Speed cards */}
                            <div className="speed-cards-grid">
                                {SPEED_MULTIPLIERS.map((s) => {
                                    const c = (gasLimit * gasPriceGwei * s.mult / 1e9) * nativePrice;
                                    return (
                                        <div key={s.id} className={`speed-card ${speed === s.id ? 'active' : ''}`} style={{
                                            background: speed === s.id ? `${currentNetwork.color}10` : undefined,
                                            borderColor: speed === s.id ? currentNetwork.color : undefined,
                                        }}>
                                            <div className="speed-card-label">{s.label}</div>
                                            <div className="speed-card-value" style={{ color: speed === s.id ? currentNetwork.color : undefined }}>
                                                {formatUSD(c)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Network')}</span>
                                    <span className="result-value" style={{ color: currentNetwork.color, fontWeight: 600 }}>{currentNetwork.label}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas Limit')}</span>
                                    <span className="result-value">{gasLimit.toLocaleString()} gas</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas Price')}</span>
                                    <span className="result-value">{gasPriceGwei} Gwei × {currentSpeed.mult}x = {effectiveGwei.toFixed(2)} Gwei</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Cost in')} {currentNetwork.symbol}</span>
                                    <span className="result-value">{formatETH(gasCostETH)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{currentNetwork.symbol} {getUiString(lang, 'Price')}</span>
                                    <span className="result-value">{formatUSD(nativePrice)}</span>
                                </div>
                                {count > 1 && (
                                    <>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label">× {count} {getUiString(lang, 'transactions')}</span>
                                            <span className="result-value fee"><strong>{formatUSD(totalCostUSD)}</strong></span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* All Tx Types Comparison */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Fee Comparison')} — {currentNetwork.label} {getUiString(lang, 'at')} {effectiveGwei.toFixed(1)} Gwei
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Transaction')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Gas')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cost')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparisonRows.map((row) => (
                                                <tr key={row.label} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: row.label === currentTx.label ? `${currentNetwork.color}08` : 'transparent',
                                                }}>
                                                    <td style={{ padding: '8px', fontWeight: row.label === currentTx.label ? 600 : 400 }}>{row.label}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>{row.gas.toLocaleString()}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: row.cost > 10 ? 'var(--color-accent-red)' : row.cost > 1 ? 'var(--color-text)' : 'var(--color-accent-green)' }}>
                                                        {formatUSD(row.cost)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Gas prices fluctuate constantly. Check current prices on your network\'s explorer. Actual gas used may differ from estimates.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Fuel size={40} /></div>
                            <h3>{getUiString(lang, 'Estimate Gas Fees')}</h3>
                            <p>{getUiString(lang, 'Select a network and transaction type to calculate gas costs in USD. Compare fees across different transaction types.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
