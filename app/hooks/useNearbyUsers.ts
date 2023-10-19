import {
  useGetNewestUsersMutation,
  useGetNextNearbyUsersMutation,
  useRefreshNearbyUsersQuery,
} from 'app/api';
import { nearbyUsersService } from 'app/services/nearby-users.service';

import { useAppSelector } from './useAppSelector';

export const useNearbyUsers = () => {
  const nearbyUsers = useAppSelector(state => state.nearbyUser.data);
  const length = nearbyUsers.length;
  const isReachedEnd = !!useAppSelector(s => s.nearbyUser.info.isReachedEnd);
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);
  const { isLoading } = useRefreshNearbyUsersQuery(undefined, {
    skip: !!lastRefreshedAt && !nearbyUsersService.isStale(lastRefreshedAt),
  });
  const [fetchNewest, { isLoading: isLoadingNewest }] = useGetNewestUsersMutation();
  const [fetchNextNearbyUsers, { isLoading: isLoadingNext }] = useGetNextNearbyUsersMutation();

  const fetchNext = () => {
    const _next = nearbyUsersService.getCursor(nearbyUsers);
    if (isReachedEnd || !_next) {
      return;
    }
    fetchNextNearbyUsers({ _next });
  };

  return {
    data: nearbyUsers,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    length,
    isLoading,
    lastRefreshedAt,
    isReachedEnd,
  };
};
