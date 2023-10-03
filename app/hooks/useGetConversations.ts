import { useQuery } from '@tanstack/react-query';
import { QUERY_OPTIONS } from 'app/constants';
import { conversationsApi } from 'app/services/api/conversations.api';
import { conversationActions } from 'app/store/conversations.store';
import { ApiResponse } from 'app/types/api-response.type';
import { Entity } from 'app/types/entity.type';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from './useAppSelector';

export const useGetConversations = () => {
  const dispatch = useDispatch();

  const conversations = useAppSelector(state => state.conversation.data) || [];

  const [nextCursor, setNextCursor] = useState<string>();
  const [isReachedEnd, setReachedEnd] = useState<boolean>(true);

  const fetchNewestQuery = useQuery({
    queryKey: [
      QUERY_OPTIONS.CONVERSATIONS.KEY.PRIMARY,
      QUERY_OPTIONS.CONVERSATIONS.KEY.SECONDARY.NEWEST,
    ],
    queryFn: () => conversationsApi.getMany(),
  });

  const fetchNextQuery = useQuery({
    queryKey: [
      QUERY_OPTIONS.MESSAGES.KEY.PRIMARY,
      QUERY_OPTIONS.MESSAGES.KEY.SECONDARY.NEXT,
    ],
    queryFn: () =>
      conversationsApi.getMany({
        _next: nextCursor,
      }),
    enabled: !!nextCursor,
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

  const addData = useCallback(
    (data?: ApiResponse.PaginatedResponse<Entity.Match>) => {
      if (data?.data) {
        dispatch(conversationActions.addMany(data.data));

        if (!data.pagination?._next) {
          setReachedEnd(true);
        } else {
          setReachedEnd(false);
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    console.log(333);
    addData(newestData);
  }, [addData, newestData]);

  useEffect(() => {
    addData(nextData);
  }, [addData, nextData]);

  const fetchNewest = async () => {
    if (isFetchingNewest) {
      return;
    }

    await refetchNewest();
  };

  const fetchNext = async () => {
    if (isReachedEnd) {
      return;
    }
    if (isFetchingNext) {
      return;
    }

    setNextCursor(conversationsApi.getCursor(conversations));
  };

  return {
    data: conversations,
    fetchNewest,
    fetchNext,
    isFetchingNewest,
    isFetchingNext,
    isLoadingNewest,
    isLoadingNext,
  };
};
