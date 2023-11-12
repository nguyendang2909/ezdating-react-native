import { API_ENDPOINTS } from 'app/config/config.api';
import { API_TAGS } from 'app/constants/constants';
import { ApiRequest, ApiResponse } from 'app/types';

import { api } from './api';

const profileFiltersApi = api.injectEndpoints({
  endpoints: builder => ({
    // Profile
    getMyProfileFilter: builder.query<ApiResponse.ProfileFilterData, void>({
      query: () => ({
        url: API_ENDPOINTS.PROFILE_FILTERS_ME,
        method: 'GET',
      }),
      providesTags: [API_TAGS.MY_PROFILE_FILTER],
    }),

    updateMyProfileFilter: builder.mutation<ApiResponse.Logged, ApiRequest.UpdateProfileFilter>({
      query: body => ({
        url: API_ENDPOINTS.PROFILE_FILTERS_ME,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error) => {
        if (error) {
          return [];
        }
        return [API_TAGS.MY_PROFILE_FILTER];
      },
    }),
  }),
});

export const {
  useGetMyProfileFilterQuery,
  useUpdateMyProfileFilterMutation,
  endpoints: profileFilterEndpoints,
} = profileFiltersApi;
