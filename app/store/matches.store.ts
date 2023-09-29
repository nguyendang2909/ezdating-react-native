import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.MatchState = {};

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

    setReachedEnd(state, action: PayloadAction<boolean>) {
      state.isReachedEnd = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = undefined;
      state.isReachedEnd = undefined;
    });
  },
});

export const matchActions = matchSlice.actions;

export const matchReducer = matchSlice.reducer;
