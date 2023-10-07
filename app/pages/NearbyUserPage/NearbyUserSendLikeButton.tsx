import { Box } from '@gluestack-ui/themed';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { FontAwesome } from 'app/components/Icon/Lib';
import { likesApi } from 'app/services/api/likes.api';
import React, { useState } from 'react';

type FCProps = {
  userId: string;
};

export const NearbyUserSendLikeButton: React.FC<FCProps> = ({ userId }) => {
  const [isShowSendLike, setShowSendLike] = useState<boolean>(true);
  const [isLoadingSendLike, setLoadingSendLike] = useState<boolean>(false);

  const handleSendLike = async () => {
    try {
      setLoadingSendLike(true);
      await likesApi.send({
        targetUserId: userId,
      });
      setShowSendLike(false);
    } catch (err) {
    } finally {
      setLoadingSendLike(false);
    }
  };

  return (
    <>
      {isShowSendLike && (
        <Box>
          <LoadingButtonIcon
            onPress={handleSendLike}
            isLoading={isLoadingSendLike}
          >
            <FontAwesome color="white" size={20} name="heart" />
          </LoadingButtonIcon>
        </Box>
      )}
    </>
  );
};
