import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import React, { FC } from 'react';

export const SignInWithGoogleButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      backgroundColor="$amber600"

      // onPress={handlePress}
    >
      {/* 
      @ts-ignore */}
      <ButtonIcon mr={8} as={FontAwesome} name="google"></ButtonIcon>
      <ButtonText>{formatMessage('Sign in with Google')}</ButtonText>
    </Button>
  );
};
