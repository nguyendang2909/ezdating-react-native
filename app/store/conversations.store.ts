import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.ConversationState = {
  data: [],
  pagination: {
    cursors: {
      after: null,
      before: null,
    },
  },
  messages: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    updateConversationByMessage: (
      state,
      action: PayloadAction<Entity.Message>,
    ) => {
      const message = action.payload;

      state.data = state.data.map(item => {
        if (message._matchId === item._id) {
          return {
            ...item,
            lastMessage: message.text,
            _lastMessageUserId: message._userId,
            lastMessageAt: message._userId,
          };
        }
        return item;
      });
    },
    receiveMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;

      if (matchId) {
        const oldMessages = state.messages[matchId];

        if (oldMessages) {
          state.messages[matchId].data = [payload].concat(
            state.messages[matchId].data || [],
          );
        } else {
          state.messages[matchId] = {
            data: [payload],
          };
        }
      }
    },
    sendMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;

      if (!matchId) {
        return;
      }

      const messages = state.messages[matchId];

      if (messages) {
        state.messages[matchId].data = [payload].concat(
          state.messages[matchId].data || [],
        );
      } else {
        state.messages[matchId] = {
          data: [payload],
        };
      }
    },
    updateMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;

      const { uuid, _matchId } = payload;

      if (!_matchId || !uuid) {
        return;
      }

      if (state.messages[_matchId]) {
        const messagesLength = state.messages[_matchId].data.length;

        for (let i = 0; i < messagesLength; i += 1) {
          if (uuid === state.messages[_matchId].data[i].uuid) {
            state.messages[_matchId].data[i] = payload;
          }
        }
      } else {
        state.messages[_matchId] = {
          data: [payload],
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.pagination = {
        cursors: {
          after: null,
          before: null,
        },
      };
      state.messages = {};
    });
    builder.addMatcher(
      api.endpoints.getNextConversations.matchFulfilled,
      (state, action) => {
        const { data: conversationsData, pagination: paginationData } =
          action.payload;

        if (!conversationsData || !paginationData) {
          return;
        }

        state.data = state.data.concat(conversationsData);

        state.pagination = paginationData;
      },
    );
    builder.addMatcher(
      api.endpoints.getNextMessages.matchFulfilled,
      (state, action) => {
        const { data: messagesData, pagination, _matchId } = action.payload;

        if (!messagesData || !pagination || !_matchId) {
          return;
        }

        const oldConversation = state.messages[_matchId];

        if (!oldConversation) {
          state.messages[_matchId] = {
            pagination,
            data: messagesData,
          };
        } else {
          state.messages[_matchId] = {
            pagination,
            data: (oldConversation.data || []).concat(messagesData),
          };
        }
      },
    );
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
