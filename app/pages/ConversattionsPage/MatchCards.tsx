import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { AppStore, Entity } from 'app/types';
import { HStack } from 'native-base';
import React, { useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';

import { MatchCardItem } from './MatchCardItem';

type MatchCardsProps = {
  matches: AppStore.Match[];
};

export const MatchCards: React.FC<MatchCardsProps> = ({ matches }) => {
  const navigation = useNavigation();

  const cardWidth = useMemo(() => Dimensions.get('window').width / 4, []);
  const cardHeight = useMemo(() => (cardWidth / 640) * 860, [cardWidth]);

  const handlePressCard = useCallback(
    (match: Entity.Match) => {
      navigation.navigate('Messages', {
        matchId: match._id,
        match,
      });
    },
    [navigation],
  );

  return (
    <>
      <Box px={16}>
        <Text bold>New chats</Text>
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
