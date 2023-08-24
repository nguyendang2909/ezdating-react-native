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
import { EditInfoBirthdayScreen } from 'app/screens/EditInfoBirthdayScreen';
import { EditInforGenderScreen } from 'app/screens/EditInfoGenderScreen';
import { EditInfoHeightScreen } from 'app/screens/EditInfoHeightScreen';
import { EditInfoNicknameScreen } from 'app/screens/EditInfoNicknameScreen';
import { EditInfoRelationshipGoalScreen } from 'app/screens/EditInfoRelationshipGoalScreen';
import { EditInfoWeightScreen } from 'app/screens/EditInfoWeightScreen';
import { LikedYouScreen } from 'app/screens/LikedYouScreen';
import { MainScreen } from 'app/screens/MainScreen';
import { MessagesByConversationScreen } from 'app/screens/MessagesByConversationScreen';
import { ProfileEditScreen } from 'app/screens/ProfileEditScreen';
import { ProfileNearbyScreen } from 'app/screens/ProfileNearbyScreen';
import { ProfileSettingScreen } from 'app/screens/ProfileSettingScreen';
import { SelectRelationshipScreen } from 'app/screens/SelectLookingForScreen';
import { SignInScreen } from 'app/screens/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/SignInWithPhoneNumberScreen';
import { UpdateProfileBasicInfoScreen } from 'app/screens/UpdateProfileBasicInfoScreen';
import { UpdateProfilePhotosScreen } from 'app/screens/UpdateProfilePhotosScreen';
import { api } from 'app/services/api';
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
  EditInfoBirthday: undefined;
  EditInfoGender: undefined;
  EditInfoHeight: undefined;
  EditInfoNickname: undefined;
  EditInfoRelationshipGoal: undefined;
  EditInfoWeight: undefined;
  UpdateProfileBasicInfo: undefined;
  UpdateProfilePhotosScreen: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  LikedYou: undefined;
  Main: undefined;
  MessagesByConversation: {
    conversation: Entity.Match;
  };
  ProfileEdit: undefined;
  ProfileNearby: {
    userId: string;
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
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Home" component={HomeNavigator} />
          <Stack.Screen
            name="EditInfoBirthday"
            component={EditInfoBirthdayScreen}
          />
          <Stack.Screen
            name="EditInfoGender"
            component={EditInforGenderScreen}
          />
          <Stack.Screen
            name="EditInfoHeight"
            component={EditInfoHeightScreen}
          />
          <Stack.Screen
            name="EditInfoNickname"
            component={EditInfoNicknameScreen}
          />
          <Stack.Screen
            name="EditInfoRelationshipGoal"
            component={EditInfoRelationshipGoalScreen}
          />
          <Stack.Screen
            name="EditInfoWeight"
            component={EditInfoWeightScreen}
          />
          <Stack.Screen
            name="LikedYou"
            component={LikedYouScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="UpdateProfileBasicInfo"
            component={UpdateProfileBasicInfoScreen}
          />
          <Stack.Screen
            name="UpdateProfilePhotosScreen"
            component={UpdateProfilePhotosScreen}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEditScreen}
            options={{
              presentation: 'card',
            }}
          />
          <Stack.Screen
            name="ProfileNearby"
            component={ProfileNearbyScreen}
            options={{
              presentation: 'containedModal',
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="ProfileSetting"
            component={ProfileSettingScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="MessagesByConversation"
            component={MessagesByConversationScreen}
          />
          <Stack.Screen
            name="SelectRelationshipGoal"
            component={SelectRelationshipScreen}
          ></Stack.Screen>
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
      theme={colorScheme === 'dark' ? ReactNavDarkTheme : ReactNavDefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
