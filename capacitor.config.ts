import type { CapacitorConfig } from '@capacitor/cli';

// Self-hosted OTA endpoint (PHP on our VPS) — same pattern as the rest of the Calk
// network (CALK-AU/UK/GE, KZ-CALK). statsUrl/channelUrl emptied so the plugin never
// contacts Capgo's cloud. Override for local testing:
//   CRYPTO_OTA_URL=http://localhost:8788 npx cap sync android
const OTA_BASE = process.env.CRYPTO_OTA_URL || 'https://ota.cryptocalk.com';

const config: CapacitorConfig = {
  appId: 'com.cryptocalk.calculator',
  appName: 'CryptoCalk',
  webDir: 'dist',
  server: {
    // Load from local dist/ files (no remote URL — required for Google Play compliance)
    androidScheme: 'https',
    // Only domains that should load AS PAGES inside WebView (not API fetch domains)
    allowNavigation: ['cryptocalk.com', '*.cryptocalk.com'],
  },
  plugins: {
    // Capgo live updates — fully self-hosted on our own VPS (PHP endpoint), like CALK-AU.
    // OTA updates the app's own web bundle (Play-compliant; NOT a remote webview).
    // Requires the web layer to call notifyAppReady() (see CapgoUpdater.astro) or it rolls back.
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: `${OTA_BASE}/updates.php`,
      statsUrl: '',
      channelUrl: '',
      appReadyTimeout: 10000,
      responseTimeout: 20,
      autoDeletePrevious: true,
      autoDeleteFailed: true,
      resetWhenUpdate: true,
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: '#0f172a',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f172a',
      overlaysWebView: false,
    },
  },
  android: {
    backgroundColor: '#0f172a',
  },
};

export default config;
