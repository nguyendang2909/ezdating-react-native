import { Box, Text, View } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import { Entity } from 'app/types';
import React from 'react';

type FCProps = {
  user: Entity.User;
};

export const NearbyUserIntroduce: React.FC<FCProps> = ({ user }) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View mb={8}>
        <Text bold>{formatMessage('Introduce')}</Text>
      </View>
      <Box backgroundColor="$backgroundLight0" px={16} py={16} rounded={16}>
        <Text>{user.introduce}</Text>
      </Box>
    </>
  );
};
