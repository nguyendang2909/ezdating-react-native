import { Header } from 'app/components';
import { StarBody } from 'app/pages/star/StarBody';
import React from 'react';

export const StarScreen: React.FC = () => {
  return (
    <>
      <Header titleTx="AppName" />

      <StarBody />
    </>
  );
};
