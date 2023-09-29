import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.NearbyState = {
  data: [],
};

export const nearbyUserSlice = createSlice({
  name: 'nearbyUser',
  initialState,
  reducers: {
    addManyFirst: (state, action: PayloadAction<Entity.User[]>) => {
      const { payload } = action;

      state.data = payload;
    },

    addManyNext(state, action: PayloadAction<Entity.User[]>) {
      const { payload } = action;

      if (!payload.length) {
        return;
      }

      if (!state.data) {
        state.data = payload;
      }

      state.data = state.data.concat(payload);
    },

    setRefreshingTop(state, action: PayloadAction<boolean>) {
      state.isRefreshingTop = action.payload;
    },

    setRefreshingBottom(state, action: PayloadAction<boolean>) {
      state.isRefreshingBottom = action.payload;
    },

    setReachedEnd(state, action: PayloadAction<boolean>) {
      state.isReachedEnd = action.payload;
    },

    // addMany: (state, action: PayloadAction<Entity.User[]>) => {
    //   const { payload } = action;

    //   const payloadLength = payload.length;

    //   if (!payloadLength) {
    //     return;
    //   }

    //   if (!state.data?.length) {
    //     state.data = payload;

    //     return;
    //   }

    //   const result: Entity.User[] = [];

    //   let m = 0;
    //   let n = 0;
    //   let canSetState = false;

    //   const stateDataLength = state.data.length;

    //   while (m < stateDataLength && n < payloadLength) {
    //     const mData = state.data[m];
    //     const nData = payload[n];

    //     const mDistance = mData.distance || 0;
    //     const nDistance = nData.distance || 0;

    //     if (mDistance === nDistance) {
    //       if (mData._id === nData._id) {
    //         result.push(mData);
    //         m += 1;
    //         n += 1;
    //       }
    //     } else if (mDistance < nDistance) {
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
      state.isReachedEnd = undefined;
      state.isRefreshingBottom = undefined;
      state.isRefreshingTop = undefined;
    });
  },
});

export const nearbyUserActions = nearbyUserSlice.actions;

export const nearbyUserReducer = nearbyUserSlice.reducer;
