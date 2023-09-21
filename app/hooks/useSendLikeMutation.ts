import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { likesApi } from 'app/services/api/likes.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AxiosError } from 'axios';

export const useSendLikeMutation = (
  options?: Omit<
    UseMutationOptions<
      ApiResponse.SuccessResponse,
      AxiosError,
      ApiRequest.SendLike
    >,
    'mutationFn'
  >,
) => {
  return useMutation(payload => likesApi.send(payload), options);
};
