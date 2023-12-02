import { Header } from 'app/components';
import { SCREENS } from 'app/constants';
import { goBack } from 'app/navigators';
import React from 'react';

export const ProfileSettingHeader: React.FC = () => {
  const handleLeftPress = () => {
    goBack(SCREENS.Home, { screen: 'Profile' });
  };

  return (
    <>
      <Header
        leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        titleTx="Settings"
        backgroundColor="$backgroundLight100"
      />
    </>
  );
};
