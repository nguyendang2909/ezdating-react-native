import {
  Box,
  FlatList,
  Image,
  LinearGradient,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { likedMeApi } from 'app/services/api/likedMe.api';
import { likesApi } from 'app/services/api/likes.api';
import { likedMeActions } from 'app/store/liked-me.store';
import { likeActions } from 'app/store/likes.store';
import { Entity } from 'app/types/entity.type';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';

export const LikedMeContent: React.FC = () => {
  const dispatch = useDispatch();

  const likes = useAppSelector(state => state.like.data);

  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);

  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);

  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);

  const fetchLikedMeFirst = useCallback(async () => {
    try {
      const likedMeData = await likedMeApi.getMany();

      if (likedMeData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (likedMeData.data?.length) {
        dispatch(likedMeActions.addManyFirst(likedMeData.data));
      }
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchLikedMeFirst();
  }, [fetchLikedMeFirst]);

  const handleRefreshTop = async () => {
    if (isRefreshingTop) {
      return;
    }

    setRefreshingTop(true);

    try {
      const nearbyUsersData = await likedMeApi.getMany();

      console.log(111, nearbyUsersData);

      if (nearbyUsersData.data) {
        dispatch(likeActions.addLikes(nearbyUsersData.data));
      } else {
        setReachedEnd(true);
      }
    } catch (err) {}

    setRefreshingTop(false);
  };

  const handleRefreshBottom = async () => {
    if (isRefreshingBottom) {
      return;
    }

    if (isReachedEnd) {
      return;
    }

    setRefreshingBottom(true);

    try {
      const _next = _.last(likes)?._id;

      const likesData = await likesApi.getManyLikedMe({
        ...(_next ? { _next } : {}),
      });

      if (likesData.data?.length) {
        dispatch(likeActions.addLikes(likesData.data));
      } else {
        setReachedEnd(true);
      }
    } catch (err) {}

    setRefreshingBottom(false);
  };

  return (
    <>
      <ActivityIndicator />
      <Spinner />
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshingTop}
            onRefresh={handleRefreshTop}
          ></RefreshControl>
        }
        onEndReached={handleRefreshBottom}
        numColumns={2}
        data={likes}
        ListFooterComponent={isRefreshingBottom ? <Spinner /> : <></>}
        onScroll={event => {
          console.log(event);
        }}
        // @ts-ignore
        renderItem={({ item }: { item: Entity.Like }) => {
          const handlePressCard = () => {};

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
                      {item.user?.nickname} {item.user?.age}
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
                      uri: item.user?.mediaFiles?.length
                        ? item.user.mediaFiles[0].location
                        : '',
                    }}
                  ></Image>
                </Box>
              </Pressable>
            </Box>
          );
        }}
      ></FlatList>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Box px={12} py={12}>
          <Box
            sx={{
              width: '100%',
              flexDirection: 'row',
            }}
          >
            {likes?.map((item, index) => {
              const imageUrl = item.user?.mediaFiles?.length
                ? item.user.mediaFiles[0].location
                : '';

              return (
                <Pressable w="$1/2" key={item._id || index}>
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
                        {item.user?.nickname}
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
                        uri: imageUrl,
                      }}
                    ></Image>
                  </Box>
                </Pressable>
              );
            })}
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};
