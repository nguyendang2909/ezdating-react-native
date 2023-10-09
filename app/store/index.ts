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
import thunk from 'redux-thunk';

import { api } from '../services/api';
import { appReducer } from './app.store';
import { likedMeReducer } from './liked-me/liked-me.store';
import { likeReducer } from './likes.store';
import { matchReducer } from './match/match.store';
import { messageReducer } from './message/message.store';
import { nearbyUserReducer } from './nearby-user/nearby-user.store';
import { appSaga } from './saga';
import { swipeUserReducer } from './swipe-user.store';
// import theme from './theme';
import { userReducer } from './user.store';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

const reducers = combineReducers({
  // theme,
  [api.reducerPath]: api.reducer,
  match: matchReducer,
  user: userReducer,
  app: appReducer,
  like: likeReducer,
  likedMe: likedMeReducer,
  nearbyUser: nearbyUserReducer,
  swipeUser: swipeUserReducer,
  message: messageReducer,
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
      'message',
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
    }).concat(api.middleware, sagaMiddleware, thunk);

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
