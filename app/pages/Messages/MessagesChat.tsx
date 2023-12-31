import { KeyboardAvoidingView, Spinner } from '@gluestack-ui/themed';
import { ChatSpinner } from 'app/containers/Messages/ChatSpinner';
import { RenderMessage } from 'app/containers/Messages/RenderMessage';
import { useChatMessages } from 'app/hooks/useChatMessages';
import { socketStoreActions } from 'app/store/socket.store';
import { ChatUser } from 'app/types';
import { scrollUtil } from 'app/utils/scroll.util';
import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform } from 'react-native';
import { AvatarProps, GiftedChat, IChatMessage, IMessage } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

import { RenderAvatar } from '../../containers/Messages/RenderAvatar';

type FCProps = {
  matchId: string;
  currentUser: ChatUser;
  targetUser: ChatUser;
};
export const MessagesChat: React.FC<FCProps> = ({ matchId, currentUser, targetUser }) => {
  const dispatch = useDispatch();

  const { data: messages = [], fetchNext, isLoadingNext } = useChatMessages({ matchId });

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
      return <RenderAvatar avatarProps={props} currentUser={currentUser} targetUser={targetUser} />;
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
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
      )}
    </>
  );
};
