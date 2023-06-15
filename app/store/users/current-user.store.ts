import { createSlice } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.CurrentUser = {};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    
  },
});

export const currentUserActions = currentUserSlice.actions;

export const { updateProfile } = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
