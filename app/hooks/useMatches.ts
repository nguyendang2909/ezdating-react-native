import {
  useGetNewestMatchesMutation,
  useGetNextMatchesMutation,
  useRefreshMatchesQuery,
} from 'app/services/api';
import { matchesService } from 'app/services/matches.service';
import { matchSelects } from 'app/store/match/match.store';
import moment from 'moment';

import { useAppSelector } from './useAppSelector';

export const useMatches = () => {
  const matches = useAppSelector(matchSelects.matches);
  const lastRefreshedAt = useAppSelector(
    s => s.match.infoMatches.lastRefreshedAt,
  );
  const socketConnectedAt = useAppSelector(s => s.app.socket.connectedAt);
  const isReachedEnd = useAppSelector(s => s.match.infoMatches.isReachedEnd);
  const { isLoading } = useRefreshMatchesQuery(
    {},
    {
      skip:
        !!lastRefreshedAt &&
        moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
    },
  );
  const [getNewestMatches, { isLoading: isLoadingNewest }] =
    useGetNewestMatchesMutation();
  const [getNextMatches, { isLoading: isLoadingNext }] =
    useGetNextMatchesMutation();
  const matchesLength = matches.length;

  const fetchNext = () => {
    const _next = matchesService.getCursor(matches);
    if (isReachedEnd || !_next) {
      return;
    }
    getNextMatches({ _next });
  };

  const fetchNewest = () => {
    getNewestMatches({});
  };

  return {
    length: matchesLength,
    data: matches,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    isReachedEnd,
    isLoading,
    lastRefreshedAt,
  };
};
