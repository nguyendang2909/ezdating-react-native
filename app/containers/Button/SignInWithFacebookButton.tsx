import { FontAwesome } from 'app/components/Icon/Lib';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { Button, Icon } from 'native-base';
import React, { FC } from 'react';

export const SignInWithFacebookButton: FC = () => {
  const t = useTranslate();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};

  return (
    <Button
      // onPress={handlePress}
      startIcon={<Icon as={<FontAwesome name="facebook" />} />}
      colorScheme="blue"
    >
      {t('Sign in with Facebook')}
    </Button>
  );
};
