import { API_ENDPOINTS } from 'app/config';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const messagesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Messages
    refreshMessages: builder.query<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_ENDPOINTS.MESSAGES.INDEX,
        method: 'GET',
        params,
      }),
    }),
    getNewestMessages: builder.mutation<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_ENDPOINTS.MESSAGES.INDEX,
        method: 'GET',
        params,
      }),
    }),
    getNextMessages: builder.mutation<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_ENDPOINTS.MESSAGES.INDEX,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useRefreshMessagesQuery,
  useGetNewestMessagesMutation,
  useGetNextMessagesMutation,
  endpoints: messageEndpoints,
} = messagesApi;
