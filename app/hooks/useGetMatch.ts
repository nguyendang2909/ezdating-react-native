import { matchesApi } from 'app/services/api/matches.api';
import { matchActions } from 'app/store/match.store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './useAppSelector';
import { messagesService } from 'app/services/messages.service';

export const useGetMatch = (matchId: string) => {
  const dispatch = useDispatch();

  const match = useAppSelector(state =>
    state.match.data.find(e => e._id === matchId),
  );
  const [isReachedEnd, setReachedEnd] = useState<boolean>(true);
  const [isLoadingNewest, setLoadingNewest] = useState<boolean>(false);
  const [isLoadingNext, setLoadingNext] = useState<boolean>(false);
  const [isFetchedFirstTime, setFetchFirstTime] = useState<boolean>(false);

  const fetchFirst = useCallback(async () => {
    setFetchFirstTime(true);

    setLoadingNewest(true);

    try {
      const { data, pagination } = await matchesApi.getMany();

      if (data) {
        dispatch(matchActions.addMany(data));
      }

      matchesApi.handlePagination(pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNewest(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!match || !match._id || messagesService) {
      fetchFirst();
    }
  }, [fetchFirst, isFetchedFirstTime, isLoadingNewest, match]);

  const fetchNewest = async () => {
    if (isLoadingNewest) {
      return;
    }

    await fetchFirst();
  };

  const fetchNext = async () => {
    if (isReachedEnd) {
      return;
    }
    if (isLoadingNext) {
      return;
    }
    try {
      const nextCursor = matchesApi.getCursor(matches);
      const { data, pagination } = await matchesApi.getMany({
        _next: nextCursor,
      });
      if (data) {
        dispatch(matchActions.addMany(data));
      }
      matchesApi.handlePagination(pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNext(false);
    }
  };

  return {
    length: matchesLength,
    data: matches,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    isFetchedFirstTime,
  };
};
