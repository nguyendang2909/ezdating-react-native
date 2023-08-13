import { useAppSelector } from 'app/hooks';
import { Avatar } from 'native-base';
import React from 'react';

export const ProfileAvatar: React.FC = () => {
  const avatarUrl = useAppSelector(state => {
    const { mediaFiles } = state.app.profile;
    return mediaFiles?.length ? mediaFiles[0].location : null;
  });

  console.log(avatarUrl);

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
