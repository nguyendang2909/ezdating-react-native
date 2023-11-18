import { Box, HStack } from '@gluestack-ui/themed';
import { SendLikeButton } from 'app/containers/Button/send-like-button';
import React from 'react';

import { NearbyUserSendMessageButton } from './NearbyUserSendMessage';

type FCProps = {
  targetUserId: string;
};

export const NearbyUserActions: React.FC<FCProps> = ({ targetUserId }) => {
  return (
    <>
      <HStack justifyContent="center" rowGap={16} columnGap={16}>
        <Box>
          <NearbyUserSendMessageButton targetUserId={targetUserId} />
        </Box>
        <SendLikeButton targetUserId={targetUserId} />
      </HStack>
    </>
  );
};
