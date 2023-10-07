import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { nearbyUsersService } from 'app/services/nearby-users.service';
import { ApiRequest, AppThunkAction } from 'app/types';

import { nearbyUserActions } from './';

export const refreshNearbyUsers =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const lastRefreshedAt = state.nearbyUser.info.lastRefreshedAt;
    if (lastRefreshedAt && !nearbyUsersService.isStale(lastRefreshedAt)) {
      return;
    }
    try {
      dispatch(nearbyUserActions.setLoading(true));
      const data = await nearbyUsersApi.getMany();
      dispatch(nearbyUserActions.refreshMany(data));
    } catch (err) {
    } finally {
      dispatch(nearbyUserActions.setLoading(false));
    }
  };

export const getManyNewestNearbyUsers =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const isLoadingNewest = state.nearbyUser.info.isLoadingNewest;
    if (isLoadingNewest) {
      return;
    }
    try {
      dispatch(nearbyUserActions.setLoadingNewest(true));
      const data = await nearbyUsersApi.getMany();
      dispatch(nearbyUserActions.addManyNewest(data));
    } catch (err) {
    } finally {
      dispatch(nearbyUserActions.setLoadingNewest(false));
    }
  };

export const getManyNextNearbyUsers =
  (payload?: ApiRequest.FindManyNearbyUses): AppThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    const isLoadingNext = state.nearbyUser.info.isLoadingNext;
    if (isLoadingNext) {
      return;
    }
    try {
      dispatch(nearbyUserActions.setLoadingNext(true));
      const data = await nearbyUsersApi.getMany(payload);
      dispatch(nearbyUserActions.addManyNext(data));
    } catch (err) {
    } finally {
      dispatch(nearbyUserActions.setLoadingNext(false));
    }
  };
