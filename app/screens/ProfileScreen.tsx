import { useAppSelector } from 'app/hooks/useAppSelector';
import { colors } from 'app/theme';
import { Box, StatusBar } from 'native-base';
import React, { FC } from 'react';

export const ProfileScreen: FC = () => {
  const currenUser = useAppSelector(state => state.currentUser.profile);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop backgroundColor={colors.primary}></Box>
    </>
  );
};
