import { Button, ButtonSpinner } from '@gluestack-ui/themed';
import React from 'react';

type LoadingButtonIconProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
  size?: number;
};

export const LoadingButtonIcon: React.FC<LoadingButtonIconProps> = ({
  children,
  isLoading = false,
  size = 40,
  ...buttonProps
}) => {
  return (
    <Button
      px={0}
      py={0}
      height={size}
      width={size}
      rounded={100}
      bgColor="$red600"
      {...buttonProps}
      disabled={isLoading}
    >
      {isLoading ? <ButtonSpinner /> : <>{children}</>}
    </Button>
  );
};
