import { useNavigation } from '@react-navigation/native';
import { MessagesChat } from 'app/containers/Messages/MessagesChat';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { AppStackScreenProps } from 'app/navigators';
import { KeyboardAvoidingView, StatusBar } from 'native-base';
import React, { FC } from 'react';
import { Platform, SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'Messages'>;

export const MessagesScreen: FC<FCProps> = props => {
  const { conversation } = props.route.params;

  const { goBack } = useNavigation();

  if (!conversation || !conversation._id) {
    goBack();

    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader />
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <MessagesChat conversation={conversation} />
        {/* <Box safeAreaBottom flex={1}>
          <MessagesScrollView />
          <SendMessageBox />
        </Box> */}
      </KeyboardAvoidingView>
      <SafeAreaView />
    </>
  );
};
