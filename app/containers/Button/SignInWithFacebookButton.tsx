import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import React, { FC } from 'react';

export const SignInWithFacebookButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button backgroundColor="$blue600">
      <ButtonIcon mr={8} as={FontAwesome} name="facebook"></ButtonIcon>
      <ButtonText>{formatMessage('Sign in with Facebook')}</ButtonText>
    </Button>
  );
};
