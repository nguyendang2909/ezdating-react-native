import { InfoIconButton } from 'app/components/Button/info-icon-button';
import React from 'react';

type FCProps = {
  onPress: () => void;
};

export const ProfileInfoButton: React.FC<FCProps> = ({ onPress }) => {
  const handlePress = () => {
    onPress();
  };

  return <InfoIconButton onPress={handlePress} />;
};
