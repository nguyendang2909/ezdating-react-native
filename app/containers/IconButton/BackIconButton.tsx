import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, Pressable } from 'native-base';
import React from 'react';

export const BackIconButton: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Pressable onPress={goBack}>
      <ChevronLeftIcon />
    </Pressable>
  );
};
