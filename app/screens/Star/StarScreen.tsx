import { Header } from 'app/components';
import { StarBody } from 'app/pages/Star';
import React from 'react';

export const StarScreen: React.FC = () => {
  return (
    <>
      <Header titleTx="EZDating" />

      <StarBody />
    </>
  );
};
