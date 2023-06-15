/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppSelector } from 'app/hooks';
import { InputBasicInfoScreen } from 'app/screens/InputBasicInfoScreen';
import { SignInScreen } from 'app/screens/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/SignInWithPhoneNumberScreen';
import { api } from 'app/services/api';
import { colors } from 'app/theme';
import React from 'react';
import { useColorScheme } from 'react-native';

import Config from '../config';
import { HomeNavigator, HomeTabParamList } from './HomeNavigator';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your redux to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  InputBasicInfo: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm: FirebaseAuthTypes.ConfirmationResult;
    user: {
      phoneNumber: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const isAuthenticated = useAppSelector(state => state.app.isLogged);

  api.useGetMyProfileQuery(undefined, {});

  const haveBasicInfo = useAppSelector(
    state => state.app.profile.haveBasicInfo,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={
        isAuthenticated ? (haveBasicInfo ? 'Home' : 'InputBasicInfo') : 'SignIn'
      }
    >
      {isAuthenticated ? (
        haveBasicInfo ? (
          <>
            <Stack.Screen name="Home" component={HomeNavigator} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="InputBasicInfo"
              component={InputBasicInfoScreen}
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="SignInWithPhoneNumber"
            component={SignInWithPhoneNumberScreen}
          />
          <Stack.Screen
            name="SignInWithOtpPhoneNumber"
            component={SignInWithOtpPhoneNumberScreen}
          />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  );
};

export type NavigationProps = Partial<
  React.ComponentProps<typeof NavigationContainer>
>;

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
