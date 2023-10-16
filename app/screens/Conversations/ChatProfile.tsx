import { ScrollView } from '@gluestack-ui/themed';
import { UserProfile } from 'app/containers/UserProfile';
import { AppStackScreenProps } from 'app/navigators';
import React from 'react';

type ChatProfileProps = AppStackScreenProps<'ChatProfile'>;

export const ChatProfileScreen: React.FC<ChatProfileProps> = props => {
  const user = props.route.params.user;

  return (
    <>
      <ScrollView flex={1} backgroundColor="$backgroundLight100">
        <UserProfile user={user} />
      </ScrollView>
    </>
  );
};
