import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { api } from '../services/api';
import { appReducer } from './app.store';
import { conversationReducer } from './conversations.store';
import { likedMeReducer } from './liked-me.store';
import { likeReducer } from './likes.store';
import { matchReducer } from './matches.store';
import { messageReducer } from './messages.store';
import { nearbyUserReducer } from './nearby-user.store';
import { appSaga } from './saga';
import { swipeUserReducer } from './swipe-user.store';
// import theme from './theme';
import { userReducer } from './user.store';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

const reducers = combineReducers({
  // theme,
  [api.reducerPath]: api.reducer,
  conversation: conversationReducer,
  match: matchReducer,
  user: userReducer,
  app: appReducer,
  like: likeReducer,
  likedMe: likedMeReducer,
  nearbyUser: nearbyUserReducer,
  swipeUser: swipeUserReducer,
  messages: messageReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'theme',
      'auth',
      'app',
      'conversation',
      'match',
      'user',
      'like',
      'likedMe',
      'nearbyUser',
      'swipeUser',
      'messages',
    ],
  },
  reducers,
);

export const store = configureStore({
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

export const persistor = persistStore(store);

setupListeners(store.dispatch);

sagaMiddleware.run(appSaga);

export const dispatch = store.dispatch;

export const getState = store.getState();
