import { CommonApi } from 'app/commons/api.common';

class NearbyUsersApi extends CommonApi {
  // async getMany(params?: ApiRequest.SearchUsersNearby) {
  //   const response = await api.get<ApiResponse.PaginatedResponse<Entity.User>>(
  //     API_URL.usersNearby,
  //     {
  //       params,
  //     },
  //   );
  //   return response.data;
  // }
}

export const nearbyUsersApi = new NearbyUsersApi();
