import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { api } from 'app/services/api';
import React from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

type FCProps = {};

export const MessagesByConversationBox: React.FC<FCProps> = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();
  const conversationId = route.params.conversationId;
  const { refetch } = api.useGetMessagesQuery(
    { conversationId },
    { skip: !conversationId },
  );
  const messages =
    useAppSelector(
      state => state.conversation.messages[conversationId]?.data,
    ) || [];

  const currentUser = useAppSelector(state => state.app.profile);

  const onSend = (msgs: IMessage[]) => {
    console.log(msgs);
  };

  console.log('=====message======', messages);
  return (
    <>
      <GiftedChat
        messages={messages.map(item => {
          return {
            _id: item.id,
            text: item.text || '',
            createdAt: item.createdAt,
            user: {
              _id: item.user?.id || '',
              name: item.user?.nickname,
              avatar: item.user?.avatar?.location,
            },
          };
        })}
        onSend={message => onSend(message)}
        user={{
          _id: currentUser.id,
          name: currentUser.nickname,
          avatar: currentUser.uploadFiles
            ? currentUser.uploadFiles[0]?.location
            : undefined,
        }}
      />
    </>
  );
};
