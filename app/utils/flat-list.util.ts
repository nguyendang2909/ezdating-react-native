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
}

export const flatListUtil = new FlatListUtil();
