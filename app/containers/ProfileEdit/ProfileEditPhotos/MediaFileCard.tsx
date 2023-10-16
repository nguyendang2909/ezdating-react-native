import { CacheImage } from 'app/components';
import { MaterialIcons } from 'app/components/Icon/Lib';
import {
  alignItemsCenter,
  aspectRatio,
  backgroundColor,
  borderColor,
  borderRadius,
  flex,
  justifyContentCenter,
} from 'app/styles';
import { Icon, Spinner, View } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

type FCProps = {
  onPress: () => void;
  value?: string;
  isLoading?: boolean;
};

export const ProfileEditMediaFileCard: React.FC<FCProps> = ({ onPress, value, isLoading }) => {
  const imageStyle = {
    opacity: isLoading ? 0.5 : undefined,
  };
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        borderColor('#d4d8de'),
        borderRadius(20),
        backgroundColor('#d4d8de'),
        aspectRatio(640 / 860),
      ]}
    >
      {value ? (
        <>
          <CacheImage
            style={[styles.image, imageStyle]}
            url={value}
            // resizeMode="cover"
          />
          {isLoading && (
            <View
              position="absolute"
              left={0}
              right={0}
              top={0}
              bottom={0}
              style={[flex(1), justifyContentCenter, alignItemsCenter]}
            >
              <Spinner />
            </View>
          )}
        </>
      ) : (
        <View style={[flex(1), justifyContentCenter, alignItemsCenter]}>
          {isLoading ? <Spinner /> : <Icon size={10} as={<MaterialIcons name="add-to-photos" />} />}
        </View>
      )}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
  },
});
