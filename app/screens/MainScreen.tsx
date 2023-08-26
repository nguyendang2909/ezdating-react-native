import { useNavigation } from '@react-navigation/native';
import { UserStatuses } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';

export const MainScreen: React.FC = () => {
  const userStatus = useAppSelector(state => state.app.profile.status);

  const navigation = useNavigation();

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
  }, [userStatus]);
  return <></>;
};
