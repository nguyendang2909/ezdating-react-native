import { Header } from 'app/components';
import { DatingNearby } from 'app/containers/DatingNearby/DatingNearby';
import { api } from 'app/services/api';
import { StatusBar } from 'native-base';
import React, { FC, useEffect } from 'react';

export const DatingNearbyScreen: FC = () => {
  const { refetch } = api.useGetUsersNearbyQuery(
    {
      params: {},
    },
    {
      refetchOnMountOrArgChange: false,
    },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <StatusBar barStyle="default" />
      <Header titleTx="Nearby" />
      <DatingNearby />
    </>
  );
};
