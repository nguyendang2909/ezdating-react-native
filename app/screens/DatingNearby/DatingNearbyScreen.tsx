import { StatusBar } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { DatingNearbyFlatList } from 'app/containers/DatingNearby/DatingNearbyFlatList';
import React, { FC } from 'react';

export const DatingNearbyScreen: FC = () => {
  const navigate = useNavigation();
  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        titleTx="Nearby"
        rightIcon="settings"
        onRightPress={() => {
          navigate.navigate('EditMatchFilter');
        }}
      />
      <DatingNearbyFlatList />
    </>
  );
};
