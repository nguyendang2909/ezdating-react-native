import { FontAwesome } from 'app/components/Icon/Lib';
import { translate } from 'app/i18n';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithFacebookButton: FC = () => {
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="facebook" />} />}
      colorScheme="blue"
    >
      {translate('Sign in with w', { w: 'Facebook' })}
    </Button>
  );
};
