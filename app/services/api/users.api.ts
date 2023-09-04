import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class UsersApi {
  async getSwipeUsers() {
    return await api.get<ApiResponse.FetchData<Entity.User[]>>(
      API_URL.usersSwipe,
    );
  }

  async getUsersNearby(params: ApiRequest.SearchUsersNearby) {
    return await api.get(API_URL.usersNearby, {
      params,
    });
  }

  async getMyProfile() {
    return await api.get<ApiResponse.UserData>(API_URL.myProfile);
  }

  async updateBasicProfile(body: ApiRequest.UpdateProfileBasicInfo) {
    return await api.patch(API_URL.myProfileBasicInfo, body);
  }

  async updateProfile(body: ApiRequest.UpdateProfile) {
    return await api.patch(API_URL.myProfile, body);
  }
}

export const usersApi = new UsersApi();
