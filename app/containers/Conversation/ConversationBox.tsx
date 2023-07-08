import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types/entity.type';
import { Avatar, Column, Pressable, Row, Text } from 'native-base';
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
      conversationId: conversation.id,
    });
  };

  return (
    <Pressable onPress={handlePress} bgColor="#ffffff">
      <Row space={4}>
        <Column>
          <Avatar
            size={16}
            source={{
              uri: conversation.targetUser?.avatar?.location,
            }}
          ></Avatar>
        </Column>
        <Column justifyContent="center">
          <Row>
            <Text bold fontSize={16}>
              {conversation.targetUser?.nickname}
            </Text>
          </Row>
          <Row>
            <Text fontSize={14} color="gray.700">
              {conversation.lastMessage}
            </Text>
          </Row>
        </Column>
      </Row>
    </Pressable>
  );
};
