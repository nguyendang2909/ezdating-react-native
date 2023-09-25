import { Header } from 'app/components';
import { ConversationsScrollView } from 'app/pages/MatchesPage/ConversationsScrollView';
import { StatusBar } from 'native-base';
import React, { FC } from 'react';

export const ConversationsScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="EZDating" />

      <ConversationsScrollView />

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
