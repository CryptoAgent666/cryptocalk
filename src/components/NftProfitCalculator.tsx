import { getUiString } from '../i18n/ui-strings';
import { useState, useEffect } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Image,
    Fuel,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

// Marketplace fees updated 2026-03-18.
const MARKETPLACES = [
    { id: 'opensea', label: 'OpenSea', fee: 1.0 },
    { id: 'blur', label: 'Blur', fee: 0.5 },
    { id: 'magic_eden', label: 'Magic Eden', fee: 2 },
    { id: 'custom', label: 'Custom', fee: 0 },
];

const FEE_COMPARISON = [
    { name: 'OpenSea', fee: '1%' },
    { name: 'Blur', fee: '0.5%' },
    { name: 'Magic Eden', fee: '2%' },
    { name: 'LooksRare', fee: '0.5%' },
];

const BUY_PRICE_PILLS = ['0.2', '0.5', '1', '2'];
const SELL_PRICE_PILLS = ['0.5', '1', '2', '4'];
const MARKETPLACE_FEE_PILLS = ['0.5', '1', '2', '2.5', '5'];
const ROYALTY_PILLS = ['0', '2.5', '5', '7.5', '10'];
const GAS_COST_PILLS = ['5', '10', '20', '40'];
const ETH_PRICE_PILLS = ['1800', '2327', '2800', '3500'];
const NFT_SCENARIOS = [
    {
        label: 'Starter Flip',
        buyPrice: '0.2',
        sellPrice: '0.5',
        marketplace: 'opensea',
        marketplaceFee: '1',
        royalty: '5',
        gasBuy: '2',
        gasSell: '2',
        ethPrice: '2327',
    },
    {
        label: 'Low Fee',
        buyPrice: '1',
        sellPrice: '2',
        marketplace: 'blur',
        marketplaceFee: '0.5',
        royalty: '2.5',
        gasBuy: '1',
        gasSell: '1',
        ethPrice: '2327',
    },
    {
        label: 'High Gas',
        buyPrice: '0.5',
        sellPrice: '1',
        marketplace: 'magic_eden',
        marketplaceFee: '2',
        royalty: '5',
        gasBuy: '10',
        gasSell: '10',
        ethPrice: '2327',
    },
] as const;

function NftProfitCalculator({ lang = 'en' }: { lang?: string }) {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [marketplace, setMarketplace] = useState('opensea');
    const [marketplaceFee, setMarketplaceFee] = useState('1');
    const [royalty, setRoyalty] = useState('5');
    const [gasBuy, setGasBuy] = useState('2');
    const [gasSell, setGasSell] = useState('2');
    const [ethPrice, setEthPrice] = useState('2327');

    // Auto-fetch ETH price on mount
    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&x_cg_demo_api_key=${import.meta.env.PUBLIC_COINGECKO_API_KEY || 'CG-Zeo2WrX3r7J1oUoX1kSnutmz'}`)
            .then(r => r.json())
            .then(d => { if (d.ethereum?.usd) setEthPrice(String(d.ethereum.usd)); })
            .catch(() => { });
    }, []);

    // Handle marketplace change
    const handleMarketplaceChange = (id: string) => {
        setMarketplace(id);
        const mp = MARKETPLACES.find(m => m.id === id);
        if (mp && id !== 'custom') {
            setMarketplaceFee(String(mp.fee));
        }
    };
    const applyScenario = (scenario: (typeof NFT_SCENARIOS)[number]) => {
        setBuyPrice(scenario.buyPrice);
        setSellPrice(scenario.sellPrice);
        setMarketplace(scenario.marketplace);
        setMarketplaceFee(scenario.marketplaceFee);
        setRoyalty(scenario.royalty);
        setGasBuy(scenario.gasBuy);
        setGasSell(scenario.gasSell);
        setEthPrice(scenario.ethPrice);
    };
    const isScenarioActive = (scenario: (typeof NFT_SCENARIOS)[number]) => (
        buyPrice === scenario.buyPrice
        && sellPrice === scenario.sellPrice
        && marketplace === scenario.marketplace
        && marketplaceFee === scenario.marketplaceFee
        && royalty === scenario.royalty
        && gasBuy === scenario.gasBuy
        && gasSell === scenario.gasSell
        && ethPrice === scenario.ethPrice
    );

    // Parse inputs
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const mpFeePct = parseFloat(marketplaceFee) || 0;
    const royaltyPct = parseFloat(royalty) || 0;
    const gasBuyUsd = parseFloat(gasBuy) || 0;
    const gasSellUsd = parseFloat(gasSell) || 0;
    const ethPriceUsd = parseFloat(ethPrice) || 0;

    const hasInputs = buy > 0 && sell > 0 && ethPriceUsd > 0;

    // Calculations
    const grossProfit = sell - buy;
    const marketplaceFeeEth = sell * mpFeePct / 100;
    const royaltyEth = sell * royaltyPct / 100;
    const gasTotalUsd = gasBuyUsd + gasSellUsd;
    const gasTotalEth = ethPriceUsd > 0 ? gasTotalUsd / ethPriceUsd : 0;
    const netProfitEth = grossProfit - marketplaceFeeEth - royaltyEth - gasTotalEth;
    const netProfitUsd = netProfitEth * ethPriceUsd;
    const totalFees = marketplaceFeeEth + royaltyEth + gasTotalEth;
    const totalFeesUsd = totalFees * ethPriceUsd;
    const effectiveFeeRate = grossProfit > 0 ? (totalFees / grossProfit) * 100 : 0;
    const breakEvenSell = (mpFeePct + royaltyPct) < 100
        ? (buy + gasTotalEth) / (1 - (mpFeePct + royaltyPct) / 100)
        : 0;

    const isProfit = netProfitEth >= 0;

    const reset = () => {
        setBuyPrice(''); setSellPrice(''); setMarketplace('opensea');
        setMarketplaceFee('1'); setRoyalty('5'); setGasBuy('2');
        setGasSell('2'); setEthPrice('2327');
    };

    const formatETH = (n: number) => {
        if (Math.abs(n) < 0.0001 && n !== 0) return `${n.toFixed(6)} ETH`;
        if (Math.abs(n) < 0.01) return `${n.toFixed(4)} ETH`;
        return `${n.toFixed(4)} ETH`;
    };

    const formatUSD = (n: number) => {
        if (Math.abs(n) < 0.01 && n !== 0) return `$${n.toFixed(4)}`;
        return new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
        }).format(n);
    };

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {NFT_SCENARIOS.map((scenario) => (
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

                    {/* Buy Price */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Buy Price</label>
                        <div className="pills-row">
                            {BUY_PRICE_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${buyPrice === value ? 'active' : ''}`}
                                    onClick={() => setBuyPrice(value)}
                                >
                                    {value} ETH
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-buy-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Sell Price */}
                    <div className="input-group">
                        <label><DollarSign size={14} /> Sell Price</label>
                        <div className="pills-row">
                            {SELL_PRICE_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${sellPrice === value ? 'active' : ''}`}
                                    onClick={() => setSellPrice(value)}
                                >
                                    {value} ETH
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-sell-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Marketplace */}
                    <div className="input-group">
                        <label><Image size={14} /> Marketplace</label>
                        <div className="pills-row">
                            {MARKETPLACES.map((mp) => (
                                <button
                                    key={mp.id}
                                    className={`pill-btn ${marketplace === mp.id ? 'active' : ''}`}
                                    onClick={() => handleMarketplaceChange(mp.id)}
                                >
                                    {mp.label} {mp.id !== 'custom' ? `(${mp.fee}%)` : ''}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Marketplace Fee */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} /> Marketplace Fee (%)
                            {marketplace !== 'custom' && (
                                <span className="label-hint">Auto-filled</span>
                            )}
                        </label>
                        <div className="pills-row">
                            {MARKETPLACE_FEE_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${marketplaceFee === value ? 'active' : ''}`}
                                    onClick={() => {
                                        setMarketplace('custom');
                                        setMarketplaceFee(value);
                                    }}
                                >
                                    {value}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={marketplaceFee}
                                onChange={(e) => { setMarketplaceFee(e.target.value); setMarketplace('custom'); }}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-mp-fee"
                                step="0.1"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Creator Royalty */}
                    <div className="input-group">
                        <label><Percent size={14} /> Creator Royalty (%)</label>
                        <div className="pills-row">
                            {ROYALTY_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${royalty === value ? 'active' : ''}`}
                                    onClick={() => setRoyalty(value)}
                                >
                                    {value}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={royalty}
                                onChange={(e) => setRoyalty(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-royalty"
                                step="0.5"
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>

                    {/* Gas Cost: Buy */}
                    <div className="input-group">
                        <label><Fuel size={14} /> Gas Cost: Buy ($)</label>
                        <div className="pills-row">
                            {GAS_COST_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${gasBuy === value ? 'active' : ''}`}
                                    onClick={() => setGasBuy(value)}
                                >
                                    ${value}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={gasBuy}
                                onChange={(e) => setGasBuy(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-gas-buy"
                                step="1"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Gas Cost: Sell */}
                    <div className="input-group">
                        <label><Fuel size={14} /> Gas Cost: Sell ($)</label>
                        <div className="pills-row">
                            {GAS_COST_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${gasSell === value ? 'active' : ''}`}
                                    onClick={() => setGasSell(value)}
                                >
                                    ${value}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={gasSell}
                                onChange={(e) => setGasSell(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-gas-sell"
                                step="1"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* ETH Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} /> ETH Price ($)
                            <span className="label-hint">Auto-fetched</span>
                        </label>
                        <div className="pills-row">
                            {ETH_PRICE_PILLS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${ethPrice === value ? 'active' : ''}`}
                                    onClick={() => setEthPrice(value)}
                                >
                                    ${Number(value) / 1000}k
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={ethPrice}
                                onChange={(e) => setEthPrice(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                placeholder=""
                                id="nft-eth-price"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Compare low-fee and high-fee presets before listing.
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: isProfit ? 'var(--color-accent-green)' : '#ef4444' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Net Profit')}</span>
                                <span className="result-hero-value" style={{ color: isProfit ? 'var(--color-accent-green)' : '#ef4444' }}>
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {netProfitEth >= 0 ? '' : '-'}{formatETH(Math.abs(netProfitEth))}
                                </span>
                                <span className="result-hero-roi" style={{ color: isProfit ? 'var(--color-accent-green)' : '#ef4444' }}>
                                    {netProfitUsd >= 0 ? '+' : '-'}{formatUSD(Math.abs(netProfitUsd))}
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gross Profit')}</span>
                                    <span className={`result-value ${grossProfit >= 0 ? 'profit' : 'fee'}`}>
                                        {formatETH(grossProfit)} / {formatUSD(grossProfit * ethPriceUsd)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Marketplace Fee')} ({mpFeePct}%)</span>
                                    <span className="result-value fee">
                                        -{formatETH(marketplaceFeeEth)} / -{formatUSD(marketplaceFeeEth * ethPriceUsd)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Creator Royalty')} ({royaltyPct}%)</span>
                                    <span className="result-value fee">
                                        -{formatETH(royaltyEth)} / -{formatUSD(royaltyEth * ethPriceUsd)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas Fees')}</span>
                                    <span className="result-value fee">
                                        -{formatETH(gasTotalEth)} / -{formatUSD(gasTotalUsd)}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Fees')}</strong></span>
                                    <span className="result-value fee">
                                        <strong>-{formatETH(totalFees)} / -{formatUSD(totalFeesUsd)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Effective Fee Rate')}</span>
                                    <span className="result-value fee">
                                        {grossProfit > 0 ? `${effectiveFeeRate.toFixed(2)}%` : 'N/A'}
                                    </span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net Profit')}</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'fee'}`}>
                                        <strong>{netProfitEth >= 0 ? '+' : ''}{formatETH(netProfitEth)} / {netProfitUsd >= 0 ? '+' : ''}{formatUSD(netProfitUsd)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Break-even */}
                            {breakEvenSell > 0 && (
                                <div style={{
                                    padding: '10px 14px',
                                    background: 'rgba(99,102,241,0.08)',
                                    border: '1px solid rgba(99,102,241,0.25)',
                                    borderRadius: '10px', fontSize: '0.85rem',
                                    color: 'var(--color-text)',
                                    display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0',
                                }}>
                                    <Info size={16} style={{ flexShrink: 0, color: '#6366f1' }} />
                                    {getUiString(lang, 'You need to sell above')} {formatETH(breakEvenSell)} ({formatUSD(breakEvenSell * ethPriceUsd)}) {getUiString(lang, 'to break even')}
                                </div>
                            )}

                            {/* High fee warning */}
                            {grossProfit > 0 && effectiveFeeRate > 15 && (
                                <div style={{
                                    padding: '10px 14px',
                                    background: 'rgba(249,115,22,0.1)',
                                    border: '1px solid rgba(249,115,22,0.3)',
                                    borderRadius: '10px', fontSize: '0.85rem',
                                    color: '#f97316',
                                    display: 'flex', gap: '8px', alignItems: 'center', margin: '12px 0',
                                }}>
                                    <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                                    {getUiString(lang, 'Fees consume over 15% of your profit. Consider lower-fee marketplaces.')}
                                </div>
                            )}

                            {/* Fee Comparison Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Marketplace Fee Comparison')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Marketplace')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Fee')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cost on this trade')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {FEE_COMPARISON.map((row) => {
                                                const feePct = parseFloat(row.fee);
                                                const feeEth = sell * feePct / 100;
                                                const currentMp = MARKETPLACES.find(m => m.id === marketplace);
                                                const isSelected = currentMp && currentMp.label === row.name;
                                                return (
                                                    <tr key={row.name} style={{
                                                        borderBottom: '1px solid var(--color-border)',
                                                        background: isSelected ? 'rgba(99,102,241,0.06)' : 'transparent',
                                                    }}>
                                                        <td style={{ padding: '8px', fontWeight: isSelected ? 600 : 400 }}>
                                                            {row.name}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-secondary)' }}>
                                                            {row.fee}
                                                        </td>
                                                        <td style={{
                                                            padding: '8px', textAlign: 'right', fontWeight: 600,
                                                            color: feePct > 2 ? 'var(--color-accent-red)' : feePct > 1 ? 'var(--color-text)' : 'var(--color-accent-green)',
                                                        }}>
                                                            {formatETH(feeEth)} ({formatUSD(feeEth * ethPriceUsd)})
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Fees and royalties vary by collection and marketplace. Gas costs fluctuate with network congestion. This is an estimate, not financial advice.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Image size={40} /></div>
                            <h3>{getUiString(lang, 'Calculate NFT Profit')}</h3>
                            <p>{getUiString(lang, 'Enter your buy and sell prices to see your real profit after marketplace fees, creator royalties, and gas costs.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(NftProfitCalculator);
