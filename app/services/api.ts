/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'app/config';
import { API_URL } from 'app/config/config.api';
import { appActions } from 'app/store/app.store';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import queryString from 'query-string';
import { Platform } from 'react-native';

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
  baseQuery: async (args, api, extraOptions) => {
    if (args.params) {
      if (args.params.f) {
        args.params.f = JSON.stringify(args.params.f);
      }
    }
    const result = await baseQuery(args, api, extraOptions);

    // console.log(extraOptions);
    //   if (result.error && result.error.status === 401) {
    //     const refreshResult = (await getFreshTokenFunction();

    //     if (refreshResult) {
    //         api.dispatch(setSession({ accessToken: refreshResult }));

    //         // retry the initial query
    //         result = await baseQuery(args, api, extraOptions);
    //     } else {
    //         api.dispatch(logout());
    //     }
    // }
    // return result;
    if (result.error && result.error.status === 401) {
      api.dispatch(appActions.logout());
    }
    return result;
  },

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

    getMyProfile: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.myProfile,
        method: 'GET',
        params: {
          f: {
            id: true,
            birthday: true,
            email: true,
            gender: true,
            introduce: true,
            lookingFor: true,
            haveBasicInfo: true,
            nickname: true,
            phoneNumber: true,
            role: true,
            status: true,
            createdBy: true,
            updatedBy: true,
          },
        },
      }),
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
    }),

    // Gallery
    uploadPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.UploadPhoto>({
      query: body => {
        const { file, share } = body;
        const formData = new FormData();
        formData.append('file', {
          uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        if (share) {
          formData.append('share', share);
        }
        return {
          url: API_URL.photos,
          method: 'POST',
          body: formData,
        };
      },
      // invalidatesTags: ['MyProfile'],
    }),
  }),
});
