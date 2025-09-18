import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.071ae4b67378441896e1e88a1149f834',
  appName: 'fit-coach-bliss',
  webDir: 'dist',
  server: {
    url: 'https://071ae4b6-7378-4418-96e1-e88a1149f834.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#10b981',
      showSpinner: false,
    },
  },
};

export default config;