import { LikeIconButton } from 'app/components/Button/like-icon-button';
import React from 'react';

type FCProps = {
  onPress?: (e?: boolean) => void;
};

export const SendSwipeLikeButton: React.FC<FCProps> = ({ onPress }) => {
  const handleSendLike = async () => {
    if (onPress) {
      onPress();
    }
  };

  return <LikeIconButton onPress={handleSendLike} />;
};
