# Calk OTA backend (self-hosted on the VPS)

The **active** OTA backend. A tiny PHP endpoint on the same VPS that already serves
the sites (ispmanager / Nginx + PHP-FPM). One endpoint serves the whole Calk network.
No Cloudflare, no Capgo cloud, no monthly fee.

```
app on launch ──POST /updates.php──▶ ota.cryptocalk.com ──reads manifest/<app>.json
              ◀── {version,url,checksum} ──────────────┘
              ──GET /bundles/<app>/<ver>.zip──▶ Nginx serves the zip (static)
              ──verifies SHA-256, applies on next launch──
```

The app side is already wired: `capacitor.config.ts` →
`CapacitorUpdater.updateUrl = https://ota.cryptocalk.com/updates.php`, with
`statsUrl`/`channelUrl` emptied so the plugin never contacts Capgo's servers.

> `ota-backend/` (Cloudflare Worker + R2) is the **inactive alternative** — keep it
> only if you later want a CDN/bandwidth offload. Everything below is the VPS path.

## Docroot layout

`public/` mirrors what lives at the docroot of the `ota.cryptocalk.com` site:

```
updates.php            # the version-check endpoint (this is all you deploy by hand)
manifest/<app>.json    # { "version": "1.0.1", "checksum": "<sha256 hex>" }  ← written by the publisher
bundles/<app>/<ver>.zip# the web bundles                                      ← uploaded by the publisher
```

## One-time setup (ispmanager)

> **DNS & SSL are already done.** cryptocalk.com's DNS is at **Porkbun** and has a
> wildcard `*.cryptocalk.com → 176.97.68.234`, so `ota.cryptocalk.com` already resolves to
> the VPS. The existing wildcard Let's Encrypt cert (`*.cryptocalk.com`) already covers
> it and passes strict TLS validation. Verify any time:
> ```bash
> dig +short A ota.cryptocalk.com            # → 176.97.68.234
> curl -sI https://ota.cryptocalk.com/ >/dev/null && echo "TLS OK"
> ```
> So skip the DNS and SSL steps — you only need to give the subdomain its own site +
> docroot so Nginx stops serving the default cryptocalk.com page for it.

1. **Site** — ispmanager → *Sites* → *Create a site* → `ota.cryptocalk.com` (the default
   PHP FastCGI handler is fine; the endpoint is one small PHP file). Assign the
   **existing `*.cryptocalk.com` wildcard certificate** to it (no need to issue a new one).
2. **Deploy the endpoint** — copy `public/updates.php` to the site's docroot and make
   sure `manifest/` and `bundles/` exist and are writable by your deploy user:
   ```bash
   DOCROOT=/var/www/www-root/data/www/ota.cryptocalk.com
   rsync -az ota-backend-vps/public/updates.php root@176.97.68.234:$DOCROOT/
   ssh root@176.97.68.234 "mkdir -p $DOCROOT/manifest $DOCROOT/bundles"
   ```
3. **Smoke test** — `curl https://ota.cryptocalk.com/updates.php` → `{"ok":true,"service":"calk-ota"}`.

## Publishing an update

Once, copy the deploy config and fill it in:

```bash
cp scripts/ota.env.example scripts/ota.env   # set OTA_SSH / OTA_REMOTE_DIR
```

Then, after an App Store build is live:

```bash
scripts/ota-publish.sh 1.0.1     # build → zip → rsync to VPS → update manifest
```

`1.0.1` must be **greater** than the binary's `MARKETING_VERSION`, so each version is
offered exactly once and never downgrades. Devices download it silently and apply it
on the next launch, then keep working offline.

## Endpoints

| Method | Path                     | Purpose                                            |
|--------|--------------------------|----------------------------------------------------|
| POST   | `/updates.php`           | Capgo check → `{version,url,checksum}` or `{}`      |
| GET    | `/bundles/<app>/<ver>.zip` | The bundle (served as a static file by Nginx)     |
| GET    | `/updates.php`           | Health → `{ ok: true }`                            |

## Local testing (no VPS)

```bash
scripts/ota-publish.sh 1.0.1 --local          # writes into ota-backend-vps/public/
OTA_PUBLIC_BASE=http://127.0.0.1:8788 \
  php -S 127.0.0.1:8788 -t ota-backend-vps/public
curl -s 127.0.0.1:8788/updates.php \
  -d '{"app_id":"com.cryptocalk.calculator","version_name":"builtin","version_build":"1.0.0"}'
# → {"version":"1.0.1","url":"...","checksum":"..."}
```

## Hardening (optional)

- Disable directory listing for the site (no autoindex), so `bundles/` isn't browsable.
- `bundles/` and `manifest/` are public by design (the plugin fetches them
  unauthenticated) — they contain only calculator code, nothing secret.
- Add long cache headers for `/bundles/*.zip` (immutable) in the site's Nginx config.
