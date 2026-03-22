/**
 * Lightweight registry for UI translation strings.
 *
 * Language dictionaries are populated in two ways:
 *   1. SSR (build time): `_registerLang()` is called by `ui-strings-all.ts`
 *   2. Client (hydration): an inline `<script>` in LocalizedCalculatorPage.astro
 *      writes to `window.__uiStringRegistry` before this module executes.
 *      On first call we merge that data into the internal dict.
 */

declare global {
  interface Window {
    __uiStringRegistry?: Record<string, Record<string, string>>;
  }
}

const _dict: Record<string, Record<string, string>> = {};
let _clientMerged = false;

function _mergeClientData() {
  if (_clientMerged) return;
  _clientMerged = true;
  if (typeof window !== 'undefined' && window.__uiStringRegistry) {
    for (const [lang, strings] of Object.entries(window.__uiStringRegistry)) {
      _dict[lang] = strings;
    }
  }
}

export function _registerLang(lang: string, strings: Record<string, string>) {
  _dict[lang] = strings;
}

export function getUiString(lang: string | undefined, key: string): string {
  if (!lang || lang === 'en') return key;
  _mergeClientData();
  return _dict[lang]?.[key] || key;
}
