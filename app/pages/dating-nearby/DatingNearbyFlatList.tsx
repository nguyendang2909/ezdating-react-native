import { Box, ButtonSpinner, FlatList } from '@gluestack-ui/themed';
import { useNearbyProfiles } from 'app/hooks/useNearbyUsers';
import { Profile } from 'app/types';
import { scrollUtil } from 'app/utils/scroll.util';
import { Spinner } from 'native-base';
import React from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';

import { NearbyProfileItem } from './NearbyProfileItem';

export const DatingNearbyFlatList: React.FC = () => {
  const {
    data: nearbyUsers,
    fetchNext,
    isLoadingNewest,
    isLoadingNext,
    fetchNewest,
    lastRefreshedAt,
    isLoading,
  } = useNearbyProfiles();

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }
    fetchNext();
  };

  return (
    <>
      {!isLoading ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoadingNewest} onRefresh={fetchNewest}></RefreshControl>
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
            renderItem={({ item }: { item: Profile }) => <NearbyProfileItem profile={item} />}
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