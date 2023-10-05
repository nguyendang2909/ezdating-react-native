import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { nearbyUserActions } from 'app/store/nearby-user.store';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './useAppSelector';

export const useGetNearbyUsers = () => {
  const dispatch = useDispatch();
  const nearbyUsers = useAppSelector(state => state.nearbyUser.data);
  const length = nearbyUsers.length;
  const [isReachedEnd, setReachedEnd] = useState<boolean>(true);
  const [isLoadingNewest, setLoadingNewest] = useState<boolean>(false);
  const [isLoadingNext, setLoadingNext] = useState<boolean>(false);
  const lastRefreshedAt = useAppSelector(
    s => s.nearbyUser.info.lastRefreshedAt,
  );

  const fetchFirst = useCallback(async () => {
    setLoadingNewest(true);
    try {
      const { data, pagination } = await nearbyUsersApi.getMany();
      dispatch(nearbyUserActions.addManyFirst(data || []));
      nearbyUsersApi.handlePagination(pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNewest(false);
      dispatch(nearbyUserActions.updateRefreshTime());
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      !isLoadingNewest &&
      (!length ||
        !lastRefreshedAt ||
        moment().diff(moment(lastRefreshedAt), 'hours') >= 1)
    ) {
      fetchFirst();
    }
  }, [fetchFirst, isLoadingNewest, lastRefreshedAt, length]);

  const fetchNewest = async () => {
    if (isLoadingNewest) {
      return;
    }
    await fetchFirst();
  };

  const fetchNext = async () => {
    if (isReachedEnd || isLoadingNext) {
      return;
    }
    try {
      const nextCursor = nearbyUsersApi.getCursor(nearbyUsers);
      const { data, pagination } = await nearbyUsersApi.getMany({
        _next: nextCursor,
      });
      dispatch(nearbyUserActions.addMany(data || []));
      nearbyUsersApi.handlePagination(pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNext(false);
    }
  };

  return {
    data: nearbyUsers,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    length,
  };
};
