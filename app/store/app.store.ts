import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  isLogged: false,
  profile: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ApiResponse.UserData>) => {
      const profile = action.payload.data;
      if (profile) {
        state.profile = profile;
      }
    },
    updateAccessToken: (
      state,
      action: PayloadAction<ApiResponse.FetchData<ApiResponse.Tokens>>,
    ) => {
      const data = action.payload.data;
      if (data?.accessToken) {
        state.accessToken = data.accessToken;
      }
      if (data?.refreshToken) {
        state.refreshToken = data.refreshToken;
      }
    },
    setLogged: state => {
      state.isLogged = true;
    },
    logout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLogged = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.signInWithPhoneNumber.matchFulfilled,
      (state, action) => {
        const tokens = action.payload.data;
        const accessToken = tokens?.accessToken;
        const refreshToken = tokens?.refreshToken;
        if (!accessToken || !refreshToken) {
          return;
        }
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.isLogged = true;
      },
    );
    builder.addMatcher(
      api.endpoints.getMyProfile.matchFulfilled,
      (state, action) => {
        const user = action.payload.data;
        if (user) {
          state.profile = user;
        }
      },
    );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
