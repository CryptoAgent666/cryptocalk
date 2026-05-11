import { getUiString } from '../i18n/ui-strings';
import { useState } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Fuel,
    AlertTriangle,
    Sprout,
    Calendar,
    Clock,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

const HARVEST_FREQUENCIES = [
    { id: 'daily', label: 'Daily', days: 1 },
    { id: 'weekly', label: 'Weekly', days: 7 },
    { id: 'biweekly', label: 'Bi-weekly', days: 14 },
    { id: 'monthly', label: 'Monthly', days: 30 },
];

const PERIOD_PRESETS = [
    { label: '30d', days: 30 },
    { label: '90d', days: 90 },
    { label: '180d', days: 180 },
    { label: '365d', days: 365 },
];

const DEPOSIT_PRESETS = [1000, 5000, 10000, 25000];
const RATE_PRESETS = [10, 20, 50, 100];
const GAS_PRESETS = [1, 3, 5, 10, 20];
const IL_PRESETS = [0, 1, 2, 5, 10];

const REFERENCE_DEPOSITS = [100, 500, 1000, 5000, 10000, 50000];
type YieldRateType = 'APY' | 'APR';
const YIELD_FARMING_SCENARIOS = [
    {
        label: 'L2 Passive',
        deposit: '1000',
        poolRate: '20',
        rateType: 'APY',
        gasEntry: '1',
        gasExit: '1',
        gasHarvest: '1',
        harvestFreq: 'weekly',
        ilPercent: '1',
        farmingDays: '90',
    },
    {
        label: 'Mainnet',
        deposit: '5000',
        poolRate: '50',
        rateType: 'APY',
        gasEntry: '15',
        gasExit: '15',
        gasHarvest: '5',
        harvestFreq: 'weekly',
        ilPercent: '2',
        farmingDays: '365',
    },
    {
        label: 'High APY',
        deposit: '10000',
        poolRate: '100',
        rateType: 'APR',
        gasEntry: '20',
        gasExit: '20',
        gasHarvest: '10',
        harvestFreq: 'biweekly',
        ilPercent: '10',
        farmingDays: '180',
    },
] as const;

function YieldFarmingCalculator({ lang = 'en' }: { lang?: string }) {
    const [deposit, setDeposit] = useState('1000');
    const [poolRate, setPoolRate] = useState('50');
    const [rateType, setRateType] = useState<YieldRateType>('APY');
    const [gasEntry, setGasEntry] = useState('15');
    const [gasExit, setGasExit] = useState('15');
    const [gasHarvest, setGasHarvest] = useState('5');
    const [harvestFreq, setHarvestFreq] = useState('weekly');
    const [ilPercent, setIlPercent] = useState('2');
    const [farmingDays, setFarmingDays] = useState('365');
    const applyScenario = (scenario: (typeof YIELD_FARMING_SCENARIOS)[number]) => {
        setDeposit(scenario.deposit);
        setPoolRate(scenario.poolRate);
        setRateType(scenario.rateType);
        setGasEntry(scenario.gasEntry);
        setGasExit(scenario.gasExit);
        setGasHarvest(scenario.gasHarvest);
        setHarvestFreq(scenario.harvestFreq);
        setIlPercent(scenario.ilPercent);
        setFarmingDays(scenario.farmingDays);
    };
    const isScenarioActive = (scenario: (typeof YIELD_FARMING_SCENARIOS)[number]) => (
        deposit === scenario.deposit
        && poolRate === scenario.poolRate
        && rateType === scenario.rateType
        && gasEntry === scenario.gasEntry
        && gasExit === scenario.gasExit
        && gasHarvest === scenario.gasHarvest
        && harvestFreq === scenario.harvestFreq
        && ilPercent === scenario.ilPercent
        && farmingDays === scenario.farmingDays
    );

    const depositVal = parseFloat(deposit) || 0;
    const rate = (parseFloat(poolRate) || 0) / 100;
    const entryGas = parseFloat(gasEntry) || 0;
    const exitGas = parseFloat(gasExit) || 0;
    const harvestGas = parseFloat(gasHarvest) || 0;
    const currentFreq = HARVEST_FREQUENCIES.find(f => f.id === harvestFreq)!;
    const days = parseFloat(farmingDays) || 365;
    const ilPct = parseFloat(ilPercent) || 0;

    const hasInputs = depositVal > 0 && rate > 0;

    // Gross yield calculation
    let grossYield = 0;
    if (rateType === 'APR') {
        grossYield = depositVal * (rate / 365) * days;
    } else {
        // APY: compound daily
        grossYield = depositVal * (Math.pow(1 + rate / 365, days) - 1);
    }

    // Harvest count & gas
    const numHarvests = Math.floor(days / currentFreq.days);
    const totalGas = entryGas + exitGas + (harvestGas * numHarvests);

    // Impermanent loss
    const ilLoss = depositVal * (ilPct / 100);

    // Net yield
    const netYield = grossYield - totalGas - ilLoss;

    // Optimal harvest frequency
    const findOptimalHarvest = () => {
        let optimal = HARVEST_FREQUENCIES[HARVEST_FREQUENCIES.length - 1]; // default Monthly
        for (const freq of HARVEST_FREQUENCIES) {
            const harvests = Math.floor(days / freq.days);
            if (harvests === 0) continue;
            // Reward per harvest with this frequency
            let rewardPerHarvest: number;
            if (rateType === 'APR') {
                rewardPerHarvest = depositVal * (rate / 365) * freq.days;
            } else {
                rewardPerHarvest = depositVal * (Math.pow(1 + rate / 365, freq.days) - 1);
            }
            // If gas doesn't eat > 50% of reward per harvest, this is viable
            if (harvestGas <= rewardPerHarvest * 0.5) {
                optimal = freq;
                break; // First viable (most frequent) wins
            }
        }
        return optimal;
    };

    const optimalHarvest = hasInputs ? findOptimalHarvest() : null;

    // Break-even period: days until cumulative yield > total gas (entry + exit + harvests up to that point)
    const findBreakEven = () => {
        const fixedGas = entryGas + exitGas;
        for (let d = 1; d <= days * 2 && d <= 3650; d++) {
            let yieldAtDay: number;
            if (rateType === 'APR') {
                yieldAtDay = depositVal * (rate / 365) * d;
            } else {
                yieldAtDay = depositVal * (Math.pow(1 + rate / 365, d) - 1);
            }
            const harvestsAtDay = Math.floor(d / currentFreq.days);
            const gasAtDay = fixedGas + (harvestGas * harvestsAtDay);
            if (yieldAtDay >= gasAtDay) return d;
        }
        return null; // never breaks even
    };

    const breakEvenDays = hasInputs ? findBreakEven() : null;

    // Reference table: gas impact at different deposit sizes
    const referenceRows = REFERENCE_DEPOSITS.map(dep => {
        let gross: number;
        if (rateType === 'APR') {
            gross = dep * (rate / 365) * days;
        } else {
            gross = dep * (Math.pow(1 + rate / 365, days) - 1);
        }
        const gas = entryGas + exitGas + (harvestGas * numHarvests);
        const gasPctOfYield = gross > 0 ? (gas / gross) * 100 : 100;
        const net = gross - gas - (dep * (ilPct / 100));
        return { deposit: dep, gross, gas, gasPct: gasPctOfYield, net };
    });

    const reset = () => {
        setDeposit('1000'); setPoolRate('50'); setRateType('APY');
        setGasEntry('15'); setGasExit('15'); setGasHarvest('5');
        setHarvestFreq('weekly'); setIlPercent('2'); setFarmingDays('365');
    };

    const formatUSD = (n: number) => new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(n);

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {YIELD_FARMING_SCENARIOS.map((scenario) => (
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

                    {/* Deposit Amount */}
                    <div className="input-group">
                        <label htmlFor="yf-deposit"><DollarSign size={14} /> {getUiString(lang, 'Deposit Amount')}</label>
                        <div className="pills-row">
                            {DEPOSIT_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${deposit === String(preset) ? 'active' : ''}`}
                                    onClick={() => setDeposit(String(preset))}
                                >
                                    ${preset / 1000}k
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={deposit} onChange={(e) => setDeposit(e.target.value)}
                                placeholder="" id="yf-deposit" step="any" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Pool APY/APR */}
                    <div className="input-group">
                        <label htmlFor="yf-rate"><Percent size={14} /> {getUiString(lang, 'Pool')} {rateType}</label>
                        <div className="toggle-group">
                            <button className={`toggle-btn ${rateType === 'APY' ? 'active' : ''}`}
                                onClick={() => setRateType('APY')}>
                                {getUiString(lang, 'APY')}
                            </button>
                            <button className={`toggle-btn ${rateType === 'APR' ? 'active' : ''}`}
                                onClick={() => setRateType('APR')}>
                                {getUiString(lang, 'APR')}
                            </button>
                        </div>
                        <div className="pills-row">
                            {RATE_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${poolRate === String(preset) ? 'active' : ''}`}
                                    onClick={() => setPoolRate(String(preset))}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={poolRate} onChange={(e) => setPoolRate(e.target.value)}
                                placeholder="" id="yf-rate" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Gas Costs */}
                    <div className="input-group">
                        <label htmlFor="yf-gas-entry"><Fuel size={14} /> {getUiString(lang, 'Gas Cost: Entry')}</label>
                        <div className="pills-row">
                            {GAS_PRESETS.map((preset) => (
                                <button
                                    key={`entry-${preset}`}
                                    className={`pill-btn ${gasEntry === String(preset) ? 'active' : ''}`}
                                    onClick={() => setGasEntry(String(preset))}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={gasEntry} onChange={(e) => setGasEntry(e.target.value)}
                                placeholder="" id="yf-gas-entry" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="yf-gas-exit"><Fuel size={14} /> {getUiString(lang, 'Gas Cost: Exit')}</label>
                        <div className="pills-row">
                            {GAS_PRESETS.map((preset) => (
                                <button
                                    key={`exit-${preset}`}
                                    className={`pill-btn ${gasExit === String(preset) ? 'active' : ''}`}
                                    onClick={() => setGasExit(String(preset))}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={gasExit} onChange={(e) => setGasExit(e.target.value)}
                                placeholder="" id="yf-gas-exit" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="yf-gas-harvest"><Fuel size={14} /> {getUiString(lang, 'Gas Cost: Per Harvest')}</label>
                        <div className="pills-row">
                            {GAS_PRESETS.map((preset) => (
                                <button
                                    key={`harvest-${preset}`}
                                    className={`pill-btn ${gasHarvest === String(preset) ? 'active' : ''}`}
                                    onClick={() => setGasHarvest(String(preset))}
                                >
                                    ${preset}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={gasHarvest} onChange={(e) => setGasHarvest(e.target.value)}
                                placeholder="" id="yf-gas-harvest" step="0.1" min="0" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Harvest Frequency */}
                    <div className="input-group">
                        <label><Clock size={14} /> {getUiString(lang, 'Harvest Frequency')}</label>
                        <div className="pills-row">
                            {HARVEST_FREQUENCIES.map((f) => (
                                <button key={f.id}
                                    className={`pill-btn ${harvestFreq === f.id ? 'active' : ''}`}
                                    onClick={() => setHarvestFreq(f.id)}>
                                    {getUiString(lang, f.label)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Impermanent Loss */}
                    <div className="input-group">
                        <label htmlFor="yf-il"><Percent size={14} /> {getUiString(lang, 'Expected Impermanent Loss')}</label>
                        <div className="pills-row">
                            {IL_PRESETS.map((preset) => (
                                <button
                                    key={preset}
                                    className={`pill-btn ${ilPercent === String(preset) ? 'active' : ''}`}
                                    onClick={() => setIlPercent(String(preset))}
                                >
                                    {preset}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input type="number" inputMode="decimal" value={ilPercent} onChange={(e) => setIlPercent(e.target.value)}
                                placeholder="" id="yf-il" step="0.1" min="0" max="50" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Farming Period */}
                    <div className="input-group">
                        <label htmlFor="yf-days"><Calendar size={14} /> {getUiString(lang, 'Farming Period')}</label>
                        <div className="pills-row">
                            {PERIOD_PRESETS.map((p) => (
                                <button key={p.days}
                                    className={`pill-btn ${farmingDays === String(p.days) ? 'active' : ''}`}
                                    onClick={() => setFarmingDays(String(p.days))}>
                                    {getUiString(lang, p.label)}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input type="number" inputMode="decimal" value={farmingDays} onChange={(e) => setFarmingDays(e.target.value)}
                                placeholder="" id="yf-days" step="1" min="1" onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Always validate gas and IL assumptions first, then compare harvest frequencies.')}
                    </span>
                </div>

                {/* Results */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: netYield >= 0 ? 'var(--color-accent-green)' : '#ef4444' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Net Yield')} — {days} {getUiString(lang, 'Days')}</span>
                                <span className="result-hero-value" style={{ color: netYield >= 0 ? 'var(--color-accent-green)' : '#ef4444' }}>
                                    <Sprout size={28} />
                                    {netYield >= 0 ? '+' : ''}{formatUSD(netYield)}
                                </span>
                                <span className="result-hero-roi" style={{ color: netYield >= 0 ? 'var(--color-accent-green)' : '#ef4444' }}>
                                    {depositVal > 0 ? `${netYield >= 0 ? '+' : ''}${((netYield / depositVal) * 100).toFixed(2)}% ${getUiString(lang, 'net ROI')}` : ''}
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Deposit')}</span>
                                    <span className="result-value">{formatUSD(depositVal)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Pool')} {rateType}</span>
                                    <span className="result-value">{poolRate}%</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gross Yield')}</span>
                                    <span className="result-value profit">+{formatUSD(grossYield)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas: Entry')}</span>
                                    <span className="result-value fee">-{formatUSD(entryGas)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas: Exit')}</span>
                                    <span className="result-value fee">-{formatUSD(exitGas)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Gas: Harvests')} ({numHarvests}x @ {formatUSD(harvestGas)})</span>
                                    <span className="result-value fee">-{formatUSD(harvestGas * numHarvests)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Total Gas Costs')}</strong></span>
                                    <span className="result-value fee"><strong>-{formatUSD(totalGas)}</strong></span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Impermanent Loss')} ({ilPct}%)</span>
                                    <span className="result-value fee">-{formatUSD(ilLoss)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Net Yield')}</strong></span>
                                    <span className={`result-value ${netYield >= 0 ? 'profit' : 'fee'}`}>
                                        <strong>{netYield >= 0 ? '+' : ''}{formatUSD(netYield)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Harvest Optimization */}
                            {optimalHarvest && (
                                <div style={{
                                    padding: '10px 14px',
                                    background: 'rgba(99,102,241,0.08)',
                                    border: '1px solid rgba(99,102,241,0.25)',
                                    borderRadius: '10px', fontSize: '0.85rem',
                                    color: 'var(--color-text)',
                                    display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px',
                                }}>
                                    <Clock size={16} style={{ flexShrink: 0, color: '#0891b2' }} />
                                    <span>
                                        <strong>{getUiString(lang, 'Optimal harvest')}: {getUiString(lang, optimalHarvest.label)}</strong> {getUiString(lang, '— harvesting more often costs more in gas than the compounding benefit.')}
                                    </span>
                                </div>
                            )}

                            {/* Break-even Info */}
                            <div style={{
                                padding: '10px 14px',
                                background: breakEvenDays !== null ? 'rgba(34,197,94,0.08)' : 'rgba(249,115,22,0.08)',
                                border: `1px solid ${breakEvenDays !== null ? 'rgba(34,197,94,0.25)' : 'rgba(249,115,22,0.25)'}`,
                                borderRadius: '10px', fontSize: '0.85rem',
                                color: 'var(--color-text)',
                                display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px',
                            }}>
                                <Info size={16} style={{ flexShrink: 0, color: breakEvenDays !== null ? 'var(--color-accent-green)' : '#f97316' }} />
                                <span>
                                    {breakEvenDays !== null
                                        ? `${getUiString(lang, 'Your gas costs are covered after')} ${breakEvenDays} ${breakEvenDays !== 1 ? getUiString(lang, 'days') : getUiString(lang, 'day')}.`
                                        : getUiString(lang, 'Gas costs may never be recovered at this rate and deposit size.')}
                                </span>
                            </div>

                            {/* Low Deposit Warning */}
                            {depositVal < 500 && (
                                <div style={{
                                    padding: '10px 14px',
                                    background: 'rgba(249,115,22,0.1)',
                                    border: '1px solid rgba(249,115,22,0.3)',
                                    borderRadius: '10px', fontSize: '0.85rem',
                                    color: '#f97316',
                                    display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px',
                                }}>
                                    <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                                    <span>
                                        {getUiString(lang, 'At deposits under $500, gas fees on Ethereum L1 may significantly reduce or eliminate profits. Consider L2 chains.')}
                                    </span>
                                </div>
                            )}

                            {/* Reference Table: Gas Impact at Different Deposit Sizes */}
                            <div style={{ marginTop: '20px' }}>
                                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Gas Cost Impact at Different Deposit Sizes')}
                                </h2>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Deposit')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Gross Yield')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Gas')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Gas %')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Net')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {referenceRows.map((row) => (
                                                <tr key={row.deposit} style={{
                                                    borderBottom: '1px solid var(--color-border)',
                                                    background: row.deposit === depositVal ? 'rgba(99,102,241,0.06)' : undefined,
                                                }}>
                                                    <td style={{ padding: '8px', fontWeight: row.deposit === depositVal ? 600 : 400 }}>
                                                        {formatUSD(row.deposit)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-accent-green)' }}>
                                                        +{formatUSD(row.gross)}
                                                    </td>
                                                    <td style={{ padding: '8px', textAlign: 'right', color: '#ef4444' }}>
                                                        -{formatUSD(row.gas)}
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 600,
                                                        color: row.gasPct > 50 ? '#ef4444' : row.gasPct > 20 ? '#f97316' : 'var(--color-accent-green)',
                                                    }}>
                                                        {row.gasPct.toFixed(1)}%
                                                    </td>
                                                    <td style={{
                                                        padding: '8px', textAlign: 'right', fontWeight: 600,
                                                        color: row.net >= 0 ? 'var(--color-accent-green)' : '#ef4444',
                                                    }}>
                                                        {row.net >= 0 ? '+' : ''}{formatUSD(row.net)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Yield farming returns vary based on pool TVL, token prices, and protocol emissions. Gas costs depend on network congestion. This calculator provides estimates only.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon"><Sprout size={40} /></div>
                            <h2>{getUiString(lang, 'Calculate Yield Farming Profitability')}</h2>
                            <p>{getUiString(lang, 'Enter your deposit amount and pool rate to see net yield after gas costs, impermanent loss, and harvest optimization.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(YieldFarmingCalculator);
