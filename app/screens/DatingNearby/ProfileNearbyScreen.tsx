import { Box, ScrollView } from '@gluestack-ui/themed';
import { UserProfile } from 'app/containers/UserProfile';
import { AppStackScreenProps } from 'app/navigators';
import { NearbyUserActions } from 'app/pages/NearbyUserPage/NearbyUserActions';
import React from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const user = props.route.params.user;

  return (
    <>
      <Box flex={1}>
        <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
          <NearbyUserActions targetUserId={user._id} />
          <SafeAreaView />
        </Box>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          <UserProfile user={user} />
        </ScrollView>
      </Box>
    </>
  );
};
