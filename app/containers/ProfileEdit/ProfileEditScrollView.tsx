import { ScrollView } from '@gluestack-ui/themed';
import { backgroundColor } from 'app/styles';
import { colors } from 'app/theme';
import React from 'react';

import { ProfileEditPageContent } from './ProfileEditPageContent';

export const ProfileEditScrollView: React.FC = () => {
  return (
    <ScrollView
      flex={1}
      pt={2}
      pb={4}
      style={backgroundColor(colors.backgroundSecondary)}
    >
      <ProfileEditPageContent />
    </ScrollView>
  );
};
