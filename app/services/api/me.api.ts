import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const meApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile
    getMyProfile: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.me,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfile>({
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

    updateBasicProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfileBasicInfo>({
      query: body => ({
        url: API_URL.myProfileBasicInfo,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation, useUpdateBasicProfileMutation } =
  meApi;
