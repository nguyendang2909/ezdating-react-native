import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { store } from 'app/store';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class ConversationsApi extends CommonApi {
  async getMany({
    params = {},
    data,
  }: {
    params?: ApiRequest.FindManyConversations;
    data?: Entity.Match[];
  } = {}) {
    const _next = this.getCursor(data);

    const response = await api.get<ApiResponse.PaginatedResponse<Entity.Match>>(
      API_URL.conversations,
      {
        params: {
          ...params,
          ...(_next ? { _next } : {}),
        },
      },
    );

    return response.data;
  }

  async getManyNext({
    params = {},
  }: {
    params?: ApiRequest.FindManyConversations;
  } = {}) {
    const data = store.getState().conversation.data;

    return await this.getMany({ params, data });
  }

  public getCursor(data?: Entity.Match[]): string | undefined {
    return this.getCursorByField('_id', data);
  }
}

export const conversationsApi = new ConversationsApi();
