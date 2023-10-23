import { SCREENS } from 'app/constants';
import { ConnectProfile } from 'app/containers/Connect/ConnectProfile';
import {
  EditMatchFilterScreen,
  MessagesScreen,
  ProfileNearbyScreen,
  UpdateProfileBasicInfoScreen,
  UpdateProfilePhotosScreen,
} from 'app/screens';
import { ChatProfileScreen } from 'app/screens/Conversations/ChatProfile';
import {
  EditInfoHeightScreen,
  EditInfoNicknameScreen,
  EditInfoWeightScreen,
  ProfileEditScreen,
} from 'app/screens/Me';
import { LikedMeScreen } from 'app/screens/Me/LikedMeScreen';
import { ProfileSettingScreen } from 'app/screens/Me/ProfileSettingScreen';
import { MainScreen } from 'app/screens/Pre/MainScreen';
import { LikedMeProfileScreen } from 'app/screens/Star/LikedMeProfileScreen';
import { colors } from 'app/theme';
import React from 'react';

import { HomeNavigator } from './HomeNavigator';
import { Stack } from './Stack';

export const MainStack: React.FC = () => {
  return (
    <>
      <ConnectProfile />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
        }}
        initialRouteName="Main"
      >
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
        <Stack.Screen name={SCREENS.LikedMeProfile} component={LikedMeProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </>
  );
};
