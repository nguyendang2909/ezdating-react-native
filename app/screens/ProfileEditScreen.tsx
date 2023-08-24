import { ProfileEditPageHeader } from 'app/containers/ProfileEdit/ProfileEditHeader';
import { ProfileEditPageContent } from 'app/containers/ProfileEdit/ProfileEditPageContent';
import { backgroundColor } from 'app/styles';
import { colors } from 'app/theme';
import { Box, ScrollView } from 'native-base';
import React from 'react';

export const ProfileEditScreen: React.FC = () => {
  return (
    <>
      <ProfileEditPageHeader />
      <Box flex={1} safeAreaBottom>
        <ScrollView
          flex={1}
          pt={2}
          pb={4}
          style={backgroundColor(colors.backgroundSecondary)}
        >
          <ProfileEditPageContent />
        </ScrollView>
      </Box>
    </>
  );
};
