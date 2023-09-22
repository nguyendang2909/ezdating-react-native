import { Button } from '@gluestack-ui/themed';
import { LoadingButton } from 'app/components/Button/LoadingButton';
import { useLogoutMutation } from 'app/hooks/useLogoutMutation';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { appActions } from 'app/store/app.store';
import React from 'react';
import { useDispatch } from 'react-redux';

type FC = React.ComponentProps<typeof Button>;

export const LogoutButton: React.FC<FC> = () => {
  const dispatch = useDispatch();

  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {}

    dispatch(appActions.logout());

    dispatch(api.util.resetApiState());
  };

  return (
    <>
      <LoadingButton
        isLoading={logoutMutation.isLoading}
        onPress={handleLogout}
      >
        {translate('Logout')}
      </LoadingButton>
    </>
  );
};
