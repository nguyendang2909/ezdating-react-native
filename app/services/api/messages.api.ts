import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class MessagesApi extends CommonApi {
  async getMany({
    params,
    data,
  }: {
    params: ApiRequest.FindManyMessages;
    data?: Entity.Like[];
  }) {
    const _next = this.getCursor(data);

    const response = await api.get<ApiResponse.MessagesData>(API_URL.messages, {
      params: {
        ...params,
        ...(_next ? { _next } : {}),
      },
    });

    return response.data;
  }

  public getCursor(data?: Entity.Message[]): string | undefined {
    return this.getCursorByField('_id', data);
  }
}

export const messagesApi = new MessagesApi();
