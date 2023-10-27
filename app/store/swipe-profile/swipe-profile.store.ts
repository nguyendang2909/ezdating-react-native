import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'app/types';
import { AppStore } from 'app/types/app-store.type';

import { appActions } from '../app.store';

const initialState: AppStore.SwipeProfileState = {
  data: [],
  info: {},
};

export const swipeProfileSlice = createSlice({
  name: 'swipeProfile',
  initialState,
  reducers: {
    addMany: (state, action: PayloadAction<Profile[]>) => {
      const { payload } = action;
      if (!payload.length) {
        return;
      }
      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Profile[]>) {
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

export const swipeProfileActions = swipeProfileSlice.actions;

export const swipeProfileReducer = swipeProfileSlice.reducer;
