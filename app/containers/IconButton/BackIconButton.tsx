import { Box, ChevronLeftIcon, Icon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const BackIconButton: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity onPress={goBack}>
      <Box p={8}>
        <Icon h={24} w={24} as={ChevronLeftIcon} />
      </Box>
    </TouchableOpacity>
  );
};
