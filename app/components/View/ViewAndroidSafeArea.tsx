import { View } from '@gluestack-ui/themed';
import { ComponentProps, FC, ReactNode } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';

type ViewAndroidSafeAreProps = ComponentProps<typeof View> & {
  children?: ReactNode;
};

export const ViewAndroidSafeArea: FC<ViewAndroidSafeAreProps> = ({ children, ...restProps }) => {
  return (
    <View style={styles.AndroidSafeArea} {...restProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    marginBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
