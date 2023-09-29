import { Box, Text, View } from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import React from 'react';

import { ConversationsBox } from './ConversationsFlatList';
import { NoConversationBox } from './NoConversationBox';

export const ConversationContent: React.FC = () => {
  const conversations = useAppSelector(s => s.conversation.data);

  if (conversations) {
    if (conversations.length) {
      return (
        <>
          <Box px={16} mt={8}>
            <Text bold>Messages</Text>
          </Box>
          <View flex={1}>
            <ConversationsBox></ConversationsBox>
          </View>
        </>
      );
    }

    return <NoConversationBox></NoConversationBox>;
  }

  return <></>;
};
