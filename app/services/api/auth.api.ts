import { API_URL } from 'app/config/config.api';
import { ApiResponse } from 'app/types/api-response.type';

import { api } from './api';

class AuthApi {
  async signInWithPhoneNumber() {
    return await api.post<ApiResponse.Logged>(API_URL.signInWithPhoneNumber);
  }
}

export const authApi = new AuthApi();
