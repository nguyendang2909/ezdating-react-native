import { useAppSelector } from 'app/hooks';
import {
  disconnectWebSocket,
  getSocket,
  socketStoreActions,
} from 'app/store/socket.store';
import React from 'react';
import { useDispatch } from 'react-redux';

export const ConnectSocket: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useAppSelector(state => state.app.accessToken);
  const userId = useAppSelector(state => state.app.profile._id);

  React.useEffect(() => {
    if (accessToken && userId) {
      const socket = getSocket();
      if (!socket || !socket.connected) {
        dispatch(socketStoreActions.initializeWebSocket());
      }
    }

    return () => {
      disconnectWebSocket();
    };
  }, [dispatch, accessToken, userId]);

  return <></>;
};
