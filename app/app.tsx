import './utils/ignoreWarnings';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Config from './config';
import { nativeBaseConfig } from './config/native-base.config';
import { ConnectProfile } from './containers/Connect/ConnectProfile';
import { ConnectSocket } from './containers/Connect/ConnectSocket';
import { translators } from './locales';
import { language } from './locales/locale';
import { AppNavigator, useNavigationPersistence } from './navigators';
import { ErrorBoundary } from './screens/ErrorScreen/ErrorBoundary';
import { setupReactotron } from './services/reactotron';
import { persistor, store } from './store';
import { customFontsToLoad, gluestackUIConfig } from './theme';
import { defaultTheme } from './theme/default-theme';
import * as storage from './utils/storage';

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: 'localhost',
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
});

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

// Web linking configuration
const prefix = Linking.createURL('/');
const config = {
  screens: {
    Login: {
      path: '',
    },
    Welcome: 'welcome',
    Demo: {
      screens: {
        DemoShowroom: {
          path: 'showroom/:queryIndex?/:itemIndex?',
        },
        DemoDebug: 'debug',
        DemoPodcastList: 'podcast',
        DemoCommunity: 'community',
      },
    },
  },
};

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const [areFontsLoaded] = useFonts(customFontsToLoad);

  // const { rehydrated } = useInitialRootStore(() => {
  // This runs after the root store has been initialized and rehydrated.

  // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
  // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
  // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
  // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
  setTimeout(hideSplashScreen, 500);
  // });

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  // if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null;
  if (!isNavigationStateRestored || !areFontsLoaded) return null;

  const linking = {
    prefixes: [prefix],
    config,
  };

  // otherwise, we're ready to render the app
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectSocket />
        <ConnectProfile />
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <GluestackUIProvider config={gluestackUIConfig}>
              <NativeBaseProvider theme={defaultTheme} config={nativeBaseConfig}>
                <ActionSheetProvider>
                  <IntlProvider
                    defaultLocale="en"
                    locale={language}
                    messages={translators[language] || translators.en}
                  >
                    <AppNavigator
                      linking={linking}
                      initialState={initialNavigationState}
                      onStateChange={onNavigationStateChange}
                    />
                    <Toast />
                  </IntlProvider>
                </ActionSheetProvider>
              </NativeBaseProvider>
            </GluestackUIProvider>
          </ErrorBoundary>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
