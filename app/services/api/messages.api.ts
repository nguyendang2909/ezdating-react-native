import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class MessagesApi extends CommonApi {
  async getMany(params: ApiRequest.FindManyMessages) {
    const { data } = await api.get<ApiResponse.MessagesData>(API_URL.messages, {
      params,
    });

    return data;
  }
}

export const messagesApi = new MessagesApi();
