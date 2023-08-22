import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { api } from 'app/services/api';
import { Entity } from 'app/types/entity.type';
import { Box, HStack, Text, View } from 'native-base';
import React, { createRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';

export const MessagesScrollView = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();

  const flatListRef = createRef<typeof FlatList<Entity.Message>>();

  const { conversation } = route.params;

  const matchId = conversation?._id;

  const reduxCursorAfter = useAppSelector(
    state => state.conversation.messages[matchId]?.pagination?.cursors?.after,
  );

  const [cursorAfter, setCursorAfter] = useState<string | null>(null);

  const { refetch, isFetching } = api.useGetNextMessagesQuery(
    {
      matchId,
      ...(cursorAfter
        ? {
            after: cursorAfter,
          }
        : {}),
    },
    {
      skip: !matchId,
      // refetchOnMountOrArgChange: false,
      // refetchOnFocus: false,
      // refetchOnReconnect: false,
    },
  );

  if (!matchId) {
    return <></>;
  }

  const currentUserId = useAppSelector(state => state.app.profile?._id);

  const messages =
    useAppSelector(state => state.conversation.messages[matchId]?.data) || [];

  const onRefresh = () => {
    console.log(reduxCursorAfter);
    if (reduxCursorAfter) {
      setCursorAfter(reduxCursorAfter);
    }
  };

  const renderFooter = () => {
    if (!isFetching) return null;

    return (
      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        pt={2.5}
      >
        <ActivityIndicator size="small" color="#888888" />
      </View>
    );
  };

  return (
    <FlatList
      // ref={flatListRef}
      // onLayout={() => {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   flatListRef.current?.scrollToEnd({ animated: true });
      // }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
      inverted
      data={messages}
      keyExtractor={item => item._id}
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
