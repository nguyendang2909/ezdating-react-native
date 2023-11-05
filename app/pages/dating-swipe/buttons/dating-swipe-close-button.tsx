import { Box } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import React from 'react';

type DatingSwipeCloseButtonProps = {};

export const DatingSwipeCloseButton: React.FC<DatingSwipeCloseButtonProps> = () => {
  const handlePress = () => {};

  return (
    <Box>
      <LoadingButtonIcon height={48} width={48} backgroundColor="$black" onPress={handlePress}>
        <FontAwesome color="white" size={24} name="close" />
      </LoadingButtonIcon>
    </Box>
  );
};
