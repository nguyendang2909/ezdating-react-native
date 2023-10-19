import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Likes
    refreshLikedMe: builder.query<ApiResponse.Likes, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_URL.likedMe,
        method: 'GET',
      }),
    }),
    getNewestLikedMe: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_URL.likedMe,
        method: 'GET',
      }),
    }),
    getNextLikedMe: builder.mutation<ApiResponse.Matches, ApiRequest.FindManyLikedMe>({
      query: params => ({
        url: API_URL.likedMe,
        method: 'GET',
        params,
      }),
    }),
    sendLike: builder.mutation<void, ApiRequest.SendLike>({
      query: body => ({
        url: API_URL.likes,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRefreshLikedMeQuery,
  useGetNewestLikedMeMutation,
  useGetNextLikedMeMutation,
  useSendLikeMutation,
} = likesApi;
