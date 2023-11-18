import { API_ENDPOINTS } from 'app/config/config.api';
import { API_TAGS } from 'app/constants/constants';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const profilesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile
    getMyProfile: builder.query<ApiResponse.ProfileData, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES_ME,
        method: 'GET',
      }),
      providesTags: [API_TAGS.MY_PROFILE],
    }),

    fetchMyProfile: builder.mutation<ApiResponse.ProfileData, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES_ME,
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfile>({
      query: body => ({
        url: API_ENDPOINTS.PROFILES_ME,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [API_TAGS.MY_PROFILE];
      },
    }),

    createProfile: builder.mutation<ApiResponse.ProfileData, ApiRequest.CreateProfile>({
      query: body => ({
        url: API_ENDPOINTS.PROFILES_ME,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [API_TAGS.MY_PROFILE];
      },
    }),

    // NearbyUser
    refreshNearbyProfiles: builder.query<ApiResponse.Profiles, ApiRequest.FindManyNearbyProfiles>({
      query: params => ({
        url: API_ENDPOINTS.PROFILES_NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNewestNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES_NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNextNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES_NEARBY,
        method: 'GET',
        params,
      }),
    }),

    // Swipe profiles
    refreshSwipeProfiles: builder.query<ApiResponse.Profiles, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES_SWIPE,
        method: 'GET',
      }),
    }),
    // getNewestSwipeProfiles: builder.mutation<ApiResponse.Profiles, void>({
    //   query: () => ({
    //     url: API_URL.profilesNearby,
    //     method: 'GET',
    //   }),
    // }),
    getNextSwipeProfiles: builder.mutation<ApiResponse.Profiles, ApiRequest.FindManyNearbyProfiles>(
      {
        query: params => ({
          url: API_ENDPOINTS.PROFILES_SWIPE,
          method: 'GET',
          params,
        }),
      },
    ),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
  useRefreshNearbyProfilesQuery,
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useRefreshSwipeProfilesQuery,
  // useGetNewestSwipeProfilesMutation,
  useGetNextSwipeProfilesMutation,
  useFetchMyProfileMutation,
  endpoints: profileEndpoints,
} = profilesApi;
