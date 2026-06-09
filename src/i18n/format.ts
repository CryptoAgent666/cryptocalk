// Shared locale-aware number/percent formatting helpers.
// Mirrors the existing per-component pattern: English → 'en-US', every other
// language → its own BCP-47 code (es/pt/tr/hi/ru), which Intl resolves to the
// correct decimal/grouping separators (e.g. tr → "65.000,00", ru → "65 000,00").

/** Resolve a UI language code to an Intl locale string. */
export const loc = (lang?: string): string => (lang && lang !== 'en' ? lang : 'en-US');

/**
 * Locale-aware number formatting. Non-finite input renders as an em-dash,
 * matching the guards many calculators already use.
 */
export const fmtNumber = (
  n: number,
  lang?: string,
  opts: Intl.NumberFormatOptions = {},
): string => {
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString(loc(lang), opts);
};

/**
 * Locale-aware percent string. The value is already in percent units
 * (e.g. 12.5 → "12,50%" on comma-locales). The '%' is always a suffix to match
 * the site's existing convention. `decimals` fixes the fraction digits and
 * `signed` prepends '+' for non-negative values (negatives keep their own sign).
 */
export const fmtPercent = (
  n: number,
  lang?: string,
  { decimals = 2, signed = false }: { decimals?: number; signed?: boolean } = {},
): string => {
  if (!Number.isFinite(n)) return '—';
  const sign = signed && n >= 0 ? '+' : '';
  const body = n.toLocaleString(loc(lang), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}${body}%`;
};

/**
 * Localize a value that is rendered as `{value}%` inline (no fixed decimals).
 * Safe drop-in for raw JSX `{expr}%` interpolations: finite numbers are formatted
 * with the locale separator preserving their natural precision; anything else
 * (strings, NaN, undefined) passes through unchanged so display never breaks.
 */
export const fmtPctValue = (x: unknown, lang?: string): string => {
  if (typeof x === 'number' && Number.isFinite(x)) {
    return x.toLocaleString(loc(lang), { maximumFractionDigits: 20 });
  }
  return String(x);
};
