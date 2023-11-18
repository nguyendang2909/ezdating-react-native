import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { ButtonIcon } from 'app/components/Button';
import React from 'react';

type FCProps = {
  onPress?: (e?: boolean) => void;
};

export const DatingSwipeSendLikeButton: React.FC<FCProps> = ({ onPress }) => {
  const handleSendLike = async () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Box>
      <ButtonIcon height={48} width={48} onPress={handleSendLike}>
        <FontAwesome color="white" size={24} name="heart" />
      </ButtonIcon>
    </Box>
  );
};
