import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { UpdateGeolocation } from 'app/containers/Home/UpdateGeoLocation';
import { DatingSwipeWrapper } from 'app/pages/dating-swipe';
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
          navigation.navigate('EditMatchFilter');
        }}
      />
      <UpdateGeolocation />

      <DatingSwipeWrapper />
    </>
  );
};
