import { getUiString } from '../i18n/ui-strings';
import { useState, useMemo } from 'react';
import {
    DollarSign,
    Percent,
    Info,
    RotateCcw,
    Clock,
    Calendar,
    Coins,
    Unlock,
    TrendingDown,
} from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

type UnlockFrequency = 'monthly' | 'quarterly' | 'linear';

interface ScheduleRow {
    month: number;
    tokensUnlocked: number;
    cumulative: number;
    cumulativePct: number;
    value: number;
}

const TOTAL_TOKEN_PRESETS = ['250000', '500000', '1000000', '5000000'];
const TOKEN_PRICE_PRESETS = ['0.1', '0.25', '0.5', '1', '2'];
const TGE_PRESETS = [0, 5, 10, 15, 20, 25];
const CLIFF_PRESETS = [0, 3, 6, 12];
const VESTING_PRESETS = [6, 12, 18, 24, 36, 48];
const VESTING_SCENARIOS = [
    {
        label: 'Team Standard',
        totalTokens: '1000000',
        tokenPrice: '0.50',
        tgePct: '10',
        cliffMonths: '6',
        vestingMonths: '24',
        unlockFrequency: 'monthly' as const,
    },
    {
        label: 'Investor Quarterly',
        totalTokens: '500000',
        tokenPrice: '1',
        tgePct: '20',
        cliffMonths: '3',
        vestingMonths: '12',
        unlockFrequency: 'quarterly' as const,
    },
    {
        label: 'Linear No Cliff',
        totalTokens: '5000000',
        tokenPrice: '0.25',
        tgePct: '0',
        cliffMonths: '0',
        vestingMonths: '36',
        unlockFrequency: 'linear' as const,
    },
] as const;

function VestingCalculator({ lang = 'en' }: { lang?: string }) {
    const [totalTokens, setTotalTokens] = useState('1000000');
    const [tokenPrice, setTokenPrice] = useState('0.50');
    const [tgePct, setTgePct] = useState('10');
    const [cliffMonths, setCliffMonths] = useState('6');
    const [vestingMonths, setVestingMonths] = useState('24');
    const [unlockFrequency, setUnlockFrequency] = useState<UnlockFrequency>('monthly');
    const applyScenario = (scenario: (typeof VESTING_SCENARIOS)[number]) => {
        setTotalTokens(scenario.totalTokens);
        setTokenPrice(scenario.tokenPrice);
        setTgePct(scenario.tgePct);
        setCliffMonths(scenario.cliffMonths);
        setVestingMonths(scenario.vestingMonths);
        setUnlockFrequency(scenario.unlockFrequency);
    };
    const isScenarioActive = (scenario: (typeof VESTING_SCENARIOS)[number]) => (
        totalTokens === scenario.totalTokens
        && tokenPrice === scenario.tokenPrice
        && tgePct === scenario.tgePct
        && cliffMonths === scenario.cliffMonths
        && vestingMonths === scenario.vestingMonths
        && unlockFrequency === scenario.unlockFrequency
    );

    const total = parseFloat(totalTokens) || 0;
    const price = parseFloat(tokenPrice) || 0;
    const tge = parseFloat(tgePct) || 0;
    const cliff = parseInt(cliffMonths) || 0;
    const vesting = parseInt(vestingMonths) || 0;

    const hasInputs = total > 0 && vesting > 0;

    const { schedule, tgeTokens, remaining, periods, tokensPerPeriod, totalValue, sellPressure } = useMemo(() => {
        const tgeTokens = total * tge / 100;
        const remaining = total - tgeTokens;
        const totalValue = total * price;

        let periods: number;
        let tokensPerPeriod: number;
        let periodLengthMonths: number;

        if (unlockFrequency === 'quarterly') {
            periods = Math.max(1, Math.floor(vesting / 3));
            tokensPerPeriod = remaining / periods;
            periodLengthMonths = 3;
        } else {
            // monthly and linear both display as monthly
            periods = vesting;
            tokensPerPeriod = remaining / periods;
            periodLengthMonths = 1;
        }

        const totalMonths = cliff + vesting;
        const schedule: ScheduleRow[] = [];
        let cumulative = 0;

        // Month 0 — TGE
        cumulative = tgeTokens;
        schedule.push({
            month: 0,
            tokensUnlocked: tgeTokens,
            cumulative,
            cumulativePct: total > 0 ? (cumulative / total) * 100 : 0,
            value: cumulative * price,
        });

        // Cliff months: no unlocks
        for (let m = 1; m <= cliff; m++) {
            schedule.push({
                month: m,
                tokensUnlocked: 0,
                cumulative,
                cumulativePct: total > 0 ? (cumulative / total) * 100 : 0,
                value: cumulative * price,
            });
        }

        // Vesting months
        let periodCounter = 0;
        for (let m = cliff + 1; m <= totalMonths; m++) {
            periodCounter++;
            const isUnlockMonth = unlockFrequency === 'quarterly'
                ? periodCounter % 3 === 0 || m === totalMonths
                : true; // monthly and linear unlock every month

            if (isUnlockMonth) {
                // For quarterly: if it's the last month but not a multiple of 3, unlock the remaining
                let unlock: number;
                if (unlockFrequency === 'quarterly' && m === totalMonths && periodCounter % 3 !== 0) {
                    unlock = total - cumulative;
                } else {
                    unlock = tokensPerPeriod;
                }
                // Ensure we don't overshoot
                if (cumulative + unlock > total) {
                    unlock = total - cumulative;
                }
                cumulative += unlock;
                schedule.push({
                    month: m,
                    tokensUnlocked: unlock,
                    cumulative,
                    cumulativePct: total > 0 ? (cumulative / total) * 100 : 0,
                    value: cumulative * price,
                });
            } else {
                schedule.push({
                    month: m,
                    tokensUnlocked: 0,
                    cumulative,
                    cumulativePct: total > 0 ? (cumulative / total) * 100 : 0,
                    value: cumulative * price,
                });
            }
        }

        const sellPressure = tokensPerPeriod * price;

        return { schedule, tgeTokens, remaining, periods, tokensPerPeriod, totalValue, sellPressure };
    }, [total, price, tge, cliff, vesting, unlockFrequency]);

    // SVG chart
    const chartSvg = useMemo(() => {
        if (!hasInputs || schedule.length < 2) return null;

        const W = 600;
        const H = 300;
        const padL = 50;
        const padR = 20;
        const padT = 20;
        const padB = 40;
        const plotW = W - padL - padR;
        const plotH = H - padT - padB;

        const totalMonths = cliff + vesting;
        const xScale = (m: number) => padL + (m / Math.max(totalMonths, 1)) * plotW;
        const yScale = (pct: number) => padT + plotH - (pct / 100) * plotH;

        // Build step-function polyline points
        const points: string[] = [];
        const areaPoints: string[] = [];

        for (let i = 0; i < schedule.length; i++) {
            const row = schedule[i];
            const x = xScale(row.month);
            const y = yScale(row.cumulativePct);

            if (i === 0) {
                // TGE: immediate jump
                points.push(`${x},${yScale(0)}`);
                points.push(`${x},${y}`);
                areaPoints.push(`${x},${yScale(0)}`);
                areaPoints.push(`${x},${y}`);
            } else {
                const prevY = yScale(schedule[i - 1].cumulativePct);
                // Horizontal line from previous point to current x at previous y
                points.push(`${x},${prevY}`);
                // Vertical step up
                points.push(`${x},${y}`);
                areaPoints.push(`${x},${prevY}`);
                areaPoints.push(`${x},${y}`);
            }
        }

        // Close area polygon
        const lastX = xScale(schedule[schedule.length - 1].month);
        const firstX = xScale(0);
        const baseY = yScale(0);
        const areaPolygon = [...areaPoints, `${lastX},${baseY}`, `${firstX},${baseY}`].join(' ');
        const linePolyline = points.join(' ');

        // X axis labels
        const xLabels: { month: number; x: number }[] = [];
        xLabels.push({ month: 0, x: xScale(0) });
        if (cliff > 0) xLabels.push({ month: cliff, x: xScale(cliff) });
        // Add some intermediate labels
        const step = totalMonths <= 12 ? 3 : totalMonths <= 24 ? 6 : 12;
        for (let m = step; m <= totalMonths; m += step) {
            if (m !== cliff && m !== totalMonths && m !== 0) {
                xLabels.push({ month: m, x: xScale(m) });
            }
        }
        xLabels.push({ month: totalMonths, x: xScale(totalMonths) });

        // Y axis labels
        const yLabels = [0, 25, 50, 75, 100];

        // Cliff end dashed line
        const cliffX = xScale(cliff);

        return { W, H, padL, padR, padT, padB, plotW, plotH, linePolyline, areaPolygon, xLabels, yLabels, xScale, yScale, cliffX, totalMonths };
    }, [hasInputs, schedule, cliff, vesting]);

    const reset = () => {
        setTotalTokens('1000000');
        setTokenPrice('0.50');
        setTgePct('10');
        setCliffMonths('6');
        setVestingMonths('24');
        setUnlockFrequency('monthly');
    };

    const formatUSD = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(n);

    const formatTokens = (n: number) =>
        new Intl.NumberFormat((typeof lang !== 'undefined' && lang) ? (lang === 'en' ? 'en-US' : lang) : 'en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(n);

    const frequencyLabel = unlockFrequency === 'monthly' ? getUiString(lang, 'Monthly') : unlockFrequency === 'quarterly' ? getUiString(lang, 'Quarterly') : getUiString(lang, 'Linear (daily)');

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* ===== Left: Input Panel ===== */}
                <div className="calc-input-panel">
                    <div className="input-group">
                        <label>{getUiString(lang, 'Quick Scenarios')}</label>
                        <div className="pills-row">
                            {VESTING_SCENARIOS.map((scenario) => (
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

                    {/* Total Token Allocation */}
                    <div className="input-group">
                        <label>
                            <Coins size={14} />
                            {getUiString(lang, 'Total Token Allocation')}
                        </label>
                        <div className="pills-row">
                            {TOTAL_TOKEN_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${totalTokens === value ? 'active' : ''}`}
                                    onClick={() => setTotalTokens(value)}
                                >
                                    {Number(value) >= 1_000_000
                                        ? `${(Number(value) / 1_000_000).toFixed(Number(value) % 1_000_000 === 0 ? 0 : 1)}M`
                                        : `${Math.round(Number(value) / 1_000)}k`}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={totalTokens}
                                onChange={(e) => setTotalTokens(e.target.value)}
                                placeholder=""
                                id="vest-total"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Token Price */}
                    <div className="input-group">
                        <label>
                            <DollarSign size={14} />
                            {getUiString(lang, 'Token Price')}
                        </label>
                        <div className="pills-row">
                            {TOKEN_PRICE_PRESETS.map((value) => (
                                <button
                                    key={value}
                                    className={`pill-btn ${tokenPrice === value ? 'active' : ''}`}
                                    onClick={() => setTokenPrice(value)}
                                >
                                    ${value}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tokenPrice}
                                onChange={(e) => setTokenPrice(e.target.value)}
                                placeholder=""
                                id="vest-price"
                                step="any"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* TGE Unlock % */}
                    <div className="input-group">
                        <label>
                            <Unlock size={14} />
                            {getUiString(lang, 'TGE Unlock %')}
                            <span className="label-hint">{getUiString(lang, 'Token Generation Event')}</span>
                        </label>
                        <div className="pills-row">
                            {TGE_PRESETS.map((p) => (
                                <button
                                    key={p}
                                    className={`pill-btn ${tgePct === String(p) ? 'active' : ''}`}
                                    onClick={() => setTgePct(String(p))}
                                >
                                    {p}%
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={tgePct}
                                onChange={(e) => setTgePct(e.target.value)}
                                placeholder=""
                                id="vest-tge"
                                step="1"
                                min="0"
                                max="100"
                             onFocus={(e) => e.target.select()} />
                        </div>
                    </div>

                    {/* Cliff Period */}
                    <div className="input-group">
                        <label>
                            <Clock size={14} />
                            {getUiString(lang, 'Cliff Period (months)')}
                        </label>
                        <div className="pills-row">
                            {CLIFF_PRESETS.map((m) => (
                                <button
                                    key={m}
                                    className={`pill-btn ${cliffMonths === String(m) ? 'active' : ''}`}
                                    onClick={() => setCliffMonths(String(m))}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={cliffMonths}
                                onChange={(e) => setCliffMonths(e.target.value)}
                                placeholder=""
                                id="vest-cliff"
                                step="1"
                                min="0"
                             onFocus={(e) => e.target.select()} />
                            <span className="input-unit">{getUiString(lang, 'months')}</span>
                        </div>
                    </div>

                    {/* Vesting Duration */}
                    <div className="input-group">
                        <label>
                            <Calendar size={14} />
                            {getUiString(lang, 'Vesting Duration (months after cliff)')}
                        </label>
                        <div className="pills-row">
                            {VESTING_PRESETS.map((m) => (
                                <button
                                    key={m}
                                    className={`pill-btn ${vestingMonths === String(m) ? 'active' : ''}`}
                                    onClick={() => setVestingMonths(String(m))}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                        <div className="input-with-prefix" style={{ marginTop: '8px' }}>
                            <input
                                type="number" inputMode="decimal"
                                value={vestingMonths}
                                onChange={(e) => setVestingMonths(e.target.value)}
                                placeholder=""
                                id="vest-duration"
                                step="1"
                                min="1"
                             onFocus={(e) => e.target.select()} />
                            <span className="input-unit">{getUiString(lang, 'months')}</span>
                        </div>
                    </div>

                    {/* Unlock Frequency */}
                    <div className="input-group">
                        <label>
                            <Percent size={14} />
                            {getUiString(lang, 'Unlock Frequency')}
                        </label>
                        <div className="toggle-group">
                            <button
                                className={`toggle-btn ${unlockFrequency === 'monthly' ? 'active' : ''}`}
                                onClick={() => setUnlockFrequency('monthly')}
                            >
                                {getUiString(lang, 'Monthly')}
                            </button>
                            <button
                                className={`toggle-btn ${unlockFrequency === 'quarterly' ? 'active' : ''}`}
                                onClick={() => setUnlockFrequency('quarterly')}
                            >
                                {getUiString(lang, 'Quarterly')}
                            </button>
                            <button
                                className={`toggle-btn ${unlockFrequency === 'linear' ? 'active' : ''}`}
                                onClick={() => setUnlockFrequency('linear')}
                            >
                                {getUiString(lang, 'Linear (daily)')}
                            </button>
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> {getUiString(lang, 'Reset')}
                    </button>
                    <span className="input-hint">
                        {getUiString(lang, 'Auto-calculates as you type. Use presets for a quick base schedule, then fine-tune cliff and duration with custom months.')}
                    </span>
                </div>

                {/* ===== Right: Results Panel ===== */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero" style={{ borderColor: 'var(--color-primary)' }}>
                                <span className="result-hero-label">{getUiString(lang, 'Total Value')}</span>
                                <span className="result-hero-value" style={{ color: 'var(--color-primary)' }}>
                                    <Coins size={28} />
                                    {formatUSD(totalValue)}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-muted)' }}>
                                    {formatTokens(total)} {getUiString(lang, 'tokens')} @ {formatUSD(price)} {getUiString(lang, 'each')}
                                </span>
                            </div>

                            {/* Breakdown */}
                            <div className="result-breakdown">
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'TGE Unlock')}</span>
                                    <span className="result-value profit">
                                        {formatTokens(tgeTokens)} ({tge}%) &mdash; {formatUSD(tgeTokens * price)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Cliff Period')}</span>
                                    <span className="result-value">{cliff} {cliff !== 1 ? getUiString(lang, 'months') : getUiString(lang, 'month')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Vesting Duration')}</span>
                                    <span className="result-value">{vesting} {vesting !== 1 ? getUiString(lang, 'months') : getUiString(lang, 'month')} {getUiString(lang, 'after cliff')}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Unlock Frequency')}</span>
                                    <span className="result-value">{frequencyLabel}</span>
                                </div>
                                <div className="result-divider" />
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Unlock Periods')}</span>
                                    <span className="result-value">{periods}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Tokens per Unlock')}</span>
                                    <span className="result-value">
                                        {formatTokens(tokensPerPeriod)} &mdash; {formatUSD(tokensPerPeriod * price)}
                                    </span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">{getUiString(lang, 'Full Unlock at Month')}</span>
                                    <span className="result-value">{cliff + vesting}</span>
                                </div>
                            </div>

                            {/* SVG Chart */}
                            {chartSvg && (
                                <div style={{ marginTop: '20px' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                        {getUiString(lang, 'Unlock Schedule')}
                                    </h4>
                                    <svg
                                        viewBox={`0 0 ${chartSvg.W} ${chartSvg.H}`}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            background: 'var(--color-bg-card)',
                                            borderRadius: '10px',
                                            border: '1px solid var(--color-border)',
                                        }}
                                    >
                                        {/* Grid lines */}
                                        {chartSvg.yLabels.map((pct) => (
                                            <line
                                                key={pct}
                                                x1={chartSvg.padL}
                                                y1={chartSvg.yScale(pct)}
                                                x2={chartSvg.W - chartSvg.padR}
                                                y2={chartSvg.yScale(pct)}
                                                stroke="var(--color-border)"
                                                strokeWidth="1"
                                                strokeDasharray={pct > 0 && pct < 100 ? '4,4' : undefined}
                                            />
                                        ))}

                                        {/* Y axis labels */}
                                        {chartSvg.yLabels.map((pct) => (
                                            <text
                                                key={pct}
                                                x={chartSvg.padL - 8}
                                                y={chartSvg.yScale(pct) + 4}
                                                textAnchor="end"
                                                fontSize="11"
                                                fill="var(--color-text-muted)"
                                            >
                                                {pct}%
                                            </text>
                                        ))}

                                        {/* X axis labels */}
                                        {chartSvg.xLabels.map((l) => (
                                            <text
                                                key={l.month}
                                                x={l.x}
                                                y={chartSvg.H - 10}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="var(--color-text-muted)"
                                            >
                                                {l.month === 0 ? 'TGE' : `M${l.month}`}
                                            </text>
                                        ))}

                                        {/* Cliff end dashed line */}
                                        {cliff > 0 && (
                                            <>
                                                <line
                                                    x1={chartSvg.cliffX}
                                                    y1={chartSvg.padT}
                                                    x2={chartSvg.cliffX}
                                                    y2={chartSvg.H - chartSvg.padB}
                                                    stroke="var(--color-accent-amber)"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="6,4"
                                                />
                                                <text
                                                    x={chartSvg.cliffX + 4}
                                                    y={chartSvg.padT + 14}
                                                    fontSize="10"
                                                    fill="var(--color-accent-amber)"
                                                >
                                                    {getUiString(lang, 'Cliff End')}
                                                </text>
                                            </>
                                        )}

                                        {/* Shaded area */}
                                        <polygon
                                            points={chartSvg.areaPolygon}
                                            fill="var(--color-primary)"
                                            opacity="0.12"
                                        />

                                        {/* Step line */}
                                        <polyline
                                            points={chartSvg.linePolyline}
                                            fill="none"
                                            stroke="var(--color-primary)"
                                            strokeWidth="2.5"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* Unlock Schedule Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Full Unlock Schedule')}
                                </h4>
                                <div style={{ overflowX: 'auto', maxHeight: '350px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-bg)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Month')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Tokens Unlocked')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Cumulative')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, '% Unlocked')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Value ($)')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schedule.map((row) => {
                                                const isTGE = row.month === 0;
                                                const isCliffEnd = cliff > 0 && row.month === cliff;
                                                const highlight = isTGE || isCliffEnd;
                                                return (
                                                    <tr
                                                        key={row.month}
                                                        style={{
                                                            borderBottom: '1px solid var(--color-border)',
                                                            background: highlight ? 'rgba(99,102,241,0.06)' : undefined,
                                                        }}
                                                    >
                                                        <td style={{ padding: '8px', fontWeight: highlight ? 600 : 400 }}>
                                                            {isTGE ? 'TGE (0)' : row.month}
                                                            {isCliffEnd && (
                                                                <span style={{ fontSize: '0.7rem', color: 'var(--color-accent-amber)', marginLeft: '6px' }}>
                                                                    {getUiString(lang, 'Cliff End')}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td style={{
                                                            padding: '8px',
                                                            textAlign: 'right',
                                                            color: row.tokensUnlocked > 0 ? 'var(--color-accent-green)' : 'var(--color-text-muted)',
                                                        }}>
                                                            {row.tokensUnlocked > 0 ? `+${formatTokens(row.tokensUnlocked)}` : '0'}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', fontWeight: 500 }}>
                                                            {formatTokens(row.cumulative)}
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right', color: 'var(--color-primary)' }}>
                                                            {row.cumulativePct.toFixed(1)}%
                                                        </td>
                                                        <td style={{ padding: '8px', textAlign: 'right' }}>
                                                            {formatUSD(row.value)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Sell Pressure Note */}
                            {price > 0 && tokensPerPeriod > 0 && (
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
                                    <TrendingDown size={18} style={{ flexShrink: 0 }} />
                                    <span>
                                        {getUiString(lang, 'At current price, each unlock adds')} <strong>{formatUSD(sellPressure)}</strong> {getUiString(lang, 'of potential sell pressure to the market.')}
                                    </span>
                                </div>
                            )}

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Actual vesting terms may differ. Check official tokenomics documentation.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <Unlock size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Visualize Token Unlock Schedule')}</h3>
                            <p>{getUiString(lang, 'Enter your token allocation and vesting parameters to see a detailed unlock timeline with chart and schedule table.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withErrorBoundary(VestingCalculator);
