import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithGoogleButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      colorScheme="amber"
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="google" />} />}
    >
      {formatMessage('Sign in with Google')}
    </Button>
  );
};
