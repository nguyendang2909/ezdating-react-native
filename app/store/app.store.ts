import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.AppState = {
  isLogged: false,
  profile: {},
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ApiResponse.UserData>) => {
      state.profile = action.payload.data;
    },
    setLogged: state => {
      state.isLogged = true;
    },
    updateToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    removeLogged: state => {
      state.accessToken = undefined;
    },
    logout: state => {
      state.accessToken = undefined;
      state.isLogged = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.signInWithPhoneNumber.matchFulfilled,
      (state, action) => {
        console.log(222, action.payload);
        const accessToken = action.payload.data?.accessToken;
        if (!accessToken) {
          return;
        }

        state.accessToken = accessToken;
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
