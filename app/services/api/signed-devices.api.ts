import { API_URL } from 'app/config/config.api';
import { ApiRequest } from 'app/types';

import { api } from './api';

const signedDevicesApi = api.injectEndpoints({
  endpoints: builder => ({
    // Signed devices
    updateSignedDevice: builder.mutation<void, ApiRequest.UpdateSignedDevice>({
      query: body => ({
        url: API_URL.signedDevices,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useUpdateSignedDeviceMutation } = signedDevicesApi;
