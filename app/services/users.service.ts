import { API_URL } from 'app/config/config.api';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { requestApi } from './request';

class UsersService {
  async getSwipeUsers() {
    return await requestApi.get<ApiResponse.FetchData<Entity.User[]>>(
      API_URL.usersSwipe,
    );
  }
}

export const usersService = new UsersService();
