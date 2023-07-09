import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { MMKV } from 'react-native-mmkv';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  Storage,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { api } from '../services/api';
import { appReducer } from './app.store';
import { conversationReducer } from './conversations.store';
import { appSaga } from './saga';
import theme from './theme';
import { userReducer } from './user.store';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

const reducers = combineReducers({
  theme,
  [api.reducerPath]: api.reducer,
  conversation: conversationReducer,
  user: userReducer,
  app: appReducer,
});

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: reduxStorage,
    whitelist: ['theme', 'auth', 'app'],
  },
  reducers,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActionPaths: [
        //   'meta.createdAt',
        //   'payload.createdAt',
        //   'createdAt',
        //   'meta.baseQueryMeta.request',
        // ],
        // ignoredPaths: ['meta.baseQueryMeta.request'],
      },
    }).concat(api.middleware, sagaMiddleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

sagaMiddleware.run(appSaga);

export { persistor, store };
