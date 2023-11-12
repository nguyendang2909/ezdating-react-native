import { Box, ScrollView } from '@gluestack-ui/themed';
import { ViewAndroidSafeArea } from 'app/components';
import { UserProfile } from 'app/containers/UserProfile';
import { AppStackScreenProps } from 'app/navigators';
import { NearbyUserActions } from 'app/pages/dating-nearby-profile/NearbyUserActions';
import React from 'react';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const profile = props.route.params.profile;

  return (
    <>
      <ViewAndroidSafeArea flex={1}>
        <Box position="absolute" bottom={20} left={0} right={0} zIndex={999}>
          <NearbyUserActions targetUserId={profile._id} />
        </Box>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          <UserProfile profile={profile} />
        </ScrollView>
      </ViewAndroidSafeArea>
    </>
  );
};
