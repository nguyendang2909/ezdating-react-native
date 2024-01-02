import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileEndpoints, profileFilterEndpoints } from 'app/api';
import { ApiResponse, Entity } from 'app/types';
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
  profileFilter: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Entity.User>) => {
      state.profile = payload;
    },
    setProfile: (state, { payload }: PayloadAction<Entity.Profile>) => {
      state.profile = payload;
    },
    setProfileFilter: (state, { payload }: PayloadAction<Entity.ProfileFilter>) => {
      state.profileFilter = payload;
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
      state.profileFilter = {};
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
      .addMatcher(profileEndpoints.getMyProfile.matchFulfilled, (state, { payload: { data } }) => {
        state.profile = data;
      })
      .addMatcher(
        profileFilterEndpoints.getMyProfileFilter.matchFulfilled,
        (state, { payload: { data } }) => {
          state.profileFilter = data;
        },
      )
      .addMatcher(
        profileEndpoints.createBasicProfile.matchFulfilled,
        (state, { payload: { data } }) => {
          state.profile = data;
        },
      );
  },
});

export const appActions = appSlice.actions;

export const appReducer = appSlice.reducer;
