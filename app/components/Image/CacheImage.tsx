import { mediaFileUtil } from 'app/utils/media-files.util';
import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

type CacheImageProps = {
  url?: string;
  style?: StyleProp<ImageStyle>;
};

export const CacheImage: React.FC<CacheImageProps> = ({ url, style }) => {
  const uri = mediaFileUtil.getUrl(url);

  return (
    <FastImage
      style={style}
      source={{
        uri,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
