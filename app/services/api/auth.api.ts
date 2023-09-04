import { API_URL } from 'app/config/config.api';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class AuthApi {
  async signInWithPhoneNumber() {
    const { data } = await api.post<ApiResponse.Logged>(
      API_URL.signInWithPhoneNumber,
    );

    return data;
  }
}

export const authApi = new AuthApi();
