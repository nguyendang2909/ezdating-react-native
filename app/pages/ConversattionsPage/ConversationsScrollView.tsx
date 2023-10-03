import { Box, ScrollView } from '@gluestack-ui/themed';
import { useGetConversations } from 'app/hooks/useGetConversations';
import { flatListUtil } from 'app/utils/flat-list.util';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';

import { ConversationContent } from './ConversationContent';
import { MatchContent } from './MatchContent';

export const ConversationsScrollView: React.FC = () => {
  const { fetchNext } = useGetConversations();

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!flatListUtil.isCloseToBottom(e)) {
      fetchNext();
    }
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
