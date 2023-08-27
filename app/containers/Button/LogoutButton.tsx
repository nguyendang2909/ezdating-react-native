import { translate } from 'app/i18n';
import { appActions } from 'app/store/app.store';
import { Button } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';

export const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(appActions.logout());
  };

  return (
    <>
      <Button onPress={handleLogout}>{translate('Logout')}</Button>
    </>
  );
};
