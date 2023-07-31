import { Header } from 'app/components';
import { DatingSwipe } from 'app/containers/DatingSwipe/DatingSwipe';
import { UpdateGeolocation } from 'app/containers/Home/UpdateGeolocation';
import { UpdateGeoLocationPermission } from 'app/containers/Home/UpdateGeolocationPermission';
import { colors } from 'app/theme';
import { Box } from 'native-base';
import React, { FC } from 'react';

export const DatingSwipeScreen: FC = () => {
  return (
    <>
      <Header titleTx="appName" />
      <UpdateGeoLocationPermission />
      <UpdateGeolocation />
      <Box flex={1} safeAreaY backgroundColor={colors.primary}>
        <DatingSwipe />
      </Box>
    </>
  );
};
