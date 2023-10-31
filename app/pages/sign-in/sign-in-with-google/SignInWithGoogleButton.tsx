import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useSignInWithGoogleMutation } from 'app/api';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import React, { FC, useEffect } from 'react';

export const SignInWithGoogleButton: FC = () => {
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
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();
      const { idToken } = googleUser;
      if (idToken) {
        await signIn({ token: idToken }).unwrap();
      }
    } catch (error) {}
  };

  return (
    <>
      <Button backgroundColor="$amber600" onPress={handlePress}>
        {/* 
      @ts-ignore */}
        <ButtonIcon mr={8} as={FontAwesome} name="google"></ButtonIcon>
        <ButtonText>{formatMessage('Sign in with Google')}</ButtonText>
      </Button>
    </>
  );
};
