/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 *
 * The functions are invoked from app.tsx and you can change the config there.
 *
 * Check out the "Custom Commands" section for some cool tools you can use,
 * customize, and make your own.
 *
 * Note that Fast Refresh doesn't play well with this file, so if you edit this,
 * do a full refresh of your app instead.
 *
 * @refresh reset
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS } from 'app/constants';
import { Platform } from 'react-native';
import { ArgType } from 'reactotron-core-client';

import { goBack, navigate, resetRoot } from '../../navigators/navigationUtilities';
import { clear } from '../../utils/storage';
import { Reactotron } from './reactotronClient';
import { DEFAULT_REACTOTRON_CONFIG, ReactotronConfig } from './reactotronConfig';
import { fakeReactotron } from './reactotronFake';

/**
 * We tell typescript we intend to hang Reactotron off of the console object.
 *
 * It'll live at console.tron, so you can use it like so:
 *
 *   console.tron.log('hello world')
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance,
     * and more. See https://github.com/infinitered/reactotron for more!
     */
    tron: typeof Reactotron;
  }
}

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = Reactotron; // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneak by our __DEV__ guards, we won't crash.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  console.tron = fakeReactotron;
}

const config = DEFAULT_REACTOTRON_CONFIG;

/**
 * Hook into the root store for doing awesome state-related things.
 *
 * @param rootStore The root store
 */
export function setReactotronRootStore() {
  // rootStore: RootStore,
  // initialData: RootStoreSnapshot,
  if (__DEV__) {
    const { logInitialState, logSnapshots } = config;
    // const name = 'ROOT STORE';

    // logging features
    if (logInitialState) {
      // Reactotron.display({
      //   name,
      //   value: initialData,
      //   preview: 'Initial State',
      // });
    }

    // log state changes?
    if (logSnapshots) {
      // onSnapshot(rootStore, snapshot => {
      //   Reactotron.display({ name, value: snapshot, preview: 'New State' });
      // });
    }

    // tracks the current redux-State-Tree tree in Reactotron's "State" tab
    // Reactotron.trackMstNode(rootStore);
  }
}

// Avoid setting up Reactotron multiple times with Fast Refresh
let _reactotronIsSetUp = false;

/**
 * Configure reactotron based on the the config settings passed in, then connect if we need to.
 */
export function setupReactotron(customConfig: ReactotronConfig = {}) {
  // only run this in dev... metro bundler will ignore this block: 🎉
  if (__DEV__) {
    // only setup once.
    if (_reactotronIsSetUp) return;

    // merge the passed in config with our default config
    Object.assign(config, customConfig);

    // configure reactotron
    Reactotron.configure({
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      name: config.name || require('../../../package.json').name,
      host: config.host,
    });

    // hookup middleware
    if (Platform.OS !== 'web') {
      if (config.useAsyncStorage) {
        if (Reactotron.setAsyncStorageHandler) {
          Reactotron.setAsyncStorageHandler(AsyncStorage);
        }
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      Reactotron.useReactNative({
        asyncStorage: config.useAsyncStorage ? undefined : false,
      });
    }

    // ignore some chatty `redux-state-tree` actions
    // const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/;

    // hookup redux-state-tree middleware
    // Reactotron.use(
    //   mst({
    //     filter: event => RX.test(event.name) === false,
    //   }),
    // );

    // connect to the app
    Reactotron.connect();

    /**
     * Reactotron allows you to define custom commands that you can run
     * from Reactotron itself, and they will run in your app.
     *
     * Define them in the section below with `onCustomCommand`. Use your
     * creativity -- this is great for development to quickly and easily
     * get your app into the state you want.
     */
    Reactotron.onCustomCommand({
      title: 'Reset Root Store',
      description: 'Resets the MST store',
      command: 'resetStore',
      handler: () => {
        if (Reactotron.log) {
          Reactotron.log('resetting store');
        }
        clear();
      },
    });

    Reactotron.onCustomCommand({
      title: 'Reset Navigation State',
      description: 'Resets the navigation state',
      command: 'resetNavigation',
      handler: () => {
        if (Reactotron.log) {
          Reactotron.log('resetting navigation state');
        }
        resetRoot({ index: 0, routes: [] });
      },
    });

    Reactotron.onCustomCommand({
      command: 'navigateTo',
      handler: args => {
        const { route } = args;
        if (route) {
          console.log(`Navigating to: ${route}`);
          navigate(route);
        } else {
          console.log('Could not navigate. No route provided.');
        }
      },
      title: 'Navigate To Screen',
      description: 'Navigates to a screen by name.',
      args: [
        {
          name: 'route',
          type: ArgType.String,
        },
      ],
    });

    Reactotron.onCustomCommand({
      title: 'Go Back',
      description: 'Goes back',
      command: 'goBack',
      handler: () => {
        if (Reactotron.log) {
          Reactotron.log('Going back');
        }
        goBack(SCREENS.Home, {
          screen: 'Profile',
        });
      },
    });

    // clear if we should
    if (config.clearOnLoad) {
      if (Reactotron.clear) {
        Reactotron.clear();
      }
    }

    _reactotronIsSetUp = true;
  }
}
