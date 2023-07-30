import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';

export const MainScreen: React.FC = () => {
  const haveBasicInfo = useAppSelector(
    state => state.app.profile.haveBasicInfo,
  );

  const navigation = useNavigation();

  useEffect(() => {
    if (haveBasicInfo) {
      navigation.navigate('Home', {
        screen: 'DatingSwipe',
      });
    } else {
      navigation.navigate('UpdateProfileBasicInfo');
    }
  }, [haveBasicInfo]);
  return <></>;
};
