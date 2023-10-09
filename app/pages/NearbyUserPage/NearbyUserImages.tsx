import { Image, View } from '@gluestack-ui/themed';
import { Entity } from 'app/types';
import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type FCProps = {
  mediaFiles: Entity.MediaFile[];
};
export const NearbyUserImages: React.FC<FCProps> = ({ mediaFiles }) => {
  const width = Dimensions.get('window').width;

  return (
    <>
      <Carousel
        loop={false}
        width={width}
        height={(width / 640) * 860}
        data={mediaFiles}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View justifyContent="center">
            <Image
              height="100%"
              width="100%"
              source={{
                uri: item.location,
              }}
              alt="profile"
            ></Image>
          </View>
        )}
      />
    </>
  );
};