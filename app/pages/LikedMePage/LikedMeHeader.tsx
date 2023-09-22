import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { colors } from 'app/theme';
import React from 'react';

export const LikedMeHeader: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        backgroundColor={colors.backgroundSecondary}
        leftIcon="caretLeft"
        onLeftPress={navigation.goBack}
        titleTx="Who liked you?"
      />
    </>
  );
};
