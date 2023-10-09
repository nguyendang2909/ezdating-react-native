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

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, unknown>) => {
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

    logout: builder.mutation<void, ApiRequest.Logout>({
      query: body => ({
        url: API_URL.logout,
        method: 'POST',
        body,
      }),
    }),

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
    getNextNearbyUsers: builder.mutation<
      ApiResponse.Users,
      ApiRequest.FindManyNearbyUses
    >({
      query: params => ({
        url: API_URL.usersNearby,
        method: 'GET',
        params,
      }),
    }),

    // Match
    getMatch: builder.query<ApiResponse.Match, string>({
      query: id => ({
        url: `${API_URL.matches}/${id}`,
        method: 'GET',
      }),
    }),
    refreshMatches: builder.query<
      ApiResponse.Matches,
      ApiRequest.FindManyMatches
    >({
      query: () => ({
        url: API_URL.matches,
        method: 'GET',
      }),
    }),
    getNewestMatches: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyMatches
    >({
      query: () => ({
        url: API_URL.matches,
        method: 'GET',
      }),
    }),
    getNextMatches: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyMatches
    >({
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
    refreshConversations: builder.query<
      ApiResponse.Matches,
      ApiRequest.FindManyConversations
    >({
      query: () => ({
        url: API_URL.conversations,
        method: 'GET',
      }),
    }),
    getNewestConversations: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyConversations
    >({
      query: () => ({
        url: API_URL.conversations,
        method: 'GET',
      }),
    }),
    getNextConversations: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyConversations
    >({
      query: params => ({
        url: API_URL.conversations,
        method: 'GET',
        params,
      }),
    }),

    // Likes
    refreshLikedMe: builder.query<
      ApiResponse.Likes,
      ApiRequest.FindManyLikedMe
    >({
      query: () => ({
        url: API_URL.likedMe,
        method: 'GET',
      }),
    }),
    getNewestLikedMe: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyLikedMe
    >({
      query: () => ({
        url: API_URL.likedMe,
        method: 'GET',
      }),
    }),
    getNextLikedMe: builder.mutation<
      ApiResponse.Matches,
      ApiRequest.FindManyLikedMe
    >({
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

    // Views
    sendView: builder.mutation<void, ApiRequest.SendView>({
      query: body => ({
        url: API_URL.views,
        method: 'POST',
        body,
      }),
    }),

    // Messages
    refreshMessages: builder.query<
      ApiResponse.Messages,
      ApiRequest.FindManyMessages
    >({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),
    getNewestMessages: builder.mutation<
      ApiResponse.Messages,
      ApiRequest.FindManyMessages
    >({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),
    getNextMessages: builder.mutation<
      ApiResponse.Messages,
      ApiRequest.FindManyMessages
    >({
      query: params => ({
        url: API_URL.messages,
        method: 'GET',
        params,
      }),
    }),

    getSwipeUsers: builder.query<
      ApiResponse.FetchData<Entity.User[]>,
      ApiRequest.FindManySwipeUsers
    >({
      query: () => ({
        url: API_URL.usersSwipe,
        method: 'GET',
      }),
    }),

    getMatches: builder.query<
      ApiResponse.FetchData<Entity.Match[]>,
      ApiRequest.FindManyMatches
    >({
      query: () => ({
        url: API_URL.matches,
        method: 'GET',
      }),
    }),

    // Profile
    getMyProfile: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.me,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<
      ApiResponse.Logged,
      ApiRequest.UpdateProfile
    >({
      query: body => ({
        url: API_URL.me,
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

export const {
  endpoints,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useUpdateBasicProfileMutation,
  useSignInWithPhoneNumberMutation,
  useLogoutMutation,
  useRefreshNearbyUsersQuery,
  useGetNextNearbyUsersMutation,
  useGetNewestUsersMutation,
  useGetMatchQuery,
  useRefreshMatchesQuery,
  useGetNewestMatchesMutation,
  useGetNextMatchesMutation,
  useRefreshMessagesQuery,
  useGetNewestMessagesMutation,
  useGetNextMessagesMutation,
  useRefreshConversationsQuery,
  useGetNewestConversationsMutation,
  useGetNextConversationsMutation,
  useRefreshLikedMeQuery,
  useGetNewestLikedMeMutation,
  useGetNextLikedMeMutation,
  useSendLikeMutation,
  useUploadPhotoMutation,
  useRemovePhotoMutation,
  useCreateMatchMutation,
} = api;
