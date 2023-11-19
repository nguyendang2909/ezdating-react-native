import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { SCREENS } from 'app/constants';
import { DatingSwipeWrapper } from 'app/pages/dating-swipe/dating-swipe-wrapper';
// import { UpdateGeolocation } from 'app/containers/Home/UpdateGeolocation';
import React, { FC } from 'react';

export const DatingSwipeScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header
        titleTx="AppName"
        rightIcon="settings"
        onRightPress={() => {
          navigation.navigate(SCREENS.DATING_NEARBY_FILTER);
        }}
      />

      <DatingSwipeWrapper />
    </>
  );
};
