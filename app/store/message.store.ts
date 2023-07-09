import { createSlice } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

const initialState: AppStore.ConversationState = {
  data: {},
  pagination: {
    cursors: {
      after: null,
      before: null,
    },
  },
  messages: {},
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getConversations.matchFulfilled,
      (state, action) => {
        const { data: conversationsData, pagination: paginationData } =
          action.payload;
        if (conversationsData && paginationData) {
          const obj: Record<string, Entity.Relationship> = {};
          for (const conversationData of conversationsData) {
            obj[conversationData.id] = conversationData;
          }
          state.data = {
            ...state.data,
            ...obj,
          };
          state.pagination = paginationData;
        }
      },
    );
    builder.addMatcher(
      api.endpoints.getMessages.matchFulfilled,
      (state, action) => {
        const {
          data: messagesData,
          pagination,
          conversationId,
        } = action.payload;
        if (messagesData && pagination && conversationId) {
          if (messagesData.length) {
            const messages = state.messages[conversationId];
            if (!messages) {
              state.messages[conversationId] = {
                pagination,
                data: messagesData,
              };
            } else {
              state.messages[conversationId] = {
                pagination,
                data: [...messages.data, ...messagesData],
              };
            }
          }
        }
      },
    );
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
