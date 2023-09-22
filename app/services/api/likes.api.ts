import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class LikeApi extends CommonApi {
  async send(body: ApiRequest.SendLike) {
    const { data } = await api.post<ApiResponse.SuccessResponse>(
      API_URL.likes,
      body,
    );

    return data;
  }

  async getManyLikedMe(params?: ApiRequest.FindManyLikedMe) {
    const { data } = await api.get<ApiResponse.UserData[]>(API_URL.likedMe, {
      params,
    });

    return data;
  }
}

export const likesApi = new LikeApi();
