import { CommonApi } from 'app/commons/api.common';
import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';

import { api } from './api';

class NearbyUsersApi extends CommonApi {
  async getMany(params?: ApiRequest.SearchUsersNearby) {
    const response = await api.get<ApiResponse.PaginatedResponse<Entity.User>>(
      API_URL.usersNearby,
      {
        params,
      },
    );

    return response.data;
  }

  public getCursor(users: Entity.User[]): string | undefined {
    if (!users.length) {
      return undefined;
    }
    const minDistance = users[users.length - 1].distance;
    const excludedUserIds = users
      .filter(e => e.distance === minDistance)
      .map(e => e._id);
    const cursor = {
      minDistance,
      excludedUserIds,
    };

    return this.encodeFromObj(cursor);
  }
}

export const nearbyUsersApi = new NearbyUsersApi();
