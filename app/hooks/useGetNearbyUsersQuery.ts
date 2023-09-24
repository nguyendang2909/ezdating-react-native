import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'app/constants';
import { nearbyUsersApi } from 'app/services/api/nearby-users.api';

export const useGetNearbyUsersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.NEARBY_USERS],
    queryFn: () => nearbyUsersApi.getMany(),
    staleTime: QUERY_KEYS.NEARBY_USERS.STALE_TIME,
    refetchInterval: 5000,
  });
};
