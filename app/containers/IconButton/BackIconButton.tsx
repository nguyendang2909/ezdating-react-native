import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, IconButton } from 'native-base';
import React from 'react';

export const BackIconButton: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <IconButton size={36} onPress={goBack}>
      <ChevronLeftIcon />
    </IconButton>
  );
};
