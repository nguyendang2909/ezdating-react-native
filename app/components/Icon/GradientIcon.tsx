import { Box, View } from '@gluestack-ui/themed';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { Icon } from 'react-native-vector-icons/Icon';

import { LinearGradient } from '../LinearGradient';

export type FCProps = {
  size?: number;
  icon: typeof Icon;
  name: string;
  colors?: (string | number)[];
};

export const GradientIcon: React.FC<FCProps> = ({ size = 24, icon: Component, name, colors }) => {
  return (
    <Box
      as={MaskedView}
      height={size}
      width={size}
      maskElement={
        <View>
          <Component name={name} size={size} />
        </View>
      }
    >
      <LinearGradient flex={1} colors={colors || ['#fd267a', '#ff6036']} />
    </Box>
  );
};
