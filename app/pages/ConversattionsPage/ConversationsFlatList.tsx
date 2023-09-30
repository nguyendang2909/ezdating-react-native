import { ConversationBox } from 'app/containers/Conversation/ConversationBox';
import { useAppSelector } from 'app/hooks';
import React from 'react';
import { User } from 'react-native-gifted-chat';

export const ConversationsBox: React.FC = () => {
  const conversations = useAppSelector(state => state.conversation.data);

  const user: User = useAppSelector(state => {
    const profile = state.app.profile;
    return {
      _id: profile?._id || '',
      name: profile?.nickname,
      avatar: profile?.mediaFiles?.length
        ? profile.mediaFiles[0].location
        : undefined,
    };
  });

  return (
    <>
      {conversations?.map(item => {
        return <ConversationBox key={item._id} data={item} user={user} />;
      })}
    </>
  );
};
