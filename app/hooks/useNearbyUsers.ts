import {
  useGetNewestNearbyProfilesMutation,
  useGetNextNearbyProfilesMutation,
  useRefreshNearbyProfilesQuery,
} from 'app/api';
import { nearbyProfilesService } from 'app/services';

import { useAppSelector } from './useAppSelector';

export const useNearbyProfiles = () => {
  const nearbyUsers = useAppSelector(state => state.nearbyUser.data);
  const [longitude, latitude] = useAppSelector(s => s.app.profile.geolocation?.coordinates) || [];
  const length = nearbyUsers.length;
  const isReachedEnd = !!useAppSelector(s => s.nearbyUser.info.isReachedEnd);
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);
  const { isLoading } = useRefreshNearbyProfilesQuery(
    { longitude: longitude as number, latitude: latitude as number },
    {
      skip:
        (!!lastRefreshedAt && !nearbyProfilesService.isStale(lastRefreshedAt)) ||
        !latitude ||
        !longitude,
    },
  );
  const [fetchNewestNearbyProfiles, { isLoading: isLoadingNewest }] =
    useGetNewestNearbyProfilesMutation();
  const [fetchNextNearbyUsers, { isLoading: isLoadingNext }] = useGetNextNearbyProfilesMutation();

  const fetchNext = () => {
    const _next = nearbyProfilesService.getCursor(nearbyUsers);
    if (isReachedEnd || !_next) {
      return;
    }
    if (!longitude || !latitude) {
      return;
    }
    fetchNextNearbyUsers({ _next, longitude, latitude });
  };

  const fetchNewest = async () => {
    if (!longitude || !latitude) {
      return;
    }
    await fetchNewestNearbyProfiles({ longitude, latitude });
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
