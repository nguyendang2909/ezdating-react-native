import { messagesApi } from 'app/services/api/messages.api';
import {
  getManyNewestMessages,
  getManyNextMessages,
  refreshMessages,
} from 'app/store/message/message.action';
import { socketStoreActions } from 'app/store/socket.store';
import _ from 'lodash';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useGetMessages = ({ matchId }: { matchId: string }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.messages.data[matchId]) || [];
  const messagesLength = messages?.length || 0;
  const isReachedEnd = !!useAppSelector(state => {
    return state.messages.info[matchId]?.isReachedEnd;
  });
  const isLoading = !!useAppSelector(state => {
    return state.messages.info[matchId]?.isLoading;
  });
  const isLoadingNewest = !!useAppSelector(state => {
    return state.messages.info[matchId]?.isLoadingNewest;
  });
  const isLoadingNext = !!useAppSelector(state => {
    return state.messages.info[matchId]?.isLoadingNext;
  });
  const lastRefreshedAt = useAppSelector(
    s => s.messages.info[matchId]?.lastRefreshedAt,
  );

  useEffect(() => {
    dispatch(refreshMessages({ matchId }));
  }, [dispatch, matchId]);

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
    dispatch(getManyNewestMessages({ matchId }));
  };

  const fetchNext = async () => {
    const _next = messagesApi.getCursor(messages);
    dispatch(getManyNextMessages({ matchId, ...(_next ? { _next } : {}) }));
  };

  return {
    data: messages,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    length: messagesLength,
    isReachedEnd,
    lastRefreshedAt,
    isLoading,
  };
};
