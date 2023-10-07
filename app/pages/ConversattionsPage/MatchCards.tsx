import { Box, ScrollView, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { AppStore } from 'app/types';
import { Entity } from 'app/types/entity.type';
import { HStack, Image, Pressable } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

type MatchCardsProps = {
  matches: AppStore.Match[];
};

export const MatchCards: React.FC<MatchCardsProps> = ({ matches }) => {
  const navigation = useNavigation();

  const cardWidth = Dimensions.get('window').width / 4;
  const imageCardHeight = (cardWidth / 640) * 860;

  const handlePressCard = (conversation: Entity.Match) => {
    navigation.navigate('Messages', {
      conversation,
    });
  };

  return (
    <>
      <Box px={16}>
        <Text bold>New matches</Text>
      </Box>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box mx={16}>
          <HStack space={2}>
            {matches?.map((item, index) => {
              const imageUrl = item.targetUser?.mediaFiles?.length
                ? item.targetUser.mediaFiles[0].location
                : '';

              return (
                <Pressable
                  key={item._id || index}
                  p={1}
                  width={cardWidth}
                  onPress={() => {
                    handlePressCard(item);
                  }}
                >
                  <Box>
                    <Image
                      borderRadius={8}
                      height={imageCardHeight}
                      width={cardWidth}
                      alt="avatar"
                      source={{
                        uri: imageUrl,
                      }}
                    ></Image>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" numberOfLines={1}>
                      {item.targetUser?.nickname}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </HStack>
        </Box>
      </ScrollView>
    </>
  );
};
