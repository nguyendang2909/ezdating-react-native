import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import {
  getManyNewestNearbyUsers,
  getManyNextNearbyUsers,
  refreshNearbyUsers,
} from 'app/store/nearby-user';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useGetNearbyUsers = () => {
  const dispatch = useAppDispatch();
  const nearbyUsers = useAppSelector(state => state.nearbyUser.data);
  const length = nearbyUsers.length;
  const isReachedEnd = !!useAppSelector(s => s.nearbyUser.info.isReachedEnd);
  const isLoadingNewest = !!useAppSelector(
    s => s.nearbyUser.info.isLoadingNewest,
  );
  const isLoadingNext = !!useAppSelector(s => s.nearbyUser.info.isLoadingNext);
  const isLoading = !!useAppSelector(s => s.nearbyUser.info.isLoading);
  const lastRefreshedAt = useAppSelector(
    s => s.nearbyUser.info.lastRefreshedAt,
  );

  useEffect(() => {
    dispatch(refreshNearbyUsers());
  }, [dispatch]);

  const fetchNewest = async () => {
    dispatch(getManyNewestNearbyUsers());
  };

  const fetchNext = async () => {
    const _next = nearbyUsersApi.getCursor(nearbyUsers);
    dispatch(
      getManyNextNearbyUsers({
        _next,
      }),
    );
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
