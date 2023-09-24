import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class NearbyUsersApi extends CommonApi {
  async getMany({
    params = {},
    data,
  }: {
    params?: ApiRequest.SearchUsersNearby;
    data?: Entity.User[];
  } = {}) {
    const _next = this.getCursor(data);

    const response = await api.get<ApiResponse.PaginatedResponse<Entity.User>>(
      API_URL.usersNearby,
      {
        params: {
          ...params,
          ...(_next ? { _next } : {}),
        },
      },
    );

    return response.data;
  }

  public getCursor(data?: Entity.User[]): string | undefined {
    return this.getCursorByField(['_id', 'distance'], data);
  }
}

export const nearbyUsersApi = new NearbyUsersApi();
