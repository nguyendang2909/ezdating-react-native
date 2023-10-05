import { useNavigation } from '@react-navigation/native';
import { MessagesChat } from 'app/containers/Messages/MessagesChat';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { useAppSelector } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import { ChatUser } from 'app/types';
import { StatusBar } from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'Messages'>;

export const MessagesScreen: FC<FCProps> = props => {
  const { conversation } = props.route.params;

  const currentUser: ChatUser = useAppSelector(state => {
    const profile = state.app.profile;
    return {
      _id: profile?._id || '',
      name: profile?.nickname,
      avatar: profile?.mediaFiles?.length
        ? profile.mediaFiles[0].location
        : undefined,
    };
  });

  const { goBack } = useNavigation();

  if (!conversation || !conversation._id) {
    goBack();

    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader />
      <MessagesChat
        conversation={conversation}
        currentUser={currentUser}
        targetUser={{
          _id: conversation.targetUser?._id || '',
          avatar: conversation.targetUser?.mediaFiles?.length
            ? conversation.targetUser.mediaFiles[0].location
            : undefined,
          name: conversation.targetUser?.nickname,
        }}
      />
      <SafeAreaView />
    </>
  );
};
