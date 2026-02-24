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
    Info,
    Hash,
    Server,
} from 'lucide-react';

interface AsicPreset {
    name: string;
    hashrate: number;
    power: number;
    algo: string;
    coin: string;
    price: number;
}

interface NetworkData {
    difficulty: number;
    blockReward: number;
    price: number;
    blockTime: number;
}

interface PeriodResult {
    period: string;
    revenue: number;
    electricity: number;
    poolFee: number;
    netProfit: number;
}

interface AsicComparison {
    name: string;
    hashrate: number;
    power: number;
    algo: string;
    coin: string;
    dailyProfit: number;
    efficiency: number;
}

const ASIC_PRESETS: AsicPreset[] = [
    { name: 'Antminer S21 Hyd', hashrate: 335, power: 5360, algo: 'SHA-256', coin: 'BTC', price: 5500 },
    { name: 'Antminer S21', hashrate: 200, power: 3500, algo: 'SHA-256', coin: 'BTC', price: 4200 },
    { name: 'Antminer S19 XP', hashrate: 140, power: 3010, algo: 'SHA-256', coin: 'BTC', price: 2800 },
    { name: 'Antminer T21', hashrate: 190, power: 3610, algo: 'SHA-256', coin: 'BTC', price: 3500 },
    { name: 'Whatsminer M60S', hashrate: 186, power: 3420, algo: 'SHA-256', coin: 'BTC', price: 3800 },
    { name: 'Whatsminer M50S', hashrate: 126, power: 3276, algo: 'SHA-256', coin: 'BTC', price: 2200 },
    { name: 'Avalon A1466', hashrate: 150, power: 3230, algo: 'SHA-256', coin: 'BTC', price: 3000 },
    { name: 'Antminer L9', hashrate: 16000, power: 3260, algo: 'Scrypt', coin: 'LTC', price: 6500 },
    { name: 'Antminer D9', hashrate: 1770, power: 2839, algo: 'X11', coin: 'DASH', price: 4000 },
    { name: 'Antminer Z15', hashrate: 420, power: 1510, algo: 'Equihash', coin: 'ZEC', price: 3200 },
];

const NETWORK_DATA: Record<string, NetworkData> = {
    BTC: { difficulty: 85000000000000, blockReward: 3.125, price: 65000, blockTime: 600 },
    LTC: { difficulty: 25000000, blockReward: 6.25, price: 80, blockTime: 150 },
    DASH: { difficulty: 200000000, blockReward: 2.31, price: 30, blockTime: 150 },
    ZEC: { difficulty: 80000000, blockReward: 2.5, price: 25, blockTime: 75 },
};

const ELECTRICITY_PILLS = [0.04, 0.06, 0.08, 0.10, 0.15];
const POOL_FEE_PILLS = [0.5, 1, 1.5, 2, 3];
const ASIC_PRICE_PILLS = [2500, 4000, 5500, 7000];
const ASIC_SCENARIOS = [
    { label: 'Efficient BTC', selectedAsic: 'Antminer S21 Hyd', electricityCost: '0.06', poolFee: '1', asicPrice: '5500' },
    { label: 'Budget BTC', selectedAsic: 'Antminer S19 XP', electricityCost: '0.10', poolFee: '1.5', asicPrice: '2800' },
    { label: 'Scrypt Focus', selectedAsic: 'Antminer L9', electricityCost: '0.08', poolFee: '2', asicPrice: '6500' },
] as const;

/** Returns the hashrate multiplier (H/s) for a given algorithm */
function getHashrateMultiplier(algo: string): number {
    switch (algo) {
        case 'SHA-256': return 1e12;   // TH/s
        case 'Scrypt': return 1e6;     // MH/s
        case 'X11': return 1e6;        // MH/s
        case 'Equihash': return 1e3;   // KSol/s
        default: return 1e12;
    }
}

/** Returns the hashrate unit label for a given algorithm */
function getHashrateUnit(algo: string): string {
    switch (algo) {
        case 'SHA-256': return 'TH/s';
        case 'Scrypt': return 'MH/s';
        case 'X11': return 'MH/s';
        case 'Equihash': return 'KSol/s';
        default: return 'TH/s';
    }
}

/** Calculate daily coin mined using the generic PoW formula */
function calcDailyCoins(
    hashrate: number,
    multiplier: number,
    difficulty: number,
    blockReward: number,
): number {
    // daily_coins = (hashrate_in_hps / (difficulty * 2^32)) * 86400 * blockReward
    const hashrateHps = hashrate * multiplier;
    return (hashrateHps / (difficulty * Math.pow(2, 32))) * 86400 * blockReward;
}

export default function AsicMiningCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [selectedAsic, setSelectedAsic] = useState(ASIC_PRESETS[0].name);
    const [hashrate, setHashrate] = useState(String(ASIC_PRESETS[0].hashrate));
    const [power, setPower] = useState(String(ASIC_PRESETS[0].power));
    const [electricityCost, setElectricityCost] = useState('0.08');
    const [poolFee, setPoolFee] = useState('1');
    const [asicPrice, setAsicPrice] = useState(String(ASIC_PRESETS[0].price));
    const [activeCoin, setActiveCoin] = useState(ASIC_PRESETS[0].coin);
    const [activeAlgo, setActiveAlgo] = useState(ASIC_PRESETS[0].algo);

    // Results
    const [results, setResults] = useState<PeriodResult[]>([]);
    const [roiDays, setRoiDays] = useState<number | null>(null);
    const [dailyProfit, setDailyProfit] = useState(0);
    const [comparison, setComparison] = useState<AsicComparison[]>([]);

    // Select ASIC preset
    const selectAsic = (name: string) => {
        setSelectedAsic(name);
        const preset = ASIC_PRESETS.find((a) => a.name === name);
        if (preset) {
            setHashrate(String(preset.hashrate));
            setPower(String(preset.power));
            setAsicPrice(String(preset.price));
            setActiveCoin(preset.coin);
            setActiveAlgo(preset.algo);
        }
    };
    const applyScenario = (scenario: (typeof ASIC_SCENARIOS)[number]) => {
        selectAsic(scenario.selectedAsic);
        setElectricityCost(scenario.electricityCost);
        setPoolFee(scenario.poolFee);
        setAsicPrice(scenario.asicPrice);
    };
    const isScenarioActive = (scenario: (typeof ASIC_SCENARIOS)[number]) => (
        selectedAsic === scenario.selectedAsic
        && electricityCost === scenario.electricityCost
        && poolFee === scenario.poolFee
        && asicPrice === scenario.asicPrice
    );

    // Main calculation
    const calculate = useCallback(() => {
        const hr = parseFloat(hashrate);
        const pw = parseFloat(power);
        const elCost = parseFloat(electricityCost);
        const pFee = parseFloat(poolFee);
        const price = parseFloat(asicPrice);
        const network = NETWORK_DATA[activeCoin];

        if (!hr || hr <= 0 || !network) {
            setResults([]);
            setRoiDays(null);
            setDailyProfit(0);
            setComparison([]);
            return;
        }

        const multiplier = getHashrateMultiplier(activeAlgo);

        // Daily coins mined
        const dailyCoins = calcDailyCoins(hr, multiplier, network.difficulty, network.blockReward);
        const dailyRevenueUsd = dailyCoins * network.price;
        const dailyElectricity = ((pw || 0) / 1000) * 24 * (elCost || 0);
        const dailyPoolFee = dailyRevenueUsd * ((pFee || 0) / 100);
        const dailyNet = dailyRevenueUsd - dailyElectricity - dailyPoolFee;

        setDailyProfit(dailyNet);

        const periods = [
            { period: 'Daily', multiplier: 1 },
            { period: 'Monthly', multiplier: 30.44 },
            { period: 'Yearly', multiplier: 365 },
        ];

        const newResults = periods.map(({ period, multiplier: mult }) => ({
            period,
            revenue: dailyRevenueUsd * mult,
            electricity: dailyElectricity * mult,
            poolFee: dailyPoolFee * mult,
            netProfit: dailyNet * mult,
        }));

        setResults(newResults);

        // ROI calculation
        if (price > 0 && dailyNet > 0) {
            setRoiDays(Math.ceil(price / dailyNet));
        } else if (price > 0 && dailyNet <= 0) {
            setRoiDays(-1);
        } else {
            setRoiDays(null);
        }

        // ASIC comparison: all presets at the user's electricity rate
        const elRate = elCost || 0;
        const feeRate = pFee || 0;
        const comparisonData: AsicComparison[] = ASIC_PRESETS.map((preset) => {
            const net = NETWORK_DATA[preset.coin];
            const mult = getHashrateMultiplier(preset.algo);
            const dCoins = calcDailyCoins(preset.hashrate, mult, net.difficulty, net.blockReward);
            const dRevenue = dCoins * net.price;
            const dElec = (preset.power / 1000) * 24 * elRate;
            const dFee = dRevenue * (feeRate / 100);
            const dProfit = dRevenue - dElec - dFee;
            const efficiency = preset.hashrate > 0 ? preset.power / preset.hashrate : 0;

            return {
                name: preset.name,
                hashrate: preset.hashrate,
                power: preset.power,
                algo: preset.algo,
                coin: preset.coin,
                dailyProfit: dProfit,
                efficiency,
            };
        }).sort((a, b) => b.dailyProfit - a.dailyProfit);

        setComparison(comparisonData);
    }, [hashrate, power, electricityCost, poolFee, asicPrice, activeCoin, activeAlgo]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    // Reset
    const reset = () => {
        const first = ASIC_PRESETS[0];
        setSelectedAsic(first.name);
        setHashrate(String(first.hashrate));
        setPower(String(first.power));
        setElectricityCost('0.08');
        setPoolFee('1');
        setAsicPrice(String(first.price));
        setActiveCoin(first.coin);
        setActiveAlgo(first.algo);
        setResults([]);
        setRoiDays(null);
        setDailyProfit(0);
        setComparison([]);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const hasInputs = parseFloat(hashrate) > 0;
    const isProfit = results.length > 0 && results[0].netProfit >= 0;
    const currentPreset = ASIC_PRESETS.find((a) => a.name === selectedAsic);
    const hashrateUnit = getHashrateUnit(activeAlgo);
    const efficiency = currentPreset && currentPreset.hashrate > 0
        ? (currentPreset.power / currentPreset.hashrate).toFixed(1)
        : '—';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {ASIC_SCENARIOS.map((scenario) => (
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

                    {/* ASIC Model Dropdown */}
                    <div className="input-group">
                        <label>
                            <Server size={14} />
                            ASIC Model
                        </label>
                        <div className="select-wrap">
                            <select
                                value={selectedAsic}
                                onChange={(e) => selectAsic(e.target.value)}
                                className="input-select"
                                id="asic-model-select"
                            >
                                {ASIC_PRESETS.map((a) => (
                                    <option key={a.name} value={a.name}>
                                        {a.name} — {a.hashrate} {getHashrateUnit(a.algo)} ({a.coin})
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-arrow" />
                        </div>
                    </div>

                    {/* Hashrate */}
                    <div className="input-group">
                        <label>
                            <Hash size={14} />
                            Hashrate ({hashrateUnit})
                            <span className="label-hint">Auto-filled</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number"
                                value={hashrate}
                                onChange={(e) => setHashrate(e.target.value)}
                                placeholder={String(ASIC_PRESETS[0].hashrate)}
                                id="asic-hashrate-input"
                                step="any"
                                min="0"
                            />
                            <span
                                className="input-unit"
                                style={{
                                    marginLeft: 'auto',
                                    paddingRight: '10px',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {hashrateUnit}
                            </span>
                        </div>
                    </div>

                    {/* Power Consumption */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            Power Consumption (W)
                            <span className="label-hint">Auto-filled</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number"
                                value={power}
                                onChange={(e) => setPower(e.target.value)}
                                placeholder={String(ASIC_PRESETS[0].power)}
                                id="asic-power-input"
                                step="any"
                                min="0"
                            />
                            <span
                                className="input-unit"
                                style={{
                                    marginLeft: 'auto',
                                    paddingRight: '10px',
                                    color: 'var(--color-text-muted)',
                                    fontSize: '0.8rem',
                                }}
                            >
                                W
                            </span>
                        </div>
                    </div>

                    {/* Electricity Cost */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Electricity Cost ($/kWh)
                        </label>
                        <div className="pills-row">
                            {ELECTRICITY_PILLS.map((c) => (
                                <button
                                    key={c}
                                    className={`pill-btn ${electricityCost === String(c) ? 'active' : ''}`}
                                    onClick={() => setElectricityCost(String(c))}
                                >
                                    ${c}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={electricityCost}
                                onChange={(e) => setElectricityCost(e.target.value)}
                                placeholder="0.08"
                                id="asic-electricity-input"
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Pool Fee */}
                    <div className="input-group">
                        <label>
                            <TrendingUp size={14} />
                            Pool Fee (%)
                        </label>
                        <div className="pills-row">
                            {POOL_FEE_PILLS.map((fee) => (
                                <button
                                    key={fee}
                                    className={`pill-btn ${poolFee === String(fee) ? 'active' : ''}`}
                                    onClick={() => setPoolFee(String(fee))}
                                >
                                    {fee}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">%</span>
                            <input
                                type="number"
                                value={poolFee}
                                onChange={(e) => setPoolFee(e.target.value)}
                                placeholder="1"
                                id="asic-pool-fee-input"
                                step="0.1"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* ASIC Purchase Price */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            ASIC Purchase Price ($)
                            <span className="label-hint">For ROI calculation</span>
                        </label>
                        <div className="pills-row">
                            {ASIC_PRICE_PILLS.map((price) => (
                                <button
                                    key={price}
                                    className={`pill-btn ${asicPrice === String(price) ? 'active' : ''}`}
                                    onClick={() => setAsicPrice(String(price))}
                                >
                                    ${price >= 1000 ? `${Math.round(price / 1000)}k` : price}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={asicPrice}
                                onChange={(e) => setAsicPrice(e.target.value)}
                                placeholder="5500"
                                id="asic-price-input"
                                step="any"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        Reset
                    </button>
                    <span className="input-hint">
                        Auto-calculates as you type. Pick a preset first for realistic ASIC assumptions.
                    </span>
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    {hasInputs && results.length > 0 ? (
                        <>
                            {/* Hero */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'fee'}`}>
                                <span className="result-hero-label">
                                    Daily Profit ({activeCoin})
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <Zap size={28} />}
                                    {formatUSD(Math.abs(results[0].netProfit))}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'fee'}`}>
                                    {isProfit ? 'Profitable' : 'Unprofitable'} at ${electricityCost}/kWh
                                </span>
                            </div>

                            {/* Profitability Table */}
                            <div className="result-breakdown">
                                {results.map((r, i) => (
                                    <div key={r.period}>
                                        {i > 0 && <div className="result-divider" />}
                                        <div className="result-row" style={{ marginTop: i > 0 ? '4px' : 0 }}>
                                            <span className="result-label"><strong>{r.period}</strong></span>
                                            <span className="result-value"><strong>{r.period}</strong></span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Revenue')}</span>
                                            <span className="result-value profit">{formatUSD(r.revenue)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Electricity')}</span>
                                            <span className="result-value fee">-{formatUSD(r.electricity)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Pool Fee')}</span>
                                            <span className="result-value fee">-{formatUSD(r.poolFee)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label"><strong>{getUiString(lang, 'Net Profit')}</strong></span>
                                            <span className={`result-value ${r.netProfit >= 0 ? 'profit' : 'fee'}`}>
                                                <strong>{r.netProfit >= 0 ? '+' : ''}{formatUSD(r.netProfit)}</strong>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ROI Section */}
                            {roiDays !== null && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '12px 14px',
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '10px',
                                    fontSize: '0.85rem',
                                }}>
                                    <h4 style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        marginBottom: '10px',
                                        color: 'var(--color-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <Calendar size={14} />
                                        {getUiString(lang, 'Return on Investment')}
                                    </h4>
                                    <div className="result-breakdown" style={{ border: 'none', padding: 0 }}>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Purchase Price')}</span>
                                            <span className="result-value">{formatUSD(parseFloat(asicPrice) || 0)}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Daily Profit')}</span>
                                            <span className={`result-value ${dailyProfit >= 0 ? 'profit' : 'fee'}`}>
                                                {dailyProfit >= 0 ? '+' : ''}{formatUSD(dailyProfit)}
                                            </span>
                                        </div>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label"><strong>{getUiString(lang, 'Break-Even')}</strong></span>
                                            <span className="result-value">
                                                {roiDays > 0 ? (
                                                    <strong>{(roiDays / 30.44).toFixed(1)} months ({roiDays} days)</strong>
                                                ) : (
                                                    <strong style={{ color: 'var(--color-accent-red, #ef4444)' }}>
                                                        Never (unprofitable)
                                                    </strong>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ASIC Comparison Table */}
                            {comparison.length > 0 && (
                                <div style={{ marginTop: '16px' }}>
                                    <h4 style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        marginBottom: '10px',
                                        color: 'var(--color-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <Cpu size={14} />
                                        ASIC Comparison (at ${electricityCost}/kWh)
                                    </h4>
                                    <div style={{
                                        overflowX: 'auto',
                                        borderRadius: '10px',
                                        border: '1px solid var(--color-border)',
                                    }}>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '0.78rem',
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th style={thStyle}>#</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Model')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Coin')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Hashrate')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Power')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Daily Profit')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {comparison.map((c, i) => (
                                                    <tr
                                                        key={c.name}
                                                        style={{
                                                            background: c.name === selectedAsic
                                                                ? 'var(--color-bg-card)'
                                                                : 'transparent',
                                                        }}
                                                    >
                                                        <td style={tdStyle}>{i + 1}</td>
                                                        <td style={{ ...tdStyle, fontWeight: c.name === selectedAsic ? 600 : 400 }}>
                                                            {c.name}
                                                        </td>
                                                        <td style={tdStyle}>{c.coin}</td>
                                                        <td style={tdStyle}>
                                                            {c.hashrate} {getHashrateUnit(c.algo)}
                                                        </td>
                                                        <td style={tdStyle}>{c.power}W</td>
                                                        <td style={{
                                                            ...tdStyle,
                                                            fontWeight: 600,
                                                            color: c.dailyProfit >= 0
                                                                ? 'var(--color-accent-green, #22c55e)'
                                                                : '#ef4444',
                                                        }}>
                                                            {c.dailyProfit >= 0 ? '+' : ''}{formatUSD(c.dailyProfit)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* ASIC Specs Card */}
                            {currentPreset && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '12px 14px',
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '10px',
                                    fontSize: '0.8rem',
                                }}>
                                    <h4 style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                        color: 'var(--color-text)',
                                    }}>
                                        <Server size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                        ASIC Specs
                                    </h4>
                                    <div className="result-breakdown" style={{ border: 'none', padding: 0 }}>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Model')}</span>
                                            <span className="result-value">{currentPreset.name}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Hashrate')}</span>
                                            <span className="result-value">
                                                {currentPreset.hashrate} {getHashrateUnit(currentPreset.algo)}
                                            </span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Power')}</span>
                                            <span className="result-value">{currentPreset.power} W</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Algorithm')}</span>
                                            <span className="result-value">{currentPreset.algo}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Coin')}</span>
                                            <span className="result-value">{currentPreset.coin}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Efficiency')}</span>
                                            <span className="result-value">
                                                {efficiency} {currentPreset.algo === 'SHA-256' ? 'J/TH' : 'J/MH'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="result-cta">
                                <a
                                    href="https://www.f2pool.com"
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="cta-btn"
                                >
                                    Join F2Pool Mining Pool &rarr;
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                Mining profitability fluctuates with price and difficulty changes. Hardcoded network data is approximate.
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Server size={40} />
                            </div>
                            <h3>Configure Your ASIC Miner</h3>
                            <p>Select an ASIC model or enter your hashrate and power consumption to see profitability estimates, ROI projections, and device comparisons.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: '8px 10px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.72rem',
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    borderBottom: '1px solid var(--color-border)',
    background: 'var(--color-bg-card)',
    whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
    padding: '7px 10px',
    borderBottom: '1px solid var(--color-border)',
    whiteSpace: 'nowrap',
    color: 'var(--color-text)',
};
