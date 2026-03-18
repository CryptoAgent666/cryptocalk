import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {
    Clock,
    Cpu,
    Zap,
    DollarSign,
    TrendingDown,
    TrendingUp,
    AlertTriangle,
    Info,
    RotateCcw,
    Timer,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

/* ------------------------------------------------------------------ */
/*  Halving history (hardcoded, accurate)                             */
/* ------------------------------------------------------------------ */

interface HalvingEvent {
    number: number;
    block: number;
    date: string;        // human-readable
    timestamp: number;   // ms epoch (approximate midnight UTC)
    rewardBefore: number;
    rewardAfter: number;
    priceAtHalving: number;
    priceAfter6m: number | null;
    priceAfter12m: number | null;
    priceAfter18m: number | null;
}

const HALVINGS: HalvingEvent[] = [
    {
        number: 1, block: 210_000, date: 'Nov 28, 2012',
        timestamp: Date.UTC(2012, 10, 28),
        rewardBefore: 50, rewardAfter: 25,
        priceAtHalving: 12, priceAfter6m: 130, priceAfter12m: 1000, priceAfter18m: 600,
    },
    {
        number: 2, block: 420_000, date: 'Jul 9, 2016',
        timestamp: Date.UTC(2016, 6, 9),
        rewardBefore: 25, rewardAfter: 12.5,
        priceAtHalving: 650, priceAfter6m: 900, priceAfter12m: 2500, priceAfter18m: 6000,
    },
    {
        number: 3, block: 630_000, date: 'May 11, 2020',
        timestamp: Date.UTC(2020, 4, 11),
        rewardBefore: 12.5, rewardAfter: 6.25,
        priceAtHalving: 8600, priceAfter6m: 19000, priceAfter12m: 58000, priceAfter18m: 30000,
    },
    {
        number: 4, block: 840_000, date: 'Apr 20, 2024',
        timestamp: Date.UTC(2024, 3, 20),
        rewardBefore: 6.25, rewardAfter: 3.125,
        priceAtHalving: 64000, priceAfter6m: 67000, priceAfter12m: 100000, priceAfter18m: 126000,
    },
];

const NEXT_HALVING_BLOCK = 1_050_000;
const CURRENT_REWARD = 3.125;
const POST_HALVING_REWARD = 1.5625;
const BLOCKS_PER_DAY = 144;
const REFERENCE_BLOCK = 840_000;
const REFERENCE_DATE = Date.UTC(2024, 3, 20); // Apr 20 2024

// Simplified network hashrate for revenue estimation (updated 2026-03-18)
const NETWORK_HASHRATE_THS = 800_000_000; // 800 EH/s in TH/s
const HASHRATE_PRESETS = ['50', '100', '200', '500', '1000'];
const ELECTRICITY_COST_PRESETS = ['0.04', '0.06', '0.08', '0.10', '0.15'];
const POWER_PRESETS = ['1800', '2500', '3000', '4500', '6000'];
const BTC_PRICE_PRESETS = ['60000', '80000', '100000', '120000'];
const HALVING_SCENARIOS = [
    { label: 'Home Rig', hashrate: '100', electricity: '0.10', power: '3000' },
    { label: 'ASIC Pro', hashrate: '200', electricity: '0.08', power: '3250' },
    { label: 'Small Farm', hashrate: '1000', electricity: '0.06', power: '15000' },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

function HalvingCalculator({ lang = 'en' }: { lang?: string }) {
    // Mining impact inputs
    const [hashrate, setHashrate] = useState('100');
    const [electricityCost, setElectricityCost] = useState('0.08');
    const [powerConsumption, setPowerConsumption] = useState('3000');
    const [btcPrice, setBtcPrice] = useState('');

    // Fetch BTC price on mount
    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${import.meta.env.PUBLIC_COINGECKO_API_KEY || 'CG-Zeo2WrX3r7J1oUoX1kSnutmz'}`)
            .then(r => r.json())
            .then(d => { if (d.bitcoin?.usd) setBtcPrice(String(d.bitcoin.usd)); })
            .catch(() => { });
    }, []);

    /* ---- Countdown calculations ---- */
    const countdown = useMemo(() => {
        const now = Date.now();
        const daysSinceRef = (now - REFERENCE_DATE) / (1000 * 60 * 60 * 24);
        const currentBlock = REFERENCE_BLOCK + Math.floor(daysSinceRef * BLOCKS_PER_DAY);
        const blocksRemaining = Math.max(0, NEXT_HALVING_BLOCK - currentBlock);
        const daysRemaining = blocksRemaining / BLOCKS_PER_DAY;
        const hoursRemaining = (daysRemaining % 1) * 24;

        const estimatedDate = new Date(now + daysRemaining * 24 * 60 * 60 * 1000);
        const estimatedDateStr = estimatedDate.toLocaleDateString('en-US', {
            month: 'long', year: 'numeric',
        });

        return {
            currentBlock,
            blocksRemaining,
            daysRemaining: Math.floor(daysRemaining),
            hoursRemaining: Math.floor(hoursRemaining),
            estimatedDate: estimatedDateStr,
        };
    }, []);

    /* ---- Mining impact calculations ---- */
    const calculate = useCallback(() => {
        const hr = parseFloat(hashrate) || 0;
        const elCost = parseFloat(electricityCost) || 0;
        const watts = parseFloat(powerConsumption) || 0;
        const price = parseFloat(btcPrice) || 0;

        if (hr <= 0 || price <= 0) return null;

        const yourShare = hr / NETWORK_HASHRATE_THS;
        const currentDailyBtc = yourShare * BLOCKS_PER_DAY * CURRENT_REWARD;
        const postHalvingDailyBtc = yourShare * BLOCKS_PER_DAY * POST_HALVING_REWARD;

        const currentDailyRevenue = currentDailyBtc * price;
        const postHalvingDailyRevenue = postHalvingDailyBtc * price;
        const revenueDrop = currentDailyRevenue - postHalvingDailyRevenue;

        const dailyElectricity = (watts / 1000) * 24 * elCost;

        const currentNetProfit = currentDailyRevenue - dailyElectricity;
        const postHalvingNetProfit = postHalvingDailyRevenue - dailyElectricity;

        return {
            currentDailyBtc,
            postHalvingDailyBtc,
            currentDailyRevenue,
            postHalvingDailyRevenue,
            revenueDrop,
            dailyElectricity,
            currentNetProfit,
            postHalvingNetProfit,
        };
    }, [hashrate, electricityCost, powerConsumption, btcPrice]);

    const results = useMemo(() => calculate(), [calculate]);

    /* ---- Reset ---- */
    const reset = () => {
        setHashrate('100');
        setElectricityCost('0.08');
        setPowerConsumption('3000');
        setBtcPrice('');
    };

    /* ---- Formatters ---- */
    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatBTC = (n: number) => {
        if (n < 0.00001) return n.toExponential(4) + ' BTC';
        return n.toFixed(8) + ' BTC';
    };

    const formatNumber = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US').format(n);

    const hasInputs = results !== null;
    const postHalvingNegative = results ? results.postHalvingNetProfit < 0 : false;
    const applyScenario = (scenario: (typeof HALVING_SCENARIOS)[number]) => {
        setHashrate(scenario.hashrate);
        setElectricityCost(scenario.electricity);
        setPowerConsumption(scenario.power);
    };
    const isScenarioActive = (scenario: (typeof HALVING_SCENARIOS)[number]) => (
        hashrate === scenario.hashrate
        && electricityCost === scenario.electricity
        && powerConsumption === scenario.power
    );

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* ===== Left: Input Panel ===== */}
                <div className="calc-input-panel">
                    {/* Hashrate */}
                    <div className="input-group">
                        <label>
                            <Cpu size={14} />
                            {getUiString(lang, 'Your Hashrate')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={hashrate}
                                onChange={(e) => setHashrate(e.target.value)}
                                placeholder=""
                                id="halving-hashrate"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {HASHRATE_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${hashrate === value ? 'active' : ''}`}
                                    onClick={() => setHashrate(value)}
                                >
                                    {value} TH/s
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Electricity Cost */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            {getUiString(lang, 'Electricity Cost')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={electricityCost}
                                onChange={(e) => setElectricityCost(e.target.value)}
                                placeholder=""
                                id="halving-electricity"
                                step="0.01"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                            <span className="label-hint">{getUiString(lang, 'per kWh')}</span>
                        </div>
                        <div className="pills-row">
                            {ELECTRICITY_COST_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${electricityCost === value ? 'active' : ''}`}
                                    onClick={() => setElectricityCost(value)}
                                >
                                    ${value}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Power Consumption */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            {getUiString(lang, 'Power Consumption')}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={powerConsumption}
                                onChange={(e) => setPowerConsumption(e.target.value)}
                                placeholder=""
                                id="halving-power"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {POWER_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${powerConsumption === value ? 'active' : ''}`}
                                    onClick={() => setPowerConsumption(value)}
                                >
                                    {Number(value).toLocaleString('en-US')}W
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BTC Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Current BTC Price')}
                            {btcPrice && <span className="label-hint">{getUiString(lang, 'Auto-filled')}</span>}
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={btcPrice}
                                onChange={(e) => setBtcPrice(e.target.value)}
                                placeholder={getUiString(lang, 'Fetching...')}
                                id="halving-btc-price"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {BTC_PRICE_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${btcPrice === value ? 'active' : ''}`}
                                    onClick={() => setBtcPrice(value)}
                                >
                                    ${Number(value).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {HALVING_SCENARIOS.map((scenario) => (
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

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use miner profiles, then adjust power and electricity to stress-test post-halving margin.')}
                    </span>
                </div>

                {/* ===== Right: Results Panel ===== */}
                <div className="calc-results-panel">
                    {/* Part 1 — Halving Countdown (always visible) */}
                    <div className="result-hero" style={{ borderColor: 'var(--color-accent-orange, #f59e0b)' }}>
                        <span className="result-hero-label">
                            <Timer size={16} />
                            {getUiString(lang, 'Next Bitcoin Halving (#5)')}
                        </span>
                        <span className="result-hero-value" style={{ color: 'var(--color-accent-orange, #f59e0b)' }}>
                            <Clock size={28} />
                            {countdown.daysRemaining} {getUiString(lang, 'Days')}, {countdown.hoursRemaining} {getUiString(lang, 'Hours')}
                        </span>
                        <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                            {getUiString(lang, 'Est.')} {countdown.estimatedDate} &middot; {getUiString(lang, 'Block')} {formatNumber(NEXT_HALVING_BLOCK)}
                        </span>
                    </div>

                    {/* Countdown details */}
                    <div className="result-breakdown">
                        <div className="result-row">
                            <span className="result-label">{getUiString(lang, 'Current Block (est.)')}</span>
                            <span className="result-value">{formatNumber(countdown.currentBlock)}</span>
                        </div>
                        <div className="result-row">
                            <span className="result-label">{getUiString(lang, 'Blocks Remaining')}</span>
                            <span className="result-value">{formatNumber(countdown.blocksRemaining)}</span>
                        </div>
                        <div className="result-row">
                            <span className="result-label">{getUiString(lang, 'Current Block Reward')}</span>
                            <span className="result-value">{CURRENT_REWARD} BTC</span>
                        </div>
                        <div className="result-row">
                            <span className="result-label">{getUiString(lang, 'Post-Halving Reward')}</span>
                            <span className="result-value">{POST_HALVING_REWARD} BTC</span>
                        </div>
                    </div>

                    <div className="result-divider" />

                    {/* Part 2 — Mining Impact Results */}
                    {hasInputs ? (
                        <>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-text)' }}>
                                {getUiString(lang, 'Mining Impact Analysis')}
                            </h4>

                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Your Daily BTC (current)')}</span>
                                    <span className="result-value">{formatBTC(results!.currentDailyBtc)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Your Daily BTC (post-halving)')}</span>
                                    <span className="result-value">{formatBTC(results!.postHalvingDailyBtc)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Current Daily Revenue')}</span>
                                    <span className="result-value profit">{formatUSD(results!.currentDailyRevenue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Post-Halving Daily Revenue')}</span>
                                    <span className="result-value">{formatUSD(results!.postHalvingDailyRevenue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">
                                        <TrendingDown size={14} />
                                        {getUiString(lang, 'Revenue Drop')}
                                    </span>
                                    <span className="result-value fee">-{formatUSD(results!.revenueDrop)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Daily Electricity Cost')}</span>
                                    <span className="result-value fee">-{formatUSD(results!.dailyElectricity)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Current Net Profit / Day')}</strong></span>
                                    <span className={`result-value ${results!.currentNetProfit >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>
                                            {results!.currentNetProfit >= 0 ? '+' : ''}{formatUSD(results!.currentNetProfit)}
                                        </strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Post-Halving Net Profit / Day')}</strong></span>
                                    <span className={`result-value ${results!.postHalvingNetProfit >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>
                                            {results!.postHalvingNetProfit >= 0 ? '+' : ''}{formatUSD(results!.postHalvingNetProfit)}
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            {/* Warning if post-halving is negative */}
                            {postHalvingNegative && (
                                <div style={{
                                    marginTop: '12px',
                                    padding: '12px 14px',
                                    borderRadius: '10px',
                                    background: 'rgba(239, 68, 68, 0.08)',
                                    border: '1px solid rgba(239, 68, 68, 0.25)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '0.82rem',
                                    color: '#ef4444',
                                }}>
                                    <AlertTriangle size={18} />
                                    <span>
                                        <strong>{getUiString(lang, 'Warning:')}</strong> {getUiString(lang, 'Mining will be')} <strong>{getUiString(lang, 'unprofitable')}</strong> {getUiString(lang, 'after the halving at current prices and electricity costs. Consider upgrading hardware or finding cheaper power.')}
                                    </span>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Cpu size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Enter Mining Details')}</h3>
                            <p>{getUiString(lang, 'Fill in your hashrate, electricity cost, and power consumption to see the halving impact on your mining profitability.')}</p>
                        </div>
                    )}

                    {/* Part 3 — Historical Halving Impact Table */}
                    <div style={{ marginTop: '24px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                            {getUiString(lang, 'Historical Halving Price Impact')}
                        </h4>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Halving')}</th>
                                        <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Date')}</th>
                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Price at Halving')}</th>
                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, '+6 Months')}</th>
                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, '+12 Months')}</th>
                                        <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, '+18 Months')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HALVINGS.map((h) => (
                                        <tr key={h.number} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: '8px', fontWeight: 600 }}>#{h.number}</td>
                                            <td style={{ padding: '8px', color: 'var(--color-text-muted)' }}>{h.date}</td>
                                            <td style={{ padding: '8px', textAlign: 'right' }}>{formatUSD(h.priceAtHalving)}</td>
                                            <td style={{
                                                padding: '8px', textAlign: 'right',
                                                color: h.priceAfter6m && h.priceAfter6m > h.priceAtHalving ? 'var(--color-accent-green, #10b981)' : 'var(--color-text)',
                                            }}>
                                                {h.priceAfter6m !== null ? formatUSD(h.priceAfter6m) : getUiString(lang, 'TBD')}
                                            </td>
                                            <td style={{
                                                padding: '8px', textAlign: 'right',
                                                color: h.priceAfter12m && h.priceAfter12m > h.priceAtHalving ? 'var(--color-accent-green, #10b981)' : 'var(--color-text)',
                                            }}>
                                                {h.priceAfter12m !== null ? formatUSD(h.priceAfter12m) : getUiString(lang, 'TBD')}
                                            </td>
                                            <td style={{
                                                padding: '8px', textAlign: 'right',
                                                color: h.priceAfter18m && h.priceAfter18m > h.priceAtHalving ? 'var(--color-accent-green, #10b981)' : 'var(--color-text)',
                                            }}>
                                                {h.priceAfter18m !== null ? formatUSD(h.priceAfter18m) : getUiString(lang, 'TBD')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="calc-disclaimer">
                        <Info size={12} />
                        {getUiString(lang, 'Block estimates assume ~10 min/block (144 blocks/day). Actual halving date may vary. Mining revenue is a simplified estimate based on ~800 EH/s network hashrate. Not financial advice.')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(HalvingCalculator);
