import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class MessagesApi {
  async getMany(params: ApiRequest.FindManyMessages) {
    return await api.get<ApiResponse.MessagesData>(API_URL.messages, {
      params,
    });
  }
}

export const messagesApi = new MessagesApi();
