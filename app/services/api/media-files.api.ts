import { API_URL } from 'app/config/config.api';
import { ApiRequest, ApiResponse } from 'app/types';
import { Platform } from 'react-native';

import { api } from './api';

const mediaFilesApi = api.injectEndpoints({
  endpoints: builder => ({
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

export const { useUploadPhotoMutation, useRemovePhotoMutation } = mediaFilesApi;
