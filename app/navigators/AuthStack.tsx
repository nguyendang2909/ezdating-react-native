import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SCREENS } from 'app/constants';
import {
  SignInScreen,
  SignInWithOtpPhoneNumberScreen,
  SignInWithPhoneNumberScreen,
} from 'app/screens';
import React from 'react';

import { Stack } from './Stack';

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="SignIn">
      <Stack.Screen name={SCREENS.SignIn} component={SignInScreen} />
      <Stack.Screen name={SCREENS.SignInWithPhoneNumber} component={SignInWithPhoneNumberScreen} />
      <Stack.Screen
        name={SCREENS.SignInWithOtpPhoneNumber}
        component={SignInWithOtpPhoneNumberScreen}
      />
    </Stack.Navigator>
  );
};
