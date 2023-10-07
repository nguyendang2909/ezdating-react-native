import { Box, Button, ChevronLeftIcon, ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { BoxSafeView } from 'app/components';
import { useMessages } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import {
  NearbyUserDetails,
  NearbyUserIntroduce,
  NearbyUserMainInfo,
} from 'app/pages';
import { NearbyUserImages } from 'app/pages/NearbyUserPage/NearbyUserImages';
import React from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const { formatMessage } = useMessages();

  const user = props.route.params.user;

  const { goBack } = useNavigation();

  return (
    <>
      <Box flex={1}>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          <Box aspectRatio={640 / 860}>
            <Box position="absolute" zIndex={100}>
              <SafeAreaView />
              <Box ml={16} mt={16} zIndex={100}>
                <Button height={40} width={40} onPress={goBack}>
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

            {/* {!!user?.relationshipGoal && (
          <Box mt={2} px={4}>
            <Box>
              <HStack>
                <Box>
                  <Text>Looking for</Text>
                </Box>
                <Box>{user?.relationshipGoal}</Box>
              </HStack>
            </Box>
          </Box>
        )} */}

            {/* <Box></Box> */}
          </Box>

          <BoxSafeView bottom />
        </ScrollView>
      </Box>
    </>
  );
};
