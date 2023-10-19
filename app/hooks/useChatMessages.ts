import { useGetNewestMessagesMutation, useRefreshMessagesQuery } from 'app/services/api';
import { messagesService } from 'app/services/messages.service';
import { socketStoreActions } from 'app/store/socket.store';
import _ from 'lodash';
import moment from 'moment';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useChatMessages = ({ matchId }: { matchId: string }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.message.data[matchId]) || [];
  const messagesLength = messages?.length || 0;
  const isReachedEnd = !!useAppSelector(state => state.message.info[matchId]?.isReachedEnd);
  const socketConnectedAt = useAppSelector(state => state.app.socket.connectedAt);
  const lastRefreshedAt = useAppSelector(state => state.message.info[matchId]?.lastRefreshedAt);
  const { isLoading } = useRefreshMessagesQuery(
    { matchId },
    {
      skip: !!lastRefreshedAt && moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
    },
  );
  const [getNewestMessages, { isLoading: isLoadingNewest }] = useGetNewestMessagesMutation();
  const [getNextMessages, { isLoading: isLoadingNext }] = useGetNewestMessagesMutation();
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
    getNewestMessages({
      matchId,
    });
  };

  const fetchNext = async () => {
    const _next = messagesService.getCursor(messages);
    if (isReachedEnd || !_next) {
      return;
    }
    getNextMessages({ matchId, _next });
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
