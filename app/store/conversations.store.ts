import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.ConversationState = {};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.Match[]>) => {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.Match[]>) {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      if (!state.data) {
        state.data = payload;
      }

      state.data = state.data.concat(payload);
    },

    updateConversationByMessage: (
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
          };

          return;
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
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
