import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';

const initialState: AppStore.ConversationState = {
  data: [],
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
  reducers: {
    updateConversation: (state, action: PayloadAction<Entity.Relationship>) => {
      const { _id, ...data } = action.payload;

      if (!_id) {
        return;
      }

      const newConversations = conversation;
    },
    receiveMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const relationshipId = payload._relationshipId;

      if (relationshipId) {
        const oldMessages = state.messages[relationshipId];

        if (oldMessages) {
          state.messages[relationshipId].data = [payload].concat(
            state.messages[relationshipId].data || [],
          );
        } else {
          state.messages[relationshipId] = {
            data: [payload],
          };
        }
      }
    },
    sendMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;
      const relationshipId = payload._relationshipId;

      if (!relationshipId) {
        return;
      }

      const messages = state.messages[relationshipId];

      if (messages) {
        state.messages[relationshipId].data = [payload].concat(
          state.messages[relationshipId].data || [],
        );
      } else {
        state.messages[relationshipId] = {
          data: [payload],
        };
      }
    },
    updateMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { payload } = action;

      const { uuid, _relationshipId } = payload;

      if (!_relationshipId || !uuid) {
        return;
      }

      if (state.messages[_relationshipId]) {
        const messagesLength = state.messages[_relationshipId].data.length;

        for (let i = 0; i < messagesLength; i += 1) {
          if (uuid === state.messages[_relationshipId].data[i].uuid) {
            state.messages[_relationshipId].data[i] = payload;
          }
        }
      } else {
        state.messages[_relationshipId] = {
          data: [payload],
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getNextConversations.matchFulfilled,
      (state, action) => {
        const { data: conversationsData, pagination: paginationData } =
          action.payload;

        if (!conversationsData || !paginationData) {
          return;
        }

        state.data = state.data.concat(conversationsData);

        state.pagination = paginationData;
      },
    );
    builder.addMatcher(
      api.endpoints.getNextMessages.matchFulfilled,
      (state, action) => {
        const {
          data: messagesData,
          pagination,
          conversationId,
        } = action.payload;

        if (!messagesData?.length || !pagination || !conversationId) {
          return;
        }

        const oldConversation = state.messages[conversationId];

        if (!oldConversation) {
          state.messages[conversationId] = {
            pagination,
            data: messagesData,
          };
        } else {
          state.messages[conversationId] = {
            pagination,
            data: (oldConversation.data || []).concat(messagesData),
          };
        }
      },
    );
  },
});

export const conversationActions = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
