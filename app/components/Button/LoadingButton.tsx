import { Button, ButtonSpinner, ButtonText, View } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  startIcon?: ReactNode;
  children: ReactNode;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  startIcon,
  ...buttonProps
}) => {
  return (
    <Button rounded={100} bgColor="$red600" {...buttonProps}>
      {!!startIcon && <View mr={8}>{startIcon}</View>}
      {isLoading ? <ButtonSpinner /> : <ButtonText>{children}</ButtonText>}
    </Button>
  );
};
