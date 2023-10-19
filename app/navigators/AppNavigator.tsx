import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from 'app/hooks';
import {
  ReactNavDarkTheme,
  ReactNavDefaultTheme,
} from 'app/theme/default-theme/react-navigation-theme';
import { AppStackParamList } from 'app/types';
import React from 'react';
import { useColorScheme } from 'react-native';

import Config from '../config';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

const AppStack = () => {
  const isAuthenticated = useAppSelector(state => state.app.accessToken);

  return <>{isAuthenticated ? <MainStack /> : <AuthStack />}</>;
};

export type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? ReactNavDarkTheme : ReactNavDefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
