import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class AuthApi extends CommonApi {
  public async signInWithPhoneNumber(
    payload: ApiRequest.SignInWithPhoneNumber,
  ) {
    const { data } = await api.post<ApiResponse.Logged>(
      API_URL.signInWithPhoneNumber,
      payload,
    );

    return data;
  }

  public async logout() {
    const { data } = await api.post<ApiResponse.SuccessResponse>(
      API_URL.logout,
    );

    return data;
  }
}

export const authApi = new AuthApi();
