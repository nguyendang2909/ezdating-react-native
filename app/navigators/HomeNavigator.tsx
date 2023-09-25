import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { translate } from 'app/i18n';
import { AppStackScreenProps } from 'app/navigators';
import { ConversationsScreen } from 'app/screens/ConversationsScreen';
import { DatingNearbyScreen } from 'app/screens/DatingNearbyScreen';
import { DatingSwipeScreen } from 'app/screens/DatingSwipeScreen';
import { ProfileScreen } from 'app/screens/ProfileScreen';
import { backgroundColor, borderTopColor } from 'app/styles';
import { colors, spacing } from 'app/theme';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type HomeTabParamList = {
  DatingSwipe: undefined;
  DatingNearby: undefined;
  Conversations: undefined;
  Profile: undefined;
};

type FCProps = AppStackScreenProps<'Home'>;

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeNavigator: FC<FCProps> = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          backgroundColor(colors.background),
          borderTopColor(colors.transparent),
          { height: bottom + 70 },
        ],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
          flex: 1,
        },
        tabBarItemStyle: {
          paddingTop: spacing.md,
        },
      }}
    >
      <Tab.Screen
        name="DatingSwipe"
        component={DatingSwipeScreen}
        options={{
          tabBarShowLabel: false,
          //   tabBarLabel: translate('Swipe'),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="globe"
              color={focused ? '#ff6036' : colors.palette.neutral400}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DatingNearby"
        component={DatingNearbyScreen}
        options={{
          tabBarShowLabel: false,
          //   tabBarLabel: translate('Nearby'),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="location-on"
              color={focused ? '#ff6036' : colors.palette.neutral400}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: translate('Messages'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="chat"
              color={focused ? '#ff6036' : colors.palette.neutral400}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: translate('Profile'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? '#ff6036' : colors.palette.neutral400}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
