import { Image } from '@gluestack-ui/themed';
import React, { FC } from 'react';

type FCProps = Omit<React.ComponentProps<typeof Image>, 'source'>;

export const AppIcon: FC<FCProps> = props => {
  return (
    <Image
      {...props}
      size="xs"
      alt="app_icon"
      source={require('../../../assets/images/app-icon.png')}
    />
  );
};
