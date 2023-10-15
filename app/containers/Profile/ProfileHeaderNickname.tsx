import { useAppSelector } from 'app/hooks';
import { Text } from 'native-base';
import React from 'react';

export const ProfileHeaderNickname: React.FC = () => {
  const nickname = useAppSelector(state => state.app.profile?.nickname);

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" isTruncated>
        {nickname}
      </Text>
    </>
  );
};
