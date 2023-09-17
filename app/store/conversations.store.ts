import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.ConversationState = {
  data: [],
  pagination: {
    cursors: {
      next: null,
      prev: null,
    },
  },
  messages: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addConversations: (state, action: PayloadAction<Entity.Match[]>) => {
      state.data = action.payload;
    },
    updateConversationByMessage: (
      state,
      action: PayloadAction<Entity.Message>,
    ) => {
      if (!state.data) {
        return;
      }

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

      if (!matchId) {
        return;
      }

      if (!state.messages) {
        state.messages = {
          [matchId]: {
            data: [payload],
          },
        };

        return;
      }

      const oldMessages = state.messages[matchId];

      if (!oldMessages) {
        state.messages[matchId] = {
          data: [payload],
        };

        return;
      }

      state.messages[matchId].data = [payload].concat(
        state.messages[matchId].data || [],
      );
    },
    sendMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;

      if (!matchId) {
        return;
      }

      if (!state.messages) {
        state.messages = {
          [matchId]: {
            data: [payload],
          },
        };

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

      const { uuid, _matchId: matchId } = payload;

      if (!matchId || !uuid) {
        return;
      }

      if (!state.messages) {
        state.messages = {
          [matchId]: {
            data: [payload],
          },
        };
      }

      if (!state.messages[matchId]) {
        state.messages[matchId] = {
          data: [payload],
        };
      }

      if (!state.messages[matchId].data?.length) {
        state.messages[matchId].data = [payload];

        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const messagesLength = state.messages[matchId].data.length;

      for (let i = 0; i < messagesLength; i += 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (uuid === state.messages[matchId].data[i].uuid) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          state.messages[matchId].data[i] = payload;

          return;
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.pagination = {
        cursors: {
          next: null,
          prev: null,
        },
      };
      state.messages = {};
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
