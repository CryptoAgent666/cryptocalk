import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptocalk.calculator',
  appName: 'CryptoCalk',
  webDir: 'dist',
  server: {
    url: 'https://cryptocalk.com',
    cleartext: false,
    androidScheme: 'https',
    // Falls back to local files when offline
    errorPath: 'index.html',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0f172a',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f172a',
    },
  },
};

export default config;
