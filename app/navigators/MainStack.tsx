import { SCREENS } from 'app/constants';
import { ConnectProfile } from 'app/containers/Connect/ConnectProfile';
import { PrefetchData } from 'app/containers/Prefetch/PrefetchData';
import {
  CreateBasicPhotosScreen,
  CreateBasicProfileScreen,
  DatingNearbyFilterScreen,
  MessagesScreen,
} from 'app/screens';
import { ChatProfileScreen } from 'app/screens/Conversations/ChatProfile';
import {
  EditInfoHeightScreen,
  EditInfoNicknameScreen,
  EditInfoWeightScreen,
  ProfileEditScreen,
} from 'app/screens/Me';
import { EditInfoLocationScreen } from 'app/screens/Me/EditInfoLocationScreen';
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
      <PrefetchData />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.background,
        }}
        initialRouteName={SCREENS.Main}
      >
        <Stack.Group>
          <Stack.Screen name={SCREENS.Main} component={MainScreen} />
          <Stack.Screen name={SCREENS.Home} component={HomeNavigator} />
          <Stack.Screen name={SCREENS.LikedMe} component={LikedMeScreen} />
          <Stack.Screen name={SCREENS.CREATE_BASIC_PROFILE} component={CreateBasicProfileScreen} />
          <Stack.Screen name={SCREENS.CREATE_BASIC_PHOTOS} component={CreateBasicPhotosScreen} />
          <Stack.Screen name={SCREENS.ProfileEdit} component={ProfileEditScreen} />
          <Stack.Screen name={SCREENS.ProfileSetting} component={ProfileSettingScreen} />
          <Stack.Screen name={SCREENS.Messages} component={MessagesScreen} />
          <Stack.Screen
            name={SCREENS.DATING_NEARBY_FILTER}
            component={DatingNearbyFilterScreen}
          ></Stack.Screen>
          <Stack.Screen name={SCREENS.ChatProfile} component={ChatProfileScreen}></Stack.Screen>
          <Stack.Screen
            name={SCREENS.LikedMeProfile}
            component={LikedMeProfileScreen}
          ></Stack.Screen>
          <Stack.Screen name={SCREENS.EDIT_INFO_LOCATION} component={EditInfoLocationScreen} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name={SCREENS.EditInfoHeight} component={EditInfoHeightScreen} />

          <Stack.Screen name={SCREENS.EditInfoNickname} component={EditInfoNicknameScreen} />
          <Stack.Screen name={SCREENS.EditInfoWeight} component={EditInfoWeightScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};
