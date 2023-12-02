import { Header } from 'app/components';
import { SCREENS } from 'app/constants';
import { goBack } from 'app/navigators';
import { colors } from 'app/theme';
import React from 'react';

export const ProfileEditPageHeader: React.FC = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.Home, { screen: 'Profile' });
  };
  return (
    <>
      <Header
        backgroundColor={colors.backgroundSecondary}
        leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        titleTx="Edit profile"
      />
    </>
  );
};
