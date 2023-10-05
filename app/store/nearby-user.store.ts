import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nearbyUsersService } from 'app/services/nearby-users.service';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import moment from 'moment';

import { appActions } from './app.store';

const initialState: AppStore.NearbyState = {
  data: [],
  info: {},
};

export const nearbyUserSlice = createSlice({
  name: 'nearbyUser',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.User[]>) => {
      const { payload } = action;
      if (!payload.length) {
        return;
      }
      state.data = payload;
    },

    addMany: (state, action: PayloadAction<Entity.User[]>) => {
      const { payload } = action;
      if (!payload.length) {
        return;
      }
      if (!state.data.length) {
        state.data = payload;
      }
      state.data = nearbyUsersService.sortAndUniq(payload, state.data);
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
  },
});

export const nearbyUserActions = nearbyUserSlice.actions;

export const nearbyUserReducer = nearbyUserSlice.reducer;
