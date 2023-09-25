import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.MatchState = {
  data: [],
  pagination: {
    cursors: {
      next: null,
      prev: null,
    },
  },
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.Match[]>) => {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.Match[]>) {
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
      state.data = [];
      state.pagination = {
        cursors: {
          next: null,
          prev: null,
        },
      };
    });
  },
});

export const matchActions = matchSlice.actions;

export const matchReducer = matchSlice.reducer;
