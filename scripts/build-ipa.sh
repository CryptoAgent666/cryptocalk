#!/usr/bin/env bash
# Build a manually-signed App Store .ipa for CryptoCalk, ready to drop into Transporter.
# Same approach as the rest of the Calk network (KZ/NZ/UK/AU): your installed
# "Apple Distribution" cert + an App Store provisioning profile you create on
# developer.apple.com (no auto-signing, so no Xcode account / device required).
#
# Prereq (one-time, developer.apple.com → Certificates, Identifiers & Profiles):
#   1. Identifiers → register App ID  com.cryptocalk.calculator
#   2. Profiles → App Store → App ID com.cryptocalk.calculator → cert "Apple Distribution"
#      → download → either double-click to install, or just leave it in ~/Downloads
#      (this script auto-installs it). Suggested name: "CryptoCalk App Store".
# Then: npm run ipa   →   ios/build/export/App.ipa   →   Transporter → Deliver.
set -euo pipefail
cd "$(dirname "$0")/.."

TEAM="SRKYS78RMQ"                       # App Store team (same across the Calk network)
BUNDLE="com.cryptocalk.calculator"
PROJ="ios/App/App.xcodeproj"
SCHEME="App"
BUILD="ios/build"
ARCHIVE="$BUILD/App.xcarchive"
EXPORT="$BUILD/export"
INSTALL_DIR="$HOME/Library/MobileDevice/Provisioning Profiles"
PROFILE_DIRS=(
  "$INSTALL_DIR"
  "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles"
)
mkdir -p "$INSTALL_DIR"

# 1a) auto-install a freshly downloaded profile from ~/Downloads
while IFS= read -r dl; do
  plist=$(security cms -D -i "$dl" 2>/dev/null) || continue
  [ "$(printf '%s' "$plist" | plutil -extract Entitlements.application-identifier raw - 2>/dev/null)" = "$TEAM.$BUNDLE" ] || continue
  uuid=$(printf '%s' "$plist" | plutil -extract UUID raw - 2>/dev/null)
  cp -f "$dl" "$INSTALL_DIR/$uuid.mobileprovision"
  echo "→ installed profile from Downloads ($uuid)"
done < <(find "$HOME/Downloads" -maxdepth 1 -name '*.mobileprovision' 2>/dev/null)

# 1b) find the installed App Store profile for this bundle and read its exact name
PROFILE_NAME=""
for D in "${PROFILE_DIRS[@]}"; do
  [ -d "$D" ] || continue
  while IFS= read -r p; do
    plist=$(security cms -D -i "$p" 2>/dev/null) || continue
    [ "$(printf '%s' "$plist" | plutil -extract Entitlements.application-identifier raw - 2>/dev/null)" = "$TEAM.$BUNDLE" ] || continue
    PROFILE_NAME=$(printf '%s' "$plist" | plutil -extract Name raw - 2>/dev/null)
    break 2
  done < <(find "$D" -name '*.mobileprovision' 2>/dev/null)
done

if [ -z "$PROFILE_NAME" ]; then
  echo "✗ No installed App Store provisioning profile for $BUNDLE."
  echo "  Create it at developer.apple.com (Profiles → App Store → App ID $BUNDLE),"
  echo "  download and drop it in ~/Downloads (or double-click to install), then re-run."
  exit 1
fi
echo "✓ Profile: \"$PROFILE_NAME\"  (team $TEAM, cert Apple Distribution)"

# 1c) keep the project's Release specifier in sync with the actual profile name
CUR=$(grep -m1 'PROVISIONING_PROFILE_SPECIFIER' "$PROJ/project.pbxproj" | sed -E 's/.*= "(.*)";/\1/' || true)
if [ "$CUR" != "$PROFILE_NAME" ]; then
  sed -i '' "s/PROVISIONING_PROFILE_SPECIFIER = \"[^\"]*\";/PROVISIONING_PROFILE_SPECIFIER = \"$PROFILE_NAME\";/" "$PROJ/project.pbxproj"
  echo "→ set project Release profile specifier to \"$PROFILE_NAME\""
fi

# 2) refresh the bundled web + sync iOS
echo "→ building web bundle + syncing iOS…"
npm run build:ios

# 3) ExportOptions for a manually-signed App Store export
mkdir -p "$BUILD"
cat > "$BUILD/ExportOptions.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>method</key><string>app-store-connect</string>
  <key>teamID</key><string>$TEAM</string>
  <key>signingStyle</key><string>manual</string>
  <key>signingCertificate</key><string>Apple Distribution</string>
  <key>provisioningProfiles</key><dict>
    <key>$BUNDLE</key><string>$PROFILE_NAME</string>
  </dict>
  <key>uploadSymbols</key><true/>
  <key>destination</key><string>export</string>
</dict></plist>
PLIST

# 4) archive (Release, device) — signing comes from the App target's Release config
# (Manual + Apple Distribution + the profile). No global signing flags here, or they
# would wrongly hit the SPM library targets (Alamofire/ZIPFoundation/Capacitor).
rm -rf "$ARCHIVE" "$EXPORT"
echo "→ archiving…"
xcodebuild -project "$PROJ" -scheme "$SCHEME" -configuration Release \
  -destination 'generic/platform=iOS' -archivePath "$ARCHIVE" \
  archive

# 5) export the .ipa
echo "→ exporting .ipa…"
xcodebuild -exportArchive -archivePath "$ARCHIVE" \
  -exportOptionsPlist "$BUILD/ExportOptions.plist" -exportPath "$EXPORT"

IPA=$(ls "$EXPORT"/*.ipa 2>/dev/null | head -1)
echo
echo "✅ Done:  $IPA"
echo "   Open Transporter → drag this .ipa in → Deliver."
