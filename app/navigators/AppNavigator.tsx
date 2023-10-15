import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SCREENS } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { SignInScreen } from 'app/screens/Auth/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/Auth/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/Auth/SignInWithPhoneNumberScreen';
import { ChatProfileScreen } from 'app/screens/Conversations/ChatProfile';
import { MessagesScreen } from 'app/screens/Conversations/MessagesScreen';
import { EditMatchFilterScreen } from 'app/screens/DatingNearby/EditMatchFilterScreen';
import { ProfileNearbyScreen } from 'app/screens/DatingNearby/ProfileNearbyScreen';
import { EditInfoHeightScreen } from 'app/screens/Me/EditInfoHeightScreen';
import { EditInfoNicknameScreen } from 'app/screens/Me/EditInfoNicknameScreen';
import { EditInfoWeightScreen } from 'app/screens/Me/EditInfoWeightScreen';
import { LikedMeScreen } from 'app/screens/Me/LikedMeScreen';
import { ProfileEditScreen } from 'app/screens/Me/ProfileEditScreen';
import { ProfileSettingScreen } from 'app/screens/Me/ProfileSettingScreen';
import { MainScreen } from 'app/screens/Pre/MainScreen';
import { UpdateProfileBasicInfoScreen } from 'app/screens/Pre/UpdateProfileBasicInfoScreen';
import { UpdateProfilePhotosScreen } from 'app/screens/Pre/UpdateProfilePhotosScreen';
import { colors } from 'app/theme';
import {
  ReactNavDarkTheme,
  ReactNavDefaultTheme,
} from 'app/theme/default-theme/react-navigation-theme';
import { AppStackParamList } from 'app/types';
import React from 'react';
import { useColorScheme } from 'react-native';

import Config from '../config';
import { HomeNavigator } from './HomeNavigator';
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

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const isAuthenticated = useAppSelector(state => state.app.accessToken);
  const initialRoute: keyof AppStackParamList = isAuthenticated ? 'Main' : 'SignIn';

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
          <Stack.Screen name={SCREENS.UpdateProfilePhotos} component={UpdateProfilePhotosScreen} />
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
          <Stack.Screen name={SCREENS.ProfileSetting} component={ProfileSettingScreen} />
          <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} />
          <Stack.Screen
            name={SCREENS.EditMatchFilter}
            component={EditMatchFilterScreen}
          ></Stack.Screen>
          <Stack.Screen name={SCREENS.ChatProfile} component={ChatProfileScreen}></Stack.Screen>
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
