import 'react-native-get-random-values';

import { PayloadAction } from '@reduxjs/toolkit';
import Config from 'app/config';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { FormParams } from 'app/types/form-params.type';
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
          case 'msg':
            yield put(conversationActions.receiveMsg(data));
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
    socket.on('msg', (msg: Entity.Message) => {
      emit({ type: 'msg', data: msg });
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
  sendMessage: (payload: FormParams.SendMessage) => ({
    type: socketActionTypes.SEND_MESSAGE,
    payload,
  }),
};

export const socketActionTypes = {
  INITIALIZE_WEB_SOCKET: 'INITIALIZE_WEB_SOCKET',
  SEND_MESSAGE: 'SEND_MESSAGE',
};

export function* sendMessage(data: PayloadAction<FormParams.SendMessage>) {
  const msg = data.payload;

  if (socket) {
    const socketMessage = {
      relationshipId: msg.relationshipId,
      text: msg.text,
      uuid: msg._id,
    };
    socket.emit('sendMsg', socketMessage);
  }

  const { relationshipId, replyMessageId, user, createdAt, ...msgProps } = msg;

  const message: AppStore.MessageState = {
    ...msg,
    createdAt: createdAt.toString(),
    relationship: {
      id: relationshipId,
    },
    uuid: msgProps._id as string,
    user: {
      _id: user._id,
      id: user._id as string,
      avatar: user.avatar as string,
    },
  };

  yield put(conversationActions.sendMsg(message));
}
