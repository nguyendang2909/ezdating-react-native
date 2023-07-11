import { Header } from 'app/components';
import { goBack } from 'app/navigators';
import React from 'react';

export const ProfileEditHeader: React.FC = () => {
  return (
    <>
      <Header
        leftIcon="caretLeft"
        onLeftPress={goBack}
        titleTx="Edit profile"
      />
    </>
  );
};
