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
    Monitor,
} from 'lucide-react';

interface GpuPreset {
    name: string;
    hashrate: number; // MH/s
    power: number; // Watts
    algo: string;
}

interface CoinData {
    symbol: string;
    name: string;
    price: number;
    blockReward: number;
    networkHashrate: number; // MH/s
    algo: string;
}

interface PeriodResult {
    period: string;
    revenue: number;
    electricity: number;
    poolFee: number;
    netProfit: number;
}

interface CoinRanking {
    symbol: string;
    name: string;
    dailyProfit: number;
    algo: string;
}

const GPU_PRESETS: GpuPreset[] = [
    { name: 'RTX 4090', hashrate: 120, power: 350, algo: 'Ethash' },
    { name: 'RTX 4080', hashrate: 95, power: 320, algo: 'Ethash' },
    { name: 'RTX 4070 Ti', hashrate: 78, power: 285, algo: 'Ethash' },
    { name: 'RTX 3090', hashrate: 110, power: 350, algo: 'Ethash' },
    { name: 'RTX 3080', hashrate: 95, power: 320, algo: 'Ethash' },
    { name: 'RTX 3070', hashrate: 60, power: 220, algo: 'Ethash' },
    { name: 'RX 7900 XTX', hashrate: 100, power: 350, algo: 'Ethash' },
    { name: 'RX 6800 XT', hashrate: 63, power: 250, algo: 'Ethash' },
];

const COINS: Record<string, CoinData> = {
    ETC: { symbol: 'ETC', name: 'Ethereum Classic', price: 25, blockReward: 2.56, networkHashrate: 200000, algo: 'Ethash' },
    RVN: { symbol: 'RVN', name: 'Ravencoin', price: 0.025, blockReward: 2500, networkHashrate: 5000000, algo: 'KawPow' },
    ERGO: { symbol: 'ERGO', name: 'Ergo', price: 1.50, blockReward: 27, networkHashrate: 15000, algo: 'Autolykos2' },
    KAS: { symbol: 'KAS', name: 'Kaspa', price: 0.15, blockReward: 200, networkHashrate: 300000000, algo: 'kHeavyHash' },
    FLUX: { symbol: 'FLUX', name: 'Flux', price: 0.80, blockReward: 37.5, networkHashrate: 2500000, algo: 'ZelHash' },
};

const COIN_KEYS = Object.keys(COINS);
const GPU_COUNT_PILLS = [1, 2, 4, 6, 8, 12];
const ELECTRICITY_PILLS = [0.05, 0.08, 0.10, 0.15, 0.20];
const POOL_FEE_PILLS = [0.5, 1, 1.5, 2, 3];
const HARDWARE_COST_PILLS = [2000, 5000, 10000, 20000];
const GPU_SCENARIOS = [
    {
        label: 'Solo 4090',
        selectedGpu: 'RTX 4090',
        numGpus: '1',
        electricityCost: '0.10',
        poolFee: '1',
        selectedCoin: 'ETC',
        hardwareCost: '5000',
    },
    {
        label: '6x 3070 RVN',
        selectedGpu: 'RTX 3070',
        numGpus: '6',
        electricityCost: '0.08',
        poolFee: '1.5',
        selectedCoin: 'RVN',
        hardwareCost: '10000',
    },
    {
        label: '4x 4080 KAS',
        selectedGpu: 'RTX 4080',
        numGpus: '4',
        electricityCost: '0.10',
        poolFee: '1',
        selectedCoin: 'KAS',
        hardwareCost: '20000',
    },
] as const;

export default function GpuMiningCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [selectedGpu, setSelectedGpu] = useState('RTX 4090');
    const [numGpus, setNumGpus] = useState('1');
    const [hashrate, setHashrate] = useState('120');
    const [power, setPower] = useState('350');
    const [electricityCost, setElectricityCost] = useState('0.10');
    const [poolFee, setPoolFee] = useState('1');
    const [selectedCoin, setSelectedCoin] = useState('ETC');
    const [hardwareCost, setHardwareCost] = useState('');

    // Results
    const [results, setResults] = useState<PeriodResult[]>([]);
    const [coinRanking, setCoinRanking] = useState<CoinRanking[]>([]);
    const [breakEvenDays, setBreakEvenDays] = useState<number | null>(null);

    // Select GPU preset
    const selectGpu = (gpuName: string) => {
        setSelectedGpu(gpuName);
        const preset = GPU_PRESETS.find((g) => g.name === gpuName);
        if (preset) {
            setHashrate(String(preset.hashrate));
            setPower(String(preset.power));
        }
    };
    const applyScenario = (scenario: (typeof GPU_SCENARIOS)[number]) => {
        selectGpu(scenario.selectedGpu);
        setNumGpus(scenario.numGpus);
        setElectricityCost(scenario.electricityCost);
        setPoolFee(scenario.poolFee);
        setSelectedCoin(scenario.selectedCoin);
        setHardwareCost(scenario.hardwareCost);
    };
    const isScenarioActive = (scenario: (typeof GPU_SCENARIOS)[number]) => (
        selectedGpu === scenario.selectedGpu
        && numGpus === scenario.numGpus
        && electricityCost === scenario.electricityCost
        && poolFee === scenario.poolFee
        && selectedCoin === scenario.selectedCoin
        && hardwareCost === scenario.hardwareCost
    );

    // Calculate daily profit for a given coin with current GPU settings
    const calcDailyProfit = useCallback(
        (coin: CoinData, hr: number, gpus: number, elCost: number, pFee: number): number => {
            const totalHashrate = hr * gpus;
            // daily_revenue = (totalHashrate / networkHashrate) * blockReward * (86400 / 60) * price
            const dailyNetworkReward = coin.blockReward * (86400 / 60);
            const dailyRevenue = (totalHashrate / coin.networkHashrate) * dailyNetworkReward * coin.price;
            const dailyElectricity = ((parseFloat(String(power)) * gpus) / 1000) * 24 * elCost;
            const dailyPoolFee = dailyRevenue * (pFee / 100);
            return dailyRevenue - dailyElectricity - dailyPoolFee;
        },
        [power]
    );

    // Main calculation
    const calculate = useCallback(() => {
        const hr = parseFloat(hashrate);
        const gpus = parseInt(numGpus) || 1;
        const pw = parseFloat(power);
        const elCost = parseFloat(electricityCost);
        const pFee = parseFloat(poolFee);
        const coin = COINS[selectedCoin];

        if (!hr || hr <= 0 || !coin) {
            setResults([]);
            setCoinRanking([]);
            return;
        }

        const totalHashrate = hr * gpus;

        // daily_revenue = (totalHashrate / networkHashrate) * daily_network_reward * price
        const dailyNetworkReward = coin.blockReward * (86400 / 60);
        const dailyRevenue = (totalHashrate / coin.networkHashrate) * dailyNetworkReward * coin.price;
        const dailyElectricity = ((pw || 0) * gpus / 1000) * 24 * (elCost || 0);
        const dailyPoolFee = dailyRevenue * ((pFee || 0) / 100);
        const dailyProfit = dailyRevenue - dailyElectricity - dailyPoolFee;

        const periods = [
            { period: 'Daily', multiplier: 1 },
            { period: 'Monthly', multiplier: 30.44 },
            { period: 'Yearly', multiplier: 365 },
        ];

        const newResults = periods.map(({ period, multiplier }) => ({
            period,
            revenue: dailyRevenue * multiplier,
            electricity: dailyElectricity * multiplier,
            poolFee: dailyPoolFee * multiplier,
            netProfit: dailyProfit * multiplier,
        }));

        setResults(newResults);

        // Coin ranking
        const rankings: CoinRanking[] = COIN_KEYS.map((key) => {
            const c = COINS[key];
            const profit = calcDailyProfit(c, hr, gpus, elCost || 0, pFee || 0);
            return { symbol: c.symbol, name: c.name, dailyProfit: profit, algo: c.algo };
        }).sort((a, b) => b.dailyProfit - a.dailyProfit);

        setCoinRanking(rankings);

        // Break-even
        const hwCost = parseFloat(hardwareCost);
        if (hwCost > 0) {
            if (dailyProfit > 0) {
                setBreakEvenDays(Math.ceil(hwCost / dailyProfit));
            } else {
                setBreakEvenDays(-1);
            }
        } else {
            setBreakEvenDays(null);
        }
    }, [hashrate, numGpus, power, electricityCost, poolFee, selectedCoin, hardwareCost, calcDailyProfit]);

    // Auto-calculate on input change
    useEffect(() => {
        calculate();
    }, [calculate]);

    // Reset
    const reset = () => {
        setSelectedGpu('RTX 4090');
        setNumGpus('1');
        setHashrate('120');
        setPower('350');
        setElectricityCost('0.10');
        setPoolFee('1');
        setSelectedCoin('ETC');
        setHardwareCost('');
        setResults([]);
        setCoinRanking([]);
        setBreakEvenDays(null);
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
    const gpu = GPU_PRESETS.find((g) => g.name === selectedGpu);

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>Quick Scenarios</label>
                        <div className="pills-row">
                            {GPU_SCENARIOS.map((scenario) => (
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

                    {/* GPU Model */}
                    <div className="input-group">
                        <label>
                            <Monitor size={14} />
                            GPU Model
                        </label>
                        <div className="select-wrap">
                            <select
                                value={selectedGpu}
                                onChange={(e) => selectGpu(e.target.value)}
                                className="input-select"
                                id="gpu-select"
                            >
                                {GPU_PRESETS.map((g) => (
                                    <option key={g.name} value={g.name}>
                                        {g.name} — {g.hashrate} MH/s
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-arrow" />
                        </div>
                    </div>

                    {/* Number of GPUs */}
                    <div className="input-group">
                        <label>
                            <Cpu size={14} />
                            Number of GPUs
                        </label>
                        <div className="pills-row">
                            {GPU_COUNT_PILLS.map((n) => (
                                <button
                                    key={n}
                                    className={`pill-btn ${numGpus === String(n) ? 'active' : ''}`}
                                    onClick={() => setNumGpus(String(n))}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">#</span>
                            <input
                                type="number"
                                value={numGpus}
                                onChange={(e) => setNumGpus(e.target.value)}
                                placeholder="1"
                                id="num-gpus-input"
                                step="1"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Hashrate */}
                    <div className="input-group">
                        <label>
                            <Hash size={14} />
                            Hashrate (MH/s)
                            <span className="label-hint">Auto-filled</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number"
                                value={hashrate}
                                onChange={(e) => {
                                    setHashrate(e.target.value);
                                }}
                                placeholder="120"
                                id="hashrate-input"
                                step="any"
                                min="0"
                            />
                            <span className="input-unit" style={{ marginLeft: 'auto', paddingRight: '10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>MH/s</span>
                        </div>
                    </div>

                    {/* Power Consumption */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            Power per GPU (W)
                            <span className="label-hint">Auto-filled</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number"
                                value={power}
                                onChange={(e) => {
                                    setPower(e.target.value);
                                }}
                                placeholder="350"
                                id="power-input"
                                step="any"
                                min="0"
                            />
                            <span className="input-unit" style={{ marginLeft: 'auto', paddingRight: '10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>W</span>
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
                                placeholder="0.10"
                                id="electricity-input"
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
                                id="pool-fee-input"
                                step="0.1"
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    {/* Mining Coin */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            Mining Coin
                        </label>
                        <div className="select-wrap">
                            <select
                                value={selectedCoin}
                                onChange={(e) => setSelectedCoin(e.target.value)}
                                className="input-select"
                                id="coin-select"
                            >
                                {COIN_KEYS.map((key) => (
                                    <option key={key} value={key}>
                                        {COINS[key].symbol} — {COINS[key].name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="select-arrow" />
                        </div>
                    </div>

                    {/* Hardware Cost (Optional) */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            GPU Hardware Cost (Optional)
                        </label>
                        <div className="pills-row">
                            {HARDWARE_COST_PILLS.map((cost) => (
                                <button
                                    key={cost}
                                    className={`pill-btn ${hardwareCost === String(cost) ? 'active' : ''}`}
                                    onClick={() => setHardwareCost(String(cost))}
                                >
                                    ${cost >= 1000 ? `${Math.round(cost / 1000)}k` : cost}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <span className="input-prefix">$</span>
                            <input
                                type="number"
                                value={hardwareCost}
                                onChange={(e) => setHardwareCost(e.target.value)}
                                placeholder="For break-even calculation"
                                id="hardware-cost-input"
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
                        Auto-calculates as you type. Use presets for a faster stress test on mobile.
                    </span>
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    {hasInputs && results.length > 0 ? (
                        <>
                            {/* Hero */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'loss'}`}>
                                <span className="result-hero-label">
                                    Daily Profit ({COINS[selectedCoin].symbol})
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <Zap size={28} />}
                                    {formatUSD(Math.abs(results[0].netProfit))}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'loss'}`}>
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

                            {/* Coin Ranking */}
                            {coinRanking.length > 0 && (
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                        Coin Profitability Ranking
                                    </h4>
                                    <div className="result-breakdown">
                                        {coinRanking.map((cr, i) => (
                                            <div key={cr.symbol}>
                                                {i > 0 && <div className="result-divider" />}
                                                <div className="result-row">
                                                    <span className="result-label">
                                                        {i + 1}. {cr.symbol} ({cr.algo})
                                                    </span>
                                                    <span className={`result-value ${cr.dailyProfit >= 0 ? 'profit' : 'fee'}`}>
                                                        {cr.dailyProfit >= 0 ? '+' : ''}{formatUSD(cr.dailyProfit)}/day
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Break-even */}
                            {breakEvenDays !== null && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '12px 14px',
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    fontSize: '0.85rem',
                                }}>
                                    <Calendar size={16} />
                                    {breakEvenDays > 0 ? (
                                        <span>
                                            Break-even in <strong>{breakEvenDays} days</strong> (~{(breakEvenDays / 30).toFixed(1)} months)
                                        </span>
                                    ) : (
                                        <span style={{ color: 'var(--color-accent-red, #ef4444)' }}>
                                            Mining is <strong>not profitable</strong> at current rates — hardware cost will not be recovered
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* GPU Specs Info Card */}
                            {gpu && (
                                <div style={{
                                    marginTop: '16px',
                                    padding: '12px 14px',
                                    background: 'var(--color-bg-card)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '10px',
                                    fontSize: '0.8rem',
                                }}>
                                    <h4 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                                        <Monitor size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                        GPU Specs
                                    </h4>
                                    <div className="result-breakdown" style={{ border: 'none', padding: 0 }}>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Model')}</span>
                                            <span className="result-value">{gpu.name}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Hashrate')}</span>
                                            <span className="result-value">{gpu.hashrate} MH/s</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Power')}</span>
                                            <span className="result-value">{gpu.power} W</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Algorithm')}</span>
                                            <span className="result-value">{gpu.algo}</span>
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
                                    Join F2Pool Mining Pool →
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                Mining profitability fluctuates with price and difficulty changes.
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Cpu size={40} />
                            </div>
                            <h3>Configure Your GPU Mining Rig</h3>
                            <p>Select a GPU model and mining coin to see profitability estimates across multiple time periods and coins.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
