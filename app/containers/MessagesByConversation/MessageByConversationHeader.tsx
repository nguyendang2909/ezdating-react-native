import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from 'app/components';
import { AppStackParamList } from 'app/navigators';
import React from 'react';

export const MessageByConversationHeader: React.FC = () => {
  const route =
    useRoute<RouteProp<AppStackParamList, 'MessagesByConversation'>>();

  const conversationId = route.params.conversationId;

  return <Header titleMode="flex" title="asd" />;
};
