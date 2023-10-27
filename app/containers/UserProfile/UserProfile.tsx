import { Box, Button, ChevronLeftIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BoxSafeView } from 'app/components';
import {
  NearbyUserIntroduce,
  NearbyUserMainInfo,
  UserProfileDetails,
  UserProfileImages,
} from 'app/pages';
import { Profile } from 'app/types';
import React from 'react';
import { SafeAreaView } from 'react-native';

type UserProfileScrollViewProps = {
  profile: Profile;
};

export const UserProfile: React.FC<UserProfileScrollViewProps> = ({ profile }) => {
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

        <UserProfileImages mediaFiles={profile.mediaFiles || []} />
      </Box>

      <Box flex={1} mt={16}>
        <Box px={16}>
          <NearbyUserMainInfo
            nickname={profile.nickname}
            age={profile.age}
            distance={profile.distance}
          />
        </Box>

        {!!profile.introduce && (
          <Box px={16} mt={16}>
            <NearbyUserIntroduce introduce={profile.introduce} />
          </Box>
        )}

        <Box px={16} mt={16}>
          <UserProfileDetails profile={profile} />
        </Box>
      </Box>

      <BoxSafeView bottom />
    </>
  );
};
