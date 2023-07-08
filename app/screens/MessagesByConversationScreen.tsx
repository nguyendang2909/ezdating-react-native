import { MessagesByConversationBox } from 'app/containers/MessagesByConversation/MessageByConversationBox';
import { MessageByConversationHeader } from 'app/containers/MessagesByConversation/MessageByConversationHeader';
import { AppStackScreenProps } from 'app/navigators';
import { Box, StatusBar } from 'native-base';
import React, { FC } from 'react';

type FCProps = AppStackScreenProps<'MessagesByConversation'>;

export const MessagesByConversationScreen: FC<FCProps> = props => {
  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader />
      <Box safeAreaBottom flex={1}>
        <MessagesByConversationBox />
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
