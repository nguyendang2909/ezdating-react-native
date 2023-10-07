import {
  getManyNewestMatches,
  refreshMatches,
} from 'app/store/match/match.action';
import { matchSelects } from 'app/store/match/match.store';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useGetMatches = () => {
  const dispatch = useAppDispatch();

  const matches = useAppSelector(matchSelects.matches);
  const lastRefreshedAt = useAppSelector(
    s => s.match.infoMatches.lastRefreshedAt,
  );
  const isReachedEnd = useAppSelector(s => s.match.infoMatches.isReachedEnd);
  const isLoading = useAppSelector(s => s.match.infoMatches.isLoading);
  const isLoadingNext = useAppSelector(s => s.match.infoMatches.isLoadingNext);
  const isLoadingNewest = useAppSelector(
    s => s.match.infoMatches.isLoadingNewest,
  );
  const matchesLength = matches.length;

  useEffect(() => {
    dispatch(refreshMatches());
  }, [dispatch]);

  const fetchNewest = async () => {
    dispatch(getManyNewestMatches());
  };

  const fetchNext = async () => {
    dispatch(getManyNewestMatches());
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
