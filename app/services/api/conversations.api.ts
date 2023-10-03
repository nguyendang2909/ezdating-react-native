import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class ConversationsApi extends CommonApi {
  async getMany(params?: ApiRequest.FindManyConversations) {
    const response = await api.get<ApiResponse.PaginatedResponse<Entity.Match>>(
      API_URL.conversations,
      {
        params,
      },
    );

    return response.data;
  }

  public getCursor(data?: Entity.Match[]): string | undefined {
    return this.getCursorByField('_id', data);
  }
}

export const conversationsApi = new ConversationsApi();
