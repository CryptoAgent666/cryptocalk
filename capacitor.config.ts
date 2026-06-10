import type { CapacitorConfig } from '@capacitor/cli';

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
    CapacitorUpdater: {
      // OTA web-bundle updates (Play-compliant: updates JS/HTML/CSS, not a remote webview).
      // autoUpdate checks Capgo on launch, downloads in background, applies on next launch.
      // Requires the web layer to call notifyAppReady() (see CapgoUpdater.astro) or it rolls back.
      autoUpdate: true,
      appReadyTimeout: 15000,
      responseTimeout: 20,
      autoDeletePrevious: true,
      autoDeleteFailed: true,
      resetWhenUpdate: true,
      // Capgo Cloud by default. For self-hosting on the VPS, set:
      //   updateUrl:  'https://cryptocalk.com/capgo/updates',
      //   statsUrl:   'https://cryptocalk.com/capgo/stats',
      //   channelUrl: 'https://cryptocalk.com/capgo/channel',
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
