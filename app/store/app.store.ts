import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { AuthorizationResult } from 'react-native-geolocation-service';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  profile: {},
  osPermissions: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Entity.User>) => {
      const { payload } = action;

      state.profile = payload;
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
    logout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.isLogged = false;
      state.profile = {};
    },
    setOsLocationPermission: (
      state,
      action: PayloadAction<AuthorizationResult>,
    ) => {
      if (state.osPermissions) {
        state.osPermissions.locationService = action.payload;
      } else {
        state.osPermissions = {
          locationService: action.payload,
        };
      }
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
