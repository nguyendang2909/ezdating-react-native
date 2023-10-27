import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { TxKey } from 'app/types';
import React from 'react';

type FCProps = {
  titleTx?: TxKey;
  title?: string;
};

export const HeaderNav: React.FC<FCProps> = ({ titleTx, title }) => {
  const { goBack } = useNavigation();

  return (
    <Header
      leftIcon="caretLeft"
      onLeftPress={goBack}
      {...(titleTx ? { titleTx } : {})}
      {...(title ? { title } : {})}
    />
  );
};
