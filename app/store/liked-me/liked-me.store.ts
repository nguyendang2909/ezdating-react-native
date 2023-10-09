import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from 'app/services/api';
import { likedMeService } from 'app/services/liked-me.service';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.LikedMeState = {
  data: [],
  info: {},
};

export const likedMeSlice = createSlice({
  name: 'likedMe',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
    builder
      .addMatcher(
        endpoints.refreshLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const likes = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(likes, state.data);
        },
      )
      .addMatcher(
        endpoints.getNewestLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
          const matches = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(matches, state.data);
        },
      )
      .addMatcher(
        endpoints.getNextLikedMe.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
          };
          const matches = likedMeService.formatMany(data);
          state.data = likedMeService.sortAndUniq(matches, state.data);
        },
      );
  },
});

export const likedMeActions = likedMeSlice.actions;

export const likedMeReducer = likedMeSlice.reducer;