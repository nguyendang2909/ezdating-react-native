import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.LikedMeState = {};

export const likedMeSlice = createSlice({
  name: 'likedMe',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.Like[]>) => {
      const { payload } = action;

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.Like[]>) {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      if (!state.data) {
        state.data = payload;
      }

      state.data = state.data.concat(payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = undefined;
    });
  },
});

export const likedMeActions = likedMeSlice.actions;

export const likedMeReducer = likedMeSlice.reducer;
