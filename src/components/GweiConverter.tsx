import { getUiString } from '../i18n/ui-strings';
import { useState, useEffect, useCallback } from 'react';
import {
    DollarSign,
    Info,
    RotateCcw,
    ArrowRightLeft,
    Fuel,
    Zap,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const UNITS = [
    { id: 'wei', label: 'Wei', exp: 0, alias: '' },
    { id: 'kwei', label: 'Kwei', exp: 3, alias: 'Babbage' },
    { id: 'mwei', label: 'Mwei', exp: 6, alias: 'Lovelace' },
    { id: 'gwei', label: 'Gwei', exp: 9, alias: 'Shannon' },
    { id: 'microether', label: 'Microether', exp: 12, alias: 'Szabo' },
    { id: 'milliether', label: 'Milliether', exp: 15, alias: 'Finney' },
    { id: 'ether', label: 'Ether', exp: 18, alias: '' },
];

const QUICK_GWEI = [1, 5, 10, 20, 50, 100];

const GAS_OPERATIONS = [
    { label: 'ETH Transfer', gas: 21000 },
    { label: 'ERC-20 Transfer', gas: 65000 },
    { label: 'ERC-20 Approve', gas: 46000 },
    { label: 'DEX Swap', gas: 200000 },
    { label: 'NFT Mint', gas: 180000 },
    { label: 'Bridge Transfer', gas: 250000 },
    { label: 'Contract Deploy', gas: 1500000 },
];

// Convert between units using BigInt-safe string arithmetic
function convertUnits(amount: string, fromExp: number, toExp: number): string {
    if (!amount || amount === '0') return '0';

    const diff = fromExp - toExp;

    // Parse the input to separate integer and decimal parts
    const parts = amount.split('.');
    const intPart = parts[0] || '0';
    const decPart = parts[1] || '';

    // Combine into a full integer string by shifting decimal
    // e.g., "1.5" with diff=3 means multiply by 1000 = "1500"
    if (diff === 0) return amount;

    if (diff > 0) {
        // Multiply by 10^diff
        const fullNum = intPart + decPart;
        const remainingShift = diff - decPart.length;
        if (remainingShift >= 0) {
            return fullNum + '0'.repeat(remainingShift);
        } else {
            // Insert decimal point
            const insertPos = fullNum.length + remainingShift;
            const left = fullNum.slice(0, insertPos) || '0';
            const right = fullNum.slice(insertPos).replace(/0+$/, '');
            return right ? `${left}.${right}` : left;
        }
    } else {
        // Divide by 10^|diff|
        const absDiff = Math.abs(diff);
        const fullNum = intPart;
        if (fullNum.length > absDiff) {
            const left = fullNum.slice(0, fullNum.length - absDiff);
            const right = (fullNum.slice(fullNum.length - absDiff) + decPart).replace(/0+$/, '');
            return right ? `${left}.${right}` : left;
        } else {
            const padded = '0'.repeat(absDiff - fullNum.length) + fullNum;
            const right = (padded + decPart).replace(/0+$/, '');
            return right ? `0.${right}` : '0';
        }
    }
}

// Format for display: add commas, trim trailing zeros but keep meaningful decimals
function formatDisplay(val: string, maxDecimals: number = 18): string {
    if (!val || val === '0') return '0';

    const parts = val.split('.');
    const intPart = parts[0];
    const decPart = parts[1] || '';

    // Add commas to integer part
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (!decPart) return formatted;

    // Trim trailing zeros, keep up to maxDecimals
    const trimmed = decPart.slice(0, maxDecimals).replace(/0+$/, '');
    return trimmed ? `${formatted}.${trimmed}` : formatted;
}

function GweiConverter({ lang = 'en' }: { lang?: string }) {
    const [amount, setAmount] = useState('1');
    const [selectedUnit, setSelectedUnit] = useState('gwei');
    const [ethPrice, setEthPrice] = useState('2419');
    const [fetchingPrice, setFetchingPrice] = useState(false);

    const currentUnit = UNITS.find(u => u.id === selectedUnit)!;
    const inputAmount = amount.trim();
    const hasInput = inputAmount !== '' && inputAmount !== '0' && parseFloat(inputAmount) > 0;
    const nativePrice = parseFloat(ethPrice) || 0;

    // Fetch ETH price from CoinGecko
    const fetchEthPrice = useCallback(async () => {
        setFetchingPrice(true);
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=${import.meta.env.PUBLIC_COINGECKO_API_KEY || 'REMOVED_COINGECKO_KEY'}`);
            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            if (data.ethereum?.usd) {
                setEthPrice(String(data.ethereum.usd));
            }
        } catch {
            // Silently fail, keep default
        }
        setFetchingPrice(false);
    }, []);

    useEffect(() => {
        fetchEthPrice();
    }, [fetchEthPrice]);

    // Convert current amount to all units
    const conversions = UNITS.map(unit => {
        const converted = convertUnits(inputAmount, currentUnit.exp, unit.exp);
        return {
            ...unit,
            value: converted,
            display: formatDisplay(converted),
        };
    });

    // Get ether value for USD calculation
    const etherValue = parseFloat(convertUnits(inputAmount, currentUnit.exp, 18)) || 0;
    const usdValue = etherValue * nativePrice;

    // Gas cost reference table: cost at different Gwei levels
    const gweiLevels = [1, 5, 10, 20, 50, 100];

    const formatUSD = (n: number) => {
        if (n === 0) return '$0.00';
        if (n < 0.0001 && n > 0) return `$${n.toExponential(2)}`;
        if (n < 0.01 && n > 0) return `$${n.toFixed(6)}`;
        if (n < 1) return `$${n.toFixed(4)}`;
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    const handleQuickGwei = (val: number) => {
        setAmount(String(val));
        setSelectedUnit('gwei');
    };

    const reset = () => {
        setAmount('1');
        setSelectedUnit('gwei');
        fetchEthPrice();
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    {/* Amount */}
                    <div className="input-group">
                        <label><ArrowRightLeft size={14} /> {getUiString(lang, 'Amount')}</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => {
                                const v = e.target.value;
                                if (/^[0-9]*\.?[0-9]*$/.test(v) || v === '') {
                                    setAmount(v);
                                }
                            }}
                            placeholder=""
                            id="gwei-amount"
                         onFocus={(e) => e.target.select()} />
                    </div>

                    {/* Unit Selection */}
                    <div className="input-group">
                        <label><Zap size={14} /> {getUiString(lang, 'Unit')}</label>
                        <div className="pills-row" style={{ flexWrap: 'wrap' }}>
                            {UNITS.map((u) => (
                                <button
                                    key={u.id}
                                    className={`pill-btn ${selectedUnit === u.id ? 'active' : ''}`}
                                    onClick={() => setSelectedUnit(u.id)}
                                >
                                    {u.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Gwei Buttons */}
                    <div className="input-group">
                        <label><Fuel size={14} /> {getUiString(lang, 'Quick Gwei Values')}</label>
                        <div className="pills-row">
                            {QUICK_GWEI.map((g) => (
                                <button
                                    key={g}
                                    className={`pill-btn ${selectedUnit === 'gwei' && amount === String(g) ? 'active' : ''}`}
                                    onClick={() => handleQuickGwei(g)}
                                >
                                    {g} Gwei
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ETH Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} /> {getUiString(lang, 'ETH Price (USD)')}
                            {fetchingPrice && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginLeft: '8px' }}>{getUiString(lang, 'fetching...')}</span>}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={ethPrice}
                                onChange={(e) => setEthPrice(e.target.value)}
                                placeholder=""
                                id="gwei-eth-price"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInput ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: '#627EEA' }}>
                                <span className="result-hero-label">
                                    {formatDisplay(inputAmount)} {currentUnit.label}
                                    {currentUnit.alias ? ` (${currentUnit.alias})` : ''}
                                </span>
                                <span className="result-hero-value" style={{ color: '#627EEA' }}>
                                    <ArrowRightLeft size={28} />
                                    {formatDisplay(convertUnits(inputAmount, currentUnit.exp, 18), 12)} ETH
                                </span>
                                {nativePrice > 0 && (
                                    <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                        {formatUSD(usdValue)}
                                    </span>
                                )}
                            </div>

                            {/* All Unit Conversions */}
                            <div style={{ marginTop: '16px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'All Ethereum Unit Conversions')}
                                </h4>
                                <div className="result-breakdown">
                                    {conversions.map((c) => (
                                        <div className="result-row" key={c.id}>
                                            <span className="result-label">
                                                {c.label}
                                                {c.alias && <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginLeft: '4px' }}>({c.alias})</span>}
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '6px' }}>
                                                    10<sup>{c.exp}</sup> {getUiString(lang, 'Wei')}
                                                </span>
                                            </span>
                                            <span
                                                className="result-value"
                                                style={{
                                                    fontWeight: c.id === selectedUnit ? 700 : 400,
                                                    color: c.id === selectedUnit ? '#627EEA' : undefined,
                                                    wordBreak: 'break-all',
                                                    maxWidth: '220px',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                {c.display}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gas Cost Reference */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Gas Cost Reference')} (at ETH {formatUSD(nativePrice)})
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Operation')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Gas')}</th>
                                                {gweiLevels.map((g) => (
                                                    <th key={g} style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                                                        {g} Gwei
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {GAS_OPERATIONS.map((op) => (
                                                <tr key={op.label} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', fontWeight: 500 }}>{getUiString(lang, op.label)}</td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                        {op.gas.toLocaleString()}
                                                    </td>
                                                    {gweiLevels.map((g) => {
                                                        const costEth = (op.gas * g) / 1e9;
                                                        const costUsd = costEth * nativePrice;
                                                        return (
                                                            <td key={g} style={{
                                                                padding: '8px', textAlign: 'right', fontWeight: 500, whiteSpace: 'nowrap',
                                                                color: costUsd > 10 ? 'var(--color-accent-red)' : costUsd > 1 ? 'var(--color-text)' : 'var(--color-accent-green)',
                                                            }}>
                                                                {formatUSD(costUsd)}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'ETH price is auto-fetched from CoinGecko. Gas costs are estimates based on typical gas limits. Actual costs depend on network congestion and priority fees.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><ArrowRightLeft size={40} /></div>
                            <h3>{getUiString(lang, 'Convert Ethereum Units')}</h3>
                            <p>{getUiString(lang, 'Enter an amount and select a unit to instantly convert between Wei, Gwei, Ether, and all other Ethereum denominations. See gas cost estimates at different Gwei levels.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(GweiConverter);
