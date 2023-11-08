import { useGetNextSwipeProfilesMutation, useRefreshSwipeProfilesQuery } from 'app/api';
import { nearbyProfilesService } from 'app/services';
import moment from 'moment';

import { useAppSelector } from './useAppSelector';

export const useSwipeProfiles = () => {
  const swipeProfiles = useAppSelector(state => state.swipeUser.data);
  const socketConnectedAt = useAppSelector(s => s.app.socket.connectedAt);
  const length = swipeProfiles.length;
  const lastRefreshedAt = useAppSelector(s => s.nearbyUser.info.lastRefreshedAt);
  const { isLoading } = useRefreshSwipeProfilesQuery(undefined, {
    skip: !!lastRefreshedAt && moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
  });

  // const [fetchNewest, { isLoading: isLoadingNewest }] = useGetNewestSwipeProfilesMutation();
  const [fetchNextNearbyUsers, { isLoading: isLoadingNext }] = useGetNextSwipeProfilesMutation();

  const fetchNext = () => {
    const _next = nearbyProfilesService.getCursor(swipeProfiles);
    // if (isReachedEnd || !_next) {
    //   return;
    // }
    fetchNextNearbyUsers({ _next });
  };

  return {
    data: swipeProfiles,
    // fetchNewest,
    fetchNext,
    // isLoadingNewest,
    isLoadingNext,
    length,
    isLoading,
    lastRefreshedAt,
  };
};
