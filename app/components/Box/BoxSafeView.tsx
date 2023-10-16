import { Box } from '@gluestack-ui/themed';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BoxSafeViewProps = {
  top?: boolean;
  bottom?: boolean;
};
export const BoxSafeView: React.FC<BoxSafeViewProps> = ({ top, bottom }) => {
  const insets = useSafeAreaInsets();

  return <Box {...(top ? { mt: insets.top } : {})} {...(bottom ? { mt: insets.bottom } : {})} />;
};
