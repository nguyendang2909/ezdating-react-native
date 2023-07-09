import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { api } from 'app/services/api';
import { socketStoreActions } from 'app/store/socket.store';
import React from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { useDispatch } from 'react-redux';

type FCProps = {};

export const MessagesByConversationBox: React.FC<FCProps> = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();
  const conversationId = route.params.conversationId;
  const { refetch } = api.useGetMessagesQuery(
    { conversationId },
    { skip: !conversationId },
  );
  const dispatch = useDispatch();
  const profile = useAppSelector(state => state.app.profile);

  const messages =
    useAppSelector(
      state => state.conversation.messages[conversationId]?.data,
    ) || [];

  const onSend = (msgs: IMessage[]) => {
    dispatch(
      socketStoreActions.sendMessage({
        ...msgs[0],
        relationshipId: conversationId,
      }),
    );
  };

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: profile.id || '',
          name: profile.nickname,
          avatar: profile.uploadFiles
            ? profile.uploadFiles[0]?.location
            : undefined,
        }}
        showUserAvatar={true}
      />
    </>
  );
};
