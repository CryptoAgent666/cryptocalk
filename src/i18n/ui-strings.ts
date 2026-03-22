/**
 * UI translation strings — backward-compatible entry point.
 *
 * Calculator components import `getUiString` from this module.
 * The actual language dictionaries are loaded separately:
 *   - SSR (build time): via `ui-strings-all.ts` imported in Astro frontmatter
 *   - Client (hydration): via per-language `<script>` tags in LocalizedCalculatorPage.astro
 *
 * This keeps the client JS bundle small — only the needed language is loaded per page.
 */
export { getUiString, _registerLang } from './ui-string-registry';
