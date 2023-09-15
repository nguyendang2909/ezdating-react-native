import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class ConversationsApi extends CommonApi {
  async getMany(params?: ApiRequest.FindManyConversations) {
    const { data } = await api.get<
      ApiResponse.FetchPaginationData<Entity.Match[]>
    >(API_URL.conversations, { params });

    return data;
  }
}

export const conversationsApi = new ConversationsApi();
