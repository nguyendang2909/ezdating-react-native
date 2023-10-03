import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { useGetMessages } from 'app/hooks/useGetMessages';
import { socketStoreActions } from 'app/store/socket.store';
import { Entity } from 'app/types/entity.type';
import { flatListUtil } from 'app/utils/flat-list.util';
import _ from 'lodash';
import { Spinner } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
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

  const { fetchNext, isLoadingNext } = useGetMessages({ matchId });

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

  return (
    <>
      <GiftedChat
        isLoadingEarlier={true}
        loadEarlier={isLoadingNext}
        renderLoadEarlier={() => {
          return <Spinner />;
        }}
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
        listViewProps={{
          initialNumToRender: 20,
          scrollEventThrottle: 400,
          onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (flatListUtil.isCloseToTop(e)) {
              fetchNext();
            }
          },
        }}
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
