import { Button } from '@gluestack-ui/themed';
import { api, useLogoutMutation } from 'app/api';
import { LoadingButton } from 'app/components/Button/LoadingButton';
import { useAppSelector } from 'app/hooks';
import { messages } from 'app/locales/messages';
import { appActions } from 'app/store/app.store';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

type FC = React.ComponentProps<typeof Button>;

export const LogoutButton: React.FC<FC> = () => {
  const t = useIntl();
  const dispatch = useDispatch();
  const refreshToken = useAppSelector(s => s.app.refreshToken);

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      if (refreshToken) {
        await logout({ refreshToken }).unwrap();
      }
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
