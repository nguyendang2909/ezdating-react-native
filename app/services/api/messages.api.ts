import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const messagesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Messages
    refreshMessages: builder.query<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),
    getNewestMessages: builder.mutation<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),
    getNextMessages: builder.mutation<ApiResponse.Messages, ApiRequest.FindManyMessages>({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useRefreshMessagesQuery, useGetNewestMessagesMutation, useGetNextMessagesMutation } =
  messagesApi;
