import { matchesApi } from 'app/services/api/matches.api';
import { ApiRequest, AppThunkAction } from 'app/types';
import moment from 'moment';

import { matchActions } from './match.store';

export const refreshMatches =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const socketConnectedAt = state.app.socket.connectedAt;
    const lastRefreshedAt = state.match.infoMatches.lastRefreshedAt;
    if (
      lastRefreshedAt &&
      moment(lastRefreshedAt).isAfter(moment(socketConnectedAt))
    ) {
      return;
    }
    try {
      dispatch(matchActions.setMatchesLoading(true));
      const data = await matchesApi.getMany();
      dispatch(matchActions.refreshMatches(data));
    } catch (err) {
    } finally {
      dispatch(matchActions.setMatchesLoading(false));
    }
  };

export const getManyNewestMatches =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const isLoadingNewest = state.match.infoMatches.isLoadingNewest;
    if (isLoadingNewest) {
      return;
    }
    try {
      dispatch(matchActions.setMatchesLoadingNewest(true));
      const data = await matchesApi.getMany();
      dispatch(matchActions.addManyNewestMatches(data));
    } catch (err) {
    } finally {
      dispatch(matchActions.setMatchesLoadingNewest(false));
    }
  };

export const getManyNextMatches =
  (payload?: ApiRequest.FindManyMatches): AppThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    const isLoadingNext = state.match.infoMatches.isLoadingNext;
    const isReachedEnd = state.match.infoMatches.isReachedEnd;
    if (isLoadingNext || isReachedEnd) {
      return;
    }
    try {
      dispatch(matchActions.setMatchesLoadingNext(true));
      const data = await matchesApi.getMany(payload);
      dispatch(matchActions.refreshMatches(data));
    } catch (err) {
    } finally {
      dispatch(matchActions.setMatchesLoadingNext(false));
    }
  };

export const getOneMatch =
  (matchId: string): AppThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    const socketConnectedAt = state.app.socket.connectedAt;
    const match = state.match.data.find(e => e._id === matchId);
    const currentUserId = state.app.profile._id || '';
    const lastRefreshedAt = match?.lastRefreshedAt;
    if (
      lastRefreshedAt &&
      moment(lastRefreshedAt).isAfter(moment(socketConnectedAt))
    ) {
      return;
    }
    try {
      const { data } = await matchesApi.getOne(matchId);
      dispatch(matchActions.addOneMatch({ data, currentUserId }));
    } catch (err) {}
  };
