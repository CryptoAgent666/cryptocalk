import type { APIRoute, GetStaticPaths } from 'astro';
import { CLIENT_DICTS } from '../../i18n/client-dict-manifest';

// One cacheable JS file per language (built statically to /i18n/<lang>.js).
// Replaces the old ~210 KB per-page inline translation blob: now downloaded once
// and cached across every localized page.
export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(CLIENT_DICTS).map((lang) => ({ params: { lang } }));

export const GET: APIRoute = ({ params }) => {
  const lang = String(params.lang);
  const dict = CLIENT_DICTS[lang] ?? {};
  // Classic (non-module) blocking script: populates window.__uiStringRegistry exactly
  // like the previous inline script did, before React hydration runs. getUiString reads
  // from this registry; if this file fails to load, getUiString falls back to the key.
  const body =
    `window.__uiStringRegistry=window.__uiStringRegistry||{};` +
    `window.__uiStringRegistry[${JSON.stringify(lang)}]=${JSON.stringify(dict)};`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  });
};
