import { Box, Text } from '@gluestack-ui/themed';
import { translate } from 'app/locales/locale';
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
    <Box flexDirection="column">
      <Box
        p={8}
        bgColor={isCurrentMe ? '$blue500' : '$blueGray100'}
        sx={{
          borderTopLeftRadius:
            isCurrentMe || isPrevMe ? bigBorder : smallBorder,
          borderBottomLeftRadius:
            isCurrentMe || isNextMe ? bigBorder : smallBorder,
          borderTopRightRadius:
            isCurrentMe && isPrevMe ? smallBorder : bigBorder,
          borderBottomRightRadius:
            isCurrentMe && isNextMe ? smallBorder : bigBorder,
        }}
      >
        <Text color={isCurrentMe ? '$white' : '$darkBlue900'}>
          {currentMessage?.text}
        </Text>
      </Box>
      {isPrevMe &&
        currentMessage?.sent === false &&
        nextMessage?.sent !== false && (
          <Box>
            <Text fontSize={12} textAlign="right">
              {translate('Sending')}
            </Text>
          </Box>
        )}
    </Box>
  );
};
