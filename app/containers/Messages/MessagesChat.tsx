import { Box } from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import { socketStoreActions } from 'app/store/socket.store';
import { Entity } from 'app/types/entity.type';
import React, { useCallback, useEffect } from 'react';
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

type FCProps = {
  conversation: Entity.Match;
};
export const MessagesChat: React.FC<FCProps> = ({ conversation }) => {
  const dispatch = useDispatch();

  const matchId = conversation._id;

  const messages =
    useAppSelector(state =>
      state.messages.data ? state.messages.data[matchId] : [],
    ) || [];

  const currenUserId = useAppSelector(s => s.app.profile?._id) || '';

  const fetchFirstTime = useCallback(async () => {
    try {
      const fetchData = await messagesApi.getMany({
        params: { matchId },
      });

      //   if (fetchData.pagination?._next === null) {
      //     setReachedEnd(true);
      //   } else {
      //     setReachedEnd(false);
      //   }

      if (fetchData.data) {
        dispatch(messageActions.addManyNext(fetchData));
      }
    } catch (err) {}
  }, [dispatch, matchId]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

  const onSend = useCallback((messages: IChatMessage[] = []) => {
    for (const message of messages) {
      dispatch(
        socketStoreActions.sendMessage({
          ...message,
          uuid: uuidV4(),
          matchId,
        }),
      );
    }

    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);

  const onEndReached = async () => {
    try {
      const fetchData = await messagesApi.getMany({
        params: {
          matchId,
        },
        data: messages,
      });

      //   if (fetchData.pagination?._next === null) {
      //     setReachedEnd(true);
      //   } else {
      //     setReachedEnd(false);
      //   }

      if (fetchData.data) {
        dispatch(messageActions.addManyFirst(fetchData));
      }
    } catch (err) {}
  };

  return (
    <GiftedChat
      renderSystemMessage={() => {
        return <Box />;
      }}
      //   renderMessage={() => {
      //     return <Box />;
      //   }}
      messages={messages}
      //   messages={messages.map(m => {
      //     return {
      //       ...m,
      //       user: {
      //         _id: 1222,
      //       },
      //     };
      //   })}
      onSend={messages => onSend(messages)}
      user={{
        _id: currenUserId,
      }}
      // isLoadingEarlier={true}
      listViewProps={{
        onEndReached,
        onEndReachedThreshold: 1000,
      }}
    />
  );
};
