import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { matchesApi } from 'app/services/api/matches.api';
import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { matchActions } from 'app/store/matches.store';
import { Entity } from 'app/types/entity.type';
import { Box, HStack, Image, Pressable, ScrollView, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

export const MatchCards: React.FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);
  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);
  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);
  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const matches = useAppSelector(state => state.match.data);

  const fetchFirstTime = useCallback(async () => {
    setRefreshingTop(true);

    try {
      const fetchData = await matchesApi.getMany();

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data) {
        dispatch(matchActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}

    setRefreshingTop(false);
  }, [dispatch]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

  const handleRefreshTop = async () => {
    if (isRefreshing) {
      return;
    }

    setRefreshingTop(true);

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

    setRefreshingTop(false);
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
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack space={2}>
        {matches?.map((item, index) => {
          const imageUrl = item.targetUser?.mediaFiles?.length
            ? item.targetUser.mediaFiles[0].location
            : '';

          console.log(item);

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
    </ScrollView>
  );
};
