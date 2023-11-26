import { useGetMyProfileFilterQuery, useGetMyProfileQuery, useGetMyUserQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ConnectProfile: React.FC = () => {
  const accessToken = useAppSelector(state => state.app.accessToken);

  const { refetch: refetchMyProfile } = useGetMyProfileQuery(undefined, {
    skip: !accessToken,
  });

  const { refetch: refetchMyUser } = useGetMyUserQuery(undefined, {
    skip: !accessToken,
  });

  const { refetch: refetchMyProfileFilter } = useGetMyProfileFilterQuery(undefined, {
    skip: !accessToken,
  });

  React.useEffect(() => {
    if (accessToken) {
      refetchMyProfile();
      refetchMyProfileFilter();
      refetchMyUser();
    }
  }, [accessToken, refetchMyProfile, refetchMyProfileFilter, refetchMyUser]);

  return <></>;
};
