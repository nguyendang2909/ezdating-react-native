import { createSlice } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';

import { appActions } from './app.store';

const initialState: AppStore.LikesState = {};

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    // addLikes: (state, action: PayloadAction<Entity.Like[]>) => {
    //   const { payload } = action;
    //   const payloadLength = payload.length;
    //   if (!payloadLength) {
    //     return;
    //   }
    //   if (!state.data?.length) {
    //     state.data = payload;
    //   }
    //   const stateDataLength = state.data?.length;
    //   const result: Entity.User[] = [];
    //   let m = 0;
    //   let n = 0;
    //   let canSetState = false;
    //   while (m < stateDataLength && n < payloadLength) {
    //     const mData = state.data[m];
    //     const nData = payload[n];
    //     const mDistance = mData.likedAt || '';
    //     const nDistance = nData.likedAt || '';
    //     if (mDistance === nDistance) {
    //       if (mData._id === nData._id) {
    //         result.push(mData);
    //       } else {
    //         result.push(mData, nData);
    //         if (!canSetState) {
    //           canSetState = true;
    //         }
    //       }
    //       m += 1;
    //       n += 1;
    //     } else if (mDistance > nDistance) {
    //       result.push(mData);
    //       m += 1;
    //     } else {
    //       result.push(nData);
    //       if (!canSetState) {
    //         canSetState = true;
    //       }
    //       n += 1;
    //     }
    //   }
    //   if (canSetState) {
    //     state.data = result;
    //   }
    // },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = undefined;
    });
  },
});

export const likeActions = likeSlice.actions;

export const likeReducer = likeSlice.reducer;
