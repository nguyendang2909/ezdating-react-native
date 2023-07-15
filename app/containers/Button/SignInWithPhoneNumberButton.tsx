import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'app/components/Icon/Lib';
import { translate } from 'app/i18n';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithPhoneNumberButton: FC = () => {
  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('SignInWithPhoneNumber');
  };

  return (
    <Button
      onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="mobile-phone" />} />}
    >
      {translate('Sign in with w', { w: translate('phone number') })}
    </Button>
  );
};
