import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './useAppSelector';

export const useGetMessages = ({ matchId }: { matchId: string }) => {
  const dispatch = useDispatch();

  const messages = useAppSelector(state => state.messages.data[matchId]);
  const messagesLength = messages?.length || 0;

  const [isReachedEnd, setReachedEnd] = useState<boolean>(true);
  const [isLoadingNewest, setLoadingNewest] = useState<boolean>(false);
  const [isLoadingNext, setLoadingNext] = useState<boolean>(false);
  const [isFetchedFirstTime, setFetchedFirstTime] = useState<boolean>(false);
  const lastRefreshAt = useAppSelector(
    s => s.messages.info[matchId]?.lastRefreshAt,
  );
  const lastConnectedSocket = useAppSelector(s => s.app.socket.connectedAt);

  const fetchFirst = useCallback(async () => {
    setFetchedFirstTime(true);

    setLoadingNewest(true);

    try {
      const data = await messagesApi.getMany({
        matchId,
      });
      // console.log(data);

      dispatch(messageActions.addMany(data));

      messagesApi.handlePagination(data.pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNewest(false);
    }
  }, [dispatch, matchId]);

  useEffect(() => {
    console.log(111);
    if (
      !isFetchedFirstTime &&
      !isLoadingNewest &&
      (!messagesLength ||
        !lastRefreshAt ||
        moment(lastConnectedSocket).isAfter(moment(lastRefreshAt)))
    ) {
      fetchFirst();
    }
  }, [
    fetchFirst,
    isFetchedFirstTime,
    isLoadingNewest,
    lastConnectedSocket,
    lastRefreshAt,
    messagesLength,
  ]);

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
      const nextCursor = messagesApi.getCursor(messages);

      const data = await messagesApi.getMany({
        matchId,
        _next: nextCursor,
      });

      if (data) {
        dispatch(messageActions.addMany(data));

        messagesApi.handlePagination(data.pagination, setReachedEnd);
      }
    } catch (err) {
    } finally {
      setLoadingNext(false);
    }
  };

  return {
    data: messages,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    isFetchedFirstTime,
    length: messagesLength,
  };
};
