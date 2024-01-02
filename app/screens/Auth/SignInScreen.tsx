import { View } from '@gluestack-ui/themed';
import { AppStackScreenProps } from 'app/navigators';
import { SignInButtons } from 'app/pages/sign-in/sign-in-buttons';
import { backgroundColor, heightFull, posititionAbsolute, widthFull, zIndex } from 'app/styles';
import React, { FC } from 'react';
import { ImageBackground } from 'react-native';

type FCProps = AppStackScreenProps<'SignIn'>;

export const SignInScreen: FC<FCProps> = () => {
  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/girl-smile.jpg')}
        style={[widthFull, heightFull, posititionAbsolute, zIndex(1)]}
      ></ImageBackground>
      <View
        style={[
          widthFull,
          heightFull,
          posititionAbsolute,
          backgroundColor('rgba(0,0,0, 0.60)'),
          zIndex(2),
        ]}
      ></View>

      <View flex={1} justifyContent="center" zIndex={10}>
        <SignInButtons />
      </View>
    </>
  );
};
