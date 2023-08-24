import { Header } from 'app/components';
import { goBack } from 'app/navigators';
import { colors } from 'app/theme';
import React from 'react';

export const ProfileEditPageHeader: React.FC = () => {
  return (
    <>
      <Header
        backgroundColor={colors.backgroundSecondary}
        leftIcon="caretLeft"
        onLeftPress={goBack}
        titleTx="Edit profile"
      />
    </>
  );
};
