import { useAppSelector } from 'app/hooks';
import { matchesApi } from 'app/services/api/matches.api';
import { matchActions } from 'app/store/matches.store';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MatchCards } from './MatchCards';

export const MatchContent: React.FC = () => {
  const dispatch = useDispatch();
  const matches = useAppSelector(s => s.match.data);

  const fetchFirstTime = useCallback(async () => {
    try {
      const fetchData = await matchesApi.getMany();

      if (fetchData.pagination?._next === null) {
        dispatch(matchActions.setReachedEnd(true));
      } else {
        dispatch(matchActions.setReachedEnd(false));
      }

      if (fetchData.data) {
        dispatch(matchActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

  return (
    <>{matches?.length ? <MatchCards data={matches}></MatchCards> : <></>}</>
  );
};
