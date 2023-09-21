import { Header } from 'app/components';
import { DatingNearby } from 'app/containers/DatingNearby/DatingNearby';
import { usersApi } from 'app/services/api/users.api';
import { userActions } from 'app/store/user.store';
import { StatusBar } from 'native-base';
import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const DatingNearbyScreen: FC = () => {
  const dispatch = useDispatch();

  const getUserNearby = useCallback(async () => {
    const nearbyUsersData = await usersApi.getNearbyUsers({});

    if (nearbyUsersData.data?.length) {
      dispatch(userActions.addNearby(nearbyUsersData.data));
    }
  }, [dispatch]);

  useEffect(() => {
    getUserNearby();
  }, [getUserNearby]);

  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="Nearby" />
      <DatingNearby />
    </>
  );
};
