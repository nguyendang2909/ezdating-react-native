import { Box, Text, View } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import React from 'react';

type FCProps = {
  introduce: string;
};

export const NearbyUserIntroduce: React.FC<FCProps> = ({ introduce }) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View mb={8}>
        <Text bold>{formatMessage('Introduce')}</Text>
      </View>
      <Box backgroundColor="$backgroundLight0" px={16} py={16} rounded={16}>
        <Text>{introduce}</Text>
      </Box>
    </>
  );
};
