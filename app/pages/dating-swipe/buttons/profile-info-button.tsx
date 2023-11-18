import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { ButtonIcon } from 'app/components/Button';
import React from 'react';

type DatingSwipeCloseButtonProps = {
  onPress: (e?: boolean) => void;
};

export const ProfileInfoButton: React.FC<DatingSwipeCloseButtonProps> = ({ onPress }) => {
  const handlePress = () => {
    onPress();
  };

  return (
    <Box>
      <ButtonIcon height={48} width={48} backgroundColor="$black" onPress={handlePress}>
        <FontAwesome color="white" size={24} name="info" />
      </ButtonIcon>
    </Box>
  );
};
