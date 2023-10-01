import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';

import { api } from './api';

class MessagesApi extends CommonApi {
  async getMany({ params }: { params?: ApiRequest.FindManyMessages }) {
    const response = await api.get<ApiResponse.MessagesData>(API_URL.messages, {
      params,
    });

    return response.data;
  }

  public getCursor(data?: AppStore.ChatMessage[]): string | undefined {
    return this.getCursorByField('_id', data);
  }
}

export const messagesApi = new MessagesApi();
