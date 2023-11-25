import { API_ENDPOINTS } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signInWithPhoneNumber: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithPhoneNumber>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.PHONE_NUMBER,
        method: 'POST',
        body,
      }),
    }),

    signInWithGoogle: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithGoogle>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.GOOGLE,
        method: 'POST',
        body,
      }),
    }),

    signInWithFacebook: builder.mutation<ApiResponse.Logged, ApiRequest.SignInWithFacebook>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.SIGN_IN.FACEBOOK,
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<void, ApiRequest.Logout>({
      query: body => ({
        url: API_ENDPOINTS.AUTH.LOGOUT,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSignInWithPhoneNumberMutation,
  useSignInWithFacebookMutation,
  useSignInWithGoogleMutation,
  useLogoutMutation,
  endpoints: authEndpoints,
} = authApi;
