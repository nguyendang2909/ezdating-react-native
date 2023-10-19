import { createSlice } from '@reduxjs/toolkit';
import { endpoints } from 'app/api';
import { nearbyUsersService } from 'app/services/nearby-users.service';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.NearbyState = {
  data: [],
  info: {
    isReachedEnd: false,
  },
};

export const nearbyUserSlice = createSlice({
  name: 'nearbyUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
    builder
      .addMatcher(
        endpoints.refreshNearbyUsers.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = data;
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
        },
      )
      .addMatcher(
        endpoints.getNewestUsers.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = nearbyUsersService.sortAndUniq(data, state.data);
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
        },
      )
      .addMatcher(
        endpoints.getNextNearbyUsers.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = nearbyUsersService.sortAndUniq(data, state.data);
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
          };
        },
      );
  },
});

export const nearbyUserActions = nearbyUserSlice.actions;

export const nearbyUserReducer = nearbyUserSlice.reducer;
