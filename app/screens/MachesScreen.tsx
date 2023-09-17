import { Header } from 'app/components';
import { ConversationsBox } from 'app/containers/Conversation/ConversationsBox';
import { MatchCards } from 'app/containers/Messages/MatchCards';
import { Box, StatusBar, Text, View } from 'native-base';
import React, { FC } from 'react';

export const MatchesScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="EZDating" />
      <Box safeAreaBottom flex={1}>
        <Box>
          <Box px={4}>
            <Text bold>New matches</Text>
          </Box>
          <Box px={4}>
            <MatchCards />
          </Box>
        </Box>
        <Box px={4} mt={2}>
          <Text bold>Messages</Text>
        </Box>
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
