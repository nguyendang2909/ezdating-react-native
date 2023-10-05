import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class MatchesApi extends CommonApi {
  public async getOne(id: string) {
    const { data } = await api.get<ApiResponse.FetchData<Entity.Match>>(
      `${API_URL.matches}/${id}`,
    );

    return data;
  }

  async getMany({
    params = {},
    data,
  }: {
    params?: ApiRequest.FindManyMatches;
    data?: Entity.Match[];
  } = {}) {
    const _next = this.getCursor(data);

    const response = await api.get<ApiResponse.PaginatedResponse<Entity.Match>>(
      API_URL.matches,
      {
        params: {
          ...params,
          ...(_next ? { _next } : {}),
        },
      },
    );

    return response.data;
  }

  public getCursor(data?: Entity.Match[]): string | undefined {
    return this.getCursorByField(['_id'], data);
  }
}

export const matchesApi = new MatchesApi();
