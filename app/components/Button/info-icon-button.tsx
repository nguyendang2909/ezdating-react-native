import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { ButtonIcon } from 'app/components/Button';
import React from 'react';

type FCProps = {
  onPress: () => void;
};

export const InfoIconButton: React.FC<FCProps> = ({ onPress }) => {
  return (
    <Box>
      <ButtonIcon height={48} width={48} backgroundColor="$black" onPress={onPress}>
        <FontAwesome color="white" size={24} name="info" />
      </ButtonIcon>
    </Box>
  );
};
