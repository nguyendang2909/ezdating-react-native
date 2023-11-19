import { ScrollView, View } from '@gluestack-ui/themed';
import { ViewSafeArea } from 'app/components';
import { ProfileMenuActions } from 'app/containers/Menu/ProfileMenuActions';
import { UserProfile } from 'app/containers/UserProfile';
import { Profile } from 'app/types';
import { FC } from 'react';

type FCProps = {
  profile: Profile;
  onClose: () => void;
  onDislike: () => void;
  onSendLike: () => void;
};

export const DatingSwipeProfileDetail: FC<FCProps> = ({
  profile,
  onClose,
  onDislike,
  onSendLike,
}) => {
  return (
    <>
      <View position="absolute" bottom={10} left={0} right={0} zIndex={999}>
        <ProfileMenuActions
          onDislike={onDislike}
          onSendLike={onSendLike}
          targetUserId={profile._id}
        />
        <ViewSafeArea bottom />
      </View>
      <ScrollView flex={1} backgroundColor="$backgroundLight100">
        <UserProfile profile={profile} onClose={onClose} />
      </ScrollView>
    </>
  );
};
