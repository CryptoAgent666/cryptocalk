#!/bin/bash
set -euo pipefail

# CryptoCalk OTA publisher (VPS) — build the web bundle and ship it to ota.cryptocalk.com.
# Same self-hosted Capgo pattern as CALK-AU. See ota-backend-vps/README.md.
#
# Usage:
#   scripts/ota-publish.sh <version>            publish to the VPS (rsync over SSH)
#   scripts/ota-publish.sh <version> --local    write into ota-backend-vps/public for local testing
#
# <version> MUST be greater than the binary's versionName/MARKETING_VERSION (e.g. 1.0.1),
# so each version is offered to devices exactly once and never downgrades.

APP_KEY="crypto"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

VERSION="${1:?usage: ota-publish.sh <version> [--local]}"
MODE="${2:-}"

# VPS connection config (override in scripts/ota.env — copy from ota.env.example).
[ -f "$ROOT/scripts/ota.env" ] && . "$ROOT/scripts/ota.env"
OTA_SSH="${OTA_SSH:-root@176.97.68.234}"
OTA_REMOTE_DIR="${OTA_REMOTE_DIR:-/var/www/www-root/data/www/ota.cryptocalk.com}"
OTA_SSH_PORT="${OTA_SSH_PORT:-22}"

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
  SSH_CMD="ssh -p $OTA_SSH_PORT"
  echo "==> [3/4] Uploading bundle to VPS ($OTA_SSH)…"
  $SSH_CMD "$OTA_SSH" "mkdir -p '$OTA_REMOTE_DIR/bundles/$APP_KEY' '$OTA_REMOTE_DIR/manifest'"
  rsync -az -e "$SSH_CMD" "$BUNDLE" "$OTA_SSH:$OTA_REMOTE_DIR/bundles/$APP_KEY/$VERSION.zip"

  # Upload the manifest LAST, so it never points at a not-yet-uploaded zip.
  echo "==> [4/4] Updating manifest…"
  rsync -az -e "$SSH_CMD" "$TMP/$APP_KEY.json" "$OTA_SSH:$OTA_REMOTE_DIR/manifest/$APP_KEY.json"
fi

rm -rf "$TMP"
echo "==> Done. Devices on a version < $VERSION will pull $VERSION on next launch."
