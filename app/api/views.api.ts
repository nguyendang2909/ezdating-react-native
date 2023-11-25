import { API_ENDPOINTS } from 'app/config';
import { ApiRequest } from 'app/types';

import { api } from './api';

const viewsApi = api.injectEndpoints({
  endpoints: builder => ({
    // Views
    sendView: builder.mutation<void, ApiRequest.SendView>({
      query: body => ({
        url: API_ENDPOINTS.VIEWS.INDEX,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendViewMutation } = viewsApi;
