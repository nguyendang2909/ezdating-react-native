import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { viewsApi } from 'app/services/api/views.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AxiosError } from 'axios';

export const useSendViewMutation = (
  options?: Omit<
    UseMutationOptions<ApiResponse.SuccessResponse, AxiosError, ApiRequest.SendView>,
    'mutationFn'
  >,
) => {
  return useMutation(payload => viewsApi.send(payload), options);
};
