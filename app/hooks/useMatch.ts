import { useGetMatchQuery } from 'app/api';
import { matchActions } from 'app/store/match';
import { useEffect } from 'react';

import { useAppDispatch } from './usAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useMatch = (matchId: string) => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(state => state.app.profile._id);
  const match = useAppSelector(s => {
    return s.match.data.find(e => e._id === matchId);
  });

  const { data } = useGetMatchQuery(matchId, {
    skip: !!matchId,
  });

  useEffect(() => {
    if (data && currentUserId) {
      dispatch(matchActions.addMatch(data));
    }
  }, [currentUserId, data, dispatch]);

  return {
    data: match,
  };
};
