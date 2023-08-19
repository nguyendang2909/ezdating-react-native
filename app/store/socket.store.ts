import 'react-native-get-random-values';

import { PayloadAction } from '@reduxjs/toolkit';
import Config from 'app/config';
import { Constants } from 'app/constants';
import { Entity } from 'app/types/entity.type';
import { SocketRequest } from 'app/types/socket-request.type';
import { eventChannel } from 'redux-saga';
import { ActionPattern, call, put, select, take } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';

import { conversationActions } from './conversations.store';

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
          case Constants.socketEvents.toClient.newMessage:
            yield put(conversationActions.receiveMsg(data));
            break;
          case Constants.socketEvents.toClient.updateMessage:
            yield put(conversationActions.updateMsg(data));
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
    socket.on(
      Constants.socketEvents.toClient.newMessage,
      (msg: Entity.Message) => {
        emit({ type: Constants.socketEvents.toClient.newMessage, data: msg });
      },
    );
    socket.on(
      Constants.socketEvents.toClient.updateMessage,
      (msg: Entity.Message) => {
        emit({
          type: Constants.socketEvents.toClient.updateMessage,
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
};

export const socketActionTypes = {
  INITIALIZE_WEB_SOCKET: 'INITIALIZE_WEB_SOCKET',
  SEND_MESSAGE: 'SEND_MESSAGE',
};

export function* sendMessage(data: PayloadAction<SocketRequest.SendMessage>) {
  const { payload } = data;

  if (socket) {
    socket.emit(Constants.socketEvents.toServer.sendMessage, payload);
  }

  const currentUserId: string = yield select(state => state.app.profile._id);

  yield put(
    conversationActions.sendMsg({
      _id: payload.uuid,
      text: payload.text,
      _relationshipId: payload.relationshipId,
      uuid: payload.uuid,
      _userId: currentUserId,
    }),
  );
}
