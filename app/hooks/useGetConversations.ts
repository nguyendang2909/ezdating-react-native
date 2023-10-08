import { conversationsApi } from 'app/services/api/conversations.api';
import {
  getManyNewestConversations,
  getManyNextConversations,
  refreshConversations,
} from 'app/store/match/conversation.action';
import { matchSelects } from 'app/store/match/match.store';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useGetConversations = () => {
  const dispatch = useAppDispatch();

  const conversations = useAppSelector(matchSelects.conversations);

  const isLoading = !!useAppSelector(s => s.match.infoConversations.isLoading);
  const isReachedEnd = !!useAppSelector(
    s => s.match.infoConversations.isReachedEnd,
  );
  const isLoadingNext = !!useAppSelector(
    s => s.match.infoConversations.isLoadingNext,
  );
  const isLoadingNewest = !!useAppSelector(
    s => s.match.infoConversations.isLoadingNewest,
  );
  const lastRefreshedAt = !!useAppSelector(
    s => s.match.infoConversations.lastRefreshedAt,
  );
  const conversationsLength = conversations.length;

  useEffect(() => {
    dispatch(refreshConversations());
  }, [dispatch]);

  const fetchNewest = async () => {
    dispatch(getManyNewestConversations());
  };

  const fetchNext = async () => {
    const _next = conversationsApi.getCursor(conversations);
    dispatch(getManyNextConversations({ ...(_next ? { _next } : {}) }));
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
