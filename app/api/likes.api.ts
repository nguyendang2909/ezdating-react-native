import { API_ENDPOINTS } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Likes
    refreshLikedMe: builder.query<ApiResponse.Likes, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_ENDPOINTS.LIKED_ME,
        method: 'GET',
      }),
    }),
    getNewestLikedMe: builder.mutation<ApiResponse.Likes, ApiRequest.FindManyLikedMe>({
      query: () => ({
        url: API_ENDPOINTS.LIKED_ME,
        method: 'GET',
      }),
    }),
    getNextLikedMe: builder.mutation<ApiResponse.Likes, ApiRequest.FindManyLikedMe>({
      query: params => ({
        url: API_ENDPOINTS.LIKED_ME,
        method: 'GET',
        params,
      }),
    }),
    sendLike: builder.mutation<void, ApiRequest.SendLike>({
      query: body => ({
        url: API_ENDPOINTS.LIKES,
        method: 'POST',
        body,
      }),
    }),
    getLike: builder.mutation<void, string>({
      query: id => ({
        url: `${API_ENDPOINTS.LIKES}/${id}`,
        method: 'GET',
      }),
    }),
    getOneLikedMe: builder.query<ApiResponse.LikeData, string>({
      query: id => ({
        url: `${API_ENDPOINTS.LIKED_ME}/${id}`,
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
