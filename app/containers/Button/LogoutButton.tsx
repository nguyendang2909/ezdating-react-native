import { Button, ButtonText } from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { messages } from 'app/locales/messages';
import { api, useLogoutMutation } from 'app/services/api';
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
      await logout({ refreshToken: refreshToken || '' }).unwrap();
    } catch (err) {}
    dispatch(appActions.logout());
    dispatch(api.util.resetApiState());
  };

  return (
    <>
      <Button onPress={handleLogout}>
        <ButtonText>{t.formatMessage(messages.Logout)}</ButtonText>
      </Button>
    </>
  );
};
