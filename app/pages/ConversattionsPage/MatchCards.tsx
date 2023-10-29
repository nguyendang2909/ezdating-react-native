import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { AppStore } from 'app/types';
import { HStack } from 'native-base';
import React, { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';

import { MatchCardItem } from './MatchCardItem';

type MatchCardsProps = {
  matches: AppStore.MatchData[];
};

export const MatchCards: React.FC<MatchCardsProps> = ({ matches }) => {
  const navigation = useNavigation();

  const cardWidth = useMemo(() => Dimensions.get('window').width / 4, []);
  const cardHeight = useMemo(() => (cardWidth / 640) * 860, [cardWidth]);

  const handlePressCard = useCallback(
    (matchId: string) => {
      navigation.navigate('Messages', {
        matchId,
      });
    },
    [navigation],
  );

  return (
    <>
      <Box px={16}>
        <Text bold>New matches</Text>
      </Box>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box mx={16}>
          <HStack space={2}>
            {matches?.map((item, index) => {
              return (
                <MatchCardItem
                  key={item._id || index}
                  match={item}
                  width={cardWidth}
                  height={cardHeight}
                  onPress={handlePressCard}
                />
              );
            })}
          </HStack>
        </Box>
      </ScrollView>
    </>
  );
};
