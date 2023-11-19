import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { ButtonIcon } from 'app/components/Button';
import React from 'react';

type FCProps = {
  onPress?: (e?: boolean) => void;
};

export const CloseIconButton: React.FC<FCProps> = ({ onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Box>
      <ButtonIcon height={48} width={48} backgroundColor="$black" onPress={handlePress}>
        <FontAwesome color="white" size={24} name="close" />
      </ButtonIcon>
    </Box>
  );
};
