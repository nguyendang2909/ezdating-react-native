import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { matchesApi } from 'app/services/api/matches.api';
import { ApiRequest, ApiResponse } from 'app/types';
import { AxiosError } from 'axios';

export const useCreateMatchMutation = (
  options?: Omit<
    UseMutationOptions<
      ApiResponse.MatchData,
      AxiosError,
      ApiRequest.CreateMatch
    >,
    'mutationFn'
  >,
) => {
  return useMutation(payload => matchesApi.createOne(payload), options);
};
