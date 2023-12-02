import { Pressable, Text, View } from '@gluestack-ui/themed';
import { Entity } from 'app/types/entities.type';
import React from 'react';
import { StyleSheet } from 'react-native';

import { CacheImage } from '../Image';
import { LinearGradient } from '../LinearGradient';

type TargetUserCardProps = {
  onPress?: () => void;
  targetUser?: Entity.Profile;
};

export const TargetUserCard: React.FC<TargetUserCardProps> = ({ onPress, targetUser }) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        zIndex={100}
        height="$full"
        width="$full"
        position="absolute"
        borderRadius={8}
        colors={['#00000000', '#00000000', '#00000000', '#000000']}
        justifyContent="flex-end"
      >
        <View px={4} py={4}>
          <Text fontWeight="bold" color="$white" numberOfLines={1}>
            {targetUser?.nickname} {targetUser?.age}
          </Text>
        </View>
      </LinearGradient>

      <View>
        <CacheImage
          style={style.image}
          url={targetUser?.mediaFiles?.length ? targetUser.mediaFiles[0].key : undefined}
        ></CacheImage>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  image: {
    aspectRatio: 640 / 860,
    borderRadius: 8,
    width: '100%',
  },
});
