import { ScrollView } from '@gluestack-ui/themed';
import { UserProfile } from 'app/containers/UserProfile';
import { AppStackScreenProps } from 'app/navigators';
import React from 'react';

type ChatProfileProps = AppStackScreenProps<'ChatProfile'>;

export const ChatProfileScreen: React.FC<ChatProfileProps> = props => {
  const profile = props.route.params.profile;

  return (
    <>
      <ScrollView flex={1} backgroundColor="$backgroundLight100">
        <UserProfile profile={profile} />
      </ScrollView>
    </>
  );
};
