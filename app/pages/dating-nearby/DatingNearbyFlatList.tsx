import { Box, ButtonSpinner, FlatList, ScrollView, View } from '@gluestack-ui/themed';
import { ViewSafeArea } from 'app/components';
import { UserProfile } from 'app/containers/UserProfile';
import { useNearbyProfiles } from 'app/hooks/useNearbyUsers';
import { Profile } from 'app/types';
import { scrollUtil } from 'app/utils/scroll.util';
import { Spinner } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Modal, NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';

import { NearbyUserActions } from '../dating-nearby-profile/NearbyUserActions';
import { NearbyProfileItem } from './NearbyProfileItem';

export const DatingNearbyFlatList: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleCloseProfileDetail = useCallback(() => {
    setProfile(null);
  }, []);

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
            renderItem={({ item }: { item: Profile }) => (
              <NearbyProfileItem profile={item} onOpen={setProfile} />
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
      <Modal visible={!!profile} animationType="slide">
        <View flex={1}>
          <View position="absolute" bottom={0} left={0} right={0} zIndex={999}>
            <NearbyUserActions targetUserId={profile?._id} onClose={handleCloseProfileDetail} />
            <ViewSafeArea bottom />
          </View>
          <ScrollView flex={1} backgroundColor="$backgroundLight100">
            <UserProfile profile={profile!} onClose={handleCloseProfileDetail} />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
