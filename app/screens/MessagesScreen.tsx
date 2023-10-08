import { useNavigation } from '@react-navigation/native';
import { MessagesChat } from 'app/containers/Messages/MessagesChat';
import { MessageByConversationHeader } from 'app/containers/Messages/MessagesHeader';
import { useAppSelector } from 'app/hooks';
import { useGetMatch } from 'app/hooks/useGetMatch';
import { AppStackScreenProps } from 'app/navigators';
import { ChatUser } from 'app/types';
import { StatusBar } from 'native-base';
import React, { FC, useMemo } from 'react';
import { SafeAreaView } from 'react-native';

type FCProps = AppStackScreenProps<'Messages'>;

export const MessagesScreen: FC<FCProps> = props => {
  const { matchId } = props.route.params;
  const { data: match } = useGetMatch(matchId);
  const currentUser: ChatUser = useAppSelector(state => {
    const profile = state.app.profile;
    return {
      _id: profile?._id || '',
      name: profile?.nickname,
      avatar: profile?.mediaFiles?.length
        ? profile.mediaFiles[0].location
        : undefined,
    };
  });
  const targetUser = useMemo(
    () => ({
      _id: match.targetUser?._id || '',
      avatar: match.targetUser?.mediaFiles?.length
        ? match.targetUser.mediaFiles[0].location
        : undefined,
      name: match.targetUser?.nickname,
    }),
    [
      match.targetUser?._id,
      match.targetUser.mediaFiles,
      match.targetUser?.nickname,
    ],
  );
  const { goBack } = useNavigation();
  if (!matchId) {
    goBack();
    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <MessageByConversationHeader match={match} />
      <MessagesChat
        matchId={matchId}
        currentUser={currentUser}
        targetUser={targetUser}
        // targetUser={{
        //   _id: conversation.targetUser?._id || '',
        //   avatar: conversation.targetUser?.mediaFiles?.length
        //     ? conversation.targetUser.mediaFiles[0].location
        //     : undefined,
        //   name: conversation.targetUser?.nickname,
        // }}
      />
      <SafeAreaView />
    </>
  );
};
