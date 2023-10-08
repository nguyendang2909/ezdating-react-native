import { Box, Button, ChevronLeftIcon, ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BoxSafeView } from 'app/components';
import { AppStackScreenProps } from 'app/navigators';
import {
  NearbyUserDetails,
  NearbyUserIntroduce,
  NearbyUserMainInfo,
} from 'app/pages';
import { NearbyUserActions } from 'app/pages/NearbyUserPage/NearbyUserActions';
import { NearbyUserImages } from 'app/pages/NearbyUserPage/NearbyUserImages';
import React from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const user = props.route.params.user;

  const { goBack } = useNavigation();

  return (
    <>
      <Box flex={1}>
        <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
          <NearbyUserActions targetUserId={user._id} />
          <SafeAreaView />
        </Box>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          <Box aspectRatio={640 / 860}>
            <Box position="absolute" zIndex={100}>
              <SafeAreaView />
              <Box ml={16} mt={16} zIndex={100}>
                <Button
                  height={40}
                  width={40}
                  onPress={goBack}
                  rounded={100}
                  bgColor="$red600"
                >
                  <ChevronLeftIcon color="$white" />
                </Button>
              </Box>
            </Box>

            <NearbyUserImages mediaFiles={user.mediaFiles || []} />
          </Box>

          <Box flex={1} mt={16}>
            <Box px={16}>
              <NearbyUserMainInfo
                nickname={user.nickname}
                age={user.age}
                distance={user.distance}
              />
            </Box>

            <Box px={16} mt={16}>
              <NearbyUserIntroduce user={user} />
            </Box>

            <Box px={16} mt={16}>
              <NearbyUserDetails user={user} />
            </Box>
          </Box>

          <BoxSafeView bottom />
        </ScrollView>
      </Box>
    </>
  );
};
