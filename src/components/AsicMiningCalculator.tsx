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
import { withErrorBoundary } from './ErrorBoundary';
import { fmtPctValue } from '../i18n/format';
import { fetchWhattomine, formatSnapshotDate } from '../utils/whattomine';

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
    revenueByCoin: CoinRevenue[];
    electricity: number;
    poolFee: number;
    netProfit: number;
}

export interface CoinRevenue {
    coin: string;
    coins: number;
    usd: number;
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

// Preset hashrate is in the algorithm's display unit (getHashrateUnit): TH/s for SHA-256,
// GH/s for Scrypt and X11, KSol/s for Equihash — the units on the manufacturers' spec sheets.
export const ASIC_PRESETS: AsicPreset[] = [
    { name: 'Antminer S21 Hyd', hashrate: 335, power: 5360, algo: 'SHA-256', coin: 'BTC', price: 5500 },
    { name: 'Antminer S21 Pro', hashrate: 234, power: 3510, algo: 'SHA-256', coin: 'BTC', price: 4500 },
    { name: 'Antminer S21', hashrate: 200, power: 3500, algo: 'SHA-256', coin: 'BTC', price: 4200 },
    { name: 'Antminer S19 XP', hashrate: 140, power: 3010, algo: 'SHA-256', coin: 'BTC', price: 1200 },
    { name: 'Antminer T21', hashrate: 190, power: 3610, algo: 'SHA-256', coin: 'BTC', price: 3500 },
    { name: 'Whatsminer M60S', hashrate: 186, power: 3420, algo: 'SHA-256', coin: 'BTC', price: 3800 },
    { name: 'Whatsminer M50S', hashrate: 126, power: 3276, algo: 'SHA-256', coin: 'BTC', price: 2200 },
    { name: 'Avalon A1466', hashrate: 150, power: 3230, algo: 'SHA-256', coin: 'BTC', price: 3000 },
    { name: 'Antminer L9', hashrate: 16, power: 3260, algo: 'Scrypt', coin: 'LTC', price: 6500 },
    { name: 'Antminer D9', hashrate: 1770, power: 2839, algo: 'X11', coin: 'DASH', price: 4000 },
    { name: 'Antminer Z15', hashrate: 420, power: 1510, algo: 'Equihash', coin: 'ZEC', price: 3200 },
];

// Network data snapshot, used only when the live feed (/api/whattomine) is unreachable —
// the calculator then tells the visitor which date the figures are from. Difficulty and
// price are whattomine's difficulty24 / exchange_rate on NETWORK_SNAPSHOT_DATE (prices
// matched CoinGecko within 0.3% that day); block rewards are the protocol values below.
const NETWORK_SNAPSHOT_DATE = '2026-10-13';
export const NETWORK_DATA: Record<string, NetworkData> = {
    BTC: { difficulty: 132720000000000, blockReward: 3.125, price: 83960, blockTime: 600 },
    LTC: { difficulty: 87860000, blockReward: 6.25, price: 62.45, blockTime: 150 },
    // blockReward here is the MINER's share per block — calcDailyCoins multiplies it by the
    // miner's expected blocks/day, and the live whattomine override (block_reward) is
    // miner-facing too. For chains that split the subsidy, storing the full subsidy inflates
    // mining revenue: Dash pays the miner only 20% (masternodes 60%, treasury 20%) and Zcash
    // routes 20% to the ZIP-1015 dev fund.
    DASH: { difficulty: 127200000, blockReward: 0.4109, price: 50.52, blockTime: 150 }, // 20% of the 2.05472550 era-12 subsidy (era 12 began at block 2,522,881, 16 Aug 2026); drops to ~0.3816 at block 2,733,121 (~Sep 2027)
    ZEC: { difficulty: 279180000, blockReward: 1.25, price: 1227.7, blockTime: 75 }, // 80% of the 1.5625 subsidy after the ZIP-1015/NU6 dev fund; next halving ~Nov 2028
    DOGE: { difficulty: 38510000, blockReward: 10000, price: 0.0845, blockTime: 60 }, // flat 10,000 DOGE per block since block 600,000 (Feb 2018): no halvings, no dev-fund split
};

// Coins paid for the same hashes through merged mining (AuxPoW): a Scrypt share that meets
// Dogecoin's target is also a valid Dogecoin block, so an LTC miner earns DOGE in proportion to
// hashrate / DOGE difficulty at no extra power. Dogecoin has accepted merge-mined blocks since
// block 371,337 (2014) and every large Litecoin pool pays it. The smaller AuxPoW Scrypt chains
// some pools add (Bellscoin, Pepecoin, Luckycoin…) are left out.
export const MERGE_MINED: Record<string, string[]> = {
    LTC: ['DOGE'],
};

// Map whattomine generic names to our symbols
const COIN_MAPPING: Record<string, string> = {
    Bitcoin: 'BTC',
    Litecoin: 'LTC',
    Dash: 'DASH',
    Zcash: 'ZEC',
    Dogecoin: 'DOGE',
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
export function getHashrateMultiplier(algo: string): number {
    switch (algo) {
        case 'SHA-256': return 1e12;   // TH/s
        case 'Scrypt': return 1e9;     // GH/s
        case 'X11': return 1e9;        // GH/s
        case 'Equihash': return 1e3;   // KSol/s
        default: return 1e12;
    }
}

/** Returns the hashrate unit label for a given algorithm */
export function getHashrateUnit(algo: string): string {
    switch (algo) {
        case 'SHA-256': return 'TH/s';
        case 'Scrypt': return 'GH/s';
        case 'X11': return 'GH/s';
        case 'Equihash': return 'KSol/s';
        default: return 'TH/s';
    }
}

/**
 * Expected hashes (Equihash: solutions) per block at difficulty 1, i.e. 2^256 divided by the
 * target that the coin's client reports as difficulty 1. Bitcoin-derived clients (BTC, LTC,
 * DASH, DOGE) hardcode Bitcoin's 0x1d00ffff (~2^224) in getdifficulty whatever their own
 * powLimit is (Litecoin's and Dogecoin's is 2^236 - 1), so 2^32. zcashd measures difficulty
 * against its own powLimit, 2^243 - 1, so 2^13: using 2^32 there understated ZEC revenue
 * 2^19 = 524,288x. Both match whattomine's nethash = difficulty * factor / block_time for
 * BTC, LTC, DASH, DOGE and ZEC.
 */
export function getDifficultyFactor(algo: string): number {
    switch (algo) {
        case 'Equihash': return 2 ** 13;
        default: return 2 ** 32;
    }
}

/** Calculate daily coins mined using the generic PoW formula */
export function calcDailyCoins(
    hashrate: number,
    algo: string,
    difficulty: number,
    blockReward: number,
): number {
    // daily_coins = (hashrate_in_hps / (difficulty * difficultyFactor)) * 86400 * blockReward
    const hashrateHps = hashrate * getHashrateMultiplier(algo);
    return (hashrateHps / (difficulty * getDifficultyFactor(algo))) * 86400 * blockReward;
}

/** Daily coins and USD for the mined coin, plus its merge-mined coins when included. */
export function dailyRevenueByCoin(
    hashrate: number,
    algo: string,
    coin: string,
    network: Record<string, NetworkData>,
    includeMerged: boolean,
): CoinRevenue[] {
    const symbols = includeMerged ? [coin, ...(MERGE_MINED[coin] ?? [])] : [coin];
    return symbols.flatMap((symbol) => {
        const net = network[symbol];
        if (!net) return [];
        const coins = calcDailyCoins(hashrate, algo, net.difficulty, net.blockReward);
        return [{ coin: symbol, coins, usd: coins * net.price }];
    });
}

function AsicMiningCalculator({ lang = 'en' }: { lang?: string }) {
    // Inputs
    const [selectedAsic, setSelectedAsic] = useState(ASIC_PRESETS[0].name);
    const [hashrate, setHashrate] = useState(String(ASIC_PRESETS[0].hashrate));
    const [power, setPower] = useState(String(ASIC_PRESETS[0].power));
    const [electricityCost, setElectricityCost] = useState('0.08');
    const [poolFee, setPoolFee] = useState('1');
    const [asicPrice, setAsicPrice] = useState(String(ASIC_PRESETS[0].price));
    const [activeCoin, setActiveCoin] = useState(ASIC_PRESETS[0].coin);
    const [activeAlgo, setActiveAlgo] = useState(ASIC_PRESETS[0].algo);
    const [mergeMining, setMergeMining] = useState(true);

    // Live Data & Results
    const [networkData, setNetworkData] = useState<Record<string, NetworkData>>(NETWORK_DATA);
    const [liveDataStatus, setLiveDataStatus] = useState<'loading' | 'live' | 'fallback'>('loading');

    const [results, setResults] = useState<PeriodResult[]>([]);
    const [roiDays, setRoiDays] = useState<number | null>(null);
    const [dailyProfit, setDailyProfit] = useState(0);
    const [comparison, setComparison] = useState<AsicComparison[]>([]);

    useEffect(() => {
        let isMounted = true;
        setLiveDataStatus('loading');
        fetchWhattomine('asic')
            .then(({ coins }) => {
                if (!isMounted) return;
                const btcPrice = coins['Bitcoin']?.exchange_rate || NETWORK_DATA['BTC'].price;
                const updatedData = { ...NETWORK_DATA };

                for (const [name, symbol] of Object.entries(COIN_MAPPING)) {
                    const coinInfo = coins[name];
                    if (!coinInfo) continue;
                    const snapshot = updatedData[symbol];
                    // exchange_rate is quoted in BTC for every coin except Bitcoin itself.
                    const price = coinInfo.exchange_rate
                        ? (symbol === 'BTC' ? coinInfo.exchange_rate : coinInfo.exchange_rate * btcPrice)
                        : snapshot.price;
                    updatedData[symbol] = {
                        ...snapshot,
                        difficulty: coinInfo.difficulty24 || coinInfo.difficulty || snapshot.difficulty,
                        blockReward: coinInfo.block_reward24 || coinInfo.block_reward || snapshot.blockReward,
                        price,
                    };
                }

                setNetworkData(updatedData);
                setLiveDataStatus('live');
            })
            .catch(() => {
                if (isMounted) setLiveDataStatus('fallback');
            });

        return () => { isMounted = false; };
    }, []);

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
        const network = networkData[activeCoin];

        if (!hr || hr <= 0 || !network) {
            setResults([]);
            setRoiDays(null);
            setDailyProfit(0);
            setComparison([]);
            return;
        }

        // Daily revenue: the mined coin plus any merge-mined coins
        const dailyByCoin = dailyRevenueByCoin(hr, activeAlgo, activeCoin, networkData, mergeMining);
        const dailyRevenueUsd = dailyByCoin.reduce((sum, r) => sum + r.usd, 0);
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
            revenueByCoin: dailyByCoin.map((r) => ({ ...r, coins: r.coins * mult, usd: r.usd * mult })),
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
            const byCoin = dailyRevenueByCoin(preset.hashrate, preset.algo, preset.coin, networkData, mergeMining);
            const dRevenue = byCoin.reduce((sum, r) => sum + r.usd, 0);
            const dElec = (preset.power / 1000) * 24 * elRate;
            const dFee = dRevenue * (feeRate / 100);
            const dProfit = dRevenue - dElec - dFee;
            const efficiency = preset.hashrate > 0 ? preset.power / preset.hashrate : 0;

            return {
                name: preset.name,
                hashrate: preset.hashrate,
                power: preset.power,
                algo: preset.algo,
                coin: byCoin.map((r) => r.coin).join(' + '),
                dailyProfit: dProfit,
                efficiency,
            };
        }).sort((a, b) => b.dailyProfit - a.dailyProfit);

        setComparison(comparisonData);
    }, [hashrate, power, electricityCost, poolFee, asicPrice, activeCoin, activeAlgo, networkData, mergeMining]);

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
        setMergeMining(true);
        setResults([]);
        setRoiDays(null);
        setDailyProfit(0);
        setComparison([]);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const hasInputs = parseFloat(hashrate) > 0;
    const isProfit = results.length > 0 && results[0].netProfit >= 0;
    const currentPreset = ASIC_PRESETS.find((a) => a.name === selectedAsic);
    const hashrateUnit = getHashrateUnit(activeAlgo);
    const mergeCoins = MERGE_MINED[activeCoin] ?? [];
    const minedCoins = (mergeMining ? [activeCoin, ...mergeCoins] : [activeCoin]).join(' + ');
    const efficiency = currentPreset && currentPreset.hashrate > 0
        ? (currentPreset.power / currentPreset.hashrate).toFixed(1)
        : '—';

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {ASIC_SCENARIOS.map((scenario) => (
                                <button
                                    key={scenario.label}
                                    className={`pill-btn ${isScenarioActive(scenario) ? 'active' : ''}`}
                                    onClick={() => applyScenario(scenario)}
                                >
                                    {getUiString(lang, scenario.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ASIC Model Dropdown */}
                    <div className="input-group">
                        <label htmlFor="asic-model-select">
                            <Server size={14} />
                            {getUiString(lang, 'ASIC Model')}
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
                        <label htmlFor="asic-hashrate-input">
                            <Hash size={14} />
                            {getUiString(lang, 'Hashrate')} ({hashrateUnit})
                            <span className="label-hint">{getUiString(lang, 'Auto-filled')}</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={hashrate}
                                onChange={(e) => setHashrate(e.target.value)}
                                placeholder=""
                                id="asic-hashrate-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
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
                        <label htmlFor="asic-power-input">
                            <Zap size={14} />
                            {getUiString(lang, 'Power Consumption')} (W)
                            <span className="label-hint">{getUiString(lang, 'Auto-filled')}</span>
                        </label>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={power}
                                onChange={(e) => setPower(e.target.value)}
                                placeholder=""
                                id="asic-power-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
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

                    {/* Merged mining: only for coins whose pools also pay an AuxPoW coin */}
                    {mergeCoins.length > 0 && (
                        <div className="input-group">
                            <label>{getUiString(lang, 'Merged Mining')}</label>
                            <div className="pills-row">
                                <button
                                    className={`pill-btn ${mergeMining ? 'active' : ''}`}
                                    aria-pressed={mergeMining}
                                    onClick={() => setMergeMining(true)}
                                >
                                    {[activeCoin, ...mergeCoins].join(' + ')}
                                </button>
                                <button
                                    className={`pill-btn ${!mergeMining ? 'active' : ''}`}
                                    aria-pressed={!mergeMining}
                                    onClick={() => setMergeMining(false)}
                                >
                                    {getUiString(lang, 'Only {coin}').replace('{coin}', activeCoin)}
                                </button>
                            </div>
                            <span className="input-hint">
                                {getUiString(lang, 'Most {coin} pools also pay {merged} for the same hashes, at no extra power cost.')
                                    .replace('{coin}', activeCoin)
                                    .replace('{merged}', mergeCoins.join(', '))}
                            </span>
                        </div>
                    )}

                    {/* Electricity Cost */}
                    <div className="input-group">
                        <label htmlFor="asic-electricity-input">
                            <DollarSign size={14} />
                            {getUiString(lang, 'Electricity Cost')} ($/kWh)
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
                            <input
                                type="number" inputMode="decimal"
                                value={electricityCost}
                                onChange={(e) => setElectricityCost(e.target.value)}
                                placeholder=""
                                id="asic-electricity-input"
                                step="0.01"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Pool Fee */}
                    <div className="input-group">
                        <label htmlFor="asic-pool-fee-input">
                            <TrendingUp size={14} />
                            {getUiString(lang, 'Pool Fee')} (%)
                        </label>
                        <div className="pills-row">
                            {POOL_FEE_PILLS.map((fee) => (
                                <button
                                    key={fee}
                                    className={`pill-btn ${poolFee === String(fee) ? 'active' : ''}`}
                                    onClick={() => setPoolFee(String(fee))}
                                >
                                    {fmtPctValue(fee, lang)}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={poolFee}
                                onChange={(e) => setPoolFee(e.target.value)}
                                placeholder=""
                                id="asic-pool-fee-input"
                                step="0.1"
                                min="0"
                                max="100"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* ASIC Purchase Price */}
                    <div className="input-group">
                        <label htmlFor="asic-price-input">
                            <Calendar size={14} />
                            {getUiString(lang, 'ASIC Purchase Price')} ($)
                            <span className="label-hint">{getUiString(lang, 'For ROI calculation')}</span>
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
                            <input
                                type="number" inputMode="decimal"
                                value={asicPrice}
                                onChange={(e) => setAsicPrice(e.target.value)}
                                placeholder=""
                                id="asic-price-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Reset */}
                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} />
                        {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Pick a preset first for realistic ASIC assumptions.')}
                    </span>
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>{getUiString(lang, 'Estimated Profitability')}</h2>
                        {liveDataStatus === 'live' && (
                            <span style={{ color: 'var(--color-accent-green)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(52, 211, 153, 0.1)', padding: '2px 8px', borderRadius: '12px' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent-green)' }}></span>
                                {getUiString(lang, 'Live Network Data')}
                            </span>
                        )}
                        {liveDataStatus === 'fallback' && (
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '2px 8px', borderRadius: '12px' }}>
                                {getUiString(lang, 'Showing network data from {date}').replace('{date}', formatSnapshotDate(NETWORK_SNAPSHOT_DATE, lang))}
                            </span>
                        )}
                    </div>
                    {hasInputs && results.length > 0 ? (
                        <>
                            {/* Hero */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'fee'}`}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Daily Profit')} ({minedCoins})
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <Zap size={28} />}
                                    {formatUSD(Math.abs(results[0].netProfit))}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'fee'}`}>
                                    {isProfit ? getUiString(lang, 'Profitable') : getUiString(lang, 'Unprofitable')} {getUiString(lang, 'at')} ${electricityCost}/{getUiString(lang, 'kWh')}
                                </span>
                            </div>

                            {/* Profitability Table */}
                            <div className="result-breakdown">
                                {results.map((r, i) => (
                                    <div key={r.period}>
                                        {i > 0 && <div className="result-divider" />}
                                        <div className="result-row" style={{ marginTop: i > 0 ? '4px' : 0 }}>
                                            <span className="result-label"><strong>{getUiString(lang, r.period)}</strong></span>
                                            <span className="result-value"><strong>{getUiString(lang, r.period)}</strong></span>
                                        </div>
                                        {r.revenueByCoin.length > 1 ? r.revenueByCoin.map((c) => (
                                            <div className="result-row" key={c.coin}>
                                                <span className="result-label">{getUiString(lang, 'Revenue')} ({c.coin})</span>
                                                <span className="result-value profit">{formatUSD(c.usd)}</span>
                                            </div>
                                        )) : (
                                            <div className="result-row">
                                                <span className="result-label">{getUiString(lang, 'Revenue')}</span>
                                                <span className="result-value profit">{formatUSD(r.revenue)}</span>
                                            </div>
                                        )}
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
                                    <h3 style={{
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
                                    </h3>
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
                                                    <strong>{(roiDays / 30.44).toFixed(1)} {getUiString(lang, 'months')} ({roiDays} {getUiString(lang, 'days')})</strong>
                                                ) : (
                                                    <strong style={{ color: 'var(--color-accent-red, #ef4444)' }}>
                                                        {getUiString(lang, 'Never (unprofitable)')}
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
                                    <h3 style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        marginBottom: '10px',
                                        color: 'var(--color-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <Cpu size={14} />
                                        {getUiString(lang, 'ASIC Comparison')} ({getUiString(lang, 'at')} ${electricityCost}/{getUiString(lang, 'kWh')})
                                    </h3>
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
                                    <h3 style={{
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                        color: 'var(--color-text)',
                                    }}>
                                        <Server size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                        {getUiString(lang, 'ASIC Specs')}
                                    </h3>
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
                                            <span className="result-value">{currentPreset.coin === activeCoin ? minedCoins : currentPreset.coin}</span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Efficiency')}</span>
                                            <span className="result-value">
                                                {efficiency} J/{getHashrateUnit(currentPreset.algo).replace('/s', '')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Mining profitability fluctuates with price and difficulty changes. Hardcoded network data is approximate.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Server size={40} />
                            </div>
                            <h2>{getUiString(lang, 'Configure Your ASIC Miner')}</h2>
                            <p>{getUiString(lang, 'Select an ASIC model or enter your hashrate and power consumption to see profitability estimates, ROI projections, and device comparisons.')}</p>
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

export default withErrorBoundary(AsicMiningCalculator);
