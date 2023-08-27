import { translate } from 'app/i18n';
import { appActions } from 'app/store/app.store';
import { conversationActions } from 'app/store/conversations.store';
import { userActions } from 'app/store/user.store';
import { Button } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appActions.logout());
    dispatch(userActions.logout());
    dispatch(conversationActions.logout());
  };

  return (
    <>
      <Button onPress={handleLogout}>{translate('Logout')}</Button>
    </>
  );
};
