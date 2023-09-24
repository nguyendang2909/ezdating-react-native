import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Platform } from 'react-native';

import { api } from './api';

class MediaFilesAPi extends CommonApi {
  async uploadPhoto(body: ApiRequest.UploadPhoto) {
    const { file } = body;
    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    const { data } = await api.post<ApiResponse.MessagesData>(
      API_URL.photos,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  }

  async removePhoto(id: string) {
    const { data } = await api.delete<ApiResponse.RemoveData>(
      `${API_URL.photos}/${id}`,
    );

    return data;
  }
}

export const mediaFilesApi = new MediaFilesAPi();
