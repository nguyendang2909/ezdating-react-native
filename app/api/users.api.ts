import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse, Entity } from 'app/types';

import { api } from './api';

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    // NearbyUser
    refreshNearbyUsers: builder.query<ApiResponse.Users, void>({
      query: () => ({
        url: API_URL.usersNearby,
        method: 'GET',
      }),
    }),
    getNewestUsers: builder.mutation<ApiResponse.Users, void>({
      query: () => ({
        url: API_URL.usersNearby,
        method: 'GET',
      }),
    }),
    getNextNearbyUsers: builder.mutation<ApiResponse.Users, ApiRequest.FindManyNearbyUses>({
      query: params => ({
        url: API_URL.usersNearby,
        method: 'GET',
        params,
      }),
    }),

    // Swipe users
    getSwipeUsers: builder.query<
      ApiResponse.FetchData<Entity.User[]>,
      ApiRequest.FindManySwipeUsers
    >({
      query: () => ({
        url: API_URL.usersSwipe,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRefreshNearbyUsersQuery,
  useGetNextNearbyUsersMutation,
  useGetNewestUsersMutation,
  endpoints: userEndpoints,
} = usersApi;
