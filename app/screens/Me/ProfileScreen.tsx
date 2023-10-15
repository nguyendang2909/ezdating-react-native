import { ProfileEditCard } from 'app/containers/Profile/ProfileEditCard';
import { ProfileFreeCoinsCard } from 'app/containers/Profile/ProfileFreeCoinsCard';
import { ProfileHeader } from 'app/containers/Profile/ProfileHeader';
import { ProfileLikedYouCard } from 'app/containers/Profile/ProfileLikedYouCard';
import { ProfileTopBar } from 'app/containers/Profile/ProfileTopBar';
import { ProfileVisitorsCard } from 'app/containers/Profile/ProfileVisitorsCard';
import { colors } from 'app/theme';
import { Box, HStack, View, VStack } from 'native-base';
import React, { FC } from 'react';

export const ProfileScreen: FC = () => {
  return (
    <>
      <Box safeArea backgroundColor={colors.primary}>
        <View px={4} pt={4}>
          <ProfileTopBar />
        </View>
        <View>
          <ProfileHeader />
        </View>

        <View padding={4}>
          <VStack space={4}>
            <HStack space={4}>
              <View flex="1">
                <ProfileEditCard />
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
      </Box>
    </>
  );
};
