import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { appActions } from 'app/store/app.store';
import { Button } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appActions.logout());

    dispatch(api.util.resetApiState());
  };

  return (
    <>
      <Button onPress={handleLogout}>{translate('Logout')}</Button>
    </>
  );
};
