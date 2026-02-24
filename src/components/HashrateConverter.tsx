import { getUiString } from '../i18n/ui-strings';
import { useState, useCallback, useEffect } from 'react';
import {
    Cpu,
    Zap,
    RotateCcw,
    Info,
    ArrowRightLeft,
} from 'lucide-react';

const UNITS = [
    { id: 'h', label: 'H/s', power: 0 },
    { id: 'kh', label: 'KH/s', power: 3 },
    { id: 'mh', label: 'MH/s', power: 6 },
    { id: 'gh', label: 'GH/s', power: 9 },
    { id: 'th', label: 'TH/s', power: 12 },
    { id: 'ph', label: 'PH/s', power: 15 },
    { id: 'eh', label: 'EH/s', power: 18 },
];

const TYPICAL_HASHRATES = [
    { device: 'CPU (RandomX / Monero)', hashrate: '5 - 15 KH/s', unitId: 'kh' },
    { device: 'RTX 4090 (KawPow)', hashrate: '~60 MH/s', unitId: 'mh' },
    { device: 'GPU on Ethash', hashrate: '30 - 120 MH/s', unitId: 'mh' },
    { device: 'Antminer S21 Hyd (SHA-256)', hashrate: '335 TH/s', unitId: 'th' },
    { device: 'Bitcoin ASIC (SHA-256)', hashrate: '100 - 400 TH/s', unitId: 'th' },
    { device: 'Bitcoin Network Total', hashrate: '~600 EH/s', unitId: 'eh' },
];

interface ConversionResult {
    unitId: string;
    label: string;
    value: number;
}

export default function HashrateConverter({ lang = 'en' }: { lang?: string }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('th');
    const [results, setResults] = useState<ConversionResult[]>([]);

    const formatNumber = (n: number): string => {
        if (n === 0) return '0';
        if (isNaN(n) || !isFinite(n)) return '0';

        // Use scientific notation for very large or very small numbers
        if (Math.abs(n) >= 1e15) {
            return n.toExponential(4);
        }
        if (Math.abs(n) < 0.000001 && Math.abs(n) > 0) {
            return n.toExponential(4);
        }

        // For numbers with many decimals
        if (Math.abs(n) < 1) {
            // Find how many decimal places are significant
            const str = n.toFixed(20);
            const match = str.match(/^-?0\.(0*[1-9]\d{0,5})/);
            if (match) {
                const decimals = match[1].length;
                return n.toFixed(Math.min(decimals, 12));
            }
            return n.toFixed(6);
        }

        // For large whole numbers, use locale formatting
        if (n >= 1000) {
            return n.toLocaleString('en-US', {
                maximumFractionDigits: 4,
            });
        }

        // Regular numbers
        return n.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 6,
        });
    };

    const calculate = useCallback(() => {
        const val = parseFloat(inputValue);
        if (isNaN(val) || val <= 0) {
            setResults([]);
            return;
        }

        const fromUnit = UNITS.find(u => u.id === selectedUnit)!;
        // Convert input to H/s first, then to each unit
        const valueInHashes = val * Math.pow(10, fromUnit.power);

        const conversions: ConversionResult[] = UNITS.map(unit => ({
            unitId: unit.id,
            label: unit.label,
            value: valueInHashes / Math.pow(10, unit.power),
        }));

        setResults(conversions);
    }, [inputValue, selectedUnit]);

    useEffect(() => {
        calculate();
    }, [calculate]);

    const reset = () => {
        setInputValue('');
        setSelectedUnit('th');
        setResults([]);
    };

    const handleQuickFill = (value: string, unitId: string) => {
        setInputValue(value);
        setSelectedUnit(unitId);
    };

    const hasInputs = results.length > 0;
    const fromUnit = UNITS.find(u => u.id === selectedUnit)!;

    return (
        <div className="calc-wrapper">
            <div className="calc-grid">
                {/* Input Panel */}
                <div className="calc-input-panel">
                    {/* Value Input */}
                    <div className="input-group">
                        <label><Zap size={14} /> Hash Rate Value</label>
                        <input
                            type="number" inputMode="decimal"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter hash rate..."
                            id="hashrate-value"
                            step="any"
                            min="0"
                        />
                    </div>

                    {/* Unit Selection */}
                    <div className="input-group">
                        <label><ArrowRightLeft size={14} /> Unit</label>
                        <div className="pills-row">
                            {UNITS.map((unit) => (
                                <button
                                    key={unit.id}
                                    className={`pill-btn ${selectedUnit === unit.id ? 'active' : ''}`}
                                    onClick={() => setSelectedUnit(unit.id)}
                                >
                                    {unit.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Fill from Typical Devices */}
                    <div className="input-group">
                        <label><Cpu size={14} /> Quick Fill — Typical Devices</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button
                                className="pill-btn"
                                style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem' }}
                                onClick={() => handleQuickFill('10', 'kh')}
                            >
                                CPU (RandomX) — 10 KH/s
                            </button>
                            <button
                                className="pill-btn"
                                style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem' }}
                                onClick={() => handleQuickFill('60', 'mh')}
                            >
                                RTX 4090 (KawPow) — 60 MH/s
                            </button>
                            <button
                                className="pill-btn"
                                style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem' }}
                                onClick={() => handleQuickFill('100', 'mh')}
                            >
                                GPU on Ethash — 100 MH/s
                            </button>
                            <button
                                className="pill-btn"
                                style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.8rem' }}
                                onClick={() => handleQuickFill('335', 'th')}
                            >
                                Antminer S21 Hyd — 335 TH/s
                            </button>
                        </div>
                    </div>

                    <button className="reset-btn" onClick={reset}>
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>

                {/* Results Panel */}
                <div className="calc-results-panel">
                    {hasInputs ? (
                        <>
                            {/* Hero */}
                            <div className="result-hero">
                                <span className="result-hero-label">Converting from {fromUnit.label}</span>
                                <span className="result-hero-value">
                                    <ArrowRightLeft size={28} />
                                    {formatNumber(parseFloat(inputValue))} {fromUnit.label}
                                </span>
                                <span className="result-hero-roi" style={{ color: 'var(--color-text-secondary)' }}>
                                    = {formatNumber(results.find(r => r.unitId === 'h')?.value || 0)} hashes per second
                                </span>
                            </div>

                            {/* Conversion Results */}
                            <div className="result-breakdown">
                                {results.map((r) => (
                                    <div
                                        className="result-row"
                                        key={r.unitId}
                                        style={{
                                            background: r.unitId === selectedUnit ? 'var(--color-bg)' : 'transparent',
                                            borderRadius: r.unitId === selectedUnit ? 'var(--radius-sm)' : '0',
                                            padding: r.unitId === selectedUnit ? '10px 12px' : '8px 0',
                                        }}
                                    >
                                        <span className="result-label" style={{
                                            fontWeight: r.unitId === selectedUnit ? 700 : 400,
                                            color: r.unitId === selectedUnit ? 'var(--color-primary)' : undefined,
                                        }}>
                                            {r.label}
                                        </span>
                                        <span className="result-value" style={{
                                            fontWeight: r.unitId === selectedUnit ? 700 : 500,
                                            fontFamily: "'SF Mono', 'Fira Code', monospace",
                                            fontSize: '0.88rem',
                                            color: r.unitId === selectedUnit ? 'var(--color-primary)' : undefined,
                                        }}>
                                            {formatNumber(r.value)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Reference Table */}
                            <div style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px', color: 'var(--color-text)' }}>
                                    {getUiString(lang, 'Typical Hash Rates by Device')}
                                </h4>
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                <th style={{ padding: '8px', textAlign: 'left', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Device / Algorithm')}</th>
                                                <th style={{ padding: '8px', textAlign: 'right', color: 'var(--color-text-muted)', fontWeight: 500 }}>{getUiString(lang, 'Typical Hash Rate')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TYPICAL_HASHRATES.map((row) => (
                                                <tr key={row.device} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                    <td style={{ padding: '8px', color: 'var(--color-text-secondary)' }}>{row.device}</td>
                                                    <td style={{
                                                        padding: '8px',
                                                        textAlign: 'right',
                                                        fontWeight: 600,
                                                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                                                        fontSize: '0.78rem',
                                                        color: 'var(--color-text)',
                                                    }}>
                                                        {row.hashrate}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Conversion Reference */}
                            <div className="result-breakdown" style={{ marginTop: '16px' }}>
                                <div className="result-row" style={{ marginBottom: '4px' }}>
                                    <span className="result-label"><strong>{getUiString(lang, 'Unit Scale Reference')}</strong></span>
                                </div>
                                <div className="result-divider" />
                                {UNITS.slice(1).map((unit) => (
                                    <div className="result-row" key={`ref-${unit.id}`}>
                                        <span className="result-label">1 {unit.label}</span>
                                        <span className="result-value" style={{
                                            fontFamily: "'SF Mono', 'Fira Code', monospace",
                                            fontSize: '0.82rem',
                                        }}>
                                            10{unit.power > 1 ? <sup>{unit.power}</sup> : ''} H/s
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="result-cta">
                                <a
                                    href="https://www.f2pool.com"
                                    target="_blank" rel="noopener noreferrer sponsored"
                                    
                                    className="cta-btn"
                                >
                                    {getUiString(lang, 'Start Mining with F2Pool →')}
                                </a>
                            </div>

                            {/* Disclaimer */}
                            <p className="calc-disclaimer">
                                <Info size={12} />
                                {getUiString(lang, 'Hash rates vary by algorithm, hardware condition, and overclocking settings. Values shown are for reference purposes only.')}
                            </p>
                        </>
                    ) : (
                        <div className="results-empty">
                            <div className="results-empty-icon">
                                <ArrowRightLeft size={40} />
                            </div>
                            <h3>{getUiString(lang, 'Convert Hash Rate Units')}</h3>
                            <p>{getUiString(lang, 'Enter a hash rate value and select a unit to instantly convert between H/s, KH/s, MH/s, GH/s, TH/s, PH/s, and EH/s.')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
