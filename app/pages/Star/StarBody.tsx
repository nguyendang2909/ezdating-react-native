import { FlatList, Spinner, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { LoadingOverlay } from 'app/components';
import { MEMBERSHIPS } from 'app/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import { useLikedMe } from 'app/hooks/useLikedMe';
import { Like } from 'app/types';
import { scrollUtil } from 'app/utils/scroll.util';
import React, { useCallback } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl } from 'react-native';

import { StarFlatListItem } from './StarFlastListItem';

export const StarBody: React.FC = () => {
  const { formatMessage } = useMessages();
  const navigation = useNavigation();
  const {
    data: likes,
    isLoadingNewest,
    isLoadingNext,
    fetchNewest,
    fetchNext,
    isLoading,
  } = useLikedMe();
  const membership = useAppSelector(state => state.app.profile.membership) || MEMBERSHIPS.FREE;

  const handleScroll = async (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!scrollUtil.isCloseToBottom(e)) {
      return;
    }

    fetchNext();
  };

  const handlePressCard = useCallback(
    (like: Like) => {
      navigation.navigate('LikedMeProfile', {
        like,
      });
    },
    [navigation],
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
        ListHeaderComponent={() => (
          <>
            {membership === MEMBERSHIPS.FREE ? (
              <View px={48} py={16}>
                <Text textAlign="center">
                  {formatMessage('Update to Gold to see people who already liked you.')}
                </Text>
              </View>
            ) : (
              <View mt={16}></View>
            )}
          </>
        )}
        ListFooterComponent={
          isLoadingNext ? (
            <View mt={16}>
              <Spinner />
            </View>
          ) : (
            <></>
          )
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        keyExtractor={(item, index) => item._id || index}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem={({ item }: { item: Like }) => (
          <StarFlatListItem onPress={handlePressCard} data={item} />
        )}
      ></FlatList>
    </>
  );
};
