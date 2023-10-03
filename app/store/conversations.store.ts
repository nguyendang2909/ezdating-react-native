import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { SocketRequest } from 'app/types/socket-request.type';
import _ from 'lodash';

import { appActions } from './app.store';

const initialState: AppStore.ConversationState = {};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addMany: (state, { payload }: PayloadAction<Entity.Match[]>) => {
      if (!state.data?.length) {
        state.data = payload;

        return;
      }

      if (!payload.length) {
        return;
      }

      state.data = _.chain([...payload, ...state.data])
        .uniqBy('_id')
        .orderBy('desc') as unknown as Entity.Match[];
    },

    // addManyNext(state, action: PayloadAction<Entity.Match[]>) {
    //   const { payload } = action;

    //   if (!payload.length) {
    //     return;
    //   }

    //   if (!state.data) {
    //     state.data = payload;
    //   }

    //   state.data = state.data.concat(payload);
    // },

    updateOne(state, { payload }: PayloadAction<Entity.Match>) {
      if (!state.data?.length) {
        return;
      }

      state.data = _.chain([payload, ...state.data])
        .uniqBy('_id')
        .orderBy('desc') as unknown as Entity.Match[];
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
      state.data = undefined;
    });
    // builder.addMatcher(
    //   api.endpoints.getNextConversations.matchFulfilled,
    //   (state, action) => {
    //     const { data: conversationsData, pagination: paginationData } =
    //       action.payload;

    //     if (!conversationsData || !paginationData) {
    //       return;
    //     }

    //     state.data = state.data.concat(conversationsData);

    //     state.pagination = paginationData;
    //   },
    // );
    // builder.addMatcher(
    //   api.endpoints.getNextMessages.matchFulfilled,
    //   (state, action) => {
    //     const { data: messagesData, pagination, _matchId } = action.payload;

    //     if (!messagesData || !pagination || !_matchId) {
    //       return;
    //     }

    //     const oldConversation = state.messages[_matchId];

    //     if (!oldConversation) {
    //       state.messages[_matchId] = {
    //         pagination,
    //         data: messagesData,
    //       };
    //     } else {
    //       state.messages[_matchId] = {
    //         pagination,
    //         data: (oldConversation.data || []).concat(messagesData),
    //       };
    //     }
    //   },
    // );
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
