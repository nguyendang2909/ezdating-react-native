import {
  alignItemsCenter,
  flexGrow,
  height,
  paddingHorizontal,
} from 'app/styles';
import { colors, spacing } from 'app/theme';
import { Box, HStack, StatusBar, Text, View } from 'native-base';
import React, { FC } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MessagesScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop backgroundColor={colors.primary}></Box>
      <View bg={colors.primary} style={height(spacing.xxl)}>
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
      </View>
    </>
  );
};
