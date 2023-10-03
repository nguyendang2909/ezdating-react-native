import { Box, ScrollView, Text, View } from '@gluestack-ui/themed';
import { useGetConversations } from 'app/hooks/useGetConversations';
import { flatListUtil } from 'app/utils/flat-list.util';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';

import { ConversationsBox } from './ConversationsFlatList';
import { MatchContent } from './MatchContent';
import { NoConversationBox } from './NoConversationBox';

export const ConversationsScrollView: React.FC = () => {
  const { fetchNext, length: conversationsLength } = useGetConversations();

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

      {conversationsLength ? (
        <>
          <Box px={16} mt={8}>
            <Text bold>Messages</Text>
          </Box>
          <View flex={1}>
            <ConversationsBox></ConversationsBox>
          </View>
        </>
      ) : (
        <NoConversationBox></NoConversationBox>
      )}
    </ScrollView>
  );
};

const scrollViewContentContainerStyle: ViewStyle = {
  flexGrow: 1,
};
