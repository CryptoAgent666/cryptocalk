# CryptoCalk — Deployment Guide

> This documents the **actual** production setup (shared hosting + Cloudflare + a small Worker),
> not generic platform guides. Last verified: 2026-06-10.

## Production topology

| Piece | What serves it |
|---|---|
| Static site (all pages) | Shared hosting (nginx) behind Cloudflare. Live docroot is `~/cryptocalk.com/dist/` on the host; `httpdocs/` is a secondary synced copy. |
| `/api/contact` + `/{lang}/contact` POST | Cloudflare Worker (`worker.js`, routes in `wrangler.toml`) → `functions/api/contact.js` (Resend + optional Turnstile). |
| Android app | Capacitor wrapper; web bundle updated OTA from `https://ota.cryptocalk.com` (self-hosted, `ota-backend-vps/`). |

## Site deploy

```bash
bash scripts/deploy.sh             # npm run build + FTPS upload + Cloudflare purge + CDN verify
bash scripts/deploy.sh --no-build  # deploy an existing dist/
```

Requirements:
- `.ftp-credentials` (gitignored): `host=`, `user=`, `pass=`, `remote_path=`
- `.cf-credentials` (gitignored, optional): `zone_id=`, `api_token=` (Zone → Cache Purge) — without it the purge step is skipped.

The script's upload order is load-bearing — don't "simplify" it:
1. Immutable `/_astro/` hashed assets first (full mirror, `--ignore-time` — the server clock is ~3h behind).
2. HTML last, with local mtimes stamped far-future so same-byte-size HTML (changed chunk refs) still re-uploads.
3. Same two steps again into the secondary `httpdocs/` copy.
4. Cloudflare `purge_everything`, then a CDN check that every `/_astro/*.js` returns 200.

Worker deploy (only when `worker.js`/`functions/` change): `npx wrangler deploy` (reads `./dist` for the assets binding — build first). Secrets (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET`) live in Cloudflare, not in the repo. Local function testing: copy `.dev.vars.example` → `.dev.vars`, then `npm run build && npx wrangler dev`.

## Android OTA

```bash
npm run ota:publish        # build, zip the web bundle, upload bundle then manifest (order matters)
```

Publishes over the same `.ftp-credentials` to the OTA host. The manifest is uploaded **after** the
bundle so clients never see a manifest pointing at a missing zip. Native releases (versionCode bumps,
plugin changes) still go through Play Console — see `play-store-listing.md` and `android/`.

## Prune workflow (SEO recovery — cross-repo)

`src/data/prune-noindex.json` (564 paths: pages noindexed and dropped from the sitemap) is **generated,
not hand-edited**. Canonical generator: `~/Projects/DATA_HUB/_cryptocalk_prune_set.py`
- reads GSC for `sc-domain:cryptocalk.com` via the service-account JSON in `DATA_HUB/api/`,
- applies the keep-policy from `PRUNE-PLAN.md` (keep all `en`; `ru/es/pt/tr` winners only; drop `hi` entirely),
- writes `prune-noindex.json` directly into this repo.

To regenerate: run the script, review the diff of `prune-noindex.json`, rebuild, deploy. Measurement
re-runs: `DATA_HUB/_cryptocalk_prune.py`. The build consumes the set in `astro.config.mjs` (sitemap
filter) and `Layout.astro` (noindex + hreflang filtering).

## Environment notes

- The site is fully static (no SSR); `dist/` is **never committed** — every deploy builds it.
- Sitemap: `/sitemap-index.xml` (postbuild also copies it to `/sitemap.xml`).
- Legacy localized calculator URLs are redirected via `dist/_redirects` (generated from `public/_redirects`);
  `npm run verify:slug-migration` checks them after every build.
- Node 18+ (CI uses 22).
