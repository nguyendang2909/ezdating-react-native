import { useAppSelector } from 'app/hooks';
import { Avatar } from 'native-base';
import React from 'react';

export const ProfileAvatar: React.FC = () => {
  const avatarUrl = useAppSelector(state => state.app.profile.avatar);
  return (
    <>
      <Avatar
        size="xl"
        source={{
          ...(avatarUrl ? { uri: avatarUrl } : {}),
        }}
      />
    </>
  );
};
