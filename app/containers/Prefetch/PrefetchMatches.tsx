import { useRefreshMatchesQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const PrefetchMatches: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.match.infoMatches.lastRefreshedAt);

  useRefreshMatchesQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
