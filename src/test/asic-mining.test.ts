import { describe, it, expect } from 'vitest';
import {
    ASIC_PRESETS,
    NETWORK_DATA,
    calcDailyCoins,
    getDifficultyFactor,
    getHashrateMultiplier,
} from '../components/AsicMiningCalculator';

// whattomine asic.json, fetched 2026-10-13. whattomine derives each coin's network hashrate as
// difficulty * factor / block_time, so these four rows pin the per-algorithm difficulty factor.
const WHATTOMINE_2026_10_13 = [
    { algo: 'SHA-256', difficulty: 132716002350731.3, blockTime: 565, nethash: 1008868831419911504424 },
    { algo: 'Scrypt', difficulty: 87856932.70998667, blockTime: 153, nethash: 2466291847818728 },
    { algo: 'X11', difficulty: 113428322.856419, blockTime: 157, nethash: 3102999599416871 },
    { algo: 'Equihash', difficulty: 298451597.83758706, blockTime: 75, nethash: 32598873193 },
];

const preset = (name: string) => {
    const p = ASIC_PRESETS.find((a) => a.name === name);
    if (!p) throw new Error(`no preset ${name}`);
    return p;
};

const dailyRevenueUsd = (name: string) => {
    const p = preset(name);
    const net = NETWORK_DATA[p.coin];
    return calcDailyCoins(p.hashrate, p.algo, net.difficulty, net.blockReward) * net.price;
};

describe('ASIC mining calculator', () => {
    it.each(WHATTOMINE_2026_10_13)('$algo difficulty factor reproduces whattomine nethash', (row) => {
        const nethash = (row.difficulty * getDifficultyFactor(row.algo)) / row.blockTime;
        expect(nethash / row.nethash).toBeCloseTo(1, 6);
    });

    it('Antminer Z15 (420 KSol/s) mines ~0.0198 ZEC/day on the snapshot', () => {
        const zec = NETWORK_DATA.ZEC;
        const coins = calcDailyCoins(420, 'Equihash', zec.difficulty, zec.blockReward);
        // 420e3 / (279.18e6 * 2^13) * 86400 * 1.25; with 2^32 this was 524,288x smaller.
        expect(coins).toBeCloseTo(0.019833, 5);
        expect(dailyRevenueUsd('Antminer Z15')).toBeCloseTo(24.35, 1);
    });

    it('Antminer D9 preset is 1.77 TH/s and mines ~0.115 DASH/day on the snapshot', () => {
        const d9 = preset('Antminer D9');
        expect(d9.hashrate * getHashrateMultiplier(d9.algo)).toBe(1.77e12);
        const dash = NETWORK_DATA.DASH;
        expect(calcDailyCoins(d9.hashrate, d9.algo, dash.difficulty, dash.blockReward)).toBeCloseTo(0.115021, 5);
    });

    it('Antminer L9 preset is 16 GH/s', () => {
        const l9 = preset('Antminer L9');
        expect(l9.hashrate * getHashrateMultiplier(l9.algo)).toBe(16e9);
    });

    // A unit slip (MH/s vs GH/s, 2^32 vs 2^13) moves revenue by 1000x or more, which this band
    // catches; real profitability swings never do. The L9 sits lowest (~$1.4/day): it earns LTC only,
    // the DOGE it would merge-mine is not modelled.
    it.each(ASIC_PRESETS.map((p) => p.name))('%s grosses between 1 and 100 USD/day on the snapshot', (name) => {
        const revenue = dailyRevenueUsd(name);
        expect(revenue).toBeGreaterThan(1);
        expect(revenue).toBeLessThan(100);
    });
});
