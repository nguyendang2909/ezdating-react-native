import MaskedView from '@react-native-masked-view/masked-view';
import { flex, height } from 'app/styles';
import { View } from 'native-base';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-vector-icons/Icon';

type FCProps = {
  size?: number;
  icon: typeof Icon;
  name: string;
};

export const GradientIcon: React.FC<FCProps> = ({ size = 24, icon, name }) => {
  const Component = icon;

  return (
    <MaskedView
      style={height(size)}
      maskElement={
        <View>
          <Component name={name} size={size} />
        </View>
      }
    >
      <LinearGradient colors={['#fd267a', '#ff6036']} style={flex(1)} />
    </MaskedView>
  );
};
