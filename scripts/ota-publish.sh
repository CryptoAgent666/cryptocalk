#!/bin/bash
set -euo pipefail

# CryptoCalk OTA publisher — shared hosting + Cloudflare edition (FTP/lftp).
# Self-hosted Capgo pattern (like CALK-AU) but uploads over FTP (reusing the site's
# .ftp-credentials) instead of rsync-over-SSH, because this site is on shared hosting.
#
# Usage:
#   scripts/ota-publish.sh <version>            build + publish a bundle to the VPS (FTP)
#   scripts/ota-publish.sh <version> --local    write into ota-backend-vps/public for local test
#   scripts/ota-publish.sh --deploy-backend     one-time: upload updates.php + dirs to the subdomain
#
# <version> MUST be greater than the app's versionName (e.g. 1.0.1) so each version is
# offered to devices exactly once and never downgrades.

APP_KEY="crypto"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CREDS="$ROOT/.ftp-credentials"

# OTA subdomain docroot on the FTP server (override in scripts/ota.env — copy from ota.env.example).
[ -f "$ROOT/scripts/ota.env" ] && . "$ROOT/scripts/ota.env"
OTA_FTP_DIR="${OTA_FTP_DIR:-ota.cryptocalk.com/httpdocs}"

load_ftp() {
  [ -f "$CREDS" ] || { echo "❌ $CREDS not found"; exit 1; }
  eval "$(grep -E '^(host|user|pass)=' "$CREDS" | sed 's/^/FTP_/')"

  # TLS: verify certs + encrypt data channel by default; FTP_INSECURE=1 to bypass
  # while the host certificate is broken (logs a loud warning).
  if [ "${FTP_INSECURE:-0}" = "1" ]; then
    echo "⚠️  FTP_INSECURE=1 — TLS certificate verification DISABLED for this run."
    LFTP_TLS=$'set ssl:verify-certificate no\nset ftp:ssl-protect-data false'
  else
    LFTP_TLS=$'set ssl:verify-certificate yes\nset ftp:ssl-protect-data true'
  fi
}

# --- one-time backend deploy: upload updates.php + create manifest/ & bundles/ dirs ---
if [ "${1:-}" = "--deploy-backend" ]; then
  load_ftp
  echo "==> Uploading OTA backend to ${OTA_FTP_DIR} on ${FTP_host}…"
  lftp <<EOF
${LFTP_TLS}
open -u "${FTP_user},${FTP_pass}" "${FTP_host}"
mkdir -p ${OTA_FTP_DIR}
mkdir -p ${OTA_FTP_DIR}/manifest
mkdir -p ${OTA_FTP_DIR}/bundles/${APP_KEY}
put "$ROOT/ota-backend-vps/public/updates.php" -o ${OTA_FTP_DIR}/updates.php
bye
EOF
  echo "==> Backend uploaded. Test: curl https://ota.cryptocalk.com/updates.php  -> {\"ok\":true,...}"
  exit 0
fi

VERSION="${1:?usage: ota-publish.sh <version> [--local] | --deploy-backend}"
MODE="${2:-}"

echo "==> [1/4] Building web bundle (astro build)…"
cd "$ROOT"
npm run build >/dev/null
test -f dist/index.html || { echo "ERROR: build failed (dist/index.html missing)"; exit 1; }

echo "==> [2/4] Zipping bundle (index.html at archive root)…"
TMP="$(mktemp -d)"
BUNDLE="$TMP/bundle.zip"
( cd dist && zip -qr -X "$BUNDLE" . )
CHECKSUM="$(shasum -a 256 "$BUNDLE" | awk '{print $1}')"
echo "    version=$VERSION  size=$(du -h "$BUNDLE" | awk '{print $1}')  sha256=$CHECKSUM"
printf '{"version":"%s","checksum":"%s"}\n' "$VERSION" "$CHECKSUM" > "$TMP/$APP_KEY.json"

if [ "$MODE" = "--local" ]; then
  DEST="$ROOT/ota-backend-vps/public"
  mkdir -p "$DEST/bundles/$APP_KEY" "$DEST/manifest"
  cp "$BUNDLE" "$DEST/bundles/$APP_KEY/$VERSION.zip"
  cp "$TMP/$APP_KEY.json" "$DEST/manifest/$APP_KEY.json"
  echo "==> [local] wrote bundle + manifest into ota-backend-vps/public"
else
  load_ftp
  echo "==> [3/4] Uploading bundle over FTP to ${OTA_FTP_DIR}…"
  # zip first, manifest LAST — so the manifest never points at a not-yet-uploaded zip.
  lftp <<EOF
${LFTP_TLS}
open -u "${FTP_user},${FTP_pass}" "${FTP_host}"
set net:timeout 30
set net:max-retries 3
mkdir -p ${OTA_FTP_DIR}/bundles/${APP_KEY}
mkdir -p ${OTA_FTP_DIR}/manifest
put "$BUNDLE" -o ${OTA_FTP_DIR}/bundles/${APP_KEY}/${VERSION}.zip
put "$TMP/$APP_KEY.json" -o ${OTA_FTP_DIR}/manifest/${APP_KEY}.json
bye
EOF
  echo "==> [4/4] Published."
fi

rm -rf "$TMP"
echo "==> Done. Devices on a version < $VERSION will pull $VERSION on next launch."
