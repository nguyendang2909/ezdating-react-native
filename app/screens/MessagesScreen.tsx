import { useNavigation } from '@react-navigation/native';
import { MessagesChat } from 'app/containers/Messages/MessagesChat';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { AppStackScreenProps } from 'app/navigators';
import { StatusBar } from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'Messages'>;

export const MessagesScreen: FC<FCProps> = props => {
  const { conversation, user } = props.route.params;

  const { goBack } = useNavigation();

  if (!conversation || !conversation._id || !user || !user._id) {
    goBack();

    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader />
      {/* <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      > */}
      <MessagesChat
        conversation={conversation}
        currentUser={user}
        targetUser={{
          _id: conversation.targetUser?._id || '',
          avatar: conversation.targetUser?.mediaFiles?.length
            ? conversation.targetUser.mediaFiles[0].location
            : undefined,
          name: conversation.targetUser?.nickname,
        }}
      />
      {/* <Box safeAreaBottom flex={1}>
          <MessagesScrollView />
          <SendMessageBox />
        </Box> */}
      {/* </KeyboardAvoidingView> */}
      <SafeAreaView />
    </>
  );
};
