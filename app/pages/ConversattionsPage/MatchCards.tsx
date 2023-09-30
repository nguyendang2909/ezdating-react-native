import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { matchActions } from 'app/store/matches.store';
import { Entity } from 'app/types/entity.type';
import { HStack, Image, Pressable } from 'native-base';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

type FCProps = {
  data: Entity.Match[];
};

export const MatchCards: React.FC<FCProps> = ({ data: matches }) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);
  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);
  const isRefreshing = isRefreshingBottom;

  const handleRefreshTop = async () => {
    if (isRefreshing) {
      return;
    }

    try {
      const fetchData = await nearbyUsersApi.getMany();

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data) {
        dispatch(matchActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}
  };

  const width = Dimensions.get('window').width;

  const cardWidth = width / 4;

  const imageCardHeight = (cardWidth / 640) * 860;

  const handlePressCard = (conversation: Entity.Match) => {
    navigation.navigate('Messages', {
      conversation,
    });
  };

  return (
    <>
      <Box px={16}>
        <Text bold>New matches</Text>
      </Box>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box mx={16}>
          <HStack space={2}>
            {matches?.map((item, index) => {
              const imageUrl = item.targetUser?.mediaFiles?.length
                ? item.targetUser.mediaFiles[0].location
                : '';

              return (
                <Pressable
                  key={item._id || index}
                  p={1}
                  width={cardWidth}
                  onPress={() => {
                    handlePressCard(item);
                  }}
                >
                  <Box>
                    <Image
                      borderRadius={8}
                      height={imageCardHeight}
                      width={cardWidth}
                      alt="avatar"
                      source={{
                        uri: imageUrl,
                      }}
                    ></Image>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" numberOfLines={1}>
                      {item.targetUser?.nickname}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </HStack>
        </Box>
      </ScrollView>
    </>
  );
};
