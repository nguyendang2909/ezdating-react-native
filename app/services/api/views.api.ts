import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class ViewsApi extends CommonApi {
  async send(body: ApiRequest.SendView) {
    const { data } = await api.post<ApiResponse.SuccessResponse>(
      API_URL.views,
      body,
    );

    return data;
  }
}

export const viewsApi = new ViewsApi();
