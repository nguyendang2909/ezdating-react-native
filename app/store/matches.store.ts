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
    addMatches: (state, action: PayloadAction<Entity.Match[]>) => {
      const matches = action.payload;

      if (!matches.length) {
        return;
      }

      if (!state.data?.length) {
        state.data = matches;
      }

      state.data = state.data.concat(matches);
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
