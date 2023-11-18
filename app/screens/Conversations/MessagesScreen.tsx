import { useNavigation } from '@react-navigation/native';
import { ViewSafeArea } from 'app/components';
import { useAppSelector } from 'app/hooks';
import { useMatch } from 'app/hooks/useMatch';
import { AppStackScreenProps } from 'app/navigators';
import { MessagesChat } from 'app/pages/Messages/MessagesChat';
import { MessagesHeader } from 'app/pages/Messages/MessagesHeader';
import { ChatUser } from 'app/types';
import { mediaFileUtil } from 'app/utils/media-files.util';
import { StatusBar } from 'native-base';
import React, { FC, useMemo } from 'react';

type FCProps = AppStackScreenProps<'Messages'>;

export const MessagesScreen: FC<FCProps> = props => {
  const { match: initialMatch, matchId } = props.route.params;
  const { data: fetchedMatch } = useMatch(matchId);
  const match = fetchedMatch || initialMatch;
  const currentUser: ChatUser = useAppSelector(state => {
    const profile = state.app.profile;
    return {
      _id: profile?._id || '',
      name: profile?.nickname,
      avatar: profile?.mediaFiles?.length
        ? mediaFileUtil.getUrl(profile.mediaFiles[0].key)
        : undefined,
    };
  });
  const targetUser = useMemo(
    () => ({
      _id: match.targetProfile?._id || '',
      avatar: match.targetProfile?.mediaFiles?.length
        ? mediaFileUtil.getUrl(match.targetProfile.mediaFiles[0].key)
        : undefined,
      name: match?.targetProfile?.nickname,
    }),
    [match.targetProfile?._id, match?.targetProfile?.mediaFiles, match.targetProfile?.nickname],
  );
  const { goBack } = useNavigation();
  if (!matchId) {
    goBack();
    return <></>;
  }

  return (
    <>
      <StatusBar barStyle="default" />
      <ViewSafeArea top />
      <MessagesHeader match={match} />
      <MessagesChat matchId={matchId} currentUser={currentUser} targetUser={targetUser} />
      <ViewSafeArea bottom />
    </>
  );
};
