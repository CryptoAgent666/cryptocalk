#!/bin/bash
# CryptoCalk FTP deploy — SAFE ORDER to avoid Cloudflare negative-cache (404) on hashed chunks.
#
# Root cause this prevents: if HTML referencing new /_astro/<hash>.js chunks is uploaded
# BEFORE the chunks themselves, browsers (and Cloudflare) fetch the not-yet-uploaded chunk,
# get a 404, and Cloudflare caches that 404 for up to s-maxage (24h). Hydration then breaks
# sitewide until a manual cache purge.
#
# Fix: always upload immutable assets (/_astro/, hashed, content-addressed) FIRST and in full
# (NO --only-newer — the server clock is ~3h behind local, which makes --only-newer skip new
# files it wrongly thinks are older). Then upload HTML/pages last.
#
# Usage:  bash scripts/deploy.sh            # build + deploy
#         bash scripts/deploy.sh --no-build # deploy existing dist/
set -euo pipefail
cd "$(dirname "$0")/.."

# --- STEP 0 (BLOCKING): stale-values prose guard — fleet rollout 2026-08-29 ---
# Ищет в src/ конкретные устаревшие значения (пары «было→стало» из
# scripts/stale-values.json). Один факт живёт в 5+ местах (компонент, статья,
# FAQ, worked example, локали) — правка регулярно доезжает не до всех.
# Деплой с известным устаревшим значением ЗАПРЕЩЁН.
echo "▶ Stale-values guard…"
node scripts/check-stale-values.mjs || { echo "❌ Deploy blocked: stale values found (see above)."; exit 1; }

# Гард реестра (тираж 31.08.2026): value не должен расходиться с official_value.
# На calk.kg правка семи констант тронула только value — пять расхождений нашёл
# внешний loop_closer, а не предеплой. Известные расхождения перечислены в
# scripts/ledger-consistency-baseline.json и НЕ блокируют; блокируют новые.
node "$(dirname "$0")/check-ledger-consistency.mjs" || { echo "деплой остановлен: реестр рассогласован (value ≠ official_value)"; exit 1; }

CREDS=".ftp-credentials"
[ -f "$CREDS" ] || { echo "❌ $CREDS not found"; exit 1; }
eval "$(grep -E '^(host|user|pass|remote_path)=' "$CREDS" | sed 's/^/FTP_/')"

# TLS: verify the server certificate and encrypt the data channel by default —
# otherwise a network MITM can capture the FTP credentials (= full site takeover).
# Escape hatch while the host cert is broken:  FTP_INSECURE=1 bash scripts/deploy.sh
if [ "${FTP_INSECURE:-0}" = "1" ]; then
  echo "⚠️  FTP_INSECURE=1 — TLS certificate verification DISABLED for this run. Fix the host certificate ASAP."
  LFTP_TLS=$'set ssl:verify-certificate no\nset ftp:ssl-protect-data false'
else
  LFTP_TLS=$'set ssl:verify-certificate yes\nset ftp:ssl-protect-data true'
fi

if [ "${1:-}" != "--no-build" ]; then
  echo "▶ Building…"
  npm run build
fi

[ -d dist/_astro ] || { echo "❌ dist/_astro missing — run build first"; exit 1; }

LFTP_SCRIPT="$(mktemp)"
trap 'rm -f "$LFTP_SCRIPT"' EXIT

cat > "$LFTP_SCRIPT" <<EOF
${LFTP_TLS}
set net:timeout 30
set net:max-retries 3
set mirror:parallel-transfer-count 10
open -u ${FTP_user},${FTP_pass} ${FTP_host}

# IMPORTANT: the REAL served docroot for cryptocalk.com is ~/cryptocalk.com/dist/
# (verified 2026-05-29 by matching served ETag/size to the file on disk). The
# ~/cryptocalk.com/httpdocs/ tree is a secondary copy that is NOT what nginx serves.
# Deploy to BOTH (dist = live docroot, httpdocs = keep in sync for safety), assets first.

# --- STEP 1: immutable hashed assets FIRST into the LIVE docroot (dist/) ---
cd ${FTP_remote_path}/dist/
mirror -R --ignore-time --no-perms dist/_astro/ _astro/

# --- STEP 2: HTML/pages into LIVE docroot ---
# IMPORTANT: HTML must use TIME compare, NOT --ignore-time. An i18n/chunk update
# changes only the referenced /_astro/<hash>.js name (8→8 chars) so the HTML byte
# SIZE is IDENTICAL — and --ignore-time compares by SIZE, so lftp SKIPPED these
# pages, leaving them on stale chunks (verified 2026-05-30: live==built==same bytes).
# Fix: the bash step below touches every local HTML to a far-future mtime, so plain
# time-based mirror always sees them as "newer than remote" → forces re-upload,
# sidestepping both the size-skip and the ~3h server-clock skew.
mirror -R --no-perms --exclude '^_astro/' dist/ ./

# --- STEP 3: keep the secondary httpdocs/ copy in sync (assets first) ---
# NOTE: lftp 'cd' is relative to the CURRENT remote dir, and STEP 1 already cd'd
# into ${FTP_remote_path}/dist/. So use the relative sibling path '../httpdocs/'
# (dist/ and httpdocs/ are siblings under ${FTP_remote_path}/, verified 2026-05-30).
# Using '${FTP_remote_path}/httpdocs/' here would wrongly resolve to
# ${FTP_remote_path}/dist/${FTP_remote_path}/httpdocs → 550 No such directory.
cd ../httpdocs/
mirror -R --ignore-time --no-perms dist/_astro/ _astro/
mirror -R --no-perms --exclude '^_astro/' dist/ ./
bye
EOF

# Force every local HTML to a far-future mtime so the time-based HTML mirror always
# treats them as newer than any remote copy (defeats the same-size chunk-ref skip).
echo "▶ Stamping HTML mtimes (force HTML re-upload)…"
find dist -name '*.html' -exec touch -t 209901010000 {} + 2>/dev/null || true

echo "▶ Deploying (assets first, then HTML)…"
lftp -f "$LFTP_SCRIPT"
echo "✅ Deploy complete."

# --- Cloudflare cache purge: edge-cached HTML must refresh to reflect this deploy.
# Needs a gitignored .cf-credentials with:  zone_id=<id>   api_token=<token with Zone:Cache Purge>
# Without it this step is skipped (no-op), so the script stays usable as-is.
CF_CREDS=".cf-credentials"
if [ -f "$CF_CREDS" ]; then
  eval "$(grep -E '^(zone_id|api_token)=' "$CF_CREDS" | sed 's/^/CF_/')"
  if [ -n "${CF_zone_id:-}" ] && [ -n "${CF_api_token:-}" ]; then
    echo "▶ Purging Cloudflare cache…"
    CF_RESP="$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${CF_zone_id}/purge_cache" \
      -H "Authorization: Bearer ${CF_api_token}" -H "Content-Type: application/json" \
      --data '{"purge_everything":true}')"
    if echo "$CF_RESP" | grep -q '"success":true'; then echo "✅ Cloudflare cache purged."; else echo "⚠️ Cloudflare purge failed: $CF_RESP"; fi
  fi
else
  echo "ℹ️ No .cf-credentials — skipping Cloudflare purge (add zone_id + api_token to enable edge-cache refresh)."
fi

# --- STEP 3b: re-warm the edge for the pages that matter ---
# A purge_everything leaves every HTML page cold, and Cloudflare evicts unpopular objects
# anyway — a 2026-08-23 crawl of all 294 sitemap URLs got cf-cache MISS on 291 of them, with
# origin TTFB p90 1.77s (warm hits are ~0.1s). The first visitor to a long-tail calculator
# pays that. Warming the sitemap costs one cheap GET per URL and runs after the purge.
echo "▶ Warming edge cache from sitemap…"
# NB: the sitemap is emitted as ONE long line, so a line-based sed only ever returns a single
# match (that bug shipped in the first version of this step and warmed exactly 1 URL).
warm_urls="$(grep -o '<loc>[^<]*</loc>' dist/sitemap-0.xml 2>/dev/null | sed 's:</\?loc>::g' || true)"
warm_n=0
for u in $warm_urls; do
  curl -s -o /dev/null --max-time 20 -A "CryptoCalk-cache-warmer" "$u" || true
  warm_n=$((warm_n+1))
done
if [ "$warm_n" -gt 0 ]; then echo "✅ Warmed $warm_n URLs."; else echo "ℹ️ No dist/sitemap-0.xml — skipped warming."; fi

# --- STEP 3c: IndexNow — tell Bing/Copilot (and Yandex) which pages actually changed ---
# The key file /7397f0c5ed569a8e602961eac8858f4b.txt has been deployed since the Bing Webmaster
# setup, but nothing ever pinged the API, so the freshness signal it exists for was never sent.
# Submit ONLY URLs whose sitemap <lastmod> moved in the last 7 days — IndexNow is for changed
# URLs, and re-submitting all 294 on every deploy is exactly the abuse its docs warn about.
echo "▶ Submitting changed URLs to IndexNow…"
INDEXNOW_KEY="7397f0c5ed569a8e602961eac8858f4b"
if [ -f "dist/sitemap-0.xml" ] && [ -f "dist/${INDEXNOW_KEY}.txt" ]; then
  IN_PAYLOAD="$(python3 - "$INDEXNOW_KEY" <<'PY'
import re, sys, json, datetime
key = sys.argv[1]
xml = open('dist/sitemap-0.xml', encoding='utf-8').read()
cutoff = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()
urls = [m.group(1) for m in re.finditer(
    r'<url>\s*<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>', xml)
    if m.group(2)[:10] >= cutoff]
print(json.dumps({
    "host": "cryptocalk.com",
    "key": key,
    "keyLocation": "https://cryptocalk.com/%s.txt" % key,
    "urlList": urls[:10000],
}) if urls else "")
PY
)"
  if [ -n "$IN_PAYLOAD" ]; then
    IN_N="$(printf '%s' "$IN_PAYLOAD" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)["urlList"]))')"
    IN_CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 30 -X POST \
      -H 'Content-Type: application/json; charset=utf-8' \
      --data "$IN_PAYLOAD" https://api.indexnow.org/indexnow || true)"
    case "$IN_CODE" in
      200|202) echo "✅ IndexNow accepted $IN_N changed URL(s) (HTTP $IN_CODE)." ;;
      *)       echo "⚠️ IndexNow returned HTTP $IN_CODE for $IN_N URL(s) — 403 means the key file is unreachable." ;;
    esac
  else
    echo "ℹ️ No URLs with a <lastmod> in the last 7 days — nothing to submit."
  fi
else
  echo "ℹ️ Missing dist/sitemap-0.xml or the IndexNow key file — skipping IndexNow."
fi

# --- STEP 4: verify no _astro chunk 404s through the CDN ---
echo "▶ Verifying _astro chunks через CDN…"
miss=0
for f in $(ls dist/_astro/*.js | xargs -n1 basename); do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://cryptocalk.com/_astro/$f" 2>/dev/null || true)
  if [ "$code" = "404" ]; then echo "  ⚠️ 404 (CDN cache): $f"; miss=$((miss+1)); fi
done
if [ "$miss" -gt 0 ]; then
  echo "⚠️ $miss chunk(s) return 404 via CDN — likely Cloudflare negative-cache."
  echo "   Files exist on origin. Purge Cloudflare cache for /_astro/* to fix."
else
  echo "✅ All chunks 200 via CDN."
fi
