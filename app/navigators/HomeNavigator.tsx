import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GradientIcon } from 'app/components/Icon/GradientIcon';
import { useMessages } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import { ConversationsScreen } from 'app/screens/Conversations/ConversationsScreen';
import { DatingNearbyScreen } from 'app/screens/DatingNearby/DatingNearbyScreen';
import { DatingSwipeScreen } from 'app/screens/DatingSwipe/DatingSwipeScreen';
import { ProfileScreen } from 'app/screens/Me/ProfileScreen';
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
  const { formatMessage } = useMessages();

  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          backgroundColor(colors.background),
          borderTopColor(colors.transparent),
          { height: bottom + 48 },
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
          //   tabBarLabel: formatMessage('Swipe'),
          tabBarIcon: ({ focused }) => (
            <GradientIcon
              {...(!focused
                ? {
                    colors: [colors.palette.neutral500, colors.palette.neutral500],
                  }
                : {})}
              size={30}
              name="globe"
              icon={FontAwesome}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DatingNearby"
        component={DatingNearbyScreen}
        options={{
          tabBarShowLabel: false,
          //   tabBarLabel: formatMessage('Nearby'),
          tabBarIcon: ({ focused }) => (
            <GradientIcon
              {...(!focused
                ? {
                    colors: [colors.palette.neutral500, colors.palette.neutral500],
                  }
                : {})}
              size={30}
              name="location-on"
              icon={MaterialIcons}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: formatMessage('Messages'),
          tabBarIcon: ({ focused }) => (
            <GradientIcon
              {...(!focused
                ? {
                    colors: [colors.palette.neutral500, colors.palette.neutral500],
                  }
                : {})}
              size={30}
              name="chat"
              icon={MaterialCommunityIcons}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: formatMessage('Profile'),
          tabBarIcon: ({ focused }) => (
            <GradientIcon
              {...(!focused
                ? {
                    colors: [colors.palette.neutral500, colors.palette.neutral500],
                  }
                : {})}
              size={30}
              name="account"
              icon={MaterialCommunityIcons}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
