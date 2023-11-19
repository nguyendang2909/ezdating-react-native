import { FC } from 'react';
import { GestureResponderEvent } from 'react-native';

import { FontAwesome } from '../Icon';
import { ButtonIcon } from './ButtonIcon';

type FCProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
};

export const LikeIconButton: FC<FCProps> = ({ onPress }) => {
  return (
    <ButtonIcon height={48} width={48} onPress={onPress}>
      <FontAwesome color="white" size={24} name="heart" />
    </ButtonIcon>
  );
};
