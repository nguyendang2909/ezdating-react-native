import { API_ENDPOINTS } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Likes
    refreshLikedMe: builder.query<ApiResponse.Views, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_ENDPOINTS.LIKES.ME,
        method: 'GET',
      }),
    }),
    getNewestLikedMe: builder.mutation<ApiResponse.Views, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_ENDPOINTS.LIKES.ME,
        method: 'GET',
      }),
    }),
    getNextLikedMe: builder.mutation<ApiResponse.Views, ApiRequest.FindManyLikedMe>({
      query: params => ({
        url: API_ENDPOINTS.LIKES.ME,
        method: 'GET',
        params,
      }),
    }),
    sendLike: builder.mutation<void, ApiRequest.SendLike>({
      query: body => ({
        url: API_ENDPOINTS.LIKES.INDEX,
        method: 'POST',
        body,
      }),
    }),
    getLike: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.LIKES.INDEX}/${id}`,
        method: 'GET',
      }),
    }),
    getOneLikedMe: builder.query<ApiResponse.View, string>({
      query: id => ({
        url: `${API_ENDPOINTS.LIKES.ME}/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRefreshLikedMeQuery,
  useGetNewestLikedMeMutation,
  useGetNextLikedMeMutation,
  useSendLikeMutation,
  useGetOneLikedMeQuery,
  endpoints: likeEndpoints,
} = likesApi;
