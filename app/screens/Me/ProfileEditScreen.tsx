import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { ProfileEditPageHeader } from 'app/containers/ProfileEdit/ProfileEditHeader';
import { ProfileEditScrollView } from 'app/containers/ProfileEdit/ProfileEditScrollView';
import { Box } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

export const ProfileEditScreen: React.FC = () => {
  return (
    <>
      <ProfileEditPageHeader />
      <Box flex={1}>
        <ProfileEditScrollView />
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </Box>
    </>
  );
};
