import { useNavigation } from '@react-navigation/native';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { MessagesScrollView } from 'app/containers/Messages/MessagesScrollView';
import { SendMessageBox } from 'app/containers/Messages/SendMessageBox';
import { AppStackScreenProps } from 'app/navigators';
import { Box, StatusBar } from 'native-base';
import React, { FC } from 'react';

type FCProps = AppStackScreenProps<'MessagesByConversation'>;

export const MessagesByConversationScreen: FC<FCProps> = props => {
  const { conversation } = props.route.params;

  const { goBack } = useNavigation();

  if (!conversation) {
    goBack();

    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader />
      <Box safeAreaBottom flex={1}>
        <MessagesScrollView />
        <SendMessageBox />
      </Box>
    </>
  );
};
