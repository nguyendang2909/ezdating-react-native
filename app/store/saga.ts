import { takeLatest } from 'redux-saga/effects';

import {
  initializeWebSocket,
  sendMessage,
  socketActionTypes,
} from './socket.store';

export function* appSaga() {
  yield takeLatest(
    socketActionTypes.INITIALIZE_WEB_SOCKET,
    initializeWebSocket,
  );
  yield takeLatest(socketActionTypes.SEND_MESSAGE, sendMessage);
}
