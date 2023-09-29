import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { messagesService } from 'app/services/messages.service';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.MessageState = {
  data: {},
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<ApiResponse.MessagesData>) => {
      const { payload } = action;

      if (!payload._matchId || !payload.data) {
        return;
      }

      const messages = messagesService.formatMany(payload.data);

      if (!state.data) {
        state.data = {
          [payload._matchId]: messages,
        };
      }

      state.data[payload._matchId] = messages;
    },

    addManyNext(state, action: PayloadAction<ApiResponse.MessagesData>) {
      const { payload } = action;

      if (!payload._matchId || !payload.data) {
        return;
      }

      const messages = messagesService.formatMany(payload.data);

      if (!state.data) {
        state.data = {
          [payload._matchId]: messages,
        };

        return;
      }

      const oldMessages = state.data[payload._matchId];

      if (!oldMessages?.length) {
        state.data[payload._matchId] = messages;

        return;
      }

      state.data[payload._matchId] = oldMessages.concat(messages);
    },

    receiveMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;

      if (!matchId) {
        return;
      }

      const message = messagesService.formatOne(payload);

      if (!state.data) {
        state.data = {
          [matchId]: [message],
        };

        return;
      }

      const oldMessages = state.data[matchId];

      if (!oldMessages?.length) {
        state.data[matchId] = [message];

        return;
      }

      state.data[matchId] = [message].concat(oldMessages);
    },

    sendMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;

      if (!matchId) {
        return;
      }

      const message = messagesService.formatOne(payload);

      if (!state.data) {
        state.data = {
          [matchId]: [message],
        };

        return;
      }

      const oldMessages = state.data[matchId];

      if (!oldMessages?.length) {
        state.data[matchId] = [message];

        return;
      }

      state.data[matchId] = [message].concat(oldMessages);
    },

    updateMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;

      const { uuid, _matchId: matchId } = payload;

      if (!matchId || !uuid) {
        return;
      }

      const message = messagesService.formatOne(payload);

      if (!state.data) {
        state.data = {
          [matchId]: [message],
        };
      }

      const oldMessages = state.data[matchId];

      if (!oldMessages?.length) {
        state.data[matchId] = [message];

        return;
      }

      for (let i = 0; i < oldMessages.length; i += 1) {
        if (uuid === oldMessages[i].uuid) {
          (state.data[matchId] as AppStore.ChatMessage[])[i] = message;

          return;
        }
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

export const messageActions = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
