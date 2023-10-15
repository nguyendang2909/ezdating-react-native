import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import React, { FC } from 'react';

export const SignInWithPhoneNumberButton: FC = () => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('SignInWithPhoneNumber');
  };

  return (
    <Button onPress={handlePress}>
      <ButtonIcon mr={8} as={FontAwesome} name="mobile-phone" />
      <ButtonText>{formatMessage('Sign in with phone number')}</ButtonText>
    </Button>
  );
};
