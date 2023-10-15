import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppSelector } from 'app/hooks';
import { EditInfoHeightScreen } from 'app/screens/Me/EditInfoHeightScreen';
import { EditInfoNicknameScreen } from 'app/screens/Me/EditInfoNicknameScreen';
import { EditInfoWeightScreen } from 'app/screens/Me/EditInfoWeightScreen';
import { EditMatchFilterScreen } from 'app/screens/DatingNearby/EditMatchFilterScreen';
import { LikedMeScreen } from 'app/screens/Me/LikedMeScreen';
import { MainScreen } from 'app/screens/Pre/MainScreen';
import { MessagesScreen } from 'app/screens/Conversations/MessagesScreen';
import { ProfileEditScreen } from 'app/screens/Me/ProfileEditScreen';
import { ProfileNearbyScreen } from 'app/screens/DatingNearby/ProfileNearbyScreen';
import { ProfileSettingScreen } from 'app/screens/Me/ProfileSettingScreen';
import { SelectRelationshipScreen } from 'app/screens/SelectLookingForScreen';
import { SignInScreen } from 'app/screens/Auth/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/Auth/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/Auth/SignInWithPhoneNumberScreen';
import { UpdateProfileBasicInfoScreen } from 'app/screens/Pre/UpdateProfileBasicInfoScreen';
import { UpdateProfilePhotosScreen } from 'app/screens/Pre/UpdateProfilePhotosScreen';
import { colors } from 'app/theme';
import {
  ReactNavDarkTheme,
  ReactNavDefaultTheme,
} from 'app/theme/default-theme/react-navigation-theme';
import { Entity } from 'app/types/entity.type';
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
  EditInfoHeight: undefined;
  EditInfoNickname: undefined;
  EditInfoWeight: undefined;
  EditMatchFilter: undefined;
  UpdateProfileBasicInfo: undefined;
  UpdateProfilePhotos: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedMe: undefined;
  Main: undefined;
  Messages: {
    matchId: string;
  };
  ProfileEdit: undefined;
  ProfileNearby: {
    user: Entity.User;
  };
  ProfileSetting: undefined;
  SelectRelationshipGoal: undefined;
  SignIn: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm?: FirebaseAuthTypes.ConfirmationResult;
    user?: {
      phoneNumber?: string;
    };
  };
  SignInWithPhoneNumber: undefined;
  Welcome: undefined;
};

export const SCREENS: Record<keyof AppStackParamList, keyof AppStackParamList> =
  {
    EditInfoHeight: 'EditInfoHeight',
    EditInfoNickname: 'EditInfoNickname',
    EditInfoWeight: 'EditInfoWeight',
    EditMatchFilter: 'EditMatchFilter',
    UpdateProfileBasicInfo: 'UpdateProfileBasicInfo',
    UpdateProfilePhotos: 'UpdateProfilePhotos',
    Home: 'Home',
    LikedMe: 'LikedMe',
    Main: 'Main',
    Messages: 'Messages',
    ProfileEdit: 'ProfileEdit',
    ProfileNearby: 'ProfileNearby',
    ProfileSetting: 'ProfileSetting',
    SelectRelationshipGoal: 'SelectRelationshipGoal',
    SignIn: 'SignIn',
    SignInWithOtpPhoneNumber: 'SignInWithOtpPhoneNumber',
    SignInWithPhoneNumber: 'SignInWithPhoneNumber',
    Welcome: 'Welcome',
  } as const;

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
  const isAuthenticated = useAppSelector(state => state.app.accessToken);

  const initialRoute: keyof AppStackParamList = isAuthenticated
    ? 'Main'
    : 'SignIn';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
      }}
      initialRouteName={initialRoute}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name={SCREENS.Main} component={MainScreen} />
          <Stack.Screen name={SCREENS.Home} component={HomeNavigator} />

          <Stack.Screen
            name={SCREENS.EditInfoHeight}
            component={EditInfoHeightScreen}
            options={{
              presentation: 'modal',
            }}
          />

          <Stack.Screen
            name={SCREENS.EditInfoNickname}
            component={EditInfoNicknameScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name={SCREENS.EditInfoWeight}
            component={EditInfoWeightScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen name={SCREENS.LikedMe} component={LikedMeScreen} />
          <Stack.Screen
            name={SCREENS.UpdateProfileBasicInfo}
            component={UpdateProfileBasicInfoScreen}
          />
          <Stack.Screen
            name={SCREENS.UpdateProfilePhotos}
            component={UpdateProfilePhotosScreen}
          />
          <Stack.Screen
            name={SCREENS.ProfileEdit}
            component={ProfileEditScreen}
            options={{
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name={SCREENS.ProfileNearby}
            component={ProfileNearbyScreen}
            options={{
              presentation: 'containedModal',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name={SCREENS.ProfileSetting}
            component={ProfileSettingScreen}
          />
          <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} />
          <Stack.Screen
            name={SCREENS.SelectRelationshipGoal}
            component={SelectRelationshipScreen}
          ></Stack.Screen>
          <Stack.Screen
            name={SCREENS.EditMatchFilter}
            component={EditMatchFilterScreen}
          ></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name={SCREENS.SignIn} component={SignInScreen} />
          <Stack.Screen
            name={SCREENS.SignInWithPhoneNumber}
            component={SignInWithPhoneNumberScreen}
          />
          <Stack.Screen
            name={SCREENS.SignInWithOtpPhoneNumber}
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
      theme={colorScheme === 'dark' ? ReactNavDarkTheme : ReactNavDefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
