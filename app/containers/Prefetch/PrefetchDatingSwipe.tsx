import { useRefreshNearbyProfilesQuery, useRefreshSwipeProfilesQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const PrefetchDatingSwipe: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.swipeUser.info.lastRefreshedAt);

  useRefreshSwipeProfilesQuery(undefined, {
    skip: !!lastRefreshedAt,
  });

  useRefreshNearbyProfilesQuery({});

  return <></>;
};
