import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed';
import React from 'react';

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  ...buttonProps
}) => {
  return (
    <Button rounded={100} bgColor="$red600" {...buttonProps} disabled={isLoading}>
      {isLoading ? <ButtonSpinner /> : <ButtonText>{children}</ButtonText>}
    </Button>
  );
};
