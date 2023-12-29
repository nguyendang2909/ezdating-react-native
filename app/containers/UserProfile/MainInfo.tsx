import { Box, HStack, Text, View } from '@gluestack-ui/themed';
import { GradientIcon } from 'app/components/Icon/GradientIcon';
import { MaterialIcons } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import _ from 'lodash';
import React from 'react';

type FCProps = {
  nickname?: string;
  age?: number;
  distance?: number;
};

export const NearbyUserMainInfo: React.FC<FCProps> = ({ nickname, age, distance }) => {
  const { formatMessage } = useMessages();

  return (
    <Box backgroundColor="$backgroundLight0" px={16} py={16} rounded={16}>
      <Box>
        <View flexDirection="row">
          <Box>
            <Text
              fontSize={28}
              fontWeight="bold"
              lineHeight={28}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {nickname}
              {distance ? ',' : undefined}
            </Text>
          </Box>
          <Box ml={8}>
            <Text fontSize={28} lineHeight={28}>
              {age}
            </Text>
          </Box>
        </View>
      </Box>

      <Box mt={8}>
        <Box>
          {_.isNumber(distance) && (
            <HStack alignItems="center" rowGap={8}>
              <Box>
                <GradientIcon icon={MaterialIcons} name="location-on" size={24} />
              </Box>
              <Box>
                <Text fontSize={20}>
                  {_.round((distance || 0) / 1000)} {formatMessage('km away')}
                </Text>
              </Box>
            </HStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};
