import { Button } from '@gluestack-ui/themed';
import { LoadingButton } from 'app/components/Button/LoadingButton';
import { useLogoutMutation } from 'app/hooks/useLogoutMutation';
import { messages } from 'app/locales/define-messages';
import { api } from 'app/services/api';
import { appActions } from 'app/store/app.store';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

type FC = React.ComponentProps<typeof Button>;

export const LogoutButton: React.FC<FC> = () => {
  const t = useIntl();
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
        {t.formatMessage(messages.Logout)}
      </LoadingButton>
    </>
  );
};
