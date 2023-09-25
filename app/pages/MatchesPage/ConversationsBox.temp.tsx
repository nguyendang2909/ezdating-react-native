import { View } from 'native-base';
import React from 'react';

import { ConversationsFlatList } from './ConversationsFlatList';

export const ConversationsBox: React.FC = () => {
  return (
    <View flex={1}>
      {/* <SwipeListView
        style={flex(1)}
        data={conversations}
        renderItem={(data, rowMap) => <ConversationBox data={data} />}
        renderHiddenItem={(data, rowMap) => (
          <View>
            <Text>Left</Text>
            <Text>Right</Text>
          </View>
        )}
      /> */}
      <ConversationsFlatList></ConversationsFlatList>
    </View>
  );
};
