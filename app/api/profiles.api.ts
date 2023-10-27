import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse, Profile } from 'app/types';

import { api } from './api';

const profilesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile
    getMyProfile: builder.query<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.profileMe,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    getProfile: builder.mutation<ApiResponse.UserData, void>({
      query: () => ({
        url: API_URL.profileMe,
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfile>({
      query: body => ({
        url: API_URL.profileMe,
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

    createProfile: builder.mutation<ApiResponse.ProfileData, ApiRequest.CreateProfile>({
      query: body => ({
        url: API_URL.profileMe,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return ['Profile'];
      },
    }),

    // NearbyUser
    refreshNearbyProfiles: builder.query<ApiResponse.Profiles, void>({
      query: () => ({
        url: API_URL.profilesNearby,
        method: 'GET',
      }),
    }),
    getNewestNearbyProfiles: builder.mutation<ApiResponse.Profiles, void>({
      query: () => ({
        url: API_URL.profilesNearby,
        method: 'GET',
      }),
    }),
    getNextNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_URL.profilesNearby,
        method: 'GET',
        params,
      }),
    }),

    // Swipe users
    getSwipeProfiles: builder.query<
      ApiResponse.FetchData<Profile[]>,
      ApiRequest.FindManySwipeProfiles
    >({
      query: () => ({
        url: API_URL.profilesSwipe,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
  useRefreshNearbyProfilesQuery,
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useGetSwipeProfilesQuery,
  useGetProfileMutation,
  endpoints: profileEndpoints,
} = profilesApi;
