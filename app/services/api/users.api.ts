import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class UsersApi extends CommonApi {
  async getSwipeUsers() {
    const { data } = await api.get<ApiResponse.FetchData<Entity.User[]>>(
      API_URL.usersSwipe,
    );

    return data;
  }

  async getUsersNearby(params: ApiRequest.SearchUsersNearby) {
    const { data } = await api.get(API_URL.usersNearby, {
      params,
    });
    return data;
  }

  async getMyProfile() {
    const { data } = await api.get<ApiResponse.UserData>(API_URL.myProfile);

    return data;
  }

  async updateBasicProfile(body: ApiRequest.UpdateProfileBasicInfo) {
    const { data } = await api.patch(API_URL.myProfileBasicInfo, body);
    return data;
  }

  async updateProfile(body: ApiRequest.UpdateProfile) {
    const { data } = await api.patch(API_URL.myProfile, body);
    return data;
  }
}

export const usersApi = new UsersApi();
