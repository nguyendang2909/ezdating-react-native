import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { conversationsService } from 'app/services/conversations.service';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { SocketRequest } from 'app/types/socket-request.type';

import { appActions } from './app.store';

const initialState: AppStore.ConversationState = {
  data: [],
  info: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMany: (state, { payload }: PayloadAction<Entity.Match[]>) => {
      const stateData = state.data;
      if (!stateData.length) {
        state.data = payload;
        return;
      }

      if (!payload.length) {
        return;
      }

      state.data = conversationsService.sortAndUniq(payload, stateData);
    },
    updateOne(state, { payload }: PayloadAction<Entity.Match>) {
      // if (!state.data?.length) {
      //   return;
      // }
      // state.data = _.chain([payload, ...state.data])
      //   .uniqBy('_id')
      //   .orderBy('desc') as unknown as Entity.Match[];
    },

    updateConversationWhenUpdateSentMessage: (
      state,
      action: PayloadAction<Entity.Message>,
    ) => {
      if (!state.data?.length) {
        return;
      }
      const message = action.payload;
      const stateDataLength = state.data.length;
      for (let i = 0; i < stateDataLength; i += 1) {
        const stateData = state.data[i];
        if (stateData._id === message._matchId) {
          state.data[i] = {
            ...stateData,
            lastMessage: message.text,
            _lastMessageUserId: message._userId,
            lastMessageAt: message._userId,
            read: true,
          };
          return;
        }
      }
    },

    updateConversationWhenReceivingMessage: (
      state,
      action: PayloadAction<Entity.Message>,
    ) => {
      if (!state.data?.length) {
        return;
      }
      const message = action.payload;
      const stateDataLength = state.data.length;
      for (let i = 0; i < stateDataLength; i += 1) {
        const stateData = state.data[i];
        if (stateData._id === message._matchId) {
          state.data[i] = {
            ...stateData,
            lastMessage: message.text,
            _lastMessageUserId: message._userId,
            lastMessageAt: message._userId,
            read: false,
          };
          return;
        }
      }
    },

    readMessage: (state, action: PayloadAction<SocketRequest.ReadMessage>) => {
      const { payload } = action;
      const matchId = payload.matchId;
      if (!state.data?.length) {
        return;
      }
      const matchIndex = state.data.findIndex(item => item._id === matchId);
      if (matchIndex >= 0) {
        state.data[matchIndex].read = true;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
    });
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
