import { LogoutButton } from 'app/containers/Button/LogoutButton';
import { ProfileAccountCard } from 'app/containers/Profile/ProfileAccountCard';
import { ProfileAvatar } from 'app/containers/Profile/ProfileAvatar';
import { ProfileFreeCoinsCard } from 'app/containers/Profile/ProfileFreeCoinsCard';
import { ProfileLikedYouCard } from 'app/containers/Profile/ProfileLikedYouCard';
import { ProfileVisitorsCard } from 'app/containers/Profile/ProfileVisitorsCard';
import { useAppSelector } from 'app/hooks/useAppSelector';
import { colors } from 'app/theme';
import { Box, HStack, Text, View, VStack } from 'native-base';
import React, { FC } from 'react';

export const ProfileScreen: FC = () => {
  const user = useAppSelector(state => state.app.profile);

  return (
    <>
      <Box safeArea backgroundColor={colors.primary}>
        <HStack></HStack>
        <VStack alignItems="center">
          <View>
            <ProfileAvatar />
          </View>
          <View>
            <Text fontSize="xl" fontWeight="bold">
              {user.nickname}
            </Text>
          </View>
        </VStack>

        <View padding={4}>
          <VStack space={4}>
            <HStack space={4}>
              <View flex="1">
                <ProfileAccountCard />
              </View>
              <View flex="1">
                <ProfileLikedYouCard />
              </View>
            </HStack>
            <HStack space={4}>
              <View flex="1">
                <ProfileVisitorsCard />
              </View>
              <View flex="1">
                <ProfileFreeCoinsCard />
              </View>
            </HStack>
          </VStack>
        </View>
        <LogoutButton />
      </Box>
    </>
  );
};
