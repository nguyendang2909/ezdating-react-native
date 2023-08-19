import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { api } from 'app/services/api';
import { Box, FlatList, HStack, Text } from 'native-base';
import React from 'react';

export const MessagesScrollView = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();

  const { conversation } = route.params;

  const conversationId = conversation?._id;

  const { refetch } = api.useGetNextMessagesQuery(
    { conversationId },
    { skip: !conversationId },
  );

  if (!conversationId) {
    return <></>;
  }

  const currentUserId = useAppSelector(state => state.app.profile?._id);

  const messages =
    useAppSelector(
      state => state.conversation.messages[conversationId]?.data,
    ) || [];

  return (
    <FlatList
      flex={1}
      inverted
      data={messages}
      renderItem={({ item, index }) => {
        const isMe = !item._userId || item._userId === currentUserId;

        return (
          <>
            <Box>
              <Box px={2} py={1}>
                <Box>
                  <HStack justifyContent={isMe ? 'flex-end' : 'flex-start'}>
                    <Box
                      bg={isMe ? '#3169CE' : '#E9EBEE'}
                      px={3}
                      py={3}
                      borderTopLeftRadius={16}
                      borderTopRightRadius={16}
                      borderBottomLeftRadius={isMe ? 16 : 4}
                      borderBottomRightRadius={isMe ? 4 : 16}
                    >
                      <Text color={isMe ? 'white' : '#21262E'}>
                        {item.text}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </>
        );
      }}
    ></FlatList>
  );
};
