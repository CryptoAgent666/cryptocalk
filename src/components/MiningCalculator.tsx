import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    Cpu,
    Zap,
    DollarSign,
    TrendingUp,
    Calendar,
    ChevronDown,
    RotateCcw,
    Loader2,
    Info,
} from 'lucide-react';

interface AsicPreset {
    name: string;
    hashrate: number; // TH/s
    power: number; // Watts
    price: number; // USD
}

const ASIC_PRESETS: AsicPreset[] = [
    { name: 'Custom', hashrate: 0, power: 0, price: 0 },
    { name: 'Antminer S21 Hyd', hashrate: 335, power: 5360, price: 5200 },
    { name: 'Antminer S21 XP', hashrate: 270, power: 3645, price: 4800 },
    { name: 'Antminer S21', hashrate: 200, power: 3500, price: 3500 },
    { name: 'Antminer S19 XP', hashrate: 140, power: 3010, price: 2800 },
    { name: 'Antminer S19k Pro', hashrate: 120, power: 2760, price: 1800 },
    { name: 'Whatsminer M60S', hashrate: 186, power: 3344, price: 3200 },
    { name: 'Whatsminer M56S++', hashrate: 230, power: 5290, price: 4500 },
    { name: 'Whatsminer M50S++', hashrate: 150, power: 3450, price: 2500 },
    { name: 'Avalon A1466', hashrate: 150, power: 3300, price: 2900 },
];
const HASHRATE_PILLS = ['120', '140', '200', '335'];
const POWER_PILLS = ['2760', '3010', '3500', '5360'];
const ELECTRICITY_PILLS = ['0.04', '0.06', '0.08', '0.10', '0.15'];
const POOL_FEE_PILLS = ['1', '2', '3', '4'];
const HARDWARE_COST_PILLS = ['2000', '3500', '5000', '8000'];
const MINING_SCENARIOS = [
    {
        label: 'S19 XP Standard',
        selectedPreset: 'Antminer S19 XP',
        hashrate: '140',
        power: '3010',
        electricityCost: '0.10',
        poolFee: '2',
        hardwareCost: '2800',
    },
    {
        label: 'S21 Hyd Low Cost',
        selectedPreset: 'Antminer S21 Hyd',
        hashrate: '335',
        power: '5360',
        electricityCost: '0.06',
        poolFee: '1',
        hardwareCost: '5200',
    },
    {
        label: 'Custom 200 TH/s',
        selectedPreset: 'Custom',
        hashrate: '200',
        power: '3500',
        electricityCost: '0.04',
        poolFee: '2',
        hardwareCost: '3500',
    },
] as const;

interface NetworkData {
    difficulty: number;
    btcPrice: number;
    blockReward: number;
}

interface MiningResult {
    period: string;
    revenueBtc: number;
    revenueUsd: number;
    electricityCost: number;
    poolFeeCost: number;
    netProfit: number;
}

export default function MiningCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [selectedPreset, setSelectedPreset] = useState('Custom');
    const [hashrate, setHashrate] = useState('140');
    const [power, setPower] = useState('3010');
    const [electricityCost, setElectricityCost] = useState('0.10');
    const [poolFee, setPoolFee] = useState('2');
    const [hardwareCost, setHardwareCost] = useState('');

    // Network data
    const [network, setNetwork] = useState<NetworkData | null>(null);
    const [loadingNetwork, setLoadingNetwork] = useState(true);
    const [networkError, setNetworkError] = useState('');

    // Results
    const [results, setResults] = useState<MiningResult[]>([]);
    const [breakEvenDays, setBreakEvenDays] = useState<number | null>(null);

    // Fetch network data
    useEffect(() => {
        const fetchNetwork = async () => {
            setLoadingNetwork(true);
            try {
                // Fetch BTC price
                const priceRes = await fetch(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=REMOVED_COINGECKO_KEY'
                );
                if (!priceRes.ok) throw new Error('Failed to fetch BTC price');
                const priceData = await priceRes.json();
                const btcPrice = priceData.bitcoin?.usd || 70000;

                // Use reasonable defaults for difficulty (auto-fetch from a mining API can be added later)
                // Current Bitcoin difficulty as of 2025: ~100T
                // Block reward after 2024 halving: 3.125 BTC
                setNetwork({
                    difficulty: 100_000_000_000_000, // ~100T
                    btcPrice,
                    blockReward: 3.125,
                });
            } catch {
                setNetwork({
                    difficulty: 100_000_000_000_000,
                    btcPrice: 70000,
                    blockReward: 3.125,
                });
                setNetworkError(getUiString(lang, 'Failed to fetch live BTC price. Using fallback data ($70,000).'));
            }
            setLoadingNetwork(false);
        };
        fetchNetwork();
    }, []);

    // Select ASIC preset
    const selectPreset = (presetName: string) => {
        setSelectedPreset(presetName);
        const preset = ASIC_PRESETS.find((p) => p.name === presetName);
        if (preset && presetName !== 'Custom') {
            setHashrate(String(preset.hashrate));
            setPower(String(preset.power));
            setHardwareCost(String(preset.price));
        }
    };
    const applyScenario = (scenario: (typeof MINING_SCENARIOS)[number]) => {
        setSelectedPreset(scenario.selectedPreset);
        setHashrate(scenario.hashrate);
        setPower(scenario.power);
        setElectricityCost(scenario.electricityCost);
        setPoolFee(scenario.poolFee);
        setHardwareCost(scenario.hardwareCost);
    };
    const isScenarioActive = (scenario: (typeof MINING_SCENARIOS)[number]) => (
        selectedPreset === scenario.selectedPreset
        && hashrate === scenario.hashrate
        && power === scenario.power
        && electricityCost === scenario.electricityCost
        && poolFee === scenario.poolFee
        && hardwareCost === scenario.hardwareCost
    );

    // Calculate mining profitability
    const calculate = useCallback(() => {
        if (!network) return;

        const hr = parseFloat(hashrate);
        const pw = parseFloat(power);
        const elCost = parseFloat(electricityCost);
        const pFee = parseFloat(poolFee);

        if (!hr || hr <= 0) {
            setResults([]);
            return;
        }

        // Bitcoin mining formula:
        // Daily BTC = (hashrate * 10^12 * 86400 * blockReward) / (difficulty * 2^32)
        const hashrateHashPerSec = hr * 1e12; // TH/s → H/s
        const dailyBtc =
            (hashrateHashPerSec * 86400 * network.blockReward) /
            (network.difficulty * Math.pow(2, 32));

        // Pool fee deduction
        const dailyBtcAfterPool = dailyBtc * (1 - (pFee || 0) / 100);

        const periods = [
            { period: 'Daily', days: 1 },
            { period: 'Weekly', days: 7 },
            { period: 'Monthly', days: 30 },
            { period: 'Yearly', days: 365 },
        ];

        const newResults = periods.map(({ period, days }) => {
            const revenueBtc = dailyBtcAfterPool * days;
            const revenueUsd = revenueBtc * network.btcPrice;
            const electricityCostTotal = ((pw || 0) / 1000) * (elCost || 0) * 24 * days;
            const poolFeeCost = dailyBtc * (pFee || 0) / 100 * network.btcPrice * days;
            const netProfit = revenueUsd - electricityCostTotal;

            return {
                period,
                revenueBtc,
                revenueUsd,
                electricityCost: electricityCostTotal,
                poolFeeCost,
                netProfit,
            };
        });

        setResults(newResults);

        // Break-even calculation
        const hwCost = parseFloat(hardwareCost);
        if (hwCost > 0) {
            const dailyProfit = newResults[0].netProfit;
            if (dailyProfit > 0) {
                setBreakEvenDays(Math.ceil(hwCost / dailyProfit));
            } else {
                setBreakEvenDays(-1); // Never
            }
        } else {
            setBreakEvenDays(null);
        }
    }, [hashrate, power, electricityCost, poolFee, hardwareCost, network]);

    // Auto-calculate
    useEffect(() => {
        calculate();
    }, [calculate]);

    // Reset
    const reset = () => {
        setSelectedPreset('Custom');
        setHashrate('140');
        setPower('3010');
        setElectricityCost('0.10');
        setPoolFee('2');
        setHardwareCost('');
        setResults([]);
        setBreakEvenDays(null);
    };

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

    const isProfit = results.length > 0 && results[0].netProfit >= 0;

    return (
        <div className="mining-wrapper">
            <div className="mining-grid">
                {/* Left: Inputs */}
                <div className="mining-input-panel">
                    <div className="input-group">
                        <label className="input-label">{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {MINING_SCENARIOS.map((scenario) => (
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

                    {/* ASIC Preset */}
                    <div className="input-group">
                        <label className="input-label">
                            <Cpu size={14} />
                            {getUiString(lang, 'ASIC Miner')}
                        </label>
                        <div className="select-wrap">
                            <select
                                value={selectedPreset}
                                onChange={(e) => selectPreset(e.target.value)}
                                className="input-select"
                                id="asic-select"
                            >
                                {ASIC_PRESETS.map((p) => (
                                    <option key={p.name} value={p.name}>
                                        {p.name}
                                        {p.hashrate > 0 ? ` — ${p.hashrate} TH/s` : ''}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-arrow" />
                        </div>
                    </div>

                    {/* Hashrate */}
                    <div className="input-group">
                        <label className="input-label">
                            <Zap size={14} />
                            {getUiString(lang, 'Hashrate')}
                        </label>
                        <div className="pills-row">
                            {HASHRATE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${hashrate === preset ? 'active' : ''}`}
                                    onClick={() => {
                                        setHashrate(preset);
                                        setSelectedPreset('Custom');
                                    }}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={hashrate}
                                onChange={(e) => {
                                    setHashrate(e.target.value);
                                    setSelectedPreset('Custom');
                                }}
                                placeholder=""
                                id="hashrate-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit">TH/s</span>
                        </div>
                    </div>

                    {/* Power Consumption */}
                    <div className="input-group">
                        <label className="input-label">
                            <Zap size={14} />
                            {getUiString(lang, 'Power Consumption')}
                        </label>
                        <div className="pills-row">
                            {POWER_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${power === preset ? 'active' : ''}`}
                                    onClick={() => {
                                        setPower(preset);
                                        setSelectedPreset('Custom');
                                    }}
                                >
                                    {preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={power}
                                onChange={(e) => {
                                    setPower(e.target.value);
                                    setSelectedPreset('Custom');
                                }}
                                placeholder=""
                                id="power-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit">Watts</span>
                        </div>
                    </div>

                    {/* Electricity Cost */}
                    <div className="input-group">
                        <label className="input-label">
                            <DollarSign size={14} />
                            {getUiString(lang, 'Electricity Cost')}
                        </label>
                        <div className="pills-row">
                            {ELECTRICITY_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${electricityCost === preset ? 'active' : ''}`}
                                    onClick={() => setElectricityCost(preset)}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={electricityCost}
                                onChange={(e) => setElectricityCost(e.target.value)}
                                placeholder=""
                                id="electricity-input"
                                step="0.01"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit">per kWh</span>
                        </div>
                    </div>

                    {/* Pool Fee */}
                    <div className="input-group">
                        <label className="input-label">
                            <TrendingUp size={14} />
                            {getUiString(lang, 'Pool Fee')}
                        </label>
                        <div className="pills-row">
                            {POOL_FEE_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${poolFee === preset ? 'active' : ''}`}
                                    onClick={() => setPoolFee(preset)}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={poolFee}
                                onChange={(e) => setPoolFee(e.target.value)}
                                placeholder=""
                                id="pool-fee-input"
                                step="0.1"
                                min="0"
                                max="100"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit">%</span>
                        </div>
                    </div>

                    {/* Hardware Cost */}
                    <div className="input-group">
                        <label className="input-label">
                            <Calendar size={14} />
                            {getUiString(lang, 'Hardware Cost (optional)')}
                        </label>
                        <div className="pills-row">
                            {HARDWARE_COST_PILLS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${hardwareCost === preset ? 'active' : ''}`}
                                    onClick={() => setHardwareCost(preset)}
                                >
                                    ${Number(preset).toLocaleString('en-US')}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-unit">
                            <input
                                type="number" inputMode="decimal"
                                value={hardwareCost}
                                onChange={(e) => setHardwareCost(e.target.value)}
                                placeholder="For break-even calculation"
                                id="hardware-cost-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use hashrate, power, and cost presets for faster setup.')}
                    </span>
                    {networkError && <span className="input-hint" style={{ color: '#f97316', marginTop: '0.5rem' }}>{networkError}</span>}
                </div>

                {/* Right: Results */}
                <div className="mining-results-panel">
                    {loadingNetwork ? (
                        <div className="mining-loading">
                            <Loader2 size={24} className="spin-icon" />
                            <span>{getUiString(lang, 'Fetching network data...')}</span>
                        </div>
                    ) : results.length > 0 ? (
                        <>
                            {/* Network Info Bar */}
                            <div className="network-info">
                                <div className="network-item">
                                    <span className="network-label">{getUiString(lang, 'BTC Price')}</span>
                                    <span className="network-value">{formatUSD(network!.btcPrice)}</span>
                                </div>
                                <div className="network-item">
                                    <span className="network-label">{getUiString(lang, 'Block Reward')}</span>
                                    <span className="network-value">{network!.blockReward} BTC</span>
                                </div>
                                <div className="network-item">
                                    <span className="network-label">{getUiString(lang, 'Difficulty')}</span>
                                    <span className="network-value">
                                        {(network!.difficulty / 1e12).toFixed(1)}T
                                    </span>
                                </div>
                            </div>

                            {/* Daily Highlight */}
                            <div className={`mining-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="mining-hero-label">{getUiString(lang, 'Daily Net Profit')}</span>
                                <span className="mining-hero-value">
                                    {isProfit ? <TrendingUp size={24} /> : <span>⚠️</span>}
                                    {formatUSD(Math.abs(results[0].netProfit))}
                                    {!isProfit && <span className="mining-hero-neg">({getUiString(lang, 'Loss')})</span>}
                                </span>
                                <span className="mining-hero-sub">
                                    {getUiString(lang, 'Revenue')}: {formatBTC(results[0].revenueBtc)}
                                </span>
                            </div>

                            {/* Breakdown Table */}
                            <div className="mining-table-wrap">
                                <table className="mining-table">
                                    <thead>
                                        <tr>
                                            <th>{getUiString(lang, 'Period')}</th>
                                            <th>{getUiString(lang, 'Revenue')} (BTC)</th>
                                            <th>{getUiString(lang, 'Revenue')} (USD)</th>
                                            <th>{getUiString(lang, 'Electricity')}</th>
                                            <th>{getUiString(lang, 'Net Profit')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map((r) => (
                                            <tr key={r.period}>
                                                <td className="period-cell">{r.period}</td>
                                                <td className="btc-cell">{r.revenueBtc.toFixed(8)}</td>
                                                <td>{formatUSD(r.revenueUsd)}</td>
                                                <td className="cost-cell">-{formatUSD(r.electricityCost)}</td>
                                                <td className={r.netProfit >= 0 ? 'profit-cell' : 'loss-cell'}>
                                                    {r.netProfit >= 0 ? '+' : ''}{formatUSD(r.netProfit)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mining-cards-mobile">
                                {results.map((r) => (
                                    <article key={`${r.period}-mobile`} className="mining-period-card">
                                        <div className="mining-period-head">
                                            <span className="mining-period-name">{r.period}</span>
                                            <span className={`mining-period-profit ${r.netProfit >= 0 ? 'profit' : 'loss'}`}>
                                                {r.netProfit >= 0 ? '+' : ''}{formatUSD(r.netProfit)}
                                            </span>
                                        </div>
                                        <div className="mining-period-grid">
                                            <div className="mining-period-item">
                                                <span className="mining-period-label">{getUiString(lang, 'Revenue')} (BTC)</span>
                                                <span className="mining-period-value">{r.revenueBtc.toFixed(8)}</span>
                                            </div>
                                            <div className="mining-period-item">
                                                <span className="mining-period-label">{getUiString(lang, 'Revenue')} (USD)</span>
                                                <span className="mining-period-value">{formatUSD(r.revenueUsd)}</span>
                                            </div>
                                            <div className="mining-period-item">
                                                <span className="mining-period-label">{getUiString(lang, 'Electricity')}</span>
                                                <span className="mining-period-value">-{formatUSD(r.electricityCost)}</span>
                                            </div>
                                            <div className="mining-period-item">
                                                <span className="mining-period-label">{getUiString(lang, 'Pool Fee')}</span>
                                                <span className="mining-period-value">-{formatUSD(r.poolFeeCost)}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Break-even */}
                            {breakEvenDays !== null && (
                                <div className="break-even-card">
                                    <Calendar size={16} />
                                    {breakEvenDays > 0 ? (
                                        <span>
                                            {getUiString(lang, 'Break-even in')} <strong>{breakEvenDays} {getUiString(lang, 'days')}</strong> (~
                                            {(breakEvenDays / 30).toFixed(1)} {getUiString(lang, 'months')})
                                        </span>
                                    ) : (
                                        <span className="break-even-never">
                                            ⚠️ {getUiString(lang, 'Mining is not profitable at current rates — hardware cost will not be recovered')}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Estimates based on current network conditions. Actual results vary with difficulty adjustments, BTC price changes, and hardware degradation.')}
                            </p>
                        </>
                    ) : (
                        <div className="mining-empty">
                            <Cpu size={40} strokeWidth={1} />
                            <h3>{getUiString(lang, 'Configure Your Mining Rig')}</h3>
                            <p>{getUiString(lang, 'Select an ASIC miner or enter your hashrate to see profitability estimates.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
