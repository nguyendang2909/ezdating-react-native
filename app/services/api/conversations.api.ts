import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class ConversationsApi {
  async getMany(params: ApiRequest.FindManyConversations) {
    return await api.get<ApiResponse.FetchPaginationData<Entity.Match[]>>(
      API_URL.conversations,
      { params },
    );
  }
}

export const conversationsApi = new ConversationsApi();
