import {
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useRefreshNearbyProfilesQuery,
} from 'app/api';
import { nearbyProfilesService } from 'app/services';

import { useAppSelector } from './useAppSelector';

export const useNearbyUsers = () => {
  const nearbyUsers = useAppSelector(state => state.nearbyUser.data);
  const length = nearbyUsers.length;
  const isReachedEnd = !!useAppSelector(s => s.nearbyUser.info.isReachedEnd);
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);
  const { isLoading } = useRefreshNearbyProfilesQuery(undefined, {
    skip: !!lastRefreshedAt && !nearbyProfilesService.isStale(lastRefreshedAt),
  });
  const [fetchNewest, { isLoading: isLoadingNewest }] = useGetNewestNearbyProfilesMutation();
  const [fetchNextNearbyUsers, { isLoading: isLoadingNext }] = useGetNextNearbyProfilesMutation();

  const fetchNext = () => {
    const _next = nearbyProfilesService.getCursor(nearbyUsers);
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
