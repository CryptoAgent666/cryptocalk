import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    Zap,
    DollarSign,
    RotateCcw,
    Info,
    Cpu,
    Clock,
    Globe,
    Gauge,
    TrendingUp,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

interface ConsumptionRow {
    period: string;
    kwh: number;
    cost: number;
}

interface ProfitabilityData {
    electricityPctOfRevenue: number;
    netProfitAfterElectricity: number;
    maxProfitableRate: number;
}

interface CountryRate {
    name: string;
    rate: number;
}

const DEVICE_PILLS = [1, 2, 4, 6, 8, 12, 20];
const POWER_PER_DEVICE_PILLS = [1200, 2200, 3000, 4000, 5500];
const ELECTRICITY_RATE_PILLS = [0.04, 0.06, 0.08, 0.10, 0.12, 0.15, 0.20];
const UPTIME_PILLS = [20, 22, 24];
const MONTHLY_REVENUE_PILLS = [1000, 3000, 5000, 10000];
const ELECTRICITY_SCENARIOS = [
    {
        label: 'Home Miner',
        numDevices: '1',
        powerPerDevice: '1200',
        electricityRate: '0.15',
        uptimeHours: '24',
        monthlyRevenue: '1000',
    },
    {
        label: 'Small Farm',
        numDevices: '6',
        powerPerDevice: '3000',
        electricityRate: '0.10',
        uptimeHours: '24',
        monthlyRevenue: '5000',
    },
    {
        label: 'Low-Cost Host',
        numDevices: '12',
        powerPerDevice: '3000',
        electricityRate: '0.06',
        uptimeHours: '22',
        monthlyRevenue: '10000',
    },
] as const;

const COUNTRY_RATES: CountryRate[] = [
    { name: 'USA avg', rate: 0.17 },
    { name: 'China (Sichuan)', rate: 0.04 },
    { name: 'Russia', rate: 0.06 },
    { name: 'Canada (Quebec)', rate: 0.05 },
    { name: 'Iceland', rate: 0.05 },
    { name: 'Germany', rate: 0.30 },
    { name: 'Kazakhstan', rate: 0.04 },
    { name: 'Paraguay', rate: 0.03 },
];

function ElectricityCostCalculator({ lang = 'en' }: { lang?: string }) {
    const [numDevices, setNumDevices] = useState('1');
    const [powerPerDevice, setPowerPerDevice] = useState('3000');
    const [electricityRate, setElectricityRate] = useState('0.10');
    const [uptimeHours, setUptimeHours] = useState('24');
    const [monthlyRevenue, setMonthlyRevenue] = useState('');

    const [consumption, setConsumption] = useState<ConsumptionRow[]>([]);
    const [profitability, setProfitability] = useState<ProfitabilityData | null>(null);
    const [monthlyCost, setMonthlyCost] = useState<number>(0);
    const [totalPowerKw, setTotalPowerKw] = useState<number>(0);
    const [dailyKwh, setDailyKwh] = useState<number>(0);
    const [monthlyKwh, setMonthlyKwh] = useState<number>(0);
    const applyScenario = (scenario: (typeof ELECTRICITY_SCENARIOS)[number]) => {
        setNumDevices(scenario.numDevices);
        setPowerPerDevice(scenario.powerPerDevice);
        setElectricityRate(scenario.electricityRate);
        setUptimeHours(scenario.uptimeHours);
        setMonthlyRevenue(scenario.monthlyRevenue);
    };
    const isScenarioActive = (scenario: (typeof ELECTRICITY_SCENARIOS)[number]) => (
        numDevices === scenario.numDevices
        && powerPerDevice === scenario.powerPerDevice
        && electricityRate === scenario.electricityRate
        && uptimeHours === scenario.uptimeHours
        && monthlyRevenue === scenario.monthlyRevenue
    );

    const calculate = useCallback(() => {
        const devices = parseInt(numDevices) || 0;
        const ppd = parseFloat(powerPerDevice) || 0;
        const rate = parseFloat(electricityRate) || 0;
        const uptime = parseFloat(uptimeHours) || 0;
        const revenue = parseFloat(monthlyRevenue) || 0;

        if (devices <= 0 || ppd <= 0) {
            setConsumption([]);
            setProfitability(null);
            setMonthlyCost(0);
            setTotalPowerKw(0);
            setDailyKwh(0);
            setMonthlyKwh(0);
            return;
        }

        const tpk = (ppd * devices) / 1000;
        const dkwh = tpk * uptime;
        const dailyCost = dkwh * rate;
        const mkwh = dkwh * 30.44;
        const mCost = dailyCost * 30.44;
        const ykwh = dkwh * 365;
        const yCost = dailyCost * 365;

        setTotalPowerKw(tpk);
        setDailyKwh(dkwh);
        setMonthlyKwh(mkwh);
        setMonthlyCost(mCost);

        const rows: ConsumptionRow[] = [
            { period: 'Daily', kwh: dkwh, cost: dailyCost },
            { period: 'Monthly', kwh: mkwh, cost: mCost },
            { period: 'Yearly', kwh: ykwh, cost: yCost },
        ];
        setConsumption(rows);

        if (revenue > 0) {
            const elPct = (mCost / revenue) * 100;
            const netProfit = revenue - mCost;
            const maxRate = mkwh > 0 ? revenue / mkwh : 0;
            setProfitability({
                electricityPctOfRevenue: elPct,
                netProfitAfterElectricity: netProfit,
                maxProfitableRate: maxRate,
            });
        } else {
            setProfitability(null);
        }
    }, [numDevices, powerPerDevice, electricityRate, uptimeHours, monthlyRevenue]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setNumDevices('1');
        setPowerPerDevice('3000');
        setElectricityRate('0.10');
        setUptimeHours('24');
        setMonthlyRevenue('');
        setConsumption([]);
        setProfitability(null);
        setMonthlyCost(0);
        setTotalPowerKw(0);
        setDailyKwh(0);
        setMonthlyKwh(0);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatNumber = (n: number, decimals = 2) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        }).format(n);

    const getPctColor = (pct: number): string => {
        if (pct < 50) return 'var(--color-accent-green, #22c55e)';
        if (pct <= 75) return '#eab308';
        return '#ef4444';
    };

    const getCountryMonthlyCost = (countryRate: number): number => {
        const devices = parseInt(numDevices) || 0;
        const ppd = parseFloat(powerPerDevice) || 0;
        const uptime = parseFloat(uptimeHours) || 0;
        const tpk = (ppd * devices) / 1000;
        const dkwh = tpk * uptime;
        return dkwh * countryRate * 30.44;
    };

    const hasInputs = (parseInt(numDevices) || 0) > 0 && (parseFloat(powerPerDevice) || 0) > 0;

    // Power specs
    const totalWattage = (parseInt(numDevices) || 0) * (parseFloat(powerPerDevice) || 0);
    const ampsAt220V = totalWattage / 220;
    const ampsAt110V = totalWattage / 110;
    const btuPerHr = totalWattage * 3.412;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Inputs */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {ELECTRICITY_SCENARIOS.map((scenario) => (
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

                    {/* Number of Devices */}
                    <div className="input-group">
                        <label htmlFor="num-devices-input">
                            <Cpu size={14} />
                            {getUiString(lang, 'Number of Devices')}
                        </label>
                        <div className="pills-row">
                            {DEVICE_PILLS.map((n) => (
                                <button
                                    key={n}
                                    className={`pill-btn ${numDevices === String(n) ? 'active' : ''}`}
                                    onClick={() => setNumDevices(String(n))}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={numDevices}
                                onChange={(e) => setNumDevices(e.target.value)}
                                placeholder=""
                                id="num-devices-input"
                                step="1"
                                min="1"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Power per Device */}
                    <div className="input-group">
                        <label htmlFor="power-per-device-input">
                            <Zap size={14} />
                            {getUiString(lang, 'Power per Device (W)')}
                        </label>
                        <div className="pills-row">
                            {POWER_PER_DEVICE_PILLS.map((powerPill) => (
                                <button
                                    key={powerPill}
                                    className={`pill-btn ${powerPerDevice === String(powerPill) ? 'active' : ''}`}
                                    onClick={() => setPowerPerDevice(String(powerPill))}
                                >
                                    {powerPill}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={powerPerDevice}
                                onChange={(e) => setPowerPerDevice(e.target.value)}
                                placeholder=""
                                id="power-per-device-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit" style={{ marginLeft: 'auto', paddingRight: '10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>W</span>
                        </div>
                    </div>

                    {/* Electricity Rate */}
                    <div className="input-group">
                        <label htmlFor="electricity-rate-input">
                            <DollarSign size={14} />
                            {getUiString(lang, 'Electricity Rate ($/kWh)')}
                        </label>
                        <div className="pills-row">
                            {ELECTRICITY_RATE_PILLS.map((r) => (
                                <button
                                    key={r}
                                    className={`pill-btn ${electricityRate === String(r) ? 'active' : ''}`}
                                    onClick={() => setElectricityRate(String(r))}
                                >
                                    ${r}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={electricityRate}
                                onChange={(e) => setElectricityRate(e.target.value)}
                                placeholder=""
                                id="electricity-rate-input"
                                step="0.01"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Uptime */}
                    <div className="input-group">
                        <label htmlFor="uptime-input">
                            <Clock size={14} />
                            {getUiString(lang, 'Uptime (hours/day)')}
                        </label>
                        <div className="pills-row">
                            {UPTIME_PILLS.map((h) => (
                                <button
                                    key={h}
                                    className={`pill-btn ${uptimeHours === String(h) ? 'active' : ''}`}
                                    onClick={() => setUptimeHours(String(h))}
                                >
                                    {h}h
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={uptimeHours}
                                onChange={(e) => setUptimeHours(e.target.value)}
                                placeholder=""
                                id="uptime-input"
                                step="1"
                                min="0"
                                max="24"
                                onFocus={(e) => e.target.select()} />
                            <span className="input-unit" style={{ marginLeft: 'auto', paddingRight: '10px', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>hrs/day</span>
                        </div>
                    </div>

                    {/* Monthly Mining Revenue */}
                    <div className="input-group">
                        <label htmlFor="monthly-revenue-input">
                            <TrendingUp size={14} />
                            {getUiString(lang, 'Monthly Mining Revenue ($)')}
                            <span className="label-hint">{getUiString(lang, 'Optional, for profitability analysis')}</span>
                        </label>
                        <div className="pills-row">
                            {MONTHLY_REVENUE_PILLS.map((revenuePill) => (
                                <button
                                    key={revenuePill}
                                    className={`pill-btn ${monthlyRevenue === String(revenuePill) ? 'active' : ''}`}
                                    onClick={() => setMonthlyRevenue(String(revenuePill))}
                                >
                                    ${revenuePill >= 1000 ? `${Math.round(revenuePill / 1000)}k` : revenuePill}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={monthlyRevenue}
                                onChange={(e) => setMonthlyRevenue(e.target.value)}
                                placeholder={getUiString(lang, 'Enter revenue for profitability')}
                                id="monthly-revenue-input"
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
                        {getUiString(lang, 'Auto-calculates as you type. Set power, uptime, and tariff first for realistic costs.')}
                    </span>
                </div>

                {/* Right: Results */}
                <div className="calc-results-panel">
                    {hasInputs && consumption.length > 0 ? (
                        <>
                            {/* Hero: Monthly Cost */}
                            <div className="result-hero fee">
                                <span className="result-hero-label">{getUiString(lang, 'Monthly Electricity Cost')}</span>
                                <span className="result-hero-value">
                                    <Zap size={28} />
                                    {formatUSD(monthlyCost)}
                                </span>
                                <span className="result-hero-roi fee">
                                    {formatNumber(totalPowerKw, 2)} kW {getUiString(lang, 'total')} &middot; {formatNumber(dailyKwh, 1)} kWh/{getUiString(lang, 'day')}
                                </span>
                            </div>

                            {/* Consumption Table */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Period')}</strong></span>
                                    <span className="result-value" style={{ textAlign: 'right', flex: 1 }}><strong>{getUiString(lang, 'kWh')}</strong></span>
                                    <span className="result-value" style={{ textAlign: 'right', flex: 1 }}><strong>{getUiString(lang, 'Cost ($)')}</strong></span>
                                </div>
                                <div className="result-divider" />
                                {consumption.map((row) => (
                                    <div className="result-row" key={row.period}>
                                        <span className="result-label">{getUiString(lang, row.period)}</span>
                                        <span className="result-value" style={{ textAlign: 'right', flex: 1 }}>
                                            {formatNumber(row.kwh, 1)}
                                        </span>
                                        <span className="result-value fee" style={{ textAlign: 'right', flex: 1 }}>
                                            {formatUSD(row.cost)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Profitability Analysis (if revenue provided) */}
                            {profitability && (
                                <div style={{ marginTop: '16px' }}>
                                    <h2 style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        marginBottom: '10px',
                                        color: 'var(--color-text)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                    }}>
                                        <TrendingUp size={14} />
                                        {getUiString(lang, 'Revenue vs Cost Analysis')}
                                    </h2>
                                    <div className="result-breakdown">
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Monthly Revenue')}</span>
                                            <span className="result-value profit">
                                                {formatUSD(parseFloat(monthlyRevenue) || 0)}
                                            </span>
                                        </div>
                                        <div className="result-row">
                                            <span className="result-label">{getUiString(lang, 'Monthly Electricity Cost')}</span>
                                            <span className="result-value fee">
                                                -{formatUSD(monthlyCost)}
                                            </span>
                                        </div>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label">
                                                {getUiString(lang, 'Electricity % of Revenue')}
                                            </span>
                                            <span className="result-value" style={{
                                                color: getPctColor(profitability.electricityPctOfRevenue),
                                                fontWeight: 600,
                                            }}>
                                                {formatNumber(profitability.electricityPctOfRevenue, 1)}%
                                            </span>
                                        </div>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label"><strong>{getUiString(lang, 'Net Profit After Electricity')}</strong></span>
                                            <span className={`result-value ${profitability.netProfitAfterElectricity >= 0 ? 'profit' : 'fee'}`}>
                                                <strong>
                                                    {profitability.netProfitAfterElectricity >= 0 ? '+' : ''}
                                                    {formatUSD(profitability.netProfitAfterElectricity)}
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="result-divider" />
                                        <div className="result-row">
                                            <span className="result-label">
                                                {getUiString(lang, 'Max Profitable Rate')}
                                                <span className="label-hint">{getUiString(lang, 'Before unprofitable')}</span>
                                            </span>
                                            <span className="result-value profit" style={{ fontWeight: 600 }}>
                                                ${profitability.maxProfitableRate.toFixed(4)}/kWh
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Country Comparison Table */}
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
                                    <Globe size={14} />
                                    {getUiString(lang, 'Electricity Cost Comparison')}
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
                                                <th style={thStyle}>{getUiString(lang, 'Country / Region')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'Avg $/kWh')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'Your Monthly Cost')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {COUNTRY_RATES.map((country) => {
                                                const countryCost = getCountryMonthlyCost(country.rate);
                                                const isCurrentRate = Math.abs(country.rate - (parseFloat(electricityRate) || 0)) < 0.001;
                                                return (
                                                    <tr
                                                        key={country.name}
                                                        style={{
                                                            background: isCurrentRate
                                                                ? 'var(--color-bg-card)'
                                                                : 'transparent',
                                                        }}
                                                    >
                                                        <td style={{
                                                            ...tdStyle,
                                                            fontWeight: isCurrentRate ? 600 : 400,
                                                        }}>
                                                            {country.name}
                                                            {isCurrentRate && ' *'}
                                                        </td>
                                                        <td style={tdStyle}>${country.rate.toFixed(2)}</td>
                                                        <td style={{
                                                            ...tdStyle,
                                                            color: countryCost > monthlyCost
                                                                ? '#ef4444'
                                                                : 'var(--color-accent-green, #22c55e)',
                                                            fontWeight: 600,
                                                        }}>
                                                            {formatUSD(countryCost)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Power Specs Card */}
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
                                    <Gauge size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                    {getUiString(lang, 'Power Specifications')}
                                </h3>
                                <div className="result-breakdown" style={{ border: 'none', padding: 0 }}>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Total Wattage')}</span>
                                        <span className="result-value">
                                            {formatNumber(totalWattage, 0)} W ({formatNumber(totalPowerKw, 2)} kW)
                                        </span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Amps at 220V')}</span>
                                        <span className="result-value">{formatNumber(ampsAt220V, 1)} A</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'Amps at 110V')}</span>
                                        <span className="result-value">{formatNumber(ampsAt110V, 1)} A</span>
                                    </div>
                                    <div className="result-row">
                                        <span className="result-label">{getUiString(lang, 'BTU/hr Heat Output')}</span>
                                        <span className="result-value">{formatNumber(btuPerHr, 0)} BTU/hr</span>
                                    </div>
                                </div>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Costs are estimates. Actual electricity rates vary by provider and usage tier.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Zap size={40} />
                            </div>
                            <h2>{getUiString(lang, 'Mining Electricity Cost Calculator')}</h2>
                            <p>{getUiString(lang, 'Enter your mining farm details to calculate electricity costs, compare rates across countries, and analyze profitability.')}</p>
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

export default withErrorBoundary(ElectricityCostCalculator);
