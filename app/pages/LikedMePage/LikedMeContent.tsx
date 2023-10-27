import { Box, FlatList, Pressable, Spinner, Text } from '@gluestack-ui/themed';
import { useLikedMe } from 'app/hooks/useLikedMe';
import { mediaFileUtil } from 'app/utils/media-files.util';
import { scrollUtil } from 'app/utils/scroll.util';
import React from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import { LinearGradient } from '../../components';

export const LikedMeContent: React.FC = () => {
  const { data: likes, isLoadingNewest, isLoadingNext, fetchNewest, fetchNext } = useLikedMe();

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }

    fetchNext();
  };

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoadingNewest} onRefresh={fetchNewest}></RefreshControl>
        }
        numColumns={2}
        data={likes}
        onScroll={handleScroll}
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
                    style={style.image}
                    alt="avatar"
                    source={{
                      uri: item.user?.mediaFiles?.length
                        ? mediaFileUtil.getUrl(item.user.mediaFiles[0].key)
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

const style = StyleSheet.create({
  image: {
    aspectRatio: 640 / 860,
    borderRadius: 8,
    width: '100%',
  },
});
