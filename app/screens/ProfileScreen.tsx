import { useAppSelector } from 'app/hooks/useAppSelector';
import { appActions } from 'app/store/app.store';
import { colors } from 'app/theme';
import { Box, Button, StatusBar } from 'native-base';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

export const ProfileScreen: FC = () => {
  const currenUser = useAppSelector(state => state.app.profile);

  const dispatch = useDispatch();

  console.log(111, currenUser);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeArea backgroundColor={colors.primary}>
        <Button
          onPress={() => {
            dispatch(appActions.logout());
          }}
        >Log out</Button>
      </Box>
    </>
  );
};
