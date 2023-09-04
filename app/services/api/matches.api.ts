import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class MatchesApi {
  async getMany(params: ApiRequest.FindManyMatches) {
    return await api.get<ApiResponse.FetchData<Entity.Match[]>>(
      API_URL.usersSwipe,
      { params },
    );
  }
}

export const matchesApi = new MatchesApi();
