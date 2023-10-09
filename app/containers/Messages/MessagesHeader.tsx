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
import { AppStore } from 'app/types';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { BackIconButton } from '../IconButton/BackIconButton';
export type FCProps = {
  match?: AppStore.Match;
};
export const MessageByConversationHeader: React.FC<FCProps> = ({ match }) => {
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
                    {match?.targetUser?.nickname}
                  </AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: match?.targetUser?.mediaFiles?.length
                        ? match.targetUser?.mediaFiles[0].location
                        : undefined,
                    }}
                  />
                  <AvatarBadge />
                </Avatar>
              </View>
              <VStack>
                <View>
                  <Text fontWeight="$bold" fontSize={16}>
                    {match?.targetUser?.nickname}
                  </Text>
                </View>
                <View>
                  <Text fontSize={14}>{match?.targetUser?.age}</Text>
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
