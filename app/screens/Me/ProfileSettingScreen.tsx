import { View } from '@gluestack-ui/themed';
import { ProfileSettingHeader } from 'app/containers/ProfileSetting/ProfileSettingHeader';
import { ProfileSettingScrollView } from 'app/pages/profile-settings';
import React, { FC } from 'react';

export const ProfileSettingScreen: FC = () => {
  return (
    <>
      <ProfileSettingHeader />

      <View flex={1} backgroundColor="$backgroundLight100">
        <ProfileSettingScrollView />
      </View>
    </>
  );
};
