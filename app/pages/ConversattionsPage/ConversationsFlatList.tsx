import { ConversationBox } from 'app/containers/Conversation/ConversationBox';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ConversationsBox: React.FC = () => {
  const conversations = useAppSelector(state => state.conversation.data);

  return (
    <>
      {conversations?.map(item => {
        return <ConversationBox key={item._id} data={item} />;
      })}
    </>
  );
};
