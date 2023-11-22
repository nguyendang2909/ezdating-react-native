import { Header } from 'app/components';
import { ProfileSettingIconButton } from 'app/containers/IconButton/ProfileSettingIconButton';
import { ProfileEditCard } from 'app/containers/Profile/ProfileEditCard';
import { ProfileHeader } from 'app/containers/Profile/ProfileHeader';
import { ProfileVisitorsCard } from 'app/containers/Profile/ProfileVisitorsCard';
import { colors } from 'app/theme';
import { Box, HStack, View, VStack } from 'native-base';
import React, { FC } from 'react';

export const ProfileScreen: FC = () => {
  return (
    <>
      <Header
        RightActionComponent={
          <View mr={4}>
            <ProfileSettingIconButton />
          </View>
        }
      />
      <Box backgroundColor={colors.primary}>
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
                <ProfileVisitorsCard />
              </View>
              {/* <View flex="1">
                <ProfileFreeCoinsCard />
              </View> */}
            </HStack>
          </VStack>
        </View>
      </Box>
    </>
  );
};
