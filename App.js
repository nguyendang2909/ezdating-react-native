// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import { registerRootComponent } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { Platform } from 'react-native';

import App from './app/app.tsx';

SplashScreen.preventAutoHideAsync();

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

if (Platform.OS !== 'web') {
  registerRootComponent(IgniteApp);
}

export default IgniteApp;
