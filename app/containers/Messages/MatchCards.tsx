import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { api } from 'app/services/api';
import { matchActions } from 'app/store/matches.store';
import { Entity } from 'app/types/entity.type';
import { Box, HStack, Image, Pressable, ScrollView, Text } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

export const MatchCards: React.FC = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const getMatchesQuery = api.useGetMatchesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    },
  );

  console.log(111, getMatchesQuery.data?.data);

  const matches = useAppSelector(state => state.match.data);

  const fetchFirstMatchedUsers = async () => {
    if (!matches?.length) {
      if (!getMatchesQuery.data?.data) {
        const refetchMatches = await getMatchesQuery.refetch();

        if (refetchMatches.data?.data?.length) {
          dispatch(matchActions.addMatches(refetchMatches.data?.data));
        }
      }
    }
  };

  useEffect(() => {
    fetchFirstMatchedUsers();
  }, []);

  const width = Dimensions.get('window').width;

  const cardWidth = width / 4;

  const imageCardHeight = (cardWidth / 640) * 860;

  const handlePressCard = (conversation: Entity.Match) => {
    navigation.navigate('MessagesByConversation', {
      conversation,
    });
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
    </ScrollView>
  );
};
