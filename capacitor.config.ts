import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptocalk.calculator',
  appName: 'CryptoCalk',
  webDir: 'dist',
  server: {
    url: 'https://cryptocalk.com',
    cleartext: false,
    androidScheme: 'https',
    allowNavigation: ['cryptocalk.com', '*.cryptocalk.com', '*.google.com', '*.googlesyndication.com', '*.doubleclick.net', '*.googleadservices.com'],
  },
  plugins: {
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
