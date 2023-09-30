import { Box, ScrollView } from '@gluestack-ui/themed';
import { conversationsApi } from 'app/services/api/conversations.api';
import { conversationActions } from 'app/store/conversations.store';
import { flatListUtil } from 'app/utils/flat-list.util';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { ConversationContent } from './ConversationContent';
import { MatchContent } from './MatchContent';

export const ConversationsScrollView: React.FC = () => {
  const dispatch = useDispatch();

  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);
  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);
  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);
  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const fetchFirst = useCallback(async () => {
    setRefreshingTop(true);

    try {
      const fetchData = await conversationsApi.getMany();

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data?.length) {
        dispatch(conversationActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}

    setRefreshingTop(false);
  }, [dispatch]);

  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!flatListUtil.isCloseToBottom(e)) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    if (isReachedEnd) {
      return;
    }

    setRefreshingBottom(true);

    try {
      const fetchData = await conversationsApi.getManyNext();

      if (fetchData.data?.length) {
        dispatch(conversationActions.addManyNext(fetchData.data));
      } else {
        setReachedEnd(true);
      }
    } catch (err) {}

    setRefreshingBottom(false);
  };

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={scrollViewContentContainerStyle}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}

      //   ListFooterComponent={
      //     isRefreshingBottom ? (
      //       <Box mt={16}>
      //         <Spinner />
      //       </Box>
      //     ) : (
      //       <></>
      //     )
      //   }
    >
      <Box>
        <MatchContent />
      </Box>

      <ConversationContent />
    </ScrollView>
  );
};

const scrollViewContentContainerStyle: ViewStyle = {
  flexGrow: 1,
};
