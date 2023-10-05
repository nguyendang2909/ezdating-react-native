import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
} from '@gluestack-ui/themed';
import { ChatUser } from 'app/types';
import React from 'react';
import { AvatarProps, IMessage } from 'react-native-gifted-chat';

type FCProps = {
  avatarProps: AvatarProps<IMessage>;
  currentUser: ChatUser;
  targetUser: ChatUser;
};

export const RenderAvatar: React.FC<FCProps> = ({
  avatarProps,
  currentUser,
  targetUser,
}) => {
  const { currentMessage } = avatarProps;
  const userId = currentMessage?.user._id;
  const isCurrentUser = userId === currentUser._id;

  const avatar = isCurrentUser ? currentUser.avatar : targetUser.avatar;
  const name = isCurrentUser ? currentUser.name : targetUser.name;

  return (
    <>
      <Box>
        <Avatar width={36} height={36}>
          <AvatarFallbackText>{name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: avatar,
            }}
          ></AvatarImage>
        </Avatar>
      </Box>
    </>
  );
};
