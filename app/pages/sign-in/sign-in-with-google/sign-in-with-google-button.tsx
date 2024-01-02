import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSignInWithGoogleMutation } from 'app/api';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import { dispatch } from 'app/store';
import { appActions } from 'app/store/app.store';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';

type FCProps = {
  setLoading: (e: boolean) => void;
};

export const SignInWithGoogleButton: FC<FCProps> = ({ setLoading }) => {
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
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      const { idToken } = googleUser;
      if (!idToken) {
        Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
        return;
      }
      const signInResponse = await signIn({ token: idToken }).unwrap();
      dispatch(appActions.updateAccessToken(signInResponse.data));
    } catch (error) {
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={handlePress} backgroundColor="$amber600">
        <View mr={8}>
          {/*
          @ts-ignore */}
          <ButtonIcon mr={8} as={FontAwesome} name="google"></ButtonIcon>
        </View>
        <ButtonText>{formatMessage('Sign in with Google')}</ButtonText>
      </Button>
    </>
  );
};
