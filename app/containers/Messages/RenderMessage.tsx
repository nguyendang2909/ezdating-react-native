import { Box, Spinner, Text } from '@gluestack-ui/themed';
import React from 'react';
import { IMessage, Message } from 'react-native-gifted-chat';

export const RenderMessage: React.FC = ({
  currentMessage,
  previousMessage,
  nextMessage,
  user,
}: Message<IMessage>['props']) => {
  const previousUserId = previousMessage?.user?._id;
  const nextUserId = nextMessage?.user?._id;
  const currentUserId = currentMessage?.user._id;
  const userId = user?._id;

  const isCurrentMe = userId === currentUserId;
  const isPrevMe = userId === previousUserId;
  const isNextMe = userId === nextUserId;

  const bigBorder = 16;
  const smallBorder = 4;

  return (
    <Box flexDirection="column" justifyContent="flex-end">
      <Box
        p={8}
        bgColor={isCurrentMe ? '$blue500' : '$blueGray100'}
        ml={isCurrentMe ? 64 : undefined}
        mr={!isCurrentMe ? 64 : undefined}
        sx={{
          borderTopLeftRadius: isCurrentMe || isPrevMe ? bigBorder : smallBorder,
          borderBottomLeftRadius: isCurrentMe || isNextMe ? bigBorder : smallBorder,
          borderTopRightRadius: isCurrentMe && isPrevMe ? smallBorder : bigBorder,
          borderBottomRightRadius: isCurrentMe && isNextMe ? smallBorder : bigBorder,
        }}
      >
        <Text color={isCurrentMe ? '$white' : '$darkBlue900'}>{currentMessage?.text}</Text>
      </Box>
      {isPrevMe && currentMessage?.sent === false && nextMessage?.sent !== false && (
        <Box alignItems="flex-end">
          <Spinner />
        </Box>
      )}
    </Box>
  );
};
