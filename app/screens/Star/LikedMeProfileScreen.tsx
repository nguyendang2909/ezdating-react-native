import { Box, HStack, ScrollView } from '@gluestack-ui/themed';
import { useGetOneLikedMeQuery } from 'app/api';
import { ViewSafeArea } from 'app/components';
import { UserProfile } from 'app/containers/UserProfile';
import { useAppSelector } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import { NearbyUserSendLikeButton } from 'app/pages';
import React from 'react';

type FCProps = AppStackScreenProps<'LikedMeProfile'>;

export const LikedMeProfileScreen: React.FC<FCProps> = props => {
  const { like: shortLike } = props.route.params;

  useGetOneLikedMeQuery(shortLike._id, {
    skip: !shortLike._id,
  });

  const like = useAppSelector(s => s.likedMe.data.find(e => e._id === shortLike._id)) || shortLike;

  return (
    <>
      <Box flex={1}>
        <Box position="absolute" bottom={10} left={0} right={0} zIndex={999}>
          <HStack justifyContent="center" rowGap={16} columnGap={16}>
            <NearbyUserSendLikeButton targetUserId={like.profile?._id || ''} />
          </HStack>
          <ViewSafeArea bottom />
        </Box>
        <ScrollView flex={1} backgroundColor="$backgroundLight100">
          {!!like.profile && <UserProfile profile={like.profile} />}
        </ScrollView>
      </Box>
    </>
  );
};
