import {
  Box,
  Image,
  LinearGradient,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Entity } from 'app/types';
import _ from 'lodash';
import React from 'react';

type NearbyUserItemProps = {
  user: Entity.User;
};

export const NearbyUserItem: React.FC<NearbyUserItemProps> = ({ user }) => {
  const navigation = useNavigation();

  const handlePressCard = () => {
    if (user._id) {
      navigation.navigate('ProfileNearby', {
        user,
      });
    }
  };

  return (
    <Box key={user._id} px={4} py={4} w="$1/2">
      <Pressable onPress={handlePressCard}>
        <LinearGradient
          zIndex={100}
          height="$full"
          width="$full"
          position="absolute"
          borderRadius={8}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          colors={['#00000000', '#00000000', '#00000000', '#000000']}
          justifyContent="flex-end"
        >
          <Box px={4} py={4}>
            <Text fontWeight="bold" color="$white" numberOfLines={1}>
              {user.nickname}
              {', '}
              {!_.isUndefined(user.distance) &&
                `${_.round(user.distance, 1)} km`}
            </Text>
          </Box>
        </LinearGradient>

        <Box>
          <Image
            w="$full"
            aspectRatio={640 / 860}
            borderRadius={8}
            alt="avatar"
            source={{
              uri: user.mediaFiles?.length ? user.mediaFiles[0].location : '',
            }}
          ></Image>
        </Box>
      </Pressable>
    </Box>
  );
};
