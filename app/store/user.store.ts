import { createSlice } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';

const initialState: AppStore.UserState = {
  data: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getConversations.matchFulfilled,
      (state, action) => {
        const { data: conversationsData, pagination: paginationData } =
          action.payload;
        if (conversationsData && paginationData) {
          const obj: Record<string, Entity.User> = {};
          for (const conversationData of conversationsData) {
            const targetUser = conversationData.targetUser;
            if (targetUser) {
              const targetUserId = targetUser.id;
              obj[targetUserId] = targetUser;
            }
          }

          if (!_.isEmpty(obj)) {
            state.data = {
              ...state.data,
              ...obj,
            };
          }
        }
      },
    );
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
