import { createSlice } from '@reduxjs/toolkit';
import { profileEndpoints } from 'app/api';
import { nearbyProfilesService } from 'app/services';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.NearbyState = {
  data: [],
  info: {
    isReachedEnd: false,
  },
};

export const nearbyProfileSlice = createSlice({
  name: 'nearbyProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
    builder
      .addMatcher(
        profileEndpoints.refreshNearbyProfiles.matchFulfilled,
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
        profileEndpoints.getNewestNearbyProfiles.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = nearbyProfilesService.sortAndUniq(data, []);
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
        },
      )
      .addMatcher(
        profileEndpoints.getNextNearbyProfiles.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = nearbyProfilesService.sortAndUniq(data, state.data);
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
          };
        },
      );
  },
});

export const nearbyProfileActions = nearbyProfileSlice.actions;

export const nearbyProfileReducer = nearbyProfileSlice.reducer;
