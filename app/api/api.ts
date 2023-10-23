import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'app/config';
import { appActions } from 'app/store/app.store';
import { ApiResponse } from 'app/types/api-response.type';
import { AppStore } from 'app/types/app-store.type';
import { Mutex } from 'async-mutex';
import queryString from 'query-string';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  paramsSerializer: (params: Record<string, unknown>) => {
    return queryString.stringify(params);
  },
  baseUrl: Config.API_URL,
  timeout: 15000,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppStore.RootState)?.app?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery: async (args, baseQueryApi, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, baseQueryApi, extraOptions);
    if (process.env.NODE_ENV === 'development') {
      if (result.error) {
        console.log(
          `Request ${JSON.stringify(args)} ${JSON.stringify(baseQueryApi)} error: ${JSON.stringify(
            result.error.data,
          )}`,
        );
      }
    }
    if (result.error && [401, 403].includes(result.error.status as number)) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = (baseQueryApi.getState() as AppStore.RootState).app?.refreshToken;
          const refreshResult = (
            await baseQuery(
              {
                method: 'POST',
                url: '/auth/tokens/access-token',
                body: {
                  refreshToken,
                },
              },
              baseQueryApi,
              extraOptions,
            )
          ).data as ApiResponse.FetchData<ApiResponse.Tokens>;
          if (refreshResult.data) {
            baseQueryApi.dispatch(appActions.updateAccessToken(refreshResult.data));
            result = await baseQuery(args, baseQueryApi, extraOptions);
          } else {
            baseQueryApi.dispatch(appActions.logout());
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, baseQueryApi, extraOptions);
      }
    }

    return result;
  },
  tagTypes: ['Profile'],
  endpoints: _builder => ({}),
});

export const { endpoints } = api;
