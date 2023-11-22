import MaskedView from '@react-native-masked-view/masked-view';
import { height, width } from 'app/styles';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';

import { LinearGradient } from '../LinearGradient';

export type GradientIconProps = {
  size?: number;
  icon: typeof Icon;
  name: string;
  colors?: (string | number)[];
};

export const GradientIcon: React.FC<GradientIconProps> = ({
  size = 24,
  icon: Component,
  name,
  colors,
}) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => setKey(prev => prev + 1), 100);
    }
  }, []);
  return (
    <MaskedView
      key={`${key}`}
      style={[height(size), width(size)]}
      maskElement={<Component name={name} size={size} />}
    >
      <LinearGradient flex={1} colors={colors || ['#fd267a', '#ff6036']} />
    </MaskedView>
  );
};
