import { useNavigation } from '@react-navigation/native';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { MessagesScrollView } from 'app/containers/Messages/MessagesScrollView';
import { SendMessageBox } from 'app/containers/Messages/SendMessageBox';
import { AppStackScreenProps } from 'app/navigators';
import { Box, KeyboardAvoidingView, StatusBar } from 'native-base';
import React, { FC } from 'react';
import { Platform } from 'react-native';

type FCProps = AppStackScreenProps<'MessagesByConversation'>;

export const MessagesByConversationScreen: FC<FCProps> = props => {
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
        <Box safeAreaBottom flex={1}>
          <MessagesScrollView />
          <SendMessageBox />
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};
