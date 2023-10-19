import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from 'app/api';
import { messagesService } from 'app/services/messages.service';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.MessageState = {
  data: {},
  info: {},
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    receiveMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const matchId = payload._matchId;
      if (!matchId) {
        return;
      }
      const message = messagesService.formatOne(payload);
      const oldMessages = state.data[matchId];
      if (!oldMessages?.length) {
        state.data[matchId] = [message];
        return;
      }
      state.data[matchId] = [message].concat(oldMessages);
    },

    sendMsg: (state, { payload }: PayloadAction<Entity.Message>) => {
      const matchId = payload._matchId;
      if (!matchId) {
        return;
      }
      const message = messagesService.formatOne(payload, { sent: false });
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
      const message = messagesService.formatOne(payload, { sent: true });

      const oldMessages = state.data[matchId];

      if (!oldMessages?.length) {
        state.data[matchId] = [message];

        return;
      }

      for (let i = 0; i < oldMessages.length; i += 1) {
        if (uuid === oldMessages[i].uuid) {
          oldMessages[i] = message;

          return;
        }
      }
    },

    updateRefreshTime: (state, { payload: { matchId } }: PayloadAction<{ matchId: string }>) => {
      const lastRefreshedAt = moment().toISOString();
      if (!state.info[matchId]) {
        state.info[matchId] = {
          lastRefreshedAt,
        };
        return;
      }
      state.info[matchId].lastRefreshedAt = lastRefreshedAt;
    },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = {};
      state.info = {};
    });
    builder
      .addMatcher(
        endpoints.refreshMessages.matchFulfilled,
        (state, { payload: { _matchId, data, pagination } }) => {
          state.info[_matchId] = {
            ...state.info[_matchId],
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const messages = messagesService.formatMany(data);
          const stateData = state.data[_matchId];
          state.data[_matchId] = messagesService.sortAndUniq(messages, stateData || []);
        },
      )
      .addMatcher(
        endpoints.getNewestMessages.matchFulfilled,
        (state, { payload: { _matchId, data, pagination } }) => {
          state.info[_matchId] = {
            ...state.info[_matchId],
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const messages = messagesService.formatMany(data);
          const stateData = state.data[_matchId];
          state.data[_matchId] = messagesService.sortAndUniq(messages, stateData || []);
        },
      )
      .addMatcher(
        endpoints.getNewestMessages.matchFulfilled,
        (state, { payload: { _matchId, data, pagination } }) => {
          state.info[_matchId] = {
            ...state.info[_matchId],
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const messages = messagesService.formatMany(data);
          const stateData = state.data[_matchId];
          state.data[_matchId] = messagesService.sortAndUniq(messages, stateData || []);
        },
      );
  },
});

export const messageActions = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
