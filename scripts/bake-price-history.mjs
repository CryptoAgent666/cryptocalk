#!/usr/bin/env node
/**
 * bake-price-history.mjs — pre-bake daily close history into static JSON so the
 * client never needs a keyed CryptoCompare call (their free tier is 100 req/mo
 * and the PUBLIC_ key used to ship in the bundle — quota exhausted 2026-07).
 *
 * Sources:
 *   - Binance public market-data mirror (data-api.binance.vision): free, no key,
 *     full daily candles from each pair's listing date. Primary.
 *   - CryptoCompare histoday: ONLY for pre-listing backfill (BTC before 2017 etc.),
 *     gated by --cc-budget N (default 0 = no CC calls at all). Key from env
 *     CRYPTOCOMPARE_API_KEY (server-side only, NOT PUBLIC_), keyless if unset.
 *
 * Output: public/data/price-history/<SYMBOL>.json
 *   { "symbol": "BTC", "updated": "2026-07-02", "prices": [[unix_sec, close], ...] }
 *
 * Usage:
 *   node scripts/bake-price-history.mjs                    # Binance only, all coins
 *   node scripts/bake-price-history.mjs --symbols BTC,ETH  # subset
 *   node scripts/bake-price-history.mjs --cc-budget 6      # allow 6 CC backfill calls
 *
 * Re-run monthly-ish (or on new coin listings): past candles never change, the
 * bake only appends. The client uses these files first for any date they cover.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'public', 'data', 'price-history');
const BINANCE = 'https://data-api.binance.vision/api/v3';
const CC_KEY = process.env.CRYPTOCOMPARE_API_KEY || '';

// keep in sync with GECKO_TO_CC_SYMBOL in src/utils/cryptoPriceService.ts
const SYMBOLS = [
  'BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'ADA', 'XRP', 'DOT', 'LINK', 'AVAX',
  'MATIC', 'TON', 'LTC', 'TRX', 'UNI', 'SHIB', 'STETH', 'WBTC', 'BCH', 'XLM',
  'XMR', 'ATOM', 'NEAR', 'APT', 'SUI', 'ICP', 'FIL', 'ARB', 'OP', 'RNDR',
  'INJ', 'GRT', 'AAVE', 'MKR', 'PEPE', 'KAS',
];

const args = process.argv.slice(2);
const argVal = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const only = argVal('--symbols');
const ccBudgetStart = parseInt(argVal('--cc-budget') || '0', 10);
let ccBudget = ccBudgetStart;
const todo = only ? only.split(',').map((s) => s.trim().toUpperCase()) : SYMBOLS;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round6 = (x) => parseFloat(Number(x).toPrecision(6));

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url.slice(0, 90)}`);
  return res.json();
}

/** All daily closes for SYMUSDT from listing to now. [] if pair unlisted. */
async function binanceDaily(sym) {
  const pair = `${sym}USDT`;
  const out = [];
  let cursor = 0;
  for (let page = 0; page < 25; page++) {
    let data;
    try {
      data = await getJson(`${BINANCE}/klines?symbol=${pair}&interval=1d&startTime=${cursor}&limit=1000`);
    } catch (e) {
      if (String(e).includes('HTTP 400')) return []; // unlisted pair
      throw e;
    }
    if (!Array.isArray(data) || data.length === 0) break;
    for (const k of data) {
      const close = parseFloat(k[4]);
      if (close > 0) out.push([Math.floor(k[0] / 1000), round6(close)]);
    }
    if (data.length < 1000) break;
    cursor = data[data.length - 1][0] + 86400000;
    await sleep(300);
  }
  return out;
}

/** CryptoCompare backfill BEFORE a given unix ts (pre-listing era), budget-gated. */
async function ccBackfill(sym, beforeTs) {
  const out = [];
  let toTs = beforeTs - 86400;
  for (let page = 0; page < 4; page++) {
    if (ccBudget <= 0) break;
    ccBudget--;
    const key = CC_KEY ? `&api_key=${CC_KEY}` : '';
    const data = await getJson(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${sym}&tsym=USD&limit=2000&toTs=${toTs}${key}`);
    if (data.Response === 'Error') throw new Error(`CC: ${String(data.Message).slice(0, 90)}`);
    const entries = data.Data?.Data || [];
    const good = entries.filter((e) => e.close > 0);
    if (good.length === 0) break;
    out.push(...good.map((e) => [e.time, round6(e.close)]));
    // CC pads pre-genesis with zero rows; stop when the page starts at the era edge
    if (entries.length < 2000 || entries[0].close === 0) break;
    toTs = entries[0].time - 86400;
    await sleep(500);
  }
  return out;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
let ccUsed = 0;
for (const sym of todo) {
  const file = path.join(OUT_DIR, `${sym}.json`);
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).prices : [];
  process.stdout.write(`${sym.padEnd(6)} `);
  let rows = [];
  try {
    rows = await binanceDaily(sym);
  } catch (e) {
    console.log(`binance FAIL: ${String(e).slice(0, 80)}`);
    continue;
  }
  let note = `binance ${rows.length}d`;
  // pre-listing backfill via CC only when budget allows and there is a gap to fill
  const earliest = rows.length ? rows[0][0] : Math.floor(Date.now() / 1000);
  const prevCoversPre = prev.length && prev[0][0] < earliest - 86400 * 3;
  if (ccBudget > 0 && !prevCoversPre) {
    try {
      const before = ccBudget;
      const older = await ccBackfill(sym, earliest);
      ccUsed += before - ccBudget;
      if (older.length) note += ` + cc ${older.length}d`;
      rows = older.concat(rows);
    } catch (e) {
      console.log(`${note} | cc backfill stopped: ${String(e).slice(0, 70)}`);
      ccBudget = 0; // quota wall — stop trying for the rest of the run
    }
  }
  // merge with whatever the file already had (idempotent re-runs, keeps old CC data)
  const byDay = new Map();
  for (const [t, c] of [...prev, ...rows]) byDay.set(Math.floor(t / 86400), [t, c]);
  const merged = [...byDay.values()].sort((a, b) => a[0] - b[0]);
  fs.writeFileSync(file, JSON.stringify({
    symbol: sym, updated: new Date().toISOString().slice(0, 10), prices: merged,
  }));
  console.log(`${note} -> total ${merged.length}d (${(fs.statSync(file).size / 1024).toFixed(0)}KB)`);
}
console.log(`\ndone. CC calls used: ${ccUsed} of ${ccBudgetStart} budget.`);
