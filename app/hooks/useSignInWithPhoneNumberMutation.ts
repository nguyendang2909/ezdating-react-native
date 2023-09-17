import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { authApi } from 'app/services/api/auth.api';
import { ApiRequest } from 'app/types/api-request.type';
import { ApiResponse } from 'app/types/api-response.type';
import { AxiosError } from 'axios';

export const useSignInWithPhoneNumberMutation = (
  options?: Omit<
    UseMutationOptions<
      ApiResponse.Logged,
      AxiosError,
      ApiRequest.LoginByPhoneNumber
    >,
    'mutationFn'
  >,
) => {
  return useMutation(
    payload => authApi.signInWithPhoneNumber(payload),
    options,
  );
};
