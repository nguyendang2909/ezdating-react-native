import { API_ENDPOINTS } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const matchesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Match
    unmatch: builder.mutation<ApiResponse.Unmatch, { id: string }>({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.MATCHES.UNMATCH}/${id}`,
        method: 'POST',
      }),
    }),
    getMatch: builder.query<ApiResponse.Match, string>({
      query: id => ({
        url: `${API_ENDPOINTS.MATCHES.INDEX}/${id}`,
        method: 'GET',
      }),
    }),
    getMatchByTargetUserId: builder.mutation<ApiResponse.Match, string>({
      query: userId => ({
        url: `${API_ENDPOINTS.MATCHES.BY_TARGET_USER}/${userId}`,
        method: 'GET',
      }),
    }),
    refreshMatches: builder.query<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: () => ({
        url: API_ENDPOINTS.MATCHES.INDEX,
        method: 'GET',
      }),
    }),
    getNewestMatches: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: () => ({
        url: API_ENDPOINTS.MATCHES.INDEX,
        method: 'GET',
      }),
    }),
    getNextMatches: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyMatches>({
      query: params => ({
        url: API_ENDPOINTS.MATCHES.INDEX,
        method: 'GET',
        params,
      }),
    }),
    createMatch: builder.mutation<ApiResponse.Match, ApiRequest.CreateMatch>({
      query: body => ({
        url: API_ENDPOINTS.MATCHES.INDEX,
        method: 'POST',
        body,
      }),
    }),
    // Converstaions
    refreshConversations: builder.query<ApiResponse.Matches, ApiRequest.FindManyConversations>({
      query: () => ({
        url: API_ENDPOINTS.CONVERSATIONS.INDEX,
        method: 'GET',
      }),
    }),
    getNewestConversations: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyConversations>(
      {
        query: () => ({
          url: API_ENDPOINTS.CONVERSATIONS.INDEX,
          method: 'GET',
        }),
      },
    ),
    getNextConversations: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyConversations>({
      query: params => ({
        url: API_ENDPOINTS.CONVERSATIONS.INDEX,
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
  useGetMatchByTargetUserIdMutation,
  endpoints: matchEndpoints,
} = matchesApi;
