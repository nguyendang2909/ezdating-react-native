import { FontAwesome } from 'app/components/Icon/Lib';
import { translate } from 'app/i18n';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithGoogleButton: FC = () => {
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      colorScheme="amber"
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="google" />} />}
    >
      {translate('Sign in with w', { w: 'Google' })}
    </Button>
  );
};
