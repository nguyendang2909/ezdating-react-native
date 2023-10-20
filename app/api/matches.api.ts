import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const matchesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Match
    unmatch: builder.mutation<ApiResponse.Unmatch, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL.unmatch}/${id}`,
        method: 'POST',
      }),
    }),
    getMatch: builder.query<ApiResponse.Match, string>({
      query: id => ({
        url: `${API_URL.matches}/${id}`,
        method: 'GET',
      }),
    }),
    refreshMatches: builder.query<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: () => ({
        url: API_URL.matches,
        method: 'GET',
      }),
    }),
    getNewestMatches: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: () => ({
        url: API_URL.matches,
        method: 'GET',
      }),
    }),
    getNextMatches: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: params => ({
        url: API_URL.matches,
        method: 'GET',
        params,
      }),
    }),
    createMatch: builder.mutation<ApiResponse.Match, ApiRequest.CreateMatch>({
      query: body => ({
        url: API_URL.matches,
        method: 'POST',
        body,
      }),
    }),
    // Converstaions
    refreshConversations: builder.query<ApiResponse.Matches, ApiRequest.FindManyConversations>({
      query: () => ({
        url: API_URL.conversations,
        method: 'GET',
      }),
    }),
    getNewestConversations: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyConversations>(
      {
        query: () => ({
          url: API_URL.conversations,
          method: 'GET',
        }),
      },
    ),
    getNextConversations: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyConversations>({
      query: params => ({
        url: API_URL.conversations,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetMatchQuery,
  useRefreshMatchesQuery,
  useGetNewestMatchesMutation,
  useGetNextMatchesMutation,
  useCreateMatchMutation,
  useUnmatchMutation,
  useRefreshConversationsQuery,
  useGetNewestConversationsMutation,
  useGetNextConversationsMutation,
  endpoints: matchEndpoints,
} = matchesApi;
