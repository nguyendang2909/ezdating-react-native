import { useAppSelector } from 'app/hooks';
import { Text, View } from 'native-base';
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import { ConversationBox } from './ConversationBox';

export const ConversationsBox: React.FC = () => {
  const conversations = useAppSelector(state => state.conversation.data);

  return (
    <View>
      <SwipeListView
        data={Object.values(conversations)}
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

      {/* {conversations.map(conversation => {
        return (
          <ConversationBox
            key={conversation.id}
            data={conversation}
          ></ConversationBox>
        );
      })} */}
    </View>
  );
};
