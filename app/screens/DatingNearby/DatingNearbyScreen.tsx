import { StatusBar } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { SCREENS } from 'app/constants';
import { DatingNearbyWrapper } from 'app/pages/dating-nearby/dating-nearby-wrapper';
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
          navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        }}
      />
      <DatingNearbyWrapper />
    </>
  );
};
