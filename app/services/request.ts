import Config from 'app/config';
import { store } from 'app/store';
import { appActions } from 'app/store/app.store';
import { ApiResponse } from 'app/types/api-response.type';
import axios from 'axios';

export const requestApi = axios.create({
  baseURL: Config.API_URL,
});

requestApi.defaults.timeout = 15000;

requestApi.interceptors.request.use(config => {
  const accessToken = store.getState().app.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

requestApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().app.refreshToken;

      try {
        const tokenResponse = await axios.post<
          ApiResponse.FetchData<ApiResponse.Tokens>
        >(`${Config.API_URL}/auth/tokens/access-token`, {
          refreshToken,
        });

        if (tokenResponse.data.data) {
          store.dispatch(appActions.updateAccessToken(tokenResponse.data.data));

          return requestApi(originalRequest);
        }
      } catch (err) {}

      store.dispatch(appActions.logout());

      return Promise.reject(error);
    }

    return Promise.reject(error);

    // if (error.response?.status !== 401) {
    //   const errMessage = error.response?.data || error?.response || error;

    //   return Promise.reject(errMessage);
    // }

    // const refreshToken = store.getState().app.refreshToken;

    // if (!refreshToken) {
    //   store.dispatch(appActions.logout());
    // }

    // try {
    //   const { data: tokenData } = await axios.post<
    //     ApiResponse.FetchData<ApiResponse.Tokens>
    //   >(`${Config.API_URL}/auth/tokens/access-token`, {
    //     refreshToken,
    //   });

    //   if (tokenData.data) {
    //     store.dispatch(appActions.updateAccessToken(tokenData.data));
    //   }

    //   if (error.config) {
    //     error.config.headers.Authorization =
    //       'Bearer ' + tokenData.data?.accessToken;

    //     return axios(error.config);
    //   }
    // } catch (err) {}

    // if ([401, 403].includes(error.response.status)) {
    //   if (!mutex.isLocked()) {
    //     const release = await mutex.acquire();
    //     try {
    //       const refreshToken = store.getState().app.refreshToken;
    //       if (!refreshToken) {
    //         throw new Error('Refresh token does not exist!');
    //       }
    //       const { data: tokenData } = await axios.post<
    //         ApiResponse.FetchData<ApiResponse.Tokens>
    //       >(`${Config.API_URL}/auth/tokens/access-token`, {
    //         refreshToken,
    //       });
    //       if (tokenData.data) {
    //         store.dispatch(appActions.updateAccessToken(tokenData.data));
    //         result = await baseQuery(args, baseQueryApi, extraOptions);
    //       } else {
    //         baseQueryApi.dispatch(appActions.logout());
    //       }
    //     } catch (err) {
    //     } finally {
    //       release();
    //     }
    //   } else {
    //     await mutex.waitForUnlock();
    //     result = await baseQuery(args, baseQueryApi, extraOptions);
    //   }
    // place your reentry code
    // }
    // return error;
  },
);

// const refreshAccessToken = () => {
//   const refreshToken = store.getState().app.refreshToken;
// };
