import { Box, ButtonSpinner, FlatList } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { useGetNearbyUsers } from 'app/hooks/useGetNearbyUsers';
import { Entity } from 'app/types/entity.type';
import { scrollUtil } from 'app/utils/scroll.util';
import { Spinner } from 'native-base';
import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';

import { NearbyUserItem } from './NearbyUserItem';

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
            renderItem={({ item }: { item: Entity.User }) => (
              <NearbyUserItem user={item} />
            )}
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
