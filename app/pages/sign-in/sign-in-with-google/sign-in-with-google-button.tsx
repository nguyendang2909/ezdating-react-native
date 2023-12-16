import { ButtonIcon } from '@gluestack-ui/themed';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSignInWithGoogleMutation } from 'app/api';
import { LoadingButton } from 'app/components/Button';
import { FontAwesome } from 'app/components/Icon/Lib';
import { SIGN_IN_METHODS } from 'app/constants/constants';
import { useMessages } from 'app/hooks';
import { SignInMethod } from 'app/types';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';

type FCProps = {
  signInMethod: SignInMethod | null;
  setSignInMethod: (method: SignInMethod | null) => void;
};

export const SignInWithGoogleButton: FC<FCProps> = ({ signInMethod, setSignInMethod }) => {
  const { formatMessage } = useMessages();
  const [signIn] = useSignInWithGoogleMutation();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '472228192707-vu70qsfcfo00vm1hnd0acehs9sf5s4mp.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const handlePress = async () => {
    try {
      setSignInMethod(SIGN_IN_METHODS.GOOGLE);
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      const { idToken } = googleUser;
      if (idToken) {
        await signIn({ token: idToken }).unwrap();
      }
    } catch (error) {
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } finally {
      setSignInMethod(null);
    }
  };

  return (
    <>
      <LoadingButton
        disabled={![null, SIGN_IN_METHODS.GOOGLE].includes(signInMethod)}
        isLoading={signInMethod === SIGN_IN_METHODS.GOOGLE}
        onPress={handlePress}
        backgroundColor="$amber600"
        // @ts-ignore
        startIcon={<ButtonIcon mr={8} as={FontAwesome} name="google"></ButtonIcon>}
      >
        {formatMessage('Sign in with Google')}
      </LoadingButton>
    </>
  );
};
