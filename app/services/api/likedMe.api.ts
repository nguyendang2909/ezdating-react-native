import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class LikeMeApi extends CommonApi {
  async getMany({
    params = {},
    data,
  }: {
    params?: ApiRequest.FindManyLikedMe;
    data?: Entity.Like[];
  } = {}) {
    const _next = this.getCursor(data);

    const response = await api.get<ApiResponse.PaginatedResponse<Entity.Like>>(
      API_URL.likedMe,
      {
        params: {
          ...params,
          ...(_next ? { _next } : {}),
        },
      },
    );

    return response.data;
  }

  public getCursor(data: Entity.User[]): string | undefined {
    return this.getCursorByField('createdAt', data);
  }
}

export const likedMeApi = new LikeMeApi();
