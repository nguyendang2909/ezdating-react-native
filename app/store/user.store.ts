import { createSlice } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';

const initialState: AppStore.UserState = {
  data: {},
  nearby: {
    data: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: state => {
      state.data = {};
      state.nearby = {
        data: [],
      };
    },
  },
  extraReducers: builder => {
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
