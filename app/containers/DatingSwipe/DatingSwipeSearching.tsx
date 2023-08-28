import { useAppSelector } from 'app/hooks';
import { api } from 'app/services/api';
import { userActions } from 'app/store/user.store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const DatingSwipeSearching: React.FC = () => {
  const dispatch = useDispatch();

  const { data: swipeUsersData, refetch: refetchSwipeUsers } =
    api.useGetSwipeUsersQuery(
      {},
      {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
      },
    );

  const swipeUsers = useAppSelector(state => state.user.swipe?.data);

  useEffect(() => {
    if (swipeUsersData?.data && !swipeUsers?.length) {
      dispatch(userActions.addSwipeUsers(swipeUsersData.data));
    }
  }, []);

  return <></>;
};
