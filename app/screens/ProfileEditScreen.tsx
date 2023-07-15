import { ProfileEditContent } from 'app/containers/ProfileEdit/ProfileEditContent';
import { ProfileEditHeader } from 'app/containers/ProfileEdit/ProfileEditHeader';
import { backgroundColor } from 'app/styles';
import { colors } from 'app/theme';
import { Box, ScrollView } from 'native-base';
import React from 'react';

export const ProfileEditScreen: React.FC = () => {
  return (
    <>
      <ProfileEditHeader />
      <Box flex={1} safeAreaBottom>
        <ScrollView
          flex={1}
          pt={2}
          pb={4}
          style={backgroundColor(colors.backgroundSecondary)}
        >
          <ProfileEditContent />
        </ScrollView>
      </Box>
    </>
  );
};
