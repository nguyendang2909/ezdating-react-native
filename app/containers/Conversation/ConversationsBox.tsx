import { useAppSelector } from 'app/hooks';
import { conversationsApi } from 'app/services/api/conversations.api';
import { conversationActions } from 'app/store/conversations.store';
import { flex } from 'app/styles';
import { Text, View } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch } from 'react-redux';

import { ConversationBox } from './ConversationBox';

export const ConversationsBox: React.FC = () => {
  const dispatch = useDispatch();

  const conversations = useAppSelector(state => state.conversation.data);

  const getFirstConversations = useCallback(async () => {
    const conversationsData = await conversationsApi.getMany({});

    if (conversationsData.data?.length) {
      dispatch(conversationActions.addConversations(conversationsData.data));
    }
  }, [dispatch]);

  useEffect(() => {
    getFirstConversations();
  }, [getFirstConversations]);

  return (
    <View flex={1}>
      <SwipeListView
        style={flex(1)}
        data={conversations}
        renderItem={(data, rowMap) => <ConversationBox data={data} />}
        renderHiddenItem={(data, rowMap) => (
          <View>
            <Text>Left</Text>
            <Text>Right</Text>
          </View>
        )}

        // leftOpenValue={75}
        // rightOpenValue={-75}
      />
    </View>
  );
};
