import { API_ENDPOINTS } from 'app/config';
import { ApiRequest } from 'app/types';

import { api } from './api';

const signedDevicesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Signed devices
    updateSignedDevice: builder.mutation<void, ApiRequest.UpdateSignedDevice>({
      query: body => ({
        url: API_ENDPOINTS.SIGNED_DEVICES,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useUpdateSignedDeviceMutation } = signedDevicesApi;
