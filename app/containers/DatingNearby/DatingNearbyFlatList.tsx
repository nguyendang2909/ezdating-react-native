import {
  Box,
  ButtonSpinner,
  FlatList,
  Image,
  LinearGradient,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useGetNearbyUsers } from 'app/hooks/useGetNearbyUsers';
import { Entity } from 'app/types/entity.type';
import { scrollUtil } from 'app/utils/scroll.util';
import _ from 'lodash';
import { Spinner } from 'native-base';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';

export const DatingNearbyFlatList: React.FC = () => {
  const navigator = useNavigation();

  const {
    data: nearbyUsers,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    fetchNewest,
    lastRefreshedAt,
  } = useGetNearbyUsers();

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }
    fetchNext();
  };

  return (
    <>
      {nearbyUsers.length && lastRefreshedAt ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isLoadingNewest}
                onRefresh={fetchNewest}
              ></RefreshControl>
            }
            onScroll={handleScroll}
            numColumns={2}
            data={nearbyUsers}
            ListFooterComponent={
              isLoadingNext ? (
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
                      colors={[
                        '#00000000',
                        '#00000000',
                        '#00000000',
                        '#000000',
                      ]}
                      justifyContent="flex-end"
                    >
                      <Box px={4} py={4}>
                        <Text
                          fontWeight="bold"
                          color="$white"
                          numberOfLines={1}
                        >
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
      ) : (
        <Box
          sx={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonSpinner />
        </Box>
      )}
    </>
  );
};
