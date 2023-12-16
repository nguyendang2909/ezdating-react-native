import { ButtonIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { LoadingButton } from 'app/components/Button';
import { FontAwesome } from 'app/components/Icon/Lib';
import { SCREENS } from 'app/constants';
import { SIGN_IN_METHODS } from 'app/constants/constants';
import { useMessages } from 'app/hooks';
import { SignInMethod } from 'app/types';
import React, { FC } from 'react';
import Toast from 'react-native-toast-message';

type FCProps = {
  signInMethod: SignInMethod | null;
  setSignInMethod: (method: SignInMethod | null) => void;
};

export const SignInWithPhoneNumberButton: FC<FCProps> = ({ signInMethod, setSignInMethod }) => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();

  const handlePress = () => {
    try {
      setSignInMethod(SIGN_IN_METHODS.PHONE_NUMBER);
      navigate(SCREENS.SignInWithPhoneNumber);
    } catch (err) {
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } finally {
      setSignInMethod(null);
    }
  };

  return (
    <>
      <LoadingButton
        disabled={![null, SIGN_IN_METHODS.PHONE_NUMBER].includes(signInMethod)}
        isLoading={signInMethod === SIGN_IN_METHODS.PHONE_NUMBER}
        onPress={handlePress}
        // @ts-ignore
        startIcon={<ButtonIcon as={FontAwesome} name="mobile-phone" />}
      >
        {formatMessage('Sign in with phone number')}
      </LoadingButton>
    </>
  );
};
