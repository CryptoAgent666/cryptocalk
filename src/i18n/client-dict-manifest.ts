// BUILD-TIME ONLY (uses node:crypto). Source of the per-language client UI-string
// dictionaries that are served as cacheable /i18n/<lang>.js, plus a content-hash
// version per language for cache-busting. Imported only by Astro frontmatter and the
// /i18n/[lang].js endpoint — never reaches a client bundle.
import { createHash } from 'node:crypto';
import es from './ui-strings/es';
import pt from './ui-strings/pt';
import tr from './ui-strings/tr';
import hi from './ui-strings/hi';
import ru from './ui-strings/ru';

export const CLIENT_DICTS: Record<string, Record<string, string>> = { es, pt, tr, hi, ru };

// 8-char content hash → query-string version so browsers/CDN refetch only when a
// language's strings actually change (otherwise the file is cached indefinitely).
export const DICT_VERSIONS: Record<string, string> = Object.fromEntries(
  Object.entries(CLIENT_DICTS).map(([lang, dict]) => [
    lang,
    createHash('sha1').update(JSON.stringify(dict)).digest('hex').slice(0, 8),
  ]),
);
