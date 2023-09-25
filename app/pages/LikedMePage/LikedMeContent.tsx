import {
  Box,
  FlatList,
  Image,
  LinearGradient,
  Pressable,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import { useAppSelector } from 'app/hooks';
import { likedMeApi } from 'app/services/api/likedMe.api';
import { likedMeActions } from 'app/store/liked-me.store';
import { Entity } from 'app/types/entity.type';
import { flatListUtil } from 'app/utils/flat-list.util';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';

export const LikedMeContent: React.FC = () => {
  const dispatch = useDispatch();

  const likes = useAppSelector(state => state.likedMe.data);

  const [isReachedEnd, setReachedEnd] = useState<boolean>(false);

  const [isRefreshingTop, setRefreshingTop] = useState<boolean>(false);

  const [isRefreshingBottom, setRefreshingBottom] = useState<boolean>(false);

  const isRefreshing = isRefreshingTop || isRefreshingBottom;

  const fetchLikedMeFirst = useCallback(async () => {
    setRefreshingTop(true);

    try {
      const fetchData = await likedMeApi.getMany();

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data?.length) {
        dispatch(likedMeActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}

    setRefreshingTop(false);
  }, [dispatch]);

  useEffect(() => {
    fetchLikedMeFirst();
  }, [fetchLikedMeFirst]);

  const handleRefreshTop = async () => {
    if (isRefreshing) {
      return;
    }

    setRefreshingTop(true);

    try {
      const fetchData = await likedMeApi.getMany();

      if (fetchData.pagination?._next === null) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }

      if (fetchData.data?.length) {
        dispatch(likedMeActions.addManyFirst(fetchData.data));
      }
    } catch (err) {}

    setRefreshingTop(false);
  };

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!flatListUtil.isCloseToBottom(e)) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    if (isReachedEnd) {
      return;
    }

    setRefreshingBottom(true);

    try {
      const fetchData = await likedMeApi.getMany({ data: likes });

      if (fetchData.data?.length) {
        dispatch(likedMeActions.addManyNext(fetchData.data));
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
        numColumns={2}
        data={likes}
        onScroll={handleScroll}
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
      {/* <ScrollView showsHorizontalScrollIndicator={false}>
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
      </ScrollView> */}
    </>
  );
};
