import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.CurrentUser = {};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ApiResponse.User>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: builder => {
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

export const currentUserActions = currentUserSlice.actions;

export const { updateProfile } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
