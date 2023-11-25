import { API_ENDPOINTS } from 'app/config/config.api';
import { API_TAGS } from 'app/constants/constants';
import { ApiRequest, ApiResponse } from 'app/types';
import { Platform } from 'react-native';

import { api } from './api';

const profilesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile
    getMyProfile: builder.query<ApiResponse.ProfileData, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES.ME,
        method: 'GET',
      }),
      providesTags: [API_TAGS.MY_PROFILE],
    }),

    fetchMyProfile: builder.mutation<ApiResponse.ProfileData, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES.ME,
        method: 'GET',
      }),
    }),

    updateProfile: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfile>({
      query: body => ({
        url: API_ENDPOINTS.PROFILES.ME,
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

    createBasicProfile: builder.mutation<ApiResponse.ProfileData, ApiRequest.CreateProfile>({
      query: body => ({
        url: API_ENDPOINTS.PROFILES.ME.BASIC,
        method: 'POST',
        body,
      }),
    }),

    // NearbyUser
    refreshNearbyProfiles: builder.query<ApiResponse.Profiles, ApiRequest.FindManyNearbyProfiles>({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNewestNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),
    getNextNearbyProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNearbyProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.NEARBY,
        method: 'GET',
        params,
      }),
    }),

    // Swipe profiles
    refreshSwipeProfiles: builder.query<ApiResponse.Profiles, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILES.SWIPE,
        method: 'GET',
      }),
    }),
    // getNewestSwipeProfiles: builder.mutation<ApiResponse.Profiles, void>({
    //   query: () => ({
    //     url: API_URL.profilesNearby,
    //     method: 'GET',
    //   }),
    // }),
    getNextSwipeProfiles: builder.mutation<
      ApiResponse.Profiles,
      ApiRequest.FindManyNextSwipeProfiles
    >({
      query: params => ({
        url: API_ENDPOINTS.PROFILES.SWIPE,
        method: 'GET',
        params,
      }),
    }),

    uploadBasicPhoto: builder.mutation<ApiResponse.Logged, ApiRequest.UploadPhoto>({
      query: body => {
        const { file } = body;
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', {
          uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        return {
          url: API_ENDPOINTS.PROFILES.ME.BASIC_PHOTO,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [API_TAGS.MY_PROFILE];
      },
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useCreateBasicProfileMutation,
  useRefreshNearbyProfilesQuery,
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useRefreshSwipeProfilesQuery,
  // useGetNewestSwipeProfilesMutation,
  useGetNextSwipeProfilesMutation,
  useFetchMyProfileMutation,
  endpoints: profileEndpoints,
} = profilesApi;
