import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nearbyUsersService } from 'app/services/nearby-users.service';
import { ApiResponse } from 'app/types';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.NearbyState = {
  data: [],
  info: {
    isLoading: false,
    isLoadingNewest: false,
    isLoadingNext: false,
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
      state.data = data;
      state.info = {
        ...state.info,
        isReachedEnd: !pagination._next,
        lastRefreshedAt: moment().toISOString(),
      };
    },

    addManyNewest: (
      state,
      { payload: { data, pagination } }: PayloadAction<ApiResponse.Users>,
    ) => {
      state.data = nearbyUsersService.sortAndUniq(data, state.data);
      state.info = {
        ...state.info,
        isReachedEnd: !pagination._next,
        lastRefreshedAt: moment().toISOString(),
      };
    },

    addManyNext: (
      state,
      { payload: { data, pagination } }: PayloadAction<ApiResponse.Users>,
    ) => {
      state.data = nearbyUsersService.sortAndUniq(data, state.data);
      state.info = {
        ...state.info,
        isReachedEnd: !pagination._next,
        lastRefreshedAt: moment().toISOString(),
      };
    },

    updateRefreshTime: state => {
      state.info.lastRefreshedAt = moment().toISOString();
    },

    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.info.isLoading = payload;
    },

    setLoadingNewest: (state, { payload }: PayloadAction<boolean>) => {
      state.info.isLoadingNewest = payload;
    },

    setLoadingNext: (state, { payload }: PayloadAction<boolean>) => {
      state.info.isLoadingNext = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
  },
});

export const nearbyUserActions = nearbyUserSlice.actions;

export const nearbyUserReducer = nearbyUserSlice.reducer;
