import { HStack, View } from '@gluestack-ui/themed';
import { CloseIconButton } from 'app/components/Button';
import { SendSwipeLikeButton } from 'app/containers/Button/send-swipe-like-button.tsx';
import { SendMessageButton } from 'app/pages/dating-nearby-profile';
import { Profile } from 'app/types';
import { FC, useState } from 'react';
import { Modal } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { ProfileInfoButton } from '../../../containers/Button/profile-info-button';
import { DatingSwipeProfileDetail } from '../profile-detail/dating-swipe-profile-detail';

type FCProps = {
  currentSwipeRef: Swiper<Profile> | null;
  profile?: Profile;
};

export const DatingSwipeMenuActions: FC<FCProps> = ({ currentSwipeRef, profile }) => {
  const [showProfileDetail, setShowProfileDetail] = useState<boolean>(false);

  const handleOpenProfile = () => {
    if (profile?._id) {
      setShowProfileDetail(true);
    }
  };

  const handleCloseProfileDetail = () => {
    setShowProfileDetail(false);
  };

  const handleDislike = () => {
    handleCloseProfileDetail();
    currentSwipeRef?.swipeLeft();
  };

  const handleSendLike = () => {
    handleCloseProfileDetail();
    currentSwipeRef?.swipeRight();
  };

  return (
    <>
      <HStack columnGap={32} justifyContent="center">
        <View>
          <CloseIconButton onPress={handleDislike} />
        </View>
        <View>
          <ProfileInfoButton onPress={handleOpenProfile} />
        </View>
        <View>
          <SendMessageButton targetUserId={profile?._id} onClose={handleDislike} />
        </View>
        <View>
          <SendSwipeLikeButton onPress={handleSendLike} />
        </View>
      </HStack>

      <Modal animationType="slide" visible={showProfileDetail}>
        <View flex={1}>
          <DatingSwipeProfileDetail
            profile={profile!}
            onClose={handleCloseProfileDetail}
            onDislike={handleDislike}
            onSendLike={handleSendLike}
          />
        </View>
      </Modal>
    </>
  );
};
