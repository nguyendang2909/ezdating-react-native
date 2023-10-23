import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from '../app.store';

const initialState: AppStore.SwipeUserState = {
  data: [],
  info: {},
};

export const swipeUserSlice = createSlice({
  name: 'swipeUser',
  initialState,
  reducers: {
    addMany: (state, action: PayloadAction<Entity.User[]>) => {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.User[]>) {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      if (!state.data) {
        state.data = payload;
      }

      state.data = state.data.concat(payload);
    },

    removeOneByUserId: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter(e => e._id === payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
  },
});

export const swipeUserActions = swipeUserSlice.actions;

export const swipeUserReducer = swipeUserSlice.reducer;
