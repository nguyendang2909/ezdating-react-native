import { getOneMatch } from 'app/store/match/match.action';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useGetMatch = (matchId: string) => {
  const dispatch = useAppDispatch();
  const match = useAppSelector(s => {
    return s.match.data.find(e => e._id === matchId);
  }) || { _id: matchId };

  useEffect(() => {
    dispatch(getOneMatch(matchId));
  }, [dispatch, matchId]);

  return {
    data: match,
  };
};
