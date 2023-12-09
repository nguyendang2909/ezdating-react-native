import { Box, Text } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import React from 'react';

import { LinearGradient } from '../../components';

export const NoLikedMeBox: React.FC = () => {
  const { formatMessage } = useMessages();
  return (
    <>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box px={16}>
          <Box alignItems="center">
            <LinearGradient
              colors={['#fd267a', '#ff6036']}
              height={129}
              width={96}
              borderRadius={16}
            />
          </Box>
          <Box mt={16}>
            <Text textAlign="center" bold={true} size="2xl">
              {formatMessage('Start like')}
            </Text>
          </Box>
          <Box mt={8}>
            <Text textAlign="center">
              {formatMessage('Likes will appear here once people start to like you.')}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
