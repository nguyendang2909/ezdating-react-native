import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { messagesApi } from 'app/services/api/messages.api';
import { messageActions } from 'app/store/messages.store';
import { socketStoreActions } from 'app/store/socket.store';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { GiftedChat, IChatMessage, User } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

type FCProps = {
  conversation: Entity.Match;
  currentUser: User;
  targetUser: User;
};
export const MessagesChat: React.FC<FCProps> = ({
  conversation,
  currentUser,
  targetUser,
}) => {
  const dispatch = useDispatch();

  const matchId = conversation._id;

  const messages =
    useAppSelector(state =>
      state.messages.data ? state.messages.data[matchId] : [],
    ) || [];

  const lastMessageId = _.first(messages)?._id as string;

  useEffect(() => {
    if (conversation.read === false && matchId && lastMessageId) {
      dispatch(
        socketStoreActions.readMessage({
          matchId,
          lastMessageId,
        }),
      );
    }
  }, [conversation.read, dispatch, lastMessageId, matchId]);

  const currenUserId = useAppSelector(s => s.app.profile?._id) || '';

  const fetchFirstTime = useCallback(async () => {
    try {
      console.log(22233);
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

  // useEffect(() => {
  //   fetchFirstTime();
  // }, []);

  const onSend = useCallback(
    (messages: IChatMessage[] = []) => {
      for (const message of messages) {
        dispatch(
          socketStoreActions.sendMessage({
            text: message.text,
            uuid: uuidV4(),
            matchId,
          }),
        );
      }

      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, messages),
      // );
    },
    [dispatch, matchId],
  );

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
    <>
      {/* <GiftedChat
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
          _id: user._id,
          name: 'asd',
          avatar:
            'https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png',
        }}
        showUserAvatar={true}
        alwaysShowSend={true}
        // isLoadingEarlier={true}
        // listViewProps={{
        //   onEndReached,
        //   onEndReachedThreshold: 1000,
        // }}
      /> */}
      <GiftedChat
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: currentUser._id,
        }}
        showUserAvatar={true}
        alwaysShowSend={true}
        renderAvatarOnTop
        renderAvatar={props => {
          const { currentMessage } = props;

          const userId = currentMessage?.user._id;

          const isCurrentUser = userId === currentUser._id;

          const avatar = isCurrentUser ? currentUser.avatar : targetUser.avatar;

          const name = isCurrentUser ? currentUser.name : targetUser.name;

          return (
            <>
              <Box>
                <Avatar width={36} height={36}>
                  <AvatarFallbackText>{name}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: avatar as string,
                    }}
                  ></AvatarImage>
                </Avatar>
              </Box>
            </>
          );
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={80}
        />
      ) : (
        <></>
      )}
    </>
  );
};
