import {
  useGetNewestConversationsMutation,
  useGetNextConversationsMutation,
  useRefreshConversationsQuery,
} from 'app/services/api';
import { conversationsApi } from 'app/services/api/conversations.api';
import { matchSelects } from 'app/store/match/match.store';
import moment from 'moment';

import { useAppSelector } from './useAppSelector';

export const useConversations = () => {
  const conversations = useAppSelector(matchSelects.conversations);
  const isReachedEnd = !!useAppSelector(
    s => s.match.infoConversations.isReachedEnd,
  );
  const lastRefreshedAt = useAppSelector(
    s => s.match.infoConversations.lastRefreshedAt,
  );
  const socketConnectedAt = useAppSelector(s => s.app.socket.connectedAt);
  const conversationsLength = conversations.length;
  const [getNewestConversations, { isLoading: isLoadingNewest }] =
    useGetNewestConversationsMutation();
  const [getNextConversations, { isLoading: isLoadingNext }] =
    useGetNextConversationsMutation();
  const { isLoading } = useRefreshConversationsQuery(
    {},
    {
      skip:
        !!lastRefreshedAt &&
        moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
    },
  );

  const fetchNewest = async () => {
    getNewestConversations({});
  };

  const fetchNext = async () => {
    const _next = conversationsApi.getCursor(conversations);
    if (isReachedEnd || !_next) {
      return;
    }
    getNextConversations({ _next });
  };

  return {
    length: conversationsLength,
    data: conversations,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    isLoading,
    isReachedEnd,
    lastRefreshedAt,
  };
};
