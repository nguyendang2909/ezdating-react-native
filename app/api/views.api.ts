import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types';

import { api } from './api';

const viewsApi = api.injectEndpoints({
  endpoints: builder => ({
    // Views
    sendView: builder.mutation<void, ApiRequest.SendView>({
      query: body => ({
        url: API_URL.views,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendViewMutation } = viewsApi;
