import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types/entity.type';
import { Avatar, Box, HStack, Pressable, Text } from 'native-base';
import React, { useCallback } from 'react';

type FCProps = {
  data: Entity.Match;
};

export const ConversationBox: React.FC<FCProps> = ({ data }) => {
  const navigation = useNavigation();

  const isRead = data.read;

  const handlePress = useCallback(() => {
    navigation.navigate('Messages', {
      conversation: data,
    });
  }, [data, navigation]);

  return (
    <Pressable backgroundColor="#fff" onPress={handlePress}>
      {({ isPressed }) => {
        return (
          <Box px={4} py={2} bg={isPressed ? 'coolGray.200' : '#fff'}>
            <HStack space={4}>
              <Box>
                <Avatar
                  size={16}
                  source={{
                    uri: data.targetUser?.mediaFiles?.length
                      ? data.targetUser?.mediaFiles[0].location
                      : undefined,
                  }}
                ></Avatar>
              </Box>
              <Box justifyContent="center">
                <Box>
                  <Text
                    color="black"
                    bold={!isRead}
                    fontSize={16}
                    numberOfLines={1}
                    marginRight={24}
                  >
                    {data.targetUser?.nickname}
                  </Text>
                </Box>
                <Box>
                  <Text
                    flex={1}
                    bold={!isRead}
                    fontSize={14}
                    color="gray.700"
                    numberOfLines={1}
                    marginRight={24}
                  >
                    {data.lastMessage}
                  </Text>
                </Box>
              </Box>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
