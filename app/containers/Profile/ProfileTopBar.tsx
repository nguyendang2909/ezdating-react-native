import { HStack, View } from 'native-base';
import React from 'react';

import { ProfileSettingIconButton } from '../IconButton/ProfileSettingIconButton';

export const ProfileTopBar: React.FC = () => {
  return (
    <>
      <HStack>
        <View></View>
        <View flex="1"></View>
        <View>
          <ProfileSettingIconButton />
        </View>
      </HStack>
    </>
  );
};
