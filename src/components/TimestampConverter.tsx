import { getUiString } from '../i18n/ui-strings';
import { useMemo, useState } from 'react';
import { ArrowRightLeft, Calendar, Clock, Info, RotateCcw } from 'lucide-react';
import { withErrorBoundary } from './ErrorBoundary';

type Mode = 'timestamp' | 'datetime';
type DisplayZone = 'local' | 'utc';

const BTC_GENESIS_MS = 1231006505000;
const ETH_GENESIS_MS = 1438269988000;

function toLocalInputValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function formatRelative(diffMs: number): string {
  const abs = Math.abs(diffMs);
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (abs < 60_000) {
    return rtf.format(Math.round(diffMs / 1000), 'second');
  }
  if (abs < 3_600_000) {
    return rtf.format(Math.round(diffMs / 60_000), 'minute');
  }
  if (abs < 86_400_000) {
    return rtf.format(Math.round(diffMs / 3_600_000), 'hour');
  }
  if (abs < 2_592_000_000) {
    return rtf.format(Math.round(diffMs / 86_400_000), 'day');
  }
  return rtf.format(Math.round(diffMs / 2_592_000_000), 'month');
}

function parseTimestamp(value: string): Date | null {
  const raw = value.trim();
  if (!raw) return null;
  const num = Number(raw);
  if (!Number.isFinite(num)) return null;
  const ms = num > 1_000_000_000_000 ? num : num * 1000;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date;
}

function TimestampConverter({ lang = 'en' }: { lang?: string }) {
  const now = new Date();
  const [mode, setMode] = useState<Mode>('timestamp');
  const [zone, setZone] = useState<DisplayZone>('local');
  const [timestampInput, setTimestampInput] = useState(String(Math.floor(now.getTime() / 1000)));
  const [datetimeInput, setDatetimeInput] = useState(toLocalInputValue(now));

  const sourceDate = useMemo(() => {
    if (mode === 'timestamp') return parseTimestamp(timestampInput);
    const date = datetimeInput ? new Date(datetimeInput) : null;
    return date && !Number.isNaN(date.getTime()) ? date : null;
  }, [mode, timestampInput, datetimeInput]);

  const computed = useMemo(() => {
    if (!sourceDate) return null;

    const ms = sourceDate.getTime();
    const seconds = Math.floor(ms / 1000);
    const nowMs = Date.now();

    const btcBlock = ms > BTC_GENESIS_MS ? Math.floor((ms - BTC_GENESIS_MS) / 600_000) : 0;
    const ethBlock = ms > ETH_GENESIS_MS ? Math.floor((ms - ETH_GENESIS_MS) / 12_000) : 0;

    return {
      ms,
      seconds,
      iso: sourceDate.toISOString(),
      local: sourceDate.toLocaleString(),
      utc: sourceDate.toUTCString(),
      relative: formatRelative(ms - nowMs),
      btcBlock,
      ethBlock,
    };
  }, [sourceDate]);

  const swapMode = () => {
    if (computed) {
      setTimestampInput(String(computed.seconds));
      setDatetimeInput(toLocalInputValue(new Date(computed.ms)));
    }
    setMode((prev) => (prev === 'timestamp' ? 'datetime' : 'timestamp'));
  };

  const reset = () => {
    const d = new Date();
    setMode('timestamp');
    setZone('local');
    setTimestampInput(String(Math.floor(d.getTime() / 1000)));
    setDatetimeInput(toLocalInputValue(d));
  };

  return (
    <div className="calc-wrapper">
      <div className="calc-grid">
        <div className="calc-input-panel">
          <div className="input-group">
            <label><ArrowRightLeft size={14} /> Input Mode</label>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${mode === 'timestamp' ? 'active' : ''}`}
                onClick={() => setMode('timestamp')}
              >
                Unix Timestamp
              </button>
              <button
                className={`toggle-btn ${mode === 'datetime' ? 'active' : ''}`}
                onClick={() => setMode('datetime')}
              >
                Date Time
              </button>
            </div>
          </div>

          <div className="input-group">
            <label><Clock size={14} /> Unix Timestamp</label>
            <input
              type="text"
              inputMode="numeric"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              disabled={mode !== 'timestamp'}
              placeholder=""
              id="timestamp-input"
            />
          </div>

          <div className="input-group">
            <label><Calendar size={14} /> Date Time</label>
            <input
              type="datetime-local"
              value={datetimeInput}
              onChange={(e) => setDatetimeInput(e.target.value)}
              disabled={mode !== 'datetime'}
              id="datetime-input"
            />
          </div>

          <div className="input-group">
            <label>Display Zone</label>
            <div className="toggle-group">
              <button className={`toggle-btn ${zone === 'local' ? 'active' : ''}`} onClick={() => setZone('local')}>Local</button>
              <button className={`toggle-btn ${zone === 'utc' ? 'active' : ''}`} onClick={() => setZone('utc')}>UTC</button>
            </div>
          </div>

          <button className="reset-btn" onClick={swapMode}>
            <ArrowRightLeft size={14} /> Swap Mode
          </button>
          <button className="reset-btn" onClick={reset}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        <div className="calc-results-panel">
          {computed ? (
            <>
              <div className="result-hero">
                <span className="result-hero-label">{getUiString(lang, 'Converted Result')}</span>
                <span className="result-hero-value">
                  <Clock size={28} />
                  {zone === 'local' ? computed.local : computed.utc}
                </span>
                <span className="result-hero-roi">{computed.relative}</span>
              </div>

              <div className="result-breakdown">
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Unix (seconds)')}</span>
                  <span className="result-value">{computed.seconds.toLocaleString('en-US')}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Unix (milliseconds)')}</span>
                  <span className="result-value">{computed.ms.toLocaleString('en-US')}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'ISO 8601')}</span>
                  <span className="result-value" style={{ fontSize: '0.78rem' }}>{computed.iso}</span>
                </div>
                <div className="result-divider" />
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Estimated BTC Block')}</span>
                  <span className="result-value">{computed.btcBlock.toLocaleString('en-US')}</span>
                </div>
                <div className="result-row">
                  <span className="result-label">{getUiString(lang, 'Estimated ETH Block')}</span>
                  <span className="result-value">{computed.ethBlock.toLocaleString('en-US')}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                <Info size={14} />
                {getUiString(lang, 'Block estimates use average intervals (BTC 10 min, ETH 12 sec). Use explorers for exact block mapping.')}
              </p>
            </>
          ) : (
            <div className="results-empty">
              <div className="results-empty-icon"><Clock size={40} /></div>
              <h3>{getUiString(lang, 'Enter timestamp or date')}</h3>
              <p>{getUiString(lang, 'Use Unix seconds/milliseconds or a date time value to convert instantly.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(TimestampConverter);
