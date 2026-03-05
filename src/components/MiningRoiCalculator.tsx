import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    RotateCcw,
    Info,
    Pickaxe,
    Zap,
    Calendar,
    BarChart3,
} from 'lucide-react';

type Scenario = 'optimistic' | 'realistic' | 'pessimistic';

interface MonthData {
    month: number;
    revenue: number;
    expenses: number;
    profit: number;
    cumulativePL: number;
}

interface ScenarioResult {
    label: string;
    key: Scenario;
    monthlyData: MonthData[];
    breakEvenMonth: number | null;
    profitAfter1yr: number;
    profitAfter2yr: number;
    profitAfter3yr: number;
}

const EQUIPMENT_PILLS = [
    { label: '$2K', value: '2000' },
    { label: '$5K', value: '5000' },
    { label: '$10K', value: '10000' },
    { label: '$15K', value: '15000' },
    { label: '$20K', value: '20000' },
];

const MONTHLY_REVENUE_PILLS = ['200', '300', '500', '800'];
const MONTHLY_EXPENSE_PILLS = ['100', '150', '250', '400'];
const MINING_ROI_SCENARIOS = [
    {
        label: 'Lean Setup',
        equipmentCost: '5000',
        monthlyRevenue: '300',
        monthlyExpenses: '150',
        activeScenario: 'realistic',
    },
    {
        label: 'Scale Up',
        equipmentCost: '15000',
        monthlyRevenue: '800',
        monthlyExpenses: '250',
        activeScenario: 'optimistic',
    },
    {
        label: 'Tight Margin',
        equipmentCost: '10000',
        monthlyRevenue: '300',
        monthlyExpenses: '250',
        activeScenario: 'pessimistic',
    },
] as const;

const SCENARIO_PILLS: { label: string; value: Scenario; hint: string }[] = [
    { label: 'Optimistic', value: 'optimistic', hint: '+20%/yr' },
    { label: 'Realistic', value: 'realistic', hint: '0% change' },
    { label: 'Pessimistic', value: 'pessimistic', hint: '-20%/yr' },
];

function buildScenarioData(
    equipmentCost: number,
    monthlyRevenue: number,
    monthlyExpenses: number,
    scenario: Scenario,
    months: number
): MonthData[] {
    const data: MonthData[] = [];
    let cumulativePL = -equipmentCost;

    // Monthly growth factor
    let growthFactor = 1;
    if (scenario === 'optimistic') growthFactor = 1 + 0.20 / 12;
    if (scenario === 'pessimistic') growthFactor = 1 - 0.20 / 12;

    let currentRevenue = monthlyRevenue;

    for (let m = 1; m <= months; m++) {
        if (m > 1) {
            currentRevenue = currentRevenue * growthFactor;
        }
        const profit = currentRevenue - monthlyExpenses;
        cumulativePL += profit;

        data.push({
            month: m,
            revenue: currentRevenue,
            expenses: monthlyExpenses,
            profit,
            cumulativePL,
        });
    }

    return data;
}

function findBreakEvenMonth(data: MonthData[]): number | null {
    for (let i = 0; i < data.length; i++) {
        if (data[i].cumulativePL >= 0) {
            return data[i].month;
        }
    }
    return null;
}

export default function MiningRoiCalculator({ lang = 'en' }: { lang?: string }) {
    const [equipmentCost, setEquipmentCost] = useState('5000');
    const [monthlyRevenue, setMonthlyRevenue] = useState('300');
    const [monthlyExpenses, setMonthlyExpenses] = useState('150');
    const [activeScenario, setActiveScenario] = useState<Scenario>('realistic');

    const [scenarios, setScenarios] = useState<ScenarioResult[]>([]);
    const applyScenario = (scenario: (typeof MINING_ROI_SCENARIOS)[number]) => {
        setEquipmentCost(scenario.equipmentCost);
        setMonthlyRevenue(scenario.monthlyRevenue);
        setMonthlyExpenses(scenario.monthlyExpenses);
        setActiveScenario(scenario.activeScenario);
    };
    const isScenarioActive = (scenario: (typeof MINING_ROI_SCENARIOS)[number]) => (
        equipmentCost === scenario.equipmentCost
        && monthlyRevenue === scenario.monthlyRevenue
        && monthlyExpenses === scenario.monthlyExpenses
        && activeScenario === scenario.activeScenario
    );

    const calculate = useCallback(() => {
        const cost = parseFloat(equipmentCost);
        const revenue = parseFloat(monthlyRevenue);
        const expenses = parseFloat(monthlyExpenses);

        if (
            isNaN(cost) || cost <= 0 ||
            isNaN(revenue) || revenue <= 0 ||
            isNaN(expenses) || expenses < 0
        ) {
            setScenarios([]);
            return;
        }

        const monthlyProfit = revenue - expenses;
        if (monthlyProfit <= 0 && expenses >= revenue) {
            // Still calculate - show negative scenarios
        }

        const scenarioConfigs: { key: Scenario; label: string }[] = [
            { key: 'optimistic', label: 'Optimistic' },
            { key: 'realistic', label: 'Realistic' },
            { key: 'pessimistic', label: 'Pessimistic' },
        ];

        const results: ScenarioResult[] = scenarioConfigs.map(({ key, label }) => {
            const data = buildScenarioData(cost, revenue, expenses, key, 36);
            const breakEvenMonth = findBreakEvenMonth(data);
            const profitAfter1yr = data[11]?.cumulativePL ?? 0;
            const profitAfter2yr = data[23]?.cumulativePL ?? 0;
            const profitAfter3yr = data[35]?.cumulativePL ?? 0;

            return {
                label,
                key,
                monthlyData: data,
                breakEvenMonth,
                profitAfter1yr,
                profitAfter2yr,
                profitAfter3yr,
            };
        });

        setScenarios(results);
    }, [equipmentCost, monthlyRevenue, monthlyExpenses]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setEquipmentCost('5000');
        setMonthlyRevenue('300');
        setMonthlyExpenses('150');
        setActiveScenario('realistic');
        setScenarios([]);
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(n);

    const formatUSD2 = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const cost = parseFloat(equipmentCost) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const monthlyProfit = revenue - expenses;
    const simpleRoiPerMonth = cost > 0 ? (monthlyProfit / cost) * 100 : 0;
    const hasResults = scenarios.length > 0;

    const realisticScenario = scenarios.find((s) => s.key === 'realistic');
    const realisticBreakEven = realisticScenario?.breakEvenMonth ?? null;
    const isProfit = monthlyProfit > 0;

    // SVG Chart Data
    const chartData = useMemo(() => {
        if (scenarios.length === 0) return null;

        const allValues: number[] = [];
        scenarios.forEach((s) => {
            s.monthlyData.forEach((d) => allValues.push(d.cumulativePL));
        });

        const minVal = Math.min(...allValues, 0);
        const maxVal = Math.max(...allValues, 0);
        const range = maxVal - minVal || 1;

        const padding = { top: 20, right: 20, bottom: 40, left: 70 };
        const chartWidth = 600 - padding.left - padding.right;
        const chartHeight = 300 - padding.top - padding.bottom;

        const xScale = (month: number) =>
            padding.left + (month / 36) * chartWidth;
        const yScale = (val: number) =>
            padding.top + chartHeight - ((val - minVal) / range) * chartHeight;

        const buildPath = (data: MonthData[]) => {
            let path = `M ${xScale(0)} ${yScale(-cost)}`;
            data.forEach((d) => {
                path += ` L ${xScale(d.month)} ${yScale(d.cumulativePL)}`;
            });
            return path;
        };

        // Y-axis labels (5 ticks)
        const yTicks: number[] = [];
        const step = range / 4;
        for (let i = 0; i <= 4; i++) {
            yTicks.push(minVal + step * i);
        }

        // X-axis labels
        const xTicks = [0, 6, 12, 18, 24, 30, 36];

        // Zero line
        const zeroY = yScale(0);

        return {
            padding,
            chartWidth,
            chartHeight,
            xScale,
            yScale,
            yTicks,
            xTicks,
            zeroY,
            paths: {
                optimistic: buildPath(scenarios.find((s) => s.key === 'optimistic')!.monthlyData),
                realistic: buildPath(scenarios.find((s) => s.key === 'realistic')!.monthlyData),
                pessimistic: buildPath(scenarios.find((s) => s.key === 'pessimistic')!.monthlyData),
            },
        };
    }, [scenarios, cost]);

    // Monthly breakdown for realistic scenario (first 12 months)
    const realisticFirst12 = realisticScenario?.monthlyData.slice(0, 12) ?? [];

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Left: Input Panel */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {MINING_ROI_SCENARIOS.map((scenario) => (
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

                    {/* Equipment Cost */}
                    <div className="input-group">
                        <label>
                            <Pickaxe size={14} />
                            {getUiString(lang, 'Equipment Cost ($)')}
                        </label>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={equipmentCost}
                                onChange={(e) => setEquipmentCost(e.target.value)}
                                placeholder=""
                                id="equipment-cost-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                        <div className="pills-row">
                            {EQUIPMENT_PILLS.map((pill) => (
                                <button
                                    key={pill.value}
                                    className={`pill-btn ${equipmentCost === pill.value ? 'active' : ''}`}
                                    onClick={() => setEquipmentCost(pill.value)}
                                >
                                    {pill.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Monthly Mining Revenue */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Monthly Mining Revenue ($)')}
                        </label>
                        <div className="pills-row">
                            {MONTHLY_REVENUE_PILLS.map((pill) => (
                                <button
                                    key={pill}
                                    className={`pill-btn ${monthlyRevenue === pill ? 'active' : ''}`}
                                    onClick={() => setMonthlyRevenue(pill)}
                                >
                                    ${pill}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={monthlyRevenue}
                                onChange={(e) => setMonthlyRevenue(e.target.value)}
                                placeholder=""
                                id="monthly-revenue-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Monthly Expenses */}
                    <div className="input-group">
                        <label>
                            <Zap size={14} />
                            {getUiString(lang, 'Monthly Expenses ($)')}
                            <span className="label-hint">{getUiString(lang, 'Electricity, internet, maintenance')}</span>
                        </label>
                        <div className="pills-row">
                            {MONTHLY_EXPENSE_PILLS.map((pill) => (
                                <button
                                    key={pill}
                                    className={`pill-btn ${monthlyExpenses === pill ? 'active' : ''}`}
                                    onClick={() => setMonthlyExpenses(pill)}
                                >
                                    ${pill}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix">
                            <input
                                type="number" inputMode="decimal"
                                value={monthlyExpenses}
                                onChange={(e) => setMonthlyExpenses(e.target.value)}
                                placeholder=""
                                id="monthly-expenses-input"
                                step="any"
                                min="0"
                                onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Scenario Toggle */}
                    <div className="input-group">
                        <label>
                            <BarChart3 size={14} />
                            {getUiString(lang, 'Scenario')}
                        </label>
                        <div className="pills-row">
                            {SCENARIO_PILLS.map((pill) => (
                                <button
                                    key={pill.value}
                                    className={`pill-btn ${activeScenario === pill.value ? 'active' : ''}`}
                                    onClick={() => setActiveScenario(pill.value)}
                                >
                                    {pill.label}
                                    <span style={{ fontSize: '0.65rem', opacity: 0.7, display: 'block' }}>
                                        {pill.hint}
                                    </span>
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
                        {getUiString(lang, 'Auto-calculates as you type. Compare realistic vs pessimistic before buying hardware.')}
                    </span>
                </div>

                {/* Right: Results Panel */}
                <div className="calc-results-panel">
                    {hasResults ? (
                        <>
                            {/* Hero: Break-Even */}
                            <div className={`result-hero ${isProfit ? 'profit' : 'fee'}`}>
                                <span className="result-hero-label">
                                    {getUiString(lang, 'Break-Even Period (Realistic)')}
                                </span>
                                <span className="result-hero-value">
                                    {isProfit ? <TrendingUp size={28} /> : <TrendingDown size={28} />}
                                    {realisticBreakEven
                                        ? <>{realisticBreakEven} {getUiString(lang, 'months')}</>
                                        : getUiString(lang, 'Never (within 36mo)')}
                                </span>
                                <span className={`result-hero-roi ${isProfit ? 'profit' : 'fee'}`}>
                                    {isProfit
                                        ? <>{getUiString(lang, 'Monthly profit:')} {formatUSD2(monthlyProfit)}</>
                                        : <>{getUiString(lang, 'Monthly loss:')} {formatUSD2(Math.abs(monthlyProfit))}</>}
                                </span>
                            </div>

                            {/* Basic Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Equipment Cost')}</span>
                                    <span className="result-value fee">{formatUSD2(cost)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly Revenue')}</span>
                                    <span className="result-value profit">{formatUSD2(revenue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Monthly Expenses')}</span>
                                    <span className="result-value fee">-{formatUSD2(expenses)}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label"><strong>{getUiString(lang, 'Monthly Profit')}</strong></span>
                                    <span className={`result-value ${isProfit ? 'profit' : 'fee'}`}>
                                        <strong>{isProfit ? '+' : ''}{formatUSD2(monthlyProfit)}</strong>
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Simple ROI / Month')}</span>
                                    <span className={`result-value ${simpleRoiPerMonth >= 0 ? 'profit' : 'fee'}`}>
                                        {simpleRoiPerMonth >= 0 ? '+' : ''}{simpleRoiPerMonth.toFixed(2)}%
                                    </span>
                                </div>
                            </div>

                            {/* Three-Scenario Comparison Table */}
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
                                    <BarChart3 size={14} />
                                    {getUiString(lang, 'Scenario Comparison')}
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
                                                <th style={thStyle}>{getUiString(lang, 'Scenario')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'Break-Even')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'After 1yr')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'After 2yr')}</th>
                                                <th style={thStyle}>{getUiString(lang, 'After 3yr')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {scenarios.map((s) => (
                                                <tr
                                                    key={s.key}
                                                    style={{
                                                        background: s.key === activeScenario
                                                            ? 'var(--color-bg-card)'
                                                            : 'transparent',
                                                    }}
                                                >
                                                    <td style={{
                                                        ...tdStyle,
                                                        fontWeight: 600,
                                                        color: s.key === 'optimistic'
                                                            ? 'var(--color-accent-green, #22c55e)'
                                                            : s.key === 'pessimistic'
                                                                ? '#ef4444'
                                                                : 'var(--color-primary, #6366f1)',
                                                    }}>
                                                        {getUiString(lang, s.label)}
                                                    </td>
                                                    <td style={tdStyle}>
                                                        {s.breakEvenMonth
                                                            ? <>{s.breakEvenMonth} {getUiString(lang, 'mo')}</>
                                                            : getUiString(lang, 'Never')}
                                                    </td>
                                                    <td style={{
                                                        ...tdStyle,
                                                        color: s.profitAfter1yr >= 0
                                                            ? 'var(--color-accent-green, #22c55e)'
                                                            : '#ef4444',
                                                    }}>
                                                        {formatUSD(s.profitAfter1yr)}
                                                    </td>
                                                    <td style={{
                                                        ...tdStyle,
                                                        color: s.profitAfter2yr >= 0
                                                            ? 'var(--color-accent-green, #22c55e)'
                                                            : '#ef4444',
                                                    }}>
                                                        {formatUSD(s.profitAfter2yr)}
                                                    </td>
                                                    <td style={{
                                                        ...tdStyle,
                                                        color: s.profitAfter3yr >= 0
                                                            ? 'var(--color-accent-green, #22c55e)'
                                                            : '#ef4444',
                                                    }}>
                                                        {formatUSD(s.profitAfter3yr)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* SVG Chart */}
                            {chartData && (
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
                                        <Calendar size={14} />
                                        {getUiString(lang, 'Cumulative P&L (36 Months)')}
                                    </h4>
                                    <div style={{
                                        borderRadius: '10px',
                                        border: '1px solid var(--color-border)',
                                        background: 'var(--color-bg-card)',
                                        padding: '12px',
                                        overflow: 'hidden',
                                    }}>
                                        <svg
                                            viewBox="0 0 600 300"
                                            style={{ width: '100%', height: 'auto' }}
                                        >
                                            {/* Grid lines */}
                                            {chartData.yTicks.map((tick, i) => (
                                                <line
                                                    key={i}
                                                    x1={chartData.padding.left}
                                                    y1={chartData.yScale(tick)}
                                                    x2={chartData.padding.left + chartData.chartWidth}
                                                    y2={chartData.yScale(tick)}
                                                    stroke="var(--color-border)"
                                                    strokeWidth="0.5"
                                                    opacity="0.5"
                                                />
                                            ))}

                                            {/* Y-axis labels */}
                                            {chartData.yTicks.map((tick, i) => (
                                                <text
                                                    key={i}
                                                    x={chartData.padding.left - 8}
                                                    y={chartData.yScale(tick) + 4}
                                                    textAnchor="end"
                                                    fill="var(--color-text-muted)"
                                                    fontSize="9"
                                                    fontFamily="inherit"
                                                >
                                                    {formatUSD(tick)}
                                                </text>
                                            ))}

                                            {/* X-axis labels */}
                                            {chartData.xTicks.map((tick) => (
                                                <text
                                                    key={tick}
                                                    x={chartData.xScale(tick)}
                                                    y={chartData.padding.top + chartData.chartHeight + 20}
                                                    textAnchor="middle"
                                                    fill="var(--color-text-muted)"
                                                    fontSize="9"
                                                    fontFamily="inherit"
                                                >
                                                    {tick}{getUiString(lang, 'mo')}
                                                </text>
                                            ))}

                                            {/* Zero / break-even dashed line */}
                                            <line
                                                x1={chartData.padding.left}
                                                y1={chartData.zeroY}
                                                x2={chartData.padding.left + chartData.chartWidth}
                                                y2={chartData.zeroY}
                                                stroke="var(--color-text-muted)"
                                                strokeWidth="1"
                                                strokeDasharray="6 4"
                                                opacity="0.6"
                                            />
                                            <text
                                                x={chartData.padding.left + chartData.chartWidth + 2}
                                                y={chartData.zeroY + 3}
                                                fill="var(--color-text-muted)"
                                                fontSize="8"
                                                fontFamily="inherit"
                                            >
                                                $0
                                            </text>

                                            {/* Pessimistic line (red) */}
                                            <path
                                                d={chartData.paths.pessimistic}
                                                fill="none"
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                            {/* Realistic line (primary/blue) */}
                                            <path
                                                d={chartData.paths.realistic}
                                                fill="none"
                                                stroke="var(--color-primary, #6366f1)"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                            {/* Optimistic line (green) */}
                                            <path
                                                d={chartData.paths.optimistic}
                                                fill="none"
                                                stroke="var(--color-accent-green, #22c55e)"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />

                                            {/* Axes */}
                                            <line
                                                x1={chartData.padding.left}
                                                y1={chartData.padding.top}
                                                x2={chartData.padding.left}
                                                y2={chartData.padding.top + chartData.chartHeight}
                                                stroke="var(--color-border)"
                                                strokeWidth="1"
                                            />
                                            <line
                                                x1={chartData.padding.left}
                                                y1={chartData.padding.top + chartData.chartHeight}
                                                x2={chartData.padding.left + chartData.chartWidth}
                                                y2={chartData.padding.top + chartData.chartHeight}
                                                stroke="var(--color-border)"
                                                strokeWidth="1"
                                            />
                                        </svg>

                                        {/* Legend */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '16px',
                                            marginTop: '8px',
                                            fontSize: '0.72rem',
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    width: '16px',
                                                    height: '3px',
                                                    background: 'var(--color-accent-green, #22c55e)',
                                                    borderRadius: '2px',
                                                }} />
                                                {getUiString(lang, 'Optimistic')}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    width: '16px',
                                                    height: '3px',
                                                    background: 'var(--color-primary, #6366f1)',
                                                    borderRadius: '2px',
                                                }} />
                                                {getUiString(lang, 'Realistic')}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    width: '16px',
                                                    height: '3px',
                                                    background: '#ef4444',
                                                    borderRadius: '2px',
                                                }} />
                                                {getUiString(lang, 'Pessimistic')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Monthly Breakdown Table (first 12 months, realistic) */}
                            {realisticFirst12.length > 0 && (
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
                                        <Calendar size={14} />
                                        {getUiString(lang, 'Monthly Breakdown (Realistic, First 12 Months)')}
                                    </h4>
                                    <div style={{
                                        overflowX: 'auto',
                                        borderRadius: '10px',
                                        border: '1px solid var(--color-border)',
                                    }}>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '0.75rem',
                                        }}>
                                            <thead>
                                                <tr>
                                                    <th style={thStyle}>{getUiString(lang, 'Month')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Revenue')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Expenses')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Profit')}</th>
                                                    <th style={thStyle}>{getUiString(lang, 'Cumulative P&L')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {realisticFirst12.map((row) => (
                                                    <tr key={row.month}>
                                                        <td style={tdStyle}>{row.month}</td>
                                                        <td style={{ ...tdStyle, color: 'var(--color-accent-green, #22c55e)' }}>
                                                            {formatUSD2(row.revenue)}
                                                        </td>
                                                        <td style={{ ...tdStyle, color: '#ef4444' }}>
                                                            -{formatUSD2(row.expenses)}
                                                        </td>
                                                        <td style={{
                                                            ...tdStyle,
                                                            color: row.profit >= 0
                                                                ? 'var(--color-accent-green, #22c55e)'
                                                                : '#ef4444',
                                                            fontWeight: 600,
                                                        }}>
                                                            {row.profit >= 0 ? '+' : ''}{formatUSD2(row.profit)}
                                                        </td>
                                                        <td style={{
                                                            ...tdStyle,
                                                            color: row.cumulativePL >= 0
                                                                ? 'var(--color-accent-green, #22c55e)'
                                                                : '#ef4444',
                                                            fontWeight: 600,
                                                        }}>
                                                            {formatUSD2(row.cumulativePL)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Projections are estimates. Mining profitability depends on price, difficulty, and market conditions.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Pickaxe size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Mining ROI Calculator')}</h3>
                            <p>{getUiString(lang, 'Enter your equipment cost, expected monthly revenue, and expenses to see break-even projections across optimistic, realistic, and pessimistic scenarios.')}</p>
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
