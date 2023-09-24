import { createSlice } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';

import { appActions } from './app.store';

const initialState: AppStore.UserState = {
  swipe: {
    data: [],
  },
  data: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // addSwipeUsers: (state, action: PayloadAction<Entity.User[]>) => {
    //   if (!state.swipe) {
    //     state.swipe = {
    //       data: action.payload,
    //     };
    //     return;
    //   }
    //   if (!state.swipe.data || !state.swipe.data.length) {
    //     state.swipe.data = action.payload;
    //   }
    // },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = {};
    });
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
