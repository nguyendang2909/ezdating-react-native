import { StatusBar } from '@gluestack-ui/themed';
import { Header } from 'app/components';
import { DatingNearbyFlatList } from 'app/containers/DatingNearby/DatingNearbyFlatList';
import React, { FC } from 'react';

export const DatingNearbyScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="Nearby" />
      <DatingNearbyFlatList />
    </>
  );
};
