import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { Ionicons } from 'app/components/Icon/Lib';
import React, { useState } from 'react';

export const NearbyUserSendMessageButton: React.FC = () => {
  const [isLoadingSendMessage, setLoadingSendMessage] =
    useState<boolean>(false);

  const handleChat = () => {
    setLoadingSendMessage(true);
    setLoadingSendMessage(false);
  };

  return (
    <LoadingButtonIcon
      height={40}
      width={40}
      onPress={handleChat}
      isLoading={isLoadingSendMessage}
    >
      <Ionicons color="white" size={20} name="chatbubble-ellipses-outline" />
    </LoadingButtonIcon>
  );
};
