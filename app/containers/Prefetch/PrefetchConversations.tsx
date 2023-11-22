import { useRefreshConversationsQuery } from 'app/api';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const PrefetchConversations: React.FC = () => {
  const lastRefreshedAt = useAppSelector(s => s.match.infoConversations.lastRefreshedAt);

  useRefreshConversationsQuery(
    {},
    {
      skip: !!lastRefreshedAt,
    },
  );

  return <></>;
};
