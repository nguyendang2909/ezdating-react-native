import { Box, Spinner } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useGetMyProfileQuery } from 'app/api';
import { UserStatuses } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { dispatch } from 'app/store';
import { appActions } from 'app/store/app.store';
import React, { useEffect } from 'react';

export const MainScreen: React.FC = () => {
  const userStatus = useAppSelector(state => state.app.profile?.status);
  const navigation = useNavigation();

  const { data } = useGetMyProfileQuery();

  useEffect(() => {
    if (userStatus) {
      if (userStatus !== UserStatuses.registered) {
        navigation.navigate('Home', {
          screen: 'DatingSwipe',
        });
      } else {
        navigation.navigate('UpdateProfileBasicInfo');
      }
    }
  }, [navigation, userStatus]);

  useEffect(() => {
    if (data && !data.data) {
      dispatch(appActions.logout());
    }
  }, [data]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </Box>
  );
};
