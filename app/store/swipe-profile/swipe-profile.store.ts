import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileEndpoints } from 'app/api';
import { swipeProfilesService } from 'app/services/swipe-profiles.service';
import { Profile } from 'app/types';
import { AppStore } from 'app/types/app-store.type';
import moment from 'moment';

import { appActions } from '../app.store';

const initialState: AppStore.SwipeProfileState = {
  data: [],
  info: {},
};

export const swipeProfileSlice = createSlice({
  name: 'swipeProfile',
  initialState,
  reducers: {
    addMany: (state, action: PayloadAction<Profile[]>) => {
      const { payload } = action;
      if (!payload.length) {
        return;
      }
      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Profile[]>) {
      const { payload } = action;
      if (!payload.length) {
        return;
      }
      if (!state.data) {
        state.data = payload;
      }
      state.data = state.data.concat(payload);
    },

    removeOneByProfileId: (state, { payload }: PayloadAction<string>) => {
      state.data = state.data.filter(e => e._id !== payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = [];
      state.info = {};
    });
    builder
      .addMatcher(
        profileEndpoints.refreshSwipeProfiles.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = data;
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
            lastRefreshedAt: moment().toISOString(),
          };
        },
      )
      // .addMatcher(
      //   profileEndpoints.getNewestSwipeProfiles.matchFulfilled,
      //   (state, { payload: { data, pagination } }) => {
      //     state.data = swipeProfilesService.sortAndUniq(data, state.data);
      //     state.info = {
      //       ...state.info,
      //       isReachedEnd: !pagination._next,
      //       lastRefreshedAt: moment().toISOString(),
      //     };
      //   },
      // )
      .addMatcher(
        profileEndpoints.getNextSwipeProfiles.matchFulfilled,
        (state, { payload: { data, pagination } }) => {
          state.data = swipeProfilesService.sortAndUniq(data, state.data);
          state.info = {
            ...state.info,
            isReachedEnd: !pagination._next,
          };
        },
      );
  },
});

export const swipeProfileActions = swipeProfileSlice.actions;

export const swipeProfileReducer = swipeProfileSlice.reducer;
