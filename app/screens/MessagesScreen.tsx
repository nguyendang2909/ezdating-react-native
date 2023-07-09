import { Header } from 'app/components';
import { ConversationsBox } from 'app/containers/Conversation/ConversationsBox';
import { api } from 'app/services/api';
import { Box, StatusBar, View } from 'native-base';
import React, { FC } from 'react';

export const MessagesScreen: FC = () => {
  const { refetch } = api.useGetConversationsQuery({});

  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="EZDating" />
      <Box safeAreaBottom flex={1}>
        <View flex={1}>
          <ConversationsBox />
        </View>
      </Box>

      {/* <View bg={colors.primary} style={height(spacing.xxl)}>
        <HStack
          style={[paddingHorizontal(spacing.lg), alignItemsCenter, flexGrow]}
        >
          <View>
            <MaterialIcons name="search" size={30} color="white" />
          </View>
          <View style={flexGrow}>
            <Text>asdasd</Text>
          </View>
          <View>
            <MaterialIcons name="person-add" size={30} color="white" />
          </View>
        </HStack>
      </View> */}
    </>
  );
};
