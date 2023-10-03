import { useQuery } from '@tanstack/react-query';
import { QUERY_OPTIONS } from 'app/constants';
import { matchesApi } from 'app/services/api/matches.api';
import { messagesApi } from 'app/services/api/messages.api';
import { matchActions } from 'app/store/matches.store';
import { messageActions } from 'app/store/messages.store';
import { Entity } from 'app/types/entity.type';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useGetConversation = (match: Entity.Match) => {
  const dispatch = useDispatch();

  const { _id } = match;

  const { data: fetchData, ...rest } = useQuery({
    queryKey: [QUERY_OPTIONS.MESSAGES.KEY.PRIMARY, _id],
    queryFn: () => matchesApi.getOne(_id),
    staleTime: Infinity,
    enabled: !!_id,
  });

  useEffect(() => {
    if (fetchData) {
      dispatch(matchActions.addManyNewest(fetchData));

      if (!newestData.pagination?._next) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
  }, [dispatch]);

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
