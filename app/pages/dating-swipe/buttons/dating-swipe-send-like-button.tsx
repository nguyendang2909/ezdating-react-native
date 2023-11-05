import { Box } from '@gluestack-ui/themed';
import { useSendLikeMutation } from 'app/api';
import { FontAwesome } from 'app/components';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import React from 'react';

type FCProps = {
  targetUserId: string;
};

export const DatingSwipeSendLikeButton: React.FC<FCProps> = ({ targetUserId }) => {
  const [sendLike, { isLoading: isLoadingSendLike }] = useSendLikeMutation();

  const handleSendLike = async () => {
    sendLike({
      targetUserId,
    });
  };

  return (
    <Box>
      <LoadingButtonIcon
        height={48}
        width={48}
        onPress={handleSendLike}
        isLoading={isLoadingSendLike}
      >
        <FontAwesome color="white" size={24} name="heart" />
      </LoadingButtonIcon>
    </Box>
  );
};
