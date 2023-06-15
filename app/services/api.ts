import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'app/config';
import { API_URL } from 'app/config/config.api';
import { appActions } from 'app/store/app.store';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import queryString from 'query-string';

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
    const result = await baseQuery(args, api, extraOptions);
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
          f: [
            'id,birthDay,email,gender,introduce,lookingFor,haveBasicInfo,nickname,phoneNumber,role,status,createdBy,updatedBy',
          ],
          // fields: [
          //   'id',
          //   'birthDay',
          //   'avatar',
          //   'birthdate',
          //   'dringking',
          //   'company',
          //   'educationLevel',
          //   'email',
          //   'gallery',
          //   'gender',
          //   'geolocation',
          //   'jobTitle',
          //   'interests',
          //   'location',
          //   'lookingForGender',
          //   'nickname',
          //   'role',
          //   'school',
          //   'smoking',
          //   'workout',
          //   'createdAt',
          //   'updatedAt',
          // ],
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
  }),
});
