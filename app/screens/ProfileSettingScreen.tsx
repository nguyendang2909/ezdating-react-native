import { ScrollView, View } from '@gluestack-ui/themed';
import { LogoutButton } from 'app/containers/Button/LogoutButton';
import { ProfileSettingHeader } from 'app/containers/ProfileSetting/ProfileSettingHeader';
import React, { FC } from 'react';

export const ProfileSettingScreen: FC = () => {
  return (
    <>
      <ProfileSettingHeader />

      <View flex={1}>
        <ScrollView>
          <View px={12}>
            <LogoutButton />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
