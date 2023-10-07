import { Box, HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import _ from 'lodash';
import React from 'react';

type FCProps = {
  nickname?: string;
  age?: number;
  distance?: number;
};

export const NearbyUserMainInfo: React.FC<FCProps> = ({
  nickname,
  age,
  distance,
}) => {
  const { formatMessage } = useMessages();

  return (
    <Box backgroundColor="$backgroundLight0" px={16} py={16} rounded={16}>
      <Box>
        <HStack>
          <Box flex={1}>
            <Text
              fontSize={28}
              fontWeight="bold"
              lineHeight={28}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {nickname}
              {','}
            </Text>
          </Box>
          <Box ml={8}>
            <Text fontSize={28} lineHeight={28}>
              {age}
            </Text>
          </Box>
        </HStack>
      </Box>

      <Box mt={8}>
        <Box>
          {_.isNumber(distance) && (
            <HStack alignItems="center" rowGap={8}>
              <Box>
                <MaterialIcons name="location-on" size={24} />
              </Box>
              <Box>
                <Text fontSize={20}>
                  {Math.round((distance || 0) / 1000)}{' '}
                  {formatMessage('km away')}
                </Text>
              </Box>
            </HStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};
