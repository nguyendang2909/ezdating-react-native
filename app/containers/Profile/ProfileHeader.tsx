import { View, VStack } from 'native-base';
import React from 'react';

import { ProfileAvatar } from './ProfileAvatar';
import { ProfileHeaderNickname } from './ProfileHeaderNickname';

export const ProfileHeader: React.FC = () => {
  return (
    <>
      <VStack alignItems="center">
        <View>
          <ProfileAvatar />
        </View>
        <View>
          <ProfileHeaderNickname />
        </View>
      </VStack>
    </>
  );
};
