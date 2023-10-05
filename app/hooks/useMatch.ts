// import { conversationsApi } from 'app/services/api/conversations.api';
// import { matchesApi } from 'app/services/api/matches.api';
// import { conversationActions } from 'app/store/conversations.store';
// import { AppStore } from 'app/types/app-store.type';
// import { useCallback, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// export const useGetConversations = (match: AppStore.Match) => {
//   const dispatch = useDispatch();

//   const [isReachedEnd, setReachedEnd] = useState<boolean>(true);
//   const [isLoadingNewest, setLoadingNewest] = useState<boolean>(false);
//   const [isLoadingNext, setLoadingNext] = useState<boolean>(false);
//   const [isFetchedFirstTime, setFetchFirstTime] = useState<boolean>(false);

//   const fetchFirst = useCallback(async () => {
//     setFetchFirstTime(true);

//     setLoadingNewest(true);

//     try {
//       const { data, pagination } = await matchesApi.getOne();

//       if (data) {
//         dispatch(conversationActions.addMany(data));
//       }

//       conversationsApi.handlePagination(pagination, setReachedEnd);
//     } catch (err) {
//     } finally {
//       setLoadingNewest(false);
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isFetchedFirstTime && !conversationsLength && !isLoadingNewest) {
//       fetchFirst();
//     }
//   }, [conversationsLength, fetchFirst, isFetchedFirstTime, isLoadingNewest]);

//   const fetchNewest = async () => {
//     if (isLoadingNewest) {
//       return;
//     }

//     await fetchFirst();
//   };

//   const fetchNext = async () => {
//     if (isReachedEnd) {
//       return;
//     }
//     if (isLoadingNext) {
//       return;
//     }
//     try {
//       const nextCursor = conversationsApi.getCursor(conversations);
//       const { data, pagination } = await conversationsApi.getMany({
//         _next: nextCursor,
//       });
//       if (data) {
//         dispatch(conversationActions.addMany(data));
//       }
//       conversationsApi.handlePagination(pagination, setReachedEnd);
//     } catch (err) {
//     } finally {
//       setLoadingNext(false);
//     }
//   };

//   return {
//     length: conversationsLength,
//     data: conversations,
//     fetchNewest,
//     fetchNext,
//     isLoadingNewest,
//     isLoadingNext,
//     isFetchedFirstTime,
//   };
// };
