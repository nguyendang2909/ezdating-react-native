import { FlatList, Spinner } from '@gluestack-ui/themed';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import { Entity } from 'app/types/entity.type';
import { Box, HStack, Text, View } from 'native-base';
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

export const MessagesScrollView = () => {
  const dispatch = useDispatch();
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();

  const { conversation } = route.params;

  const matchId = conversation._id;

  const messages = useAppSelector(state =>
    state.messages.data ? state.messages.data[matchId] : [],
  );

  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);
  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);
  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);
  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const flatListRef = createRef<typeof FlatList<Entity.Message>>();

  const fetchFirstTime = useCallback(async () => {
    setRefreshingTop(true);

    try {
      const fetchData = await messagesApi.getMany({
        params: { matchId },
      });

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data) {
        dispatch(messageActions.addManyFirst(fetchData));
      }
    } catch (err) {}

    setRefreshingTop(false);
  }, [dispatch, matchId]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

  // const { refetch, isFetching } = api.useGetNextMessagesQuery(
  //   {
  //     matchId,
  //     ...(cursorAfter
  //       ? {
  //           next: cursorAfter,
  //         }
  //       : {}),
  //   },
  //   {
  //     skip: !matchId,
  //     // refetchOnMountOrArgChange: false,
  //     // refetchOnFocus: false,
  //     // refetchOnReconnect: false,
  //   },
  // );

  const currentUserId = useAppSelector(state => state.app.profile?._id);

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
      // @ts-ignore
      ref={flatListRef}
      // onLayout={() => {
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   flatListRef.current?.scrollToEnd({ animated: true });
      // }}
      ListFooterComponent={
        isRefreshingBottom ? (
          <Box mt={16}>
            <Spinner />
          </Box>
        ) : (
          <></>
        )
      }
      // refreshControl={
      //   <RefreshControl
      //     refreshing={isFetching}
      //     onRefresh={onRefresh}
      //   ></RefreshControl>
      // }
      inverted
      data={messages}
      keyExtractor={(item: Entity.Message, index) =>
        item._id || index.toString()
      }
      // @ts-ignore
      renderItem={({ item }: { item: Entity.Message }) => {
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
