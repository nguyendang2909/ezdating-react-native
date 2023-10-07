import { Button, ChevronLeftIcon, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { FontAwesome, Ionicons } from 'app/components/Icon/Lib';
import { AppStackScreenProps } from 'app/navigators';
import { likesApi } from 'app/services/api/likes.api';
import { aspectRatio } from 'app/styles';
import _ from 'lodash';
import { Box, HStack, Image, View } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type FCProps = AppStackScreenProps<'ProfileNearby'>;

export const ProfileNearbyScreen: React.FC<FCProps> = props => {
  const user = props.route.params.user;

  const width = Dimensions.get('window').width;
  const { goBack } = useNavigation();

  const [isLoadingSendLike, setLoadingSendLike] = useState<boolean>(false);
  const [isShowSendLike, setShowSendLike] = useState<boolean>(true);
  const [isLoadingSendMessage, setLoadingSendMessage] =
    useState<boolean>(false);

  const handleSendLike = async () => {
    try {
      setLoadingSendLike(true);
      await likesApi.send({
        targetUserId: user._id,
      });
      setShowSendLike(false);
    } catch (err) {
    } finally {
      setLoadingSendLike(false);
    }
  };

  const handleChat = async () => {
    try {
      setLoadingSendLike(true);
      await likesApi.send({
        targetUserId: user._id,
      });
      setShowSendLike(false);
    } catch (err) {
    } finally {
      setLoadingSendLike(false);
    }
  };

  return (
    <>
      <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
        <HStack justifyContent="center" space={4}>
          <Box>
            <LoadingButtonIcon
              height={40}
              width={40}
              onPress={handleChat}
              isLoading={isLoadingSendMessage}
            >
              <Ionicons
                color="white"
                size={20}
                name="chatbubble-ellipses-outline"
              />
            </LoadingButtonIcon>
          </Box>
          {isShowSendLike && (
            <Box>
              <LoadingButtonIcon
                onPress={handleSendLike}
                isLoading={isLoadingSendLike}
              >
                <FontAwesome color="white" size={20} name="heart" />
              </LoadingButtonIcon>
            </Box>
          )}
        </HStack>
      </Box>
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
        <Carousel
          loop={false}
          width={width}
          height={(width / 640) * 860}
          data={user?.mediaFiles || []}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({ item }) => (
            <View justifyContent="center">
              <Image
                height="100%"
                width="100%"
                source={{
                  uri: item.location,
                }}
                alt="profile"
              ></Image>
            </View>
          )}
        />
      </Box>
      <Box flex={1} mt={4}>
        <Box px={4}>
          <HStack space={3}>
            <Box>
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

        <Box mt={2} px={4}>
          <Box>
            {/* <HStack alignItems="center" space={2}>
              <Box>
                <Icon as={FontAwesome} name="home" size={6} />
              </Box>
              <Box>
                <Text fontSize={20}>{user?.nickname}</Text>
              </Box>
            </HStack> */}
            {_.isNumber(user?.distance) && (
              <HStack alignItems="center" space={2}>
                <Box>
                  {/* <Icon as={MaterialIcons} name="location-on" /> */}
                </Box>
                <Box>
                  <Text fontSize={20}>
                    {Math.round((user?.distance || 0) / 1000)} km away
                  </Text>
                </Box>
              </HStack>
            )}
          </Box>
        </Box>

        {!!user?.relationshipGoal && (
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
        )}

        <Box></Box>
      </Box>

      <Box safeAreaBottom />
    </>
  );
};
