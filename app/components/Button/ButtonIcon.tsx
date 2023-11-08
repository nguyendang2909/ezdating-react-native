import { Button } from '@gluestack-ui/themed';
import React from 'react';

type LoadingButtonIconProps = React.ComponentProps<typeof Button> & {
  size?: number;
  isLoading?: boolean;
};

export const ButtonIcon: React.FC<LoadingButtonIconProps> = ({
  children,
  size = 40,
  isLoading,
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
      <>{children}</>
    </Button>
  );
};
