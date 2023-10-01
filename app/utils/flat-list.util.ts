import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

class FlatListUtil {
  isCloseToBottom = (
    {
      nativeEvent: { layoutMeasurement, contentOffset, contentSize },
    }: NativeSyntheticEvent<NativeScrollEvent>,
    paddingToBottom = 20,
  ) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  isCloseToTop({
    nativeEvent: { layoutMeasurement, contentOffset, contentSize },
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    const paddingToTop = 80;

    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  }
}

export const flatListUtil = new FlatListUtil();
