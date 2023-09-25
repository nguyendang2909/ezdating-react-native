import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types/entity.type';
import { Avatar, Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';

type FCProps = {
  data: Entity.Match;
};

export const ConversationBox: React.FC<FCProps> = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('MessagesByConversation', {
      conversation: data,
    });
  };

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
                  <Text bold fontSize={16}>
                    {data.targetUser?.nickname}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={14} color="gray.700">
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
