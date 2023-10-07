import { Box, ScrollView, Text, View } from '@gluestack-ui/themed';
import { ConversationBox } from 'app/containers/Conversation/ConversationBox';
import { useGetConversations } from 'app/hooks/useGetConversations';
import { useGetMatches } from 'app/hooks/useGetMatches';
import { scrollUtil } from 'app/utils/scroll.util';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ViewStyle,
} from 'react-native';

import { MatchCards } from './MatchCards';
import { NoConversationBox } from './NoConversationBox';

export const ConversationsScrollView: React.FC = () => {
  const {
    fetchNext,
    length: conversationsLength,
    data: conversations,
    isLoadingNewest: isLoadingNewestConversations,
    fetchNewest: fetchNewestConversations,
  } = useGetConversations();

  const {
    data: matches,
    isLoadingNewest: isLoadingNewestMatches,
    fetchNewest: fetchNewestMatches,
  } = useGetMatches();

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      fetchNext();
    }
  };

  const handleRefresh = () => {
    fetchNewestConversations();
    fetchNewestMatches();
  };

  return (
    <ScrollView
      flex={1}
      contentContainerStyle={scrollViewContentContainerStyle}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingNewestConversations || isLoadingNewestMatches}
          onRefresh={handleRefresh}
        ></RefreshControl>
      }
    >
      <Box>
        <MatchCards matches={matches} />
      </Box>

      {conversationsLength ? (
        <>
          <Box px={16} mt={8}>
            <Text bold>Messages</Text>
          </Box>
          <View flex={1}>
            {conversations.map(item => {
              return <ConversationBox key={item._id} data={item} />;
            })}
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
