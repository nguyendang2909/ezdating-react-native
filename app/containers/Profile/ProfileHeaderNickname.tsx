import { Text } from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileHeaderNickname: React.FC = () => {
  const nickname = useAppSelector(state => state.app.profile?.nickname);

  return (
    <>
      <Text fontSize={26} fontWeight="bold" numberOfLines={1}>
        {nickname}
      </Text>
    </>
  );
};
