import { Button } from '@gluestack-ui/themed';
import { LoadingButton } from 'app/components/Button/LoadingButton';
import { messages } from 'app/locales/messages';
import { api, useLogoutMutation } from 'app/services/api/root-api';
import { appActions } from 'app/store/app.store';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

type FC = React.ComponentProps<typeof Button>;

export const LogoutButton: React.FC<FC> = () => {
  const t = useIntl();
  const dispatch = useDispatch();

  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {}

    dispatch(appActions.logout());

    dispatch(api.util.resetApiState());
  };

  return (
    <>
      <LoadingButton isLoading={isLoading} onPress={handleLogout}>
        {t.formatMessage(messages.Logout)}
      </LoadingButton>
    </>
  );
};
