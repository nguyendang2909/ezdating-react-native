import { View } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ViewSafeAreaProps = {
  top?: boolean;
  bottom?: boolean;
  vertical?: boolean;
  children?: ReactNode;
};
export const ViewSafeArea: React.FC<ViewSafeAreaProps> = ({ top, bottom, vertical, children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...(top || vertical ? { mt: insets.top } : {})}
      {...(bottom || vertical ? { mt: insets.bottom } : {})}
    >
      {children}
    </View>
  );
};
