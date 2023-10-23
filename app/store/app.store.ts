import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authEndpoints, meEndpoints } from 'app/api';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import moment from 'moment';
import { AuthorizationResult } from 'react-native-geolocation-service';

const initialState: AppStore.AppState = {
  accessToken: undefined,
  refreshToken: undefined,
  profile: {},
  osPermissions: {},
  socket: {
    connectedAt: moment().toISOString(),
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Entity.User>) => {
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
    builder.addMatcher(
      authEndpoints.signInWithPhoneNumber.matchFulfilled,
      (state, { payload: { data } }) => {
        state.accessToken = data.accessToken;
        state.refreshToken = data.refreshToken;
      },
    );
    builder.addMatcher(meEndpoints.getMyProfile.matchFulfilled, (state, { payload: { data } }) => {
      console.log(111);
      state.profile = data;
    });
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
