import { Box } from '@gluestack-ui/themed';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useSendLikeMutation } from 'app/services/api';
import React, { useState } from 'react';

type FCProps = {
  targetUserId: string;
};

export const NearbyUserSendLikeButton: React.FC<FCProps> = ({
  targetUserId,
}) => {
  const [sendLike] = useSendLikeMutation();
  const [isShowSendLike, setShowSendLike] = useState<boolean>(true);
  const [isLoadingSendLike, setLoadingSendLike] = useState<boolean>(false);

  const handleSendLike = async () => {
    try {
      setLoadingSendLike(true);
      await sendLike({
        targetUserId,
      }).unwrap();
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
            height={48}
            width={48}
            onPress={handleSendLike}
            isLoading={isLoadingSendLike}
          >
            <FontAwesome color="white" size={24} name="heart" />
          </LoadingButtonIcon>
        </Box>
      )}
    </>
  );
};