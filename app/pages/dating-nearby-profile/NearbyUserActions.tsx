import { HStack, View } from '@gluestack-ui/themed';
import { CloseIconButton } from 'app/components/Button';
import { SendLikeButton } from 'app/containers/Button/send-like-button';
import React from 'react';

import { SendMessageButton } from '.';

type FCProps = {
  targetUserId: string;
  onClose?: () => void;
};

export const NearbyUserActions: React.FC<FCProps> = ({ targetUserId, onClose }) => {
  return (
    <>
      <HStack justifyContent="center" columnGap={32}>
        {!!onClose && (
          <View>
            <CloseIconButton onPress={onClose} />
          </View>
        )}
        <View>
          <SendMessageButton targetUserId={targetUserId} />
        </View>
        <SendLikeButton targetUserId={targetUserId} />
      </HStack>
    </>
  );
};
