import { Image, View } from '@gluestack-ui/themed';
import { Entity } from 'app/types';
import { mediaFileUtil } from 'app/utils/media-files.util';
import _ from 'lodash';
import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type FCProps = {
  mediaFiles: Entity.MediaFile[];
};
export const UserProfileImages: React.FC<FCProps> = ({ mediaFiles }) => {
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
                uri: mediaFileUtil.getUrl(item.key),
              }}
              alt="profile"
            ></Image>
          </View>
        )}
      />
    </>
  );
};

export const UserProfileImagesMemo = React.memo(UserProfileImages, (prev, next) => {
  return _.isEqual(prev.mediaFiles, next.mediaFiles);
});
