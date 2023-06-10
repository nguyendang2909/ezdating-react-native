import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.AppState = {
  isLogged: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    removeLogged: state => {
      state.accessToken = undefined;
    },
    logout: state => {
      state.accessToken = undefined;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.signInWithPhoneNumber.matchFulfilled,
      (state, action) => {
        const accessToken = action.payload.data?.accessToken;
        if (!accessToken) {
          return;
        }

        state.accessToken = accessToken;
        state.isLogged = true;
      },
    );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
