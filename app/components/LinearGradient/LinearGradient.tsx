import { styled } from '@gluestack-ui/themed';
import RNLinearGradient from 'react-native-linear-gradient';

export const LinearGradient = styled(
  RNLinearGradient,
  {},

  {
    resolveProps: ['colors'],
  },
  {
    propertyTokenMap: {
      colors: 'colors',
    },
    propertyResolver: {
      colors: (rawValue: any, resolver: any) => {
        rawValue.forEach((color: any, index: number) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  },
);
