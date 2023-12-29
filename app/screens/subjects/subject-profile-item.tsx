import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { Entity } from 'app/types';
import _ from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';

import { CacheImage, LinearGradient } from '../../components';

type NearbyProfileItemProps = {
  profile: Entity.Profile;
  onOpen: (e: Entity.Profile) => void;
};

export const SubjectProfileItem: React.FC<NearbyProfileItemProps> = ({ profile, onOpen }) => {
  const handlePressCard = () => {
    onOpen(profile);
  };

  return (
    <Box key={profile._id} px={4} py={4} w="$1/2">
      <Pressable onPress={handlePressCard}>
        <LinearGradient
          zIndex={100}
          height="$full"
          width="$full"
          position="absolute"
          borderRadius={8}
          colors={['#00000000', '#00000000', '#00000000', '#000000']}
          justifyContent="flex-end"
        >
          <Box px={4} py={4}>
            <Text fontWeight="bold" color="$white" numberOfLines={1}>
              {profile.nickname}
              {profile.distance ? ', ' : undefined}
              {!_.isUndefined(profile.distance) && `${_.round((profile.distance || 0) / 1000)} km`}
            </Text>
          </Box>
        </LinearGradient>

        <Box>
          <CacheImage
            style={style.image}
            url={profile.mediaFiles?.length ? profile.mediaFiles[0]?.key : undefined}
          ></CacheImage>
        </Box>
      </Pressable>
    </Box>
  );
};

const style = StyleSheet.create({
  image: {
    aspectRatio: 640 / 860,
    borderRadius: 8,
    width: '100%',
  },
});
