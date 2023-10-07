import { conversationsApi } from 'app/services/api/conversations.api';
import { ApiRequest, AppThunkAction } from 'app/types';
import moment from 'moment';

import { matchActions } from './match.store';

export const refreshConversations =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const socketConnectedAt = state.app.socket.connectedAt;
    const lastRefreshedAt = state.match.infoConversations.lastRefreshedAt;
    if (
      lastRefreshedAt &&
      moment(lastRefreshedAt).isAfter(moment(socketConnectedAt))
    ) {
      return;
    }
    try {
      dispatch(matchActions.setConversationsLoading(true));
      const conversations = await conversationsApi.getMany();
      dispatch(matchActions.refreshConversations(conversations));
    } catch (err) {
    } finally {
      dispatch(matchActions.setConversationsLoading(false));
    }
  };

export const getManyNewestConversations =
  (): AppThunkAction => async (dispatch, getState) => {
    const state = getState();
    const isLoadingNewest = state.match.infoConversations.isLoadingNewest;
    if (isLoadingNewest) {
      return;
    }
    try {
      dispatch(matchActions.setConversationsLoadingNewest(true));
      const conversations = await conversationsApi.getMany();
      dispatch(matchActions.addManyNewestConversations(conversations));
    } catch (err) {
    } finally {
      dispatch(matchActions.setConversationsLoadingNewest(false));
    }
  };

export const getManyNextConversations =
  (payload?: ApiRequest.FindManyConversations): AppThunkAction =>
  async (dispatch, getState) => {
    const state = getState();
    const isLoadingNext = state.match.infoConversations.isLoadingNewest;
    if (isLoadingNext) {
      return;
    }
    try {
      dispatch(matchActions.setConversationsLoadingNext(true));
      const conversations = await conversationsApi.getMany(payload);
      dispatch(matchActions.refreshConversations(conversations));
    } catch (err) {
    } finally {
      dispatch(matchActions.setConversationsLoadingNext(false));
    }
  };
