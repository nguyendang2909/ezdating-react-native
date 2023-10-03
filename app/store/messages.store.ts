import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { messagesService } from 'app/services/messages.service';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';
import moment from 'moment';

import { appActions } from './app.store';

const initialState: AppStore.MessageState = {
  data: {},
  info: {},
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMany: (
      state,
      {
        payload: { _matchId: matchId, data: payloadData },
      }: PayloadAction<ApiResponse.MessagesData>,
    ) => {
      if (!matchId || !payloadData) {
        return;
      }

      const stateInfo = state.info[matchId];

      if (!stateInfo) {
        state.info[matchId] = {
          lastRefreshAt: moment().toDate().toISOString(),
        };
      } else {
        stateInfo.lastRefreshAt = moment().toDate().toISOString();
      }

      console.log(stateInfo.lastRefreshAt);

      const messages = messagesService.formatMany(payloadData);
      const stateData = state.data[matchId];
      if (!stateData?.length) {
        state.data[matchId] = messages;
        return;
      }
      state.data[matchId] = _.chain([...messages, ...stateData])
        .uniqBy('_id')
        .orderBy('desc')
        .value();
    },

    addManyNext(
      state,
      {
        payload: { _matchId: matchId, data: payloadData },
      }: PayloadAction<ApiResponse.MessagesData>,
    ) {
      if (!matchId || !payloadData) {
        return;
      }
      const messages = messagesService.formatMany(payloadData);
      const oldMessages = state.data[matchId];
      if (!oldMessages?.length) {
        state.data[matchId] = messages;
        return;
      }
      state.data[matchId] = oldMessages.concat(messages);
    },

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
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = {};
      state.info = {};
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
