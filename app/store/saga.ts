import { takeLatest } from 'redux-saga/effects';

import { initializeWebSocket, readMessage, sendMessage, socketActionTypes } from './socket.store';

export function* appSaga() {
  yield takeLatest(socketActionTypes.INITIALIZE_WEB_SOCKET, initializeWebSocket);
  yield takeLatest(socketActionTypes.SEND_MESSAGE, sendMessage);
  yield takeLatest(socketActionTypes.READ_MESSAGE, readMessage);
}
