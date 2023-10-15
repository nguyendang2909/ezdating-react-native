import { View, VStack } from '@gluestack-ui/themed';
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
        <View px={32}>
          <ProfileHeaderNickname />
        </View>
      </VStack>
    </>
  );
};
