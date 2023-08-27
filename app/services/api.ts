/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'app/config';
import { API_URL } from 'app/config/config.api';
import { appActions } from 'app/store/app.store';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Entity } from 'app/types/entity.type';
import { Mutex } from 'async-mutex';
import queryString from 'query-string';
import { Platform } from 'react-native';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params);
  },
  baseUrl: Config.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppStore.RootState)?.app?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: async (args, baseQueryApi, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, baseQueryApi, extraOptions);
    if (result.error && [401, 403].includes(result.error.status as number)) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = (baseQueryApi.getState() as AppStore.RootState)
            .app?.refreshToken;
          const refreshResult = (await baseQuery(
            {
              method: 'POST',
              url: '/auth/tokens/access-token',
              body: {
                refreshToken,
              },
            },
            baseQueryApi,
            extraOptions,
          )) as ApiResponse.FetchData<ApiResponse.Tokens>;

          if (refreshResult.data) {
            baseQueryApi.dispatch(
              appActions.updateAccessToken(refreshResult.data),
            );
            result = await baseQuery(args, baseQueryApi, extraOptions);
          } else {
            baseQueryApi.dispatch(appActions.logout());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, baseQueryApi, extraOptions);
      }
    }

    return result;
  },
  tagTypes: ['Profile'],
  endpoints: builder => ({
    signInWithPhoneNumber: builder.mutation<
      ApiResponse.Logged,
      ApiRequest.SignInWithPhoneNumber
    >({
      query: body => ({
        url: API_URL.signInWithPhoneNumber,
        method: 'POST',
        body,
      }),
    }),

    getSwipeUsers: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.myProfile,
        method: 'GET',
      }),
    }),

    // Profile
    getMyProfile: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.myProfile,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<
      ApiResponse.Logged,
      ApiRequest.UpdateProfile
    >({
      query: body => ({
        url: API_URL.myProfile,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return ['Profile'];
      },
    }),

    updateBasicProfile: builder.mutation<
      ApiResponse.Logged,
      ApiRequest.UpdateProfileBasicInfo
    >({
      query: body => ({
        url: API_URL.myProfileBasicInfo,
        method: 'PATCH',
        body,
      }),
    }),

    // Users
    getUsersNearby: builder.query<
      ApiResponse.FetchPaginationData<Entity.User[]>,
      ApiRequest.SearchUsersNearby
    >({
      query: ({ params }) => ({
        url: API_URL.usersNearby,
        method: 'POST',
        params,
      }),
    }),

    // Matches
    getNextConversations: builder.query<
      ApiResponse.FetchPaginationData<Entity.Match[]>,
      { cursor?: string }
    >({
      query: params => ({
        url: API_URL.conversations,
        method: 'GET',
        params,
      }),
    }),
    getPreviousConversations: builder.query<
      ApiResponse.FetchPaginationData<Entity.Match[]>,
      { cursor?: string }
    >({
      query: params => ({
        url: API_URL.conversations,
        method: 'GET',
        params,
      }),
    }),

    // Messages
    getNextMessages: builder.query<
      ApiResponse.FetchPaginationData<Entity.Message[], { _matchId: string }>,
      ApiRequest.FindManyMessages
    >({
      query: params => ({
        url: `${API_URL.messages}`,
        method: 'GET',
        params,
      }),
    }),

    // Photos
    uploadPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.UploadPhoto>({
      query: body => {
        const { file } = body;
        const formData = new FormData();
        formData.append('file', {
          uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        return {
          url: API_URL.photos,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return ['Profile'];
      },
    }),

    removePhoto: builder.mutation<ApiResponse.RemoveData, string>({
      query: (id: string) => ({
        url: `${API_URL.photos}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return ['Profile'];
      },
    }),
  }),
});
