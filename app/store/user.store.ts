import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

import { appActions } from './app.store';

const initialState: AppStore.UserState = {
  swipe: {
    data: [],
  },
  data: {},
  nearby: {
    data: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addSwipeUsers: (state, action: PayloadAction<Entity.User[]>) => {
      if (!state.swipe) {
        state.swipe = {
          data: action.payload,
        };

        return;
      }

      if (!state.swipe.data || !state.swipe.data.length) {
        state.swipe.data = action.payload;
      }
    },
    addNearby: (state, action: PayloadAction<Entity.User[]>) => {
      const { payload } = action;

      const payloadLength = payload.length;

      if (!payloadLength) {
        return;
      }

      if (!state.nearby) {
        state.nearby = {
          data: payload,
        };
      }

      if (!state.nearby.data?.length) {
        state.nearby.data = payload;
      }

      const result: Entity.User[] = [];

      let m = 0;
      let n = 0;
      let canSetState = false;

      const stateDataLength = state.nearby.data.length;

      while (m < stateDataLength && n < payloadLength) {
        const mData = state.nearby.data[m];
        const nData = payload[n];

        const mDistance = mData.distance || 0;
        const nDistance = nData.distance || 0;

        if (mDistance === nDistance) {
          if (mData._id === nData._id) {
            result.push(mData);
          } else {
            result.push(mData, nData);
            if (!canSetState) {
              canSetState = true;
            }
          }

          m += 1;
          n += 1;
        } else if (mDistance < nDistance) {
          result.push(mData);
          m += 1;
        } else {
          result.push(nData);
          if (!canSetState) {
            canSetState = true;
          }
          n += 1;
        }
      }

      if (canSetState) {
        state.nearby.data = result;
      }
    },
  },

  extraReducers: builder => {
    builder.addCase(appActions.logout, state => {
      state.data = {};
      state.nearby = {
        data: [],
      };
    });
    // builder.addMatcher(
    //   api.endpoints.getConversations.matchFulfilled,
    //   (state, action) => {
    //     const { data: conversationsData, pagination: paginationData } =
    //       action.payload;
    //     if (conversationsData && paginationData) {
    //       const obj: Record<string, Entity.User> = {};
    //       for (const conversationData of conversationsData) {
    //         const targetUser = conversationData.targetUser;
    //         if (targetUser) {
    //           const targetUserId = targetUser.id;
    //           obj[targetUserId] = targetUser;
    //         }
    //       }

    //       if (!_.isEmpty(obj)) {
    //         state.data = {
    //           ...state.data,
    //           ...obj,
    //         };
    //       }
    //     }
    //   },
    // );
    builder.addMatcher(
      api.endpoints.getUsersNearby.matchFulfilled,
      (state, action) => {
        const usersData = action.payload.data;
        if (!usersData?.length) {
          return;
        }
        if (state.nearby) {
          state.nearby.data = usersData;
        } else {
          state.nearby = { data: usersData };
        }
      },
    );
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
