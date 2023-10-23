import { useGetMyProfileQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ConnectProfile: React.FC = () => {
  const accessToken = useAppSelector(state => state.app.accessToken);

  const { refetch } = useGetMyProfileQuery(undefined, {
    skip: !accessToken,
  });

  React.useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  return <></>;
};
