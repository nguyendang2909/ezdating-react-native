import { LikedMeContent } from 'app/pages/LikedMePage/LikedMeContent';
import { LikedMeHeader } from 'app/pages/LikedMePage/LikedMeHeader';
import React from 'react';

export const LikedMeScreen: React.FC = () => {
  return (
    <>
      <LikedMeHeader />

      <LikedMeContent />
    </>
  );
};
