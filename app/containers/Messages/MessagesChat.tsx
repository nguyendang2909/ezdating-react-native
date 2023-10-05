import { KeyboardAvoidingView, Spinner } from '@gluestack-ui/themed';
import { useGetMessages } from 'app/hooks/useGetMessages';
import { socketStoreActions } from 'app/store/socket.store';
import { ChatUser } from 'app/types';
import { Entity } from 'app/types/entity.type';
import { scrollUtil } from 'app/utils/scroll.util';
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
} from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { ChatSpinner } from './ChatSpinner';
import { RenderAvatar } from './RenderAvatar';
import { RenderMessage } from './RenderMessage';

type FCProps = {
  conversation: Entity.Match;
  currentUser: ChatUser;
  targetUser: ChatUser;
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
    },
    [dispatch, matchId],
  );

  const renderAvatar = useCallback(
    (props: AvatarProps<IMessage>) => {
      return (
        <RenderAvatar
          avatarProps={props}
          currentUser={currentUser}
          targetUser={targetUser}
        />
      );
    },
    [currentUser, targetUser],
  );

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (scrollUtil.isCloseToTop(e)) {
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
