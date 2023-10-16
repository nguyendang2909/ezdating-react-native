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
import { useNavigation } from '@react-navigation/native';
import { AppStore } from 'app/types';
import { mediaFileUtil } from 'app/utils/media-files.util';
import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import { BackIconButton } from '../IconButton/BackIconButton';
export type FCProps = {
  match?: AppStore.Match;
};
export const MessageByConversationHeader: React.FC<FCProps> = ({ match }) => {
  const navigation = useNavigation();

  const handlePressSetting = () => {};

  const handlePressProfile = () => {
    if (match?.targetUser) {
      navigation.navigate('ChatProfile', { user: match.targetUser });
    }
  };

  return (
    <>
      <SafeAreaView />

      <View h={56} flexDirection="row" alignItems="center" justifyContent="space-between">
        <HStack columnGap={8} justifyContent="center" alignItems="center">
          <BackIconButton />

          <TouchableOpacity onPress={handlePressProfile}>
            <HStack columnGap={8}>
              <View pointerEvents="none">
                <Avatar height={40} width={40}>
                  <AvatarFallbackText>{match?.targetUser?.nickname}</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: match?.targetUser?.mediaFiles?.length
                        ? mediaFileUtil.getUrl(match.targetUser?.mediaFiles[0].key)
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
