import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Text,
  View,
} from '@gluestack-ui/themed';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from 'app/navigators';
import { VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { BackIconButton } from '../IconButton/BackIconButton';
export const MessageByConversationHeader: React.FC = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'Messages'>>();
  const { conversation } = route.params;
  return (
    <>
      <SafeAreaView />

      {/* <Header
        title={conversation?.targetUser?.nickname}
        LeftActionComponent={
          <View ml={2}>
            <BackIconButton />
          </View>
        }
      /> */}

      <View
        h={56}
        flexDirection="row"
        alignItems="center"
        // justifyContent="space-between"
      >
        <HStack columnGap={8} justifyContent="center" alignItems="center">
          <BackIconButton />
          <View pointerEvents="none">
            <Avatar height={40} width={40}>
              <AvatarFallbackText>
                {conversation?.targetUser?.nickname}
              </AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: conversation.targetUser?.mediaFiles?.length
                    ? conversation.targetUser?.mediaFiles[0].location
                    : undefined,
                }}
              />
              <AvatarBadge />
            </Avatar>
          </View>
          <VStack>
            <View>
              <Text fontWeight="$bold" size="md">
                {conversation?.targetUser?.nickname}
              </Text>
            </View>
            <View>
              <Text size="sm">{conversation.targetUser?.age}</Text>
            </View>
          </VStack>
        </HStack>
      </View>
    </>
  );
};
