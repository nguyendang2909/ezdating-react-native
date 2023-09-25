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

import { conversationActions } from './conversations.store';
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
          case SOCKET_TO_CLIENT_EVENTS.NEW_MESSAGE:
            yield put(messageActions.receiveMsg(data));
            yield put(conversationActions.updateConversationByMessage(data));
            break;
          case SOCKET_TO_CLIENT_EVENTS.UPDATE_MESSAGE:
            yield put(messageActions.updateMsg(data));
            yield put(conversationActions.updateConversationByMessage(data));
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

    socket.on(SOCKET_TO_CLIENT_EVENTS.UPDATE_MESSAGE, (msg: Entity.Message) => {
      emit({
        type: SOCKET_TO_CLIENT_EVENTS.UPDATE_MESSAGE,
        data: msg,
      });
    });

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
};

export const socketActionTypes = {
  INITIALIZE_WEB_SOCKET: 'INITIALIZE_WEB_SOCKET',
  SEND_MESSAGE: 'SEND_MESSAGE',
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
