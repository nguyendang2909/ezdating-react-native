import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

class ScrollUtil {
  isCloseToBottom = (
    {
      nativeEvent: { layoutMeasurement, contentOffset, contentSize },
    }: NativeSyntheticEvent<NativeScrollEvent>,
    paddingToBottom = 80,
  ) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  isCloseToTop({
    nativeEvent: { layoutMeasurement, contentOffset, contentSize },
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    const paddingToTop = 80;

    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }
}

export const scrollUtil = new ScrollUtil();
