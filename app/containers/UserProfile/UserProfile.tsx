import { Box, Button, ChevronLeftIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BoxSafeView } from 'app/components';
import {
  NearbyUserIntroduce,
  NearbyUserMainInfo,
  UserProfileDetails,
  UserProfileImages,
} from 'app/pages';
import { Entity } from 'app/types';
import React from 'react';
import { SafeAreaView } from 'react-native';

type UserProfileScrollViewProps = {
  user: Entity.User;
};

export const UserProfile: React.FC<UserProfileScrollViewProps> = ({ user }) => {
  const { goBack } = useNavigation();

  return (
    <>
      <Box aspectRatio={640 / 860}>
        <Box position="absolute" zIndex={100}>
          <SafeAreaView />
          <Box ml={16} mt={16} zIndex={100}>
            <Button height={40} width={40} onPress={goBack} rounded={100} bgColor="$red600">
              <ChevronLeftIcon color="$white" />
            </Button>
          </Box>
        </Box>

        <UserProfileImages mediaFiles={user.mediaFiles || []} />
      </Box>

      <Box flex={1} mt={16}>
        <Box px={16}>
          <NearbyUserMainInfo nickname={user.nickname} age={user.age} distance={user.distance} />
        </Box>

        {!!user.introduce && (
          <Box px={16} mt={16}>
            <NearbyUserIntroduce introduce={user.introduce} />
          </Box>
        )}

        <Box px={16} mt={16}>
          <UserProfileDetails user={user} />
        </Box>
      </Box>

      <BoxSafeView bottom />
    </>
  );
};
