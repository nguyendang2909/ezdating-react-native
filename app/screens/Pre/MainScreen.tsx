import { Box, Spinner } from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import { api, useGetMyProfileFilterQuery, useGetMyProfileQuery, useLogoutMutation } from 'app/api';
import { SCREENS } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { appActions } from 'app/store/app.store';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const MainScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const refreshToken = useAppSelector(s => s.app.refreshToken);
  const profile = useAppSelector(s => s.app.profile);
  const { error: errorGetMyProfile } = useGetMyProfileQuery();
  const { error: errorGetMyProfileFilter } = useGetMyProfileFilterQuery();

  const handleLogout = useCallback(async () => {
    try {
      if (refreshToken) {
        await logout({ refreshToken }).unwrap();
      }
    } catch (err) {}

    dispatch(appActions.logout());
    dispatch(api.util.resetApiState());
  }, [dispatch, logout, refreshToken]);

  useEffect(() => {
    if (profile._id) {
      if (!profile.mediaFiles?.length) {
        navigation.dispatch(StackActions.replace(SCREENS.UpdateProfilePhotos));
        return;
      }
      navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: 'DatingSwipe' }));
    }
  }, [navigation, profile._id, profile.mediaFiles]);

  useEffect(() => {
    if (errorGetMyProfile) {
      if ('status' in errorGetMyProfile && errorGetMyProfile.status === 404) {
        navigation.dispatch(StackActions.replace(SCREENS.CreateProfile));
      } else {
        handleLogout();
      }
    }
  }, [errorGetMyProfile, errorGetMyProfileFilter, handleLogout, navigation]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Spinner />
    </Box>
  );
};
