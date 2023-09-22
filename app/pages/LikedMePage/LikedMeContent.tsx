import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { likesApi } from 'app/services/api/likes.api';
import React, { useEffect } from 'react';

export const LikedMeContent: React.FC = () => {
  const fetchUsers = async () => {
    try {
      const users = await likesApi.getManyLikedMe();
      console.log(users);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <LoadingScreen />
    </>
  );
};
