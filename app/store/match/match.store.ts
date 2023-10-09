import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from 'app/services/api';
import { matchesService } from 'app/services/matches.service';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { SocketRequest } from 'app/types/socket-request.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.MatchState = {
  data: [],
  infoMatches: {
    isReachedEnd: true,
  },
  infoConversations: {
    isReachedEnd: true,
  },
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    // Matches
    addMatch: (
      state,
      {
        payload: { data, currentUserId },
      }: PayloadAction<{ data: Entity.Match; currentUserId: string }>,
    ) => {
      const match = matchesService.formatOne(data, currentUserId);
      state.data = matchesService.sortAndUniq([match], state.data);
    },

    // Conversations
    updateWhenUpdateSentMessage: (
      state,
      { payload }: PayloadAction<Entity.Message>,
    ) => {
      const stateIndex = state.data.findIndex(e => e._id === payload._matchId);
      if (stateIndex >= 0) {
        state.data[stateIndex] = {
          ...state.data[stateIndex],
          lastMessageAt: payload.createdAt,
          lastMessage: payload.text,
          _lastMessageUserId: payload._userId,
          _lastMessageId: payload._id,
          read: true,
        };
      }
      state.data = matchesService.sortAndUniq([], state.data);
    },

    updateWhenReceivingMessage: (
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
      if (!state.data.length) {
        return;
      }
      const matchIndex = state.data.findIndex(item => item._id === matchId);
      if (matchIndex >= 0) {
        state.data[matchIndex].read = true;
      }
    },

    // refreshConversations: (
    //   state,
    //   {
    //     payload: { data, pagination },
    //   }: PayloadAction<ApiResponse.Conversations>,
    // ) => {
    //   state.infoConversations = {
    //     ...state.infoConversations,
    //     isReachedEnd: !pagination._next,
    //     lastRefreshedAt: moment().toISOString(),
    //   };
    //   const matches = matchesService.formatMany(data);
    //   state.data = matchesService.sortAndUniq(matches, state.data);
    // },

    // addManyNewestConversations: (
    //   state,
    //   {
    //     payload: { data, pagination },
    //   }: PayloadAction<ApiResponse.Conversations>,
    // ) => {
    //   state.infoConversations = {
    //     ...state.infoConversations,
    //     isReachedEnd: !pagination._next,
    //     lastRefreshedAt: moment().toISOString(),
    //   };
    //   const matches = matchesService.formatMany(data);
    //   state.data = matchesService.sortAndUniq(matches, state.data);
    // },

    // addManyNextConversations: (
    //   state,
    //   { payload: { data, pagination } }: PayloadAction<ApiResponse.Matches>,
    // ) => {
    //   state.infoConversations = {
    //     ...state.infoConversations,
    //     isReachedEnd: !pagination._next,
    //     lastRefreshedAt: moment().toISOString(),
    //   };
    //   const matches = matchesService.formatMany(data);
    //   state.data = matchesService.sortAndUniq(matches, state.data);
    // },

    // updateConversationsRefreshTime: state => {
    //   state.infoConversations.lastRefreshedAt = moment().toISOString();
    // },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.infoConversations = {};
      state.infoMatches = {};
    });

    builder
      .addMatcher(
        endpoints.refreshMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.getNewestMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.getNextMatches.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoMatches = {
            ...state.infoMatches,
            isReachedEnd: !pagination._next,
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.refreshConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.getNewestConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.getNextConversations.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.infoConversations = {
            ...state.infoConversations,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = matchesService.formatMany(data);
          state.data = matchesService.sortAndUniq(matches, state.data);
        },
      );
  },
});

export const matchActions = matchSlice.actions;

export const matchSelects = {
  conversations: (state: AppStore.RootState) => {
    return state.match.data.filter(e => !!e.lastMessageAt);
  },
  matches: (state: AppStore.RootState) => {
    return state.match.data.filter(e => !e.lastMessageAt);
  },
};

export const matchReducer = matchSlice.reducer;
