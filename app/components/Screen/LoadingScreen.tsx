import { justifyContentCenter, posititionAbsolute, zIndex } from 'app/styles';
import { Spinner, View } from 'native-base';
import React from 'react';

interface ILoadingScreen {
  isLoading?: boolean;
}

export const LoadingScreen: React.FC<ILoadingScreen> = ({ isLoading }) => {
  return (
    <View
      style={[justifyContentCenter, posititionAbsolute, zIndex(99)]}
      left="0"
      right="0"
      top="0"
      bottom="0"
      display={isLoading ? 'flex' : 'none'}
    >
      <Spinner />
    </View>
  );
};
