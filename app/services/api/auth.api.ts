import { CommonApi } from 'app/commons/api.common';

class AuthApi extends CommonApi {
  // public async signInWithPhoneNumber(
  //   payload: ApiRequest.SignInWithPhoneNumber,
  // ) {
  //   const { data } = await api.post<ApiResponse.Logged>(
  //     API_URL.signInWithPhoneNumber,
  //     payload,
  //   );
  //   return data;
  // }
  // public async logout() {
  //   const { data } = await api.post<ApiResponse.SuccessResponse>(
  //     API_URL.logout,
  //   );
  //   return data;
  // }
}

export const authApi = new AuthApi();
