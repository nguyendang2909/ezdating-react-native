import {
  Box,
  FlatList,
  Image,
  LinearGradient,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { nearbyUserActions } from 'app/store/nearby-user.store';
import { Entity } from 'app/types/entity.type';
import { flatListUtil } from 'app/utils/flat-list.util';
import _ from 'lodash';
import { Spinner } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';

export const DatingNearbyFlatList: React.FC = () => {
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const users = useAppSelector(state => state.nearbyUser.data) || [];

  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);
  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);
  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);
  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const fetchFirstTime = useCallback(async () => {
    setRefreshingTop(true);

    try {
      const nearbyUsersData = await nearbyUsersApi.getMany();

      if (nearbyUsersData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (nearbyUsersData.data) {
        dispatch(nearbyUserActions.addManyFirst(nearbyUsersData.data));
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
      const nearbyUsersData = await nearbyUsersApi.getMany();

      if (nearbyUsersData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (nearbyUsersData.data) {
        dispatch(nearbyUserActions.addManyFirst(nearbyUsersData.data));
      }
    } catch (err) {}

    setRefreshingTop(false);
  };

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(11);
    if (!flatListUtil.isCloseToBottom(e)) {
      return;
    }

    if (isReachedEnd) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    setRefreshingBottom(true);

    try {
      const nearbyUsersData = await nearbyUsersApi.getMany({
        data: users,
      });

      if (nearbyUsersData.pagination?._next === null) {
        setReachedEnd(true);
      }

      if (nearbyUsersData.data?.length) {
        dispatch(nearbyUserActions.addManyNext(nearbyUsersData.data));
      } else {
        setReachedEnd(true);
      }
    } catch (err) {}

    setRefreshingBottom(false);
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingTop}
            onRefresh={handleRefreshTop}
          ></RefreshControl>
        }
        onScroll={handleScroll}
        numColumns={2}
        data={users}
        ListFooterComponent={
          isRefreshingBottom ? (
            <Box mt={16}>
              <Spinner />
            </Box>
          ) : (
            <></>
          )
        }
        // @ts-ignore
        renderItem={({ item }: { item: Entity.User }) => {
          const handlePressCard = () => {
            if (item._id) {
              navigator.navigate('ProfileNearby', {
                user: item,
              });
            }
          };
          return (
            <Box key={item._id} px={4} py={4} w="$1/2">
              <Pressable onPress={handlePressCard}>
                <LinearGradient
                  zIndex={100}
                  height="$full"
                  width="$full"
                  position="absolute"
                  borderRadius={8}
                  // @ts-ignore
                  colors={['#00000000', '#00000000', '#00000000', '#000000']}
                  justifyContent="flex-end"
                >
                  <Box px={4} py={4}>
                    <Text fontWeight="bold" color="$white" numberOfLines={1}>
                      {item.nickname}{' '}
                      {item.distance && `${_.round(item.distance, 1)} km`}
                    </Text>
                  </Box>
                </LinearGradient>

                <Box>
                  <Image
                    w="$full"
                    aspectRatio={640 / 860}
                    borderRadius={8}
                    alt="avatar"
                    source={{
                      uri: item.mediaFiles?.length
                        ? item.mediaFiles[0].location
                        : '',
                    }}
                  ></Image>
                </Box>
              </Pressable>
            </Box>
          );
        }}
      ></FlatList>
    </>
  );
};
