import { Text } from '@gluestack-ui/themed';
import { getAgeFromTime } from 'app/utils';
import { FC } from 'react';
import { TextProps, TextStyle } from 'react-native';

type AgeTextProps = {
  birthday: string;
  hideAge?: boolean;
} & TextProps &
  TextStyle;

export const AgeText: FC<AgeTextProps> = ({ birthday, hideAge, ...textProps }) => {
  if (hideAge) {
    return <></>;
  }
  const age = getAgeFromTime(birthday);
  // @ts-ignore
  return <Text {...textProps}>{age}</Text>;
};
