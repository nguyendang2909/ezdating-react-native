import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { ButtonIcon } from 'app/components/Button';
import React from 'react';

type DatingSwipeCloseButtonProps = {
  onPress?: (e?: boolean) => void;
};

export const DatingSwipeCloseButton: React.FC<DatingSwipeCloseButtonProps> = ({ onPress }) => {
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
