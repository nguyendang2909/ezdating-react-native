import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  KeyboardAvoidingView,
  Spinner,
} from '@gluestack-ui/themed';
import { useGetMessages } from 'app/hooks/useGetMessages';
import { socketStoreActions } from 'app/store/socket.store';
import { Entity } from 'app/types/entity.type';
import { flatListUtil } from 'app/utils/flat-list.util';
import React, { useCallback } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import {
  AvatarProps,
  GiftedChat,
  IChatMessage,
  IMessage,
  User,
} from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { ChatSpinner } from './ChatSpinner';
import { RenderMessage } from './RenderMessage';

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

  const {
    data: messages = [],
    fetchNext,
    isLoadingNext,
  } = useGetMessages({ matchId });

  const handleSend = useCallback(
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

  const renderAvatar = useCallback(
    (props: AvatarProps<IMessage>) => {
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
    },
    [
      currentUser._id,
      currentUser.avatar,
      currentUser.name,
      targetUser.avatar,
      targetUser.name,
    ],
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (flatListUtil.isCloseToTop(e)) {
        fetchNext();
      }
    },
    [fetchNext],
  );

  return (
    <>
      <GiftedChat
        isLoadingEarlier={true}
        loadEarlier={isLoadingNext}
        renderLoadEarlier={ChatSpinner}
        messages={messages}
        onSend={handleSend}
        user={{
          _id: currentUser._id,
        }}
        showUserAvatar={true}
        alwaysShowSend={true}
        renderAvatarOnTop
        listViewProps={{
          initialNumToRender: 25,
          scrollEventThrottle: 400,
          onScroll: handleScroll,
        }}
        renderAvatar={renderAvatar}
        maxInputLength={5000}
        renderActions={RenderMessage}
        renderBubble={RenderMessage}
        scrollToBottom={true}
        scrollToBottomComponent={() => {
          return <Spinner />;
        }}
      />
      {Platform.OS === 'android' && (
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={80}
        />
      )}
    </>
  );
};
