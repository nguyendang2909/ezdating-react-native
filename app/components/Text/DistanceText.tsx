import { Text } from '@gluestack-ui/themed';
import _ from 'lodash';
import { FC } from 'react';
import { TextProps, TextStyle } from 'react-native';

type DistanceTextProps = {
  distance: number;
} & TextProps &
  TextStyle;

export const DistanceText: FC<DistanceTextProps> = ({ distance, ...textProps }) => {
  // @ts-ignore
  return <Text {...textProps}>{`${_.round(distance / 1000, 1)} km`}</Text>;
};
