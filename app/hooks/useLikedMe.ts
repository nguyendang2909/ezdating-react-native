import {
  useGetNewestLikedMeMutation,
  useGetNextLikedMeMutation,
  useRefreshLikedMeQuery,
} from 'app/services/api';
import { likedMeService } from 'app/services/liked-me.service';
import moment from 'moment';

import { useAppSelector } from './useAppSelector';

export const useLikedMe = () => {
  const likedMe = useAppSelector(state => state.likedMe.data);
  const isReachedEnd = !!useAppSelector(s => s.likedMe.info.isReachedEnd);
  const lastRefreshedAt = useAppSelector(s => s.likedMe.info.lastRefreshedAt);
  const socketConnectedAt = useAppSelector(s => s.app.socket.connectedAt);
  const length = likedMe.length;
  const [getNewest, { isLoading: isLoadingNewest }] =
    useGetNewestLikedMeMutation();
  const [getNext, { isLoading: isLoadingNext }] = useGetNextLikedMeMutation();
  const { isLoading } = useRefreshLikedMeQuery(
    {},
    {
      skip:
        !!lastRefreshedAt &&
        moment(lastRefreshedAt).isAfter(moment(socketConnectedAt)),
    },
  );

  const fetchNewest = () => {
    getNewest({});
  };

  const fetchNext = () => {
    const _next = likedMeService.getCursor(likedMe);
    if (isReachedEnd || !_next) {
      return;
    }
    getNext({ _next });
  };

  return {
    length,
    data: likedMe,
    fetchNewest,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    isLoading,
    isReachedEnd,
    lastRefreshedAt,
  };
};
