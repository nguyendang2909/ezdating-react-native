import { ChevronLeftIcon, Pressable } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export const BackIconButton: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Pressable onPress={goBack}>
      <ChevronLeftIcon />
    </Pressable>
  );
};
