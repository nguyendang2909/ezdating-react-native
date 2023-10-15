import { Header } from 'app/components';
import { ConversationsScrollView } from 'app/pages/ConversattionsPage/ConversationsScrollView';
import { StatusBar } from 'native-base';
import React, { FC } from 'react';

export const ConversationsScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="EZDating" />
      <ConversationsScrollView />
    </>
  );
};
