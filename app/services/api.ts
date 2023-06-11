import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'app/config';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
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
          fields: [
            '_id',
            '_interestIds',
            'about',
            'age',
            'avatar',
            'birthdate',
            'dringking',
            'company',
            'educationLevel',
            'email',
            'gallery',
            'gender',
            'geolocation',
            'jobTitle',
            'interests',
            'location',
            'lookingForGender',
            'nickname',
            'role',
            'school',
            'smoking',
            'workout',
            'createdAt',
            'updatedAt',
          ],
        },
      }),
    }),
  }),
});
