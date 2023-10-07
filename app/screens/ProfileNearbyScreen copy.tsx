import {
  Box,
  Button,
  ChevronLeftIcon,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useMessages } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import { NearbyUserImages } from 'app/pages/NearbyUserPage/NearbyUserImages';
import { NearbyUserSendLikeButton } from 'app/pages/NearbyUserPage/NearbyUserSendLikeButton';
import { NearbyUserSendMessageButton } from 'app/pages/NearbyUserPage/NearbyUserSendMessage';
import { aspectRatio } from 'app/styles';
import { HStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const { formatMessage } = useMessages();

  const user = props.route.params.user;

  const { goBack } = useNavigation();

  return (
    <Box>
      <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
        <HStack justifyContent="center" space={4}>
          <Box>
            <NearbyUserSendMessageButton />
          </Box>

          <NearbyUserSendLikeButton userId={user._id} />
        </HStack>
        <SafeAreaView />
      </Box>

      <ScrollView>
        <Box style={aspectRatio(640 / 860)}>
          <Box position="absolute" zIndex={100} left={4} top={4}>
            <SafeAreaView />
            <Box zIndex={100}>
              <Button height={40} width={40} onPress={goBack}>
                <ChevronLeftIcon color="$white" />
              </Button>
            </Box>
          </Box>
          <Box
            position="absolute"
            bottom={0}
            zIndex={100}
            alignItems="center"
            justifyContent="center"
            px={4}
            m={0}
          >
            {/* <Pagination
            dotsLength={user?.mediaFiles?.length || 0}
            activeDotIndex={activeSlide}
            // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
              width: dotWidth,
              height: 5,
              // borderRadius: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotStyle={{
              width: dotWidth,
              height: 5,
              // borderRadius: 5,
              // backgroundColor: 'rgba(255, 255, 255, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          /> */}
          </Box>
          <NearbyUserImages mediaFiles={user.mediaFiles || []} />
        </Box>
      </ScrollView>

      <Box flex={1} mt={4}>
        <Box px={4}>
          <HStack space={3}>
            <Box backgroundColor="$backgroundLight100">
              <Text fontSize={28} fontWeight="bold" lineHeight={28}>
                {user?.nickname}
              </Text>
            </Box>
            <Box>
              <Text fontSize={28} lineHeight={28}>
                {user?.age}
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* <Box mt={2} px={4}>
          <Box>
            {_.isNumber(user?.distance) && (
              <HStack alignItems="center" space={2}>
                <Box>
                  <MaterialIcons name="location-on" size={24} />
                </Box>
                <Box>
                  <Text fontSize={20}>
                    {Math.round((user?.distance || 0) / 1000)}{' '}
                    {formatMessage('km away')}
                  </Text>
                </Box>
              </HStack>
            )}
          </Box>
        </Box> */}

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

      <SafeAreaView />
    </Box>
  );
};
