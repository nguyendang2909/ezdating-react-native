import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from 'app/components';
import { useAppSelector } from 'app/hooks';
import { AppStackParamList } from 'app/navigators';
import { View } from 'native-base';
import React from 'react';

import { BackIconButton } from '../IconButton/BackIconButton';

export const MessageByConversationHeader: React.FC = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();
  const conversationId = route.params.conversationId;
  const conversation = useAppSelector(
    state => state.conversation.data[conversationId],
  );

  return (
    <>
      <Header
        title={conversation?.targetUser?.nickname}
        LeftActionComponent={
          <View ml={2}>
            <BackIconButton />
          </View>
        }
      />
    </>
  );
};
