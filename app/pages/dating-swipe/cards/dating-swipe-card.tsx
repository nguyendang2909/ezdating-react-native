import { HStack, Text, View } from '@gluestack-ui/themed';
import { AgeText, CacheImage, DistanceText, LinearGradient } from 'app/components';
import { Profile } from 'app/types';
import _ from 'lodash';
import React from 'react';
import { StyleSheet } from 'react-native';

interface CardProps {
  profile: Profile;
  height: number;
  width: number;
}

export const DatingSwipeCard: React.FC<CardProps> = ({ profile, height, width }) => {
  const imageUrl = _.get(profile, 'mediaFiles[0].key');

  return (
    <View height={height} width={width} marginLeft={-20}>
      <LinearGradient
        zIndex={100}
        height="$full"
        width="$full"
        position="absolute"
        // borderRadius={8}
        colors={['#00000000', '#00000000', '#00000000', '#000000']}
        justifyContent="flex-end"
      >
        <View px={16} py={16} marginBottom={56}>
          <HStack columnGap={8} pr={32}>
            {!!profile.nickname && (
              <Text
                fontSize={28}
                fontWeight="bold"
                color="$white"
                numberOfLines={1}
                lineHeight={28}
                textShadowColor="rgba(0, 0, 0, 0.75)"
                textShadowOffset={{ width: -1, height: 1 }}
                textShadowRadius={2}
              >
                {profile.nickname}
              </Text>
            )}
            {!!profile.birthday && (
              <AgeText
                birthday={profile.birthday}
                hideAge={profile.hideAge}
                fontSize={28}
                color="$white"
                numberOfLines={1}
                lineHeight={28}
                textShadowColor="rgba(0, 0, 0, 0.75)"
                textShadowOffset={{ width: -1, height: 1 }}
                textShadowRadius={2}
              />
            )}
          </HStack>

          {!_.isUndefined(profile.distance) && (
            <DistanceText
              distance={profile.distance}
              fontSize={22}
              color="$white"
              numberOfLines={1}
              lineHeight={28}
              textShadowColor="rgba(0, 0, 0, 0.75)"
              textShadowOffset={{ width: -1, height: 1 }}
              textShadowRadius={2}
            />
          )}
          {!!profile.introduce && (
            <Text
              color="$white"
              numberOfLines={5}
              textShadowColor="rgba(0, 0, 0, 0.75)"
              textShadowOffset={{ width: -1, height: 1 }}
              textShadowRadius={2}
            >
              {profile.introduce}{' '}
            </Text>
          )}
        </View>
      </LinearGradient>
      <CacheImage url={imageUrl} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // borderRadius: 12,
    height: '100%',
    // position: 'absolute',
    // top: 0,
    // width: '100%',
  },
});
