import { useNavigation } from '@react-navigation/native';
import { translate } from 'app/i18n';
import { Button } from 'native-base';
import React, { FC } from 'react';

export const SignInWithPhoneNumberButton: FC = () => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('SignInWithPhoneNumber');
  };

  return (
    <Button onPress={handlePress}>
      {translate('Sign in with phone number')}
    </Button>
  );
};
