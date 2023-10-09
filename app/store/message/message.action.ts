// import { messagesApi } from 'app/services/api/messages.api';
// import { ApiRequest, AppThunkAction } from 'app/types';
// import moment from 'moment';

// import { messageActions } from './message.store';

// export const refreshMessages =
//   (payload: ApiRequest.FindManyMessages): AppThunkAction =>
//   async (dispatch, getState) => {
//     const { matchId } = payload;
//     const state = getState();
//     const socketConnectedAt = state.app.socket.connectedAt;
//     const lastRefreshedAt = state.match.infoConversations.lastRefreshedAt;
//     if (
//       lastRefreshedAt &&
//       moment(lastRefreshedAt).isAfter(moment(socketConnectedAt))
//     ) {
//       return;
//     }
//     try {
//       dispatch(messageActions.setLoading({ matchId, isLoading: true }));
//       const data = await messagesApi.getMany(payload);
//       dispatch(messageActions.refreshMany(data));
//     } catch (err) {
//     } finally {
//       dispatch(messageActions.setLoading({ matchId, isLoading: false }));
//     }
//   };

// export const getManyNewestMessages =
//   (payload: ApiRequest.FindManyMessages): AppThunkAction =>
//   async (dispatch, getState) => {
//     const { matchId } = payload;
//     const state = getState();
//     const isLoadingNewest = state.messages.info[matchId]
//       ? state.messages.info[matchId].isLoadingNext
//       : false;
//     if (isLoadingNewest) {
//       return;
//     }
//     try {
//       dispatch(messageActions.setLoadingNewest({ matchId, isLoading: true }));
//       const data = await messagesApi.getMany(payload);
//       dispatch(messageActions.addManyNewest(data));
//     } catch (err) {
//     } finally {
//       dispatch(messageActions.setLoadingNewest({ matchId, isLoading: false }));
//     }
//   };

// export const getManyNextMessages =
//   (payload: ApiRequest.FindManyMessages): AppThunkAction =>
//   async (dispatch, getState) => {
//     const { matchId } = payload;
//     const state = getState();
//     const isLoadingNext = state.messages.info[matchId]
//       ? state.messages.info[matchId].isLoadingNext
//       : false;
//     const isReachedEnd = state.messages.info[matchId]
//       ? state.messages.info[matchId].isReachedEnd
//       : false;
//     if (isLoadingNext || isReachedEnd) {
//       return;
//     }
//     try {
//       dispatch(messageActions.setLoadingNext({ matchId, isLoading: true }));
//       const data = await messagesApi.getMany(payload);
//       dispatch(messageActions.addManyNext(data));
//     } catch (error) {
//     } finally {
//       dispatch(messageActions.setLoadingNext({ matchId, isLoading: false }));
//     }
//   };
