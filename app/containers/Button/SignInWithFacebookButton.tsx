import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithFacebookButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="facebook" />} />}
      colorScheme="blue"
    >
      {formatMessage('Sign in with Facebook')}
    </Button>
  );
};
