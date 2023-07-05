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
import { ProfileSettingScreen } from 'app/screens/ProfileSettingScreen';
import { SignInScreen } from 'app/screens/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/SignInWithPhoneNumberScreen';
import { UpdateProfileBasicInfoScreen } from 'app/screens/UpdateProfileBasicInfoScreen';
import { UpdateProfilePhotosScreen } from 'app/screens/UpdateProfilePhotosScreen';
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
  UpdateProfileBasicInfo: undefined;
  UpdateProfilePhotosScreen: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
  ProfileSetting: undefined;
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
        isAuthenticated
          ? haveBasicInfo
            ? 'Home'
            : 'UpdateProfileBasicInfo'
          : 'SignIn'
      }
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeNavigator} />
          <Stack.Screen
            name="UpdateProfileBasicInfo"
            component={UpdateProfileBasicInfoScreen}
          />
          <Stack.Screen
            name="UpdateProfilePhotosScreen"
            component={UpdateProfilePhotosScreen}
          />
          <Stack.Screen
            name="ProfileSetting"
            component={ProfileSettingScreen}
            options={{
              presentation: 'modal',
            }}
          />
        </>
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
