import { Box } from '@gluestack-ui/themed';
import { useSendLikeMutation } from 'app/api';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { FontAwesome } from 'app/components/Icon/Lib';
import React, { useState } from 'react';

type FCProps = {
  targetUserId: string;
};

export const SendLikeButton: React.FC<FCProps> = ({ targetUserId }) => {
  const [sendLike, { isLoading }] = useSendLikeMutation();
  const [isShowSendLike, setShowSendLike] = useState<boolean>(true);

  const handleSendLike = async () => {
    try {
      await sendLike({
        targetUserId,
      }).unwrap();
      setShowSendLike(false);
    } catch (err) {}
  };

  if (!isShowSendLike) {
    return null;
  }

  return (
    <Box>
      <LoadingButtonIcon height={48} width={48} onPress={handleSendLike} isLoading={isLoading}>
        <FontAwesome color="white" size={24} name="heart" />
      </LoadingButtonIcon>
    </Box>
  );
};
