import { useRefreshNearbyProfilesQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const PrefetchDatingNearby: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);

  useRefreshNearbyProfilesQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
