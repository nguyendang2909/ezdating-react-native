import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types/entity.type';
import { Avatar, Box, HStack, Pressable, Text } from 'native-base';
import React from 'react';
import { ListRenderItemInfo } from 'react-native';

type FCProps = {
  data: ListRenderItemInfo<Entity.Relationship>;
};

export const ConversationBox: React.FC<FCProps> = ({ data }) => {
  const navigation = useNavigation();
  const conversation = data.item;

  const handlePress = () => {
    navigation.navigate('MessagesByConversation', {
      conversation: data.item,
    });
  };

  return (
    <Pressable backgroundColor="#fff" onPress={handlePress}>
      {({ isPressed }) => {
        return (
          <Box px={4} py={2}>
            <HStack space={4} bg={isPressed ? 'coolGray.200' : '#fff'}>
              <Box>
                <Avatar
                  size={16}
                  source={{
                    uri: conversation.targetUser?.mediaFiles?.length
                      ? conversation.targetUser?.mediaFiles[0].location
                      : undefined,
                  }}
                ></Avatar>
              </Box>
              <Box justifyContent="center">
                <Box>
                  <Text bold fontSize={16}>
                    {conversation.targetUser?.nickname}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={14} color="gray.700">
                    {conversation.lastMessage}
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
