import { SignInWithPhoneNumberButton } from 'app/containers/Button/SignInWithPhoneNumberButton';
import { AppStackScreenProps } from 'app/navigators';
import {
  backgroundColor,
  heightFull,
  justifyContentCenter,
  marginTop,
  paddingHorizontal,
  posititionAbsolute,
  widthFull,
  zIndex,
} from 'app/styles';
import { spacing } from 'app/theme';
import { Button, Text, View } from 'native-base';
import React, { FC } from 'react';
import { ImageBackground } from 'react-native';
const backgroundImage = require('../../assets/images/Couples-home.jpeg');

type FCProps = AppStackScreenProps<'SignIn'>;

export const SignInScreen: FC<FCProps> = () => {
  return (
    <>
      <ImageBackground
        source={backgroundImage}
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
      <View
        style={[
          heightFull,
          justifyContentCenter,
          paddingHorizontal(spacing.lg),
          zIndex(3),
        ]}
      >
        <View>
          <SignInWithPhoneNumberButton />
        </View>
        <View style={marginTop(spacing.lg)}>
          <Button variant="outline" disabled>
            <Text>asdasd</Text>
          </Button>
        </View>
      </View>
    </>
  );
};
