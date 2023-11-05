import { HStack, View } from '@gluestack-ui/themed';
import { FC } from 'react';

import { DatingSwipeCloseButton } from './dating-swipe-close-button';
import { DatingSwipeSendLikeButton } from './dating-swipe-send-like-button';

type DatingSwipeButtonStackProps = {
  targetUserId: string;
};

export const DatingSwipeButtonStack: FC<DatingSwipeButtonStackProps> = ({ targetUserId }) => {
  return (
    <>
      <HStack justifyContent="center">
        <View>
          <DatingSwipeCloseButton />
        </View>
        <View>
          <DatingSwipeSendLikeButton targetUserId={targetUserId} />
        </View>
      </HStack>
    </>
  );
};
