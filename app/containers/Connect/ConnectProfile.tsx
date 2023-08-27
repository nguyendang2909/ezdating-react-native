import { useAppSelector } from 'app/hooks';
import { api } from 'app/services/api';
import React from 'react';

export const ConnectProfile: React.FC = () => {
  const accessToken = useAppSelector(state => state.app.accessToken);

  const { refetch } = api.useGetMyProfileQuery(undefined, {});

  React.useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken]);

  return <></>;
};
