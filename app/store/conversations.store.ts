import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'app/services/api';
import { messagesService } from 'app/services/messages';
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
  reducers: {
    receiveMsg: (state, action: PayloadAction<Entity.Message>) => {
      const msg = action.payload;
      const message = messagesService.convertToStateFromEntity(msg);
      const relationshipId = msg.relationship?.id;
      if (relationshipId) {
        const oldMessages = state.messages[relationshipId];
        if (oldMessages) {
          state.messages[relationshipId].data = [
            message,
            ...(state.messages[relationshipId].data || []),
          ];
        } else {
          state.messages[relationshipId] = {
            data: [message],
          };
        }
      }
    },
    sendMsg: (state, action: PayloadAction<AppStore.MessageState>) => {
      const msg = action.payload;
      const relationshipId = msg.relationship?.id;
      if (relationshipId) {
        const messages = state.messages[relationshipId];
        if (messages) {
          state.messages[relationshipId].data = [msg].concat(
            state.messages[relationshipId].data,
          );
        } else {
          state.messages[relationshipId] = {
            data: [msg],
          };
        }
      }
    },
    updateMsg: (state, action: PayloadAction<Entity.Message>) => {
      const { relationship } = action.payload;
    },
  },
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
            const messages =
              messagesService.converToStatesFromEntities(messagesData);
            const oldMessages = state.messages[conversationId];
            if (!oldMessages) {
              state.messages[conversationId] = {
                pagination,
                data: messages,
              };
            } else {
              state.messages[conversationId] = {
                pagination,
                data: (oldMessages.data || []).concat(messages),
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