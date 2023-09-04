import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class MediaFilesAPi {
  async uploadPhoto(body: ApiRequest.UploadPhoto) {
    const { file } = body;
    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'ios' ? `file:///${file.path}` : file.path,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    return await api.post<ApiResponse.MessagesData>(API_URL.photos, {
      body: formData,
    });
  }

  async removePhoto(id: string) {
    return await api.delete<ApiResponse.RemoveData>(`${API_URL.photos}/${id}`);
  }
}

export const mediaFilesApi = new MediaFilesAPi();
