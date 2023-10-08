import { Button, ButtonSpinner, ButtonText, Text } from '@gluestack-ui/themed';
import React from 'react';

import { LinearGradient } from '../LinearGradient';

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  ...buttonProps
}) => {
  return (
    <LinearGradient
      colors={['#fd267a', '#ff6036']}
      borderRadius={16}
      py={8}
      justifyContent="center"
      alignItems="center"
    >
      <Button {...buttonProps} disabled={isLoading}>
        {isLoading ? <ButtonSpinner /> : <Text color="$white">{children}</Text>}
      </Button>
    </LinearGradient>
  );
  return (
    <Button {...buttonProps} disabled={isLoading}>
      {isLoading ? <ButtonSpinner /> : <ButtonText>{children}</ButtonText>}
    </Button>
  );
};
