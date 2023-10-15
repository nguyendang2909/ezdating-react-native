import { ProfileEditPageHeader } from 'app/containers/ProfileEdit/ProfileEditHeader';
import { ProfileEditScrollView } from 'app/containers/ProfileEdit/ProfileEditScrollView';
import { Box } from 'native-base';
import React from 'react';

export const ProfileEditScreen: React.FC = () => {
  return (
    <>
      <ProfileEditPageHeader />
      <Box flex={1} safeAreaBottom>
        <ProfileEditScrollView />
      </Box>
    </>
  );
};
