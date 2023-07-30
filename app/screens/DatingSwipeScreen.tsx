import { colors } from 'app/theme';
import { Box, StatusBar } from 'native-base';
import React, { FC } from 'react';

import { UpdateGeoLocation } from '../containers/Home/UpdateGeoLocation';

export const DatingSwipeScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <UpdateGeoLocation />
      <Box safeAreaTop backgroundColor={colors.primary}></Box>
    </>
  );
};
