import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Icon,
  InfoIcon,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from 'app/navigators';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { BackIconButton } from '../IconButton/BackIconButton';
export const MessageByConversationHeader: React.FC = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'Messages'>>();
  const { conversation } = route.params;

  const handlePressSetting = () => {};

  return (
    <>
      <SafeAreaView />

      <View
        h={56}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack columnGap={8} justifyContent="center" alignItems="center">
          <BackIconButton />

          <TouchableOpacity>
            <HStack columnGap={8}>
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
          </TouchableOpacity>
        </HStack>
        <Box pr={16}>
          <TouchableOpacity onPress={handlePressSetting}>
            <Icon height={28} width={28} as={InfoIcon} />
          </TouchableOpacity>
        </Box>
      </View>
    </>
  );
};
