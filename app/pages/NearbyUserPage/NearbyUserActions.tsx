import { Box, HStack } from '@gluestack-ui/themed';
import React from 'react';

import { NearbyUserSendLikeButton } from './NearbyUserSendLikeButton';
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

        <NearbyUserSendLikeButton targetUserId={targetUserId} />
      </HStack>
    </>
  );
};
