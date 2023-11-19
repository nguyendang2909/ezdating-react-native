import { FC } from 'react';

import { Ionicons } from '../Icon';
import { LoadingButtonIcon } from './LoadingButtonIcon';

type FCProps = {
  onPress: () => void;
  isLoading?: boolean;
};

export const MessageIconButton: FC<FCProps> = ({ onPress, isLoading = false }) => {
  return (
    <LoadingButtonIcon
      bgColor="$darkBlue500"
      height={48}
      width={48}
      onPress={onPress}
      isLoading={isLoading}
    >
      <Ionicons color="white" size={24} name="chatbubble-ellipses-outline" />
    </LoadingButtonIcon>
  );
};
