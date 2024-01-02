import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useSignInWithAppleMutation } from 'app/api';
import { FontAwesome } from 'app/components';
import { useMessages } from 'app/hooks';
import { appActions } from 'app/store/app.store';
import React, { FC, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

type FCProps = {
  setLoading: (e: boolean) => void;
};

export const SignInWithAppleButton: FC<FCProps> = ({ setLoading }) => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [signInWithApple] = useSignInWithAppleMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []);

  const handlePress = async () => {
    setLoading(true);
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (
        credentialState === appleAuth.State.AUTHORIZED &&
        appleAuthRequestResponse.identityToken
      ) {
        const signInResponse = await signInWithApple({
          token: appleAuthRequestResponse.identityToken,
        }).unwrap();
        dispatch(appActions.updateAccessToken(signInResponse.data));
        return;
      }
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } catch (err) {
      Toast.show({ text1: formatErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={handlePress}
        backgroundColor="$white"
        // @ts-ignore
      >
        <View mr={8}>
          {/*
          @ts-ignore */}
          <ButtonIcon color="$black" mr={8} as={FontAwesome} name="apple"></ButtonIcon>
        </View>
        <ButtonText color="$black">{formatMessage('Sign in with Apple')}</ButtonText>
      </Button>
    </>
  );
};
