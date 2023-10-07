import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithPhoneNumberButton: FC = () => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('SignInWithPhoneNumber');
  };

  return (
    <Button
      onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="mobile-phone" />} />}
    >
      {formatMessage('Sign in with phone number')}
    </Button>
  );
};
