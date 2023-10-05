import 'react-native-get-random-values';

import { PayloadAction } from '@reduxjs/toolkit';
import Config from 'app/config';
import {
  SOCKET_TO_CLIENT_EVENTS,
  SOCKET_TO_SERVER_EVENTS,
} from 'app/constants';
import { Entity } from 'app/types/entity.type';
import { SocketRequest } from 'app/types/socket-request.type';
import { eventChannel } from 'redux-saga';
import { ActionPattern, call, put, select, take } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';

import { appActions } from './app.store';
import { matchActions } from './match.store';
import { messageActions } from './messages.store';

let socket: Socket;

function setupSocketIo(token: string) {
  disconnectWebSocket();
  return io(`${Config.API_URL}/chats`, {
    reconnection: true,
    query: {
      token,
    },
  });
}

export const getSocket = () => {
  return socket;
};

export function* initializeWebSocket() {
  try {
    const accessToken: string = yield select(state => state.app.accessToken);
    disconnectWebSocket();
    socket = setupSocketIo(accessToken);
    const socketChannel: ActionPattern = yield call(createSocketChannel);
    while (true) {
      try {
        const { type, data } = yield take(socketChannel);

        switch (type) {
          case 'connect':
            yield put(appActions.setSocketConnected());
            break;
          case SOCKET_TO_CLIENT_EVENTS.NEW_MESSAGE:
            yield put(messageActions.receiveMsg(data));
            yield put(matchActions.updateWhenReceivingMessage(data));
            break;
          case SOCKET_TO_CLIENT_EVENTS.UPDATE_SENT_MESSAGE:
            yield put(messageActions.updateMsg(data));
            yield put(matchActions.updateWhenUpdateSentMessage(data));
            break;
          default:
            break;
        }
      } catch (err) {}
    }
  } catch (err) {}
}

function createSocketChannel() {
  return eventChannel(emit => {
    socket.on('connect', () => {
      console.log('socket connected', socket.connected);
      emit({ type: 'connect' });
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.disconnected);
    });

    socket.on('error', msg => {
      console.log('====error====', msg);
    });

    socket.on(SOCKET_TO_CLIENT_EVENTS.NEW_MESSAGE, (msg: Entity.Message) => {
      emit({ type: SOCKET_TO_CLIENT_EVENTS.NEW_MESSAGE, data: msg });
    });

    socket.on(
      SOCKET_TO_CLIENT_EVENTS.UPDATE_SENT_MESSAGE,
      (msg: Entity.Message) => {
        emit({
          type: SOCKET_TO_CLIENT_EVENTS.UPDATE_SENT_MESSAGE,
          data: msg,
        });
      },
    );

    const unsubscribe = () => {
      socket.off('msg');
    };

    return unsubscribe;
  });
}

export function disconnectWebSocket() {
  if (socket) {
    socket.disconnect();
  }
}

export const socketStoreActions = {
  initializeWebSocket: () => ({
    type: socketActionTypes.INITIALIZE_WEB_SOCKET,
  }),
  sendMessage: (payload: SocketRequest.SendMessage) => ({
    type: socketActionTypes.SEND_MESSAGE,
    payload,
  }),
  readMessage: (payload: SocketRequest.ReadMessage) => ({
    type: socketActionTypes.READ_MESSAGE,
    payload,
  }),
};

export const socketActionTypes = {
  INITIALIZE_WEB_SOCKET: 'INITIALIZE_WEB_SOCKET',
  SEND_MESSAGE: 'SEND_MESSAGE',
  READ_MESSAGE: 'READ_MESSAGE',
};

export function* sendMessage(data: PayloadAction<SocketRequest.SendMessage>) {
  const { payload } = data;

  socket.emit(SOCKET_TO_SERVER_EVENTS.SEND_MESSAGE, payload);

  const currentUserId: string = yield select(state => state.app.profile._id);

  yield put(
    messageActions.sendMsg({
      _id: payload.uuid,
      text: payload.text,
      _matchId: payload.matchId,
      uuid: payload.uuid,
      _userId: currentUserId,
    }),
  );
}

export function* readMessage(data: PayloadAction<SocketRequest.ReadMessage>) {
  const { payload } = data;

  socket.emit(SOCKET_TO_SERVER_EVENTS.READ_MESSAGE, payload);

  yield put(matchActions.readMessage(payload));
}
