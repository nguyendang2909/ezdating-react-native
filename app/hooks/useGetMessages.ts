import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import { socketStoreActions } from 'app/store/socket.store';
import _ from 'lodash';
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
  const lastRefreshedAt = useAppSelector(
    s => s.messages.info[matchId]?.lastRefreshedAt,
  );
  const lastConnectedSocket = useAppSelector(s => s.app.socket.connectedAt);

  const fetchFirst = useCallback(async () => {
    setFetchedFirstTime(true);
    setLoadingNewest(true);
    try {
      const data = await messagesApi.getMany({
        matchId,
      });
      dispatch(messageActions.addMany(data));
      messagesApi.handlePagination(data.pagination, setReachedEnd);
    } catch (err) {
    } finally {
      setLoadingNewest(false);
      dispatch(messageActions.updateRefreshTime({ matchId }));
    }
  }, [dispatch, matchId]);

  useEffect(() => {
    if (
      !isFetchedFirstTime &&
      !isLoadingNewest &&
      (!messagesLength ||
        !lastRefreshedAt ||
        moment(lastConnectedSocket).isAfter(moment(lastRefreshedAt)))
    ) {
      fetchFirst();
    }
  }, [
    fetchFirst,
    isFetchedFirstTime,
    isLoadingNewest,
    lastConnectedSocket,
    lastRefreshedAt,
    messagesLength,
  ]);

  const lastMessageId = _.first(messages)?._id as string;

  useEffect(() => {
    if (matchId && lastMessageId) {
      dispatch(
        socketStoreActions.readMessage({
          matchId,
          lastMessageId,
        }),
      );
    }
  }, [dispatch, lastMessageId, matchId]);

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
