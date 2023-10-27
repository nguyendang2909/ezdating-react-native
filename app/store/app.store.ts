import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authEndpoints, profileEndpoints } from 'app/api';
import { User } from 'app/types';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';
import { AuthorizationResult } from 'react-native-geolocation-service';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  profile: {},
  user: {},
  osPermissions: {},
  socket: {
    connectedAt: moment().toISOString(),
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const { payload } = action;
      state.profile = payload;
    },
    setProfile: (state, action: PayloadAction<User>) => {
      const { payload } = action;
      state.profile = payload;
    },
    updateAccessToken: (state, { payload }: PayloadAction<ApiResponse.Tokens>) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken;
      }
      if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
      }
    },
    logout: state => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.profile = {};
      state.user = {};
      state.socket = {};
    },
    setOsLocationPermission: (state, action: PayloadAction<AuthorizationResult>) => {
      if (state.osPermissions) {
        state.osPermissions.locationService = action.payload;
      } else {
        state.osPermissions = {
          locationService: action.payload,
        };
      }
    },
    setSocketConnected: state => {
      state.socket.connectedAt = moment().toDate().toISOString();
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        authEndpoints.signInWithPhoneNumber.matchFulfilled,
        (state, { payload: { data } }) => {
          state.accessToken = data.accessToken;
          state.refreshToken = data.refreshToken;
        },
      )
      .addMatcher(profileEndpoints.getMyProfile.matchFulfilled, (state, { payload: { data } }) => {
        state.profile = data;
      })
      .addMatcher(profileEndpoints.createProfile.matchFulfilled, (state, { payload: { data } }) => {
        state.profile = data;
      });
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
