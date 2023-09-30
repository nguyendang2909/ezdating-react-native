import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types/entity.type';
import { Avatar, Box, HStack, Pressable, Text } from 'native-base';
import React, { useCallback } from 'react';
import { User } from 'react-native-gifted-chat';

type FCProps = {
  data: Entity.Match;
  user: User;
};

export const ConversationBox: React.FC<FCProps> = ({ data, user }) => {
  const navigation = useNavigation();

  const isRead = data.read;

  const handlePress = useCallback(() => {
    navigation.navigate('Messages', {
      conversation: data,
      user,
    });
  }, [data, navigation, user]);

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
                  <Text color="black" bold={!isRead} fontSize={16}>
                    {data.targetUser?.nickname}
                  </Text>
                </Box>
                <Box>
                  <Text bold={!isRead} fontSize={14} color="gray.700">
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
