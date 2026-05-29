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

CREDS=".ftp-credentials"
[ -f "$CREDS" ] || { echo "❌ $CREDS not found"; exit 1; }
eval "$(grep -E '^(host|user|pass|remote_path)=' "$CREDS" | sed 's/^/FTP_/')"

if [ "${1:-}" != "--no-build" ]; then
  echo "▶ Building…"
  npm run build
fi

[ -d dist/_astro ] || { echo "❌ dist/_astro missing — run build first"; exit 1; }

LFTP_SCRIPT="$(mktemp)"
trap 'rm -f "$LFTP_SCRIPT"' EXIT

cat > "$LFTP_SCRIPT" <<EOF
set ssl:verify-certificate no
set ftp:ssl-protect-data false
set net:timeout 30
set net:max-retries 3
set mirror:parallel-transfer-count 10
open -u ${FTP_user},${FTP_pass} ${FTP_host}

# --- STEP 1: immutable hashed assets FIRST (full, ignore server mtime) ---
cd ${FTP_remote_path}/httpdocs/
mirror -R --ignore-time --no-perms dist/_astro/ _astro/

# --- STEP 2: everything else (HTML, sitemaps, etc.) ---
mirror -R --only-newer --no-perms --exclude '^_astro/' dist/ ./

# --- STEP 3: mirror to root dist/ too (Plesk Git source-of-truth) ---
cd ${FTP_remote_path}/
mirror -R --ignore-time --no-perms dist/_astro/ dist/_astro/
mirror -R --only-newer --no-perms --exclude '^_astro/' dist/ dist/
bye
EOF

echo "▶ Deploying (assets first, then HTML)…"
lftp -f "$LFTP_SCRIPT"
echo "✅ Deploy complete."

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
