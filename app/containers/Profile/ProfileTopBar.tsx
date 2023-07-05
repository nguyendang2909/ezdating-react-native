import { HStack, View } from 'native-base';
import React from 'react';

import { ProfileSettingIconButton } from '../IconButton/ProfileSettingIconButton.ios';

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
