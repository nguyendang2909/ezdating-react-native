import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithPhoneNumberButton: FC = () => {
  const t = useTranslate();

  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate('SignInWithPhoneNumber');
  };

  return (
    <Button
      onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="mobile-phone" />} />}
    >
      {t('Sign in with phone number')}
    </Button>
  );
};
