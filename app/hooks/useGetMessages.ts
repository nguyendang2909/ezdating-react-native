import { useQuery } from '@tanstack/react-query';
import { QUERY_OPTIONS } from 'app/constants';
import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './useAppSelector';

export const useGetMessages = ({ matchId }: { matchId: string }) => {
  const dispatch = useDispatch();

  const messages = useAppSelector(state =>
    state.messages.data ? state.messages.data[matchId] : [],
  );

  const [nextCursor, setNextCursor] = useState<string>();
  const [isReachedEnd, setReachedEnd] = useState<boolean>(true);

  const fetchNewestQuery = useQuery({
    queryKey: [
      QUERY_OPTIONS.MESSAGES.KEY.PRIMARY,
      matchId,
      QUERY_OPTIONS.MESSAGES.KEY.SECONDARY.NEWEST,
    ],
    queryFn: () =>
      messagesApi.getMany({
        params: {
          matchId: matchId || '',
        },
      }),
    staleTime: Infinity,
    enabled: !!matchId,
  });

  const fetchNextQuery = useQuery({
    queryKey: [
      QUERY_OPTIONS.MESSAGES.KEY.PRIMARY,
      matchId,
      QUERY_OPTIONS.MESSAGES.KEY.SECONDARY.NEXT,
    ],
    queryFn: () =>
      messagesApi.getMany({
        params: {
          matchId: matchId || '',
          _next: nextCursor,
        },
      }),
    staleTime: Infinity,
    enabled: !!matchId && !!nextCursor,
  });

  const {
    isFetching: isFetchingNewest,
    refetch: refetchNewest,
    data: newestData,
    isLoading: isLoadingNewest,
  } = fetchNewestQuery;

  const {
    isFetching: isFetchingNext,
    data: nextData,
    isLoading: isLoadingNext,
  } = fetchNextQuery;

  useEffect(() => {
    console.log(111);
    if (newestData) {
      dispatch(messageActions.addManyNewest(newestData));

      if (!newestData.pagination?._next) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
  }, [dispatch, newestData]);

  useEffect(() => {
    if (nextData) {
      dispatch(messageActions.addManyNext(nextData));

      if (!nextData.pagination?._next) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
  }, [dispatch, nextData]);

  const fetchNewest = useCallback(async () => {
    if (isFetchingNewest) {
      return;
    }

    await refetchNewest();
  }, [isFetchingNewest, refetchNewest]);

  const fetchNext = useCallback(async () => {
    if (isReachedEnd) {
      return;
    }
    if (isFetchingNext) {
      return;
    }

    setNextCursor(messagesApi.getCursor(messages));
  }, [isFetchingNext, isReachedEnd, messages]);

  return {
    data: messages,
    fetchNewest,
    fetchNext,
    isFetchingNewest,
    isFetchingNext,
    isLoadingNewest,
    isLoadingNext,
  };
};
