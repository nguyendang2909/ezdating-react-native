import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { FontAwesome } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import React, { FC } from 'react';
import { AccessToken, LoginButton } from 'react-native-fbsdk-next';

export const SignInWithFacebookButton: FC = () => {
  const { formatMessage } = useMessages();
  // const { navigate } = useNavigation();

  // const handlePress = () => {};
  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />

      <Button backgroundColor="$blue600">
        {/*
      //@ts-ignore */}
        <ButtonIcon mr={8} as={FontAwesome} name="facebook"></ButtonIcon>
        <ButtonText>{formatMessage('Sign in with Facebook')}</ButtonText>
      </Button>
    </View>
  );
};
