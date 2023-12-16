import { Spinner, View } from '@gluestack-ui/themed';
import { FC } from 'react';

type FCProps = {
  isLoading: boolean;
};

export const LoadingLayout: FC<FCProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View
      zIndex={999}
      position="absolute"
      height="$full"
      width="$full"
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      opacity={0.5}
    >
      <Spinner />
    </View>
  );
};
