import { FontAwesome } from 'app/components/Icon/Lib';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithGoogleButton: FC = () => {
  const t = useTranslate();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      colorScheme="amber"
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="google" />} />}
    >
      {t('Sign in with Google')}
    </Button>
  );
};
