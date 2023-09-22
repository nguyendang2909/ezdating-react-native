import { Header } from 'app/components';
import { goBack } from 'app/navigators';
import React from 'react';

export const ProfileSettingHeader: React.FC = () => {
  return (
    <>
      <Header leftIcon="caretLeft" onLeftPress={goBack} titleTx="Settings" />
    </>
  );
};
