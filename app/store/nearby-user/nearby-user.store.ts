import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from 'app/services/api';
import { nearbyUsersService } from 'app/services/nearby-users.service';
import { ApiResponse } from 'app/types';
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
  reducers: {
    refreshMany: (
      state,
      { payload: { data, pagination } }: PayloadAction<ApiResponse.Users>,
    ) => {
      // state.data = data;
      // state.info = {
      //   ...state.info,
      //   isReachedEnd: !pagination._next,
      //   lastRefreshedAt: moment().toISOString(),
      // };
    },

    // addManyNewest: (
    //   state,
    //   { payload: { data, pagination } }: PayloadAction<ApiResponse.Users>,
    // ) => {
    //   state.data = nearbyUsersService.sortAndUniq(data, state.data);
    //   state.info = {
    //     ...state.info,
    //     isReachedEnd: !pagination._next,
    //     lastRefreshedAt: moment().toISOString(),
    //   };
    // },

    addManyNext: (
      state,
      { payload: { data, pagination } }: PayloadAction<ApiResponse.Users>,
    ) => {
      // state.data = nearbyUsersService.sortAndUniq(data, state.data);
      // state.info = {
      //   ...state.info,
      //   isReachedEnd: !pagination._next,
      //   lastRefreshedAt: moment().toISOString(),
      // };
    },

    updateRefreshTime: state => {
      state.info.lastRefreshedAt = moment().toISOString();
    },
  },
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
