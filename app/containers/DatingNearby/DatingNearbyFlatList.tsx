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
import React, { useCallback, useEffect } from 'react';
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

  const isRefreshingTop = useAppSelector(
    s => s.nearbyUser.isRefreshingTop || false,
  );
  const isRefreshingBottom = useAppSelector(
    s => s.nearbyUser.isRefreshingBottom || false,
  );
  const isReachedEnd = useAppSelector(s => s.nearbyUser.isReachedEnd);

  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const fetchFirstTime = useCallback(async () => {
    dispatch(nearbyUserActions.setRefreshingTop(true));

    try {
      const nearbyUsersData = await nearbyUsersApi.getMany();

      if (nearbyUsersData.pagination?._next === null) {
        dispatch(nearbyUserActions.setReachedEnd(true));
      } else {
        dispatch(nearbyUserActions.setReachedEnd(false));
      }

      dispatch(nearbyUserActions.addManyFirst(nearbyUsersData.data || []));
    } catch (err) {}

    dispatch(nearbyUserActions.setRefreshingTop(false));
  }, [dispatch]);

  useEffect(() => {
    fetchFirstTime();
  }, [fetchFirstTime]);

  const handleRefreshTop = async () => {
    if (isRefreshingTop) {
      return;
    }

    dispatch(nearbyUserActions.setRefreshingTop(true));

    try {
      const nearbyUsersData = await nearbyUsersApi.getMany();

      if (nearbyUsersData.pagination?._next === null) {
        dispatch(nearbyUserActions.setReachedEnd(true));
      } else {
        dispatch(nearbyUserActions.setReachedEnd(false));
      }

      if (nearbyUsersData.data) {
        dispatch(nearbyUserActions.addManyFirst(nearbyUsersData.data));
      }
    } catch (err) {}

    dispatch(nearbyUserActions.setRefreshingTop(false));
  };

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!flatListUtil.isCloseToBottom(e)) {
      return;
    }

    if (isReachedEnd) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    dispatch(nearbyUserActions.setRefreshingBottom(true));

    try {
      const nearbyUsersData = await nearbyUsersApi.getMany({
        data: users,
      });

      if (nearbyUsersData.pagination?._next === null) {
        dispatch(nearbyUserActions.setReachedEnd(true));
      }

      if (nearbyUsersData.data?.length) {
        dispatch(nearbyUserActions.addManyNext(nearbyUsersData.data));
      } else {
        dispatch(nearbyUserActions.setReachedEnd(false));
      }
    } catch (err) {}

    dispatch(nearbyUserActions.setRefreshingBottom(false));
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  colors={['#00000000', '#00000000', '#00000000', '#000000']}
                  justifyContent="flex-end"
                >
                  <Box px={4} py={4}>
                    <Text fontWeight="bold" color="$white" numberOfLines={1}>
                      {item.nickname}
                      {', '}
                      {!_.isUndefined(item.distance) &&
                        `${_.round(item.distance, 1)} km`}
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
