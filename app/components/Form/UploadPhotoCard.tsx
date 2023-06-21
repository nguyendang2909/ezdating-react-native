import {
  alignItemsCenter,
  alignSelfStretch,
  aspectRatio,
  backgroundColor,
  borderColor,
  borderRadius,
  flex,
  justifyContentCenter,
} from 'app/styles';
import { Icon, Image, View } from 'native-base';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type FCProps = {
  onPress: () => void;
  value?: string;
};

export const UploadPhotoCard: React.FC<FCProps> = ({ onPress, value }) => {
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
          <Image
            style={[
              flex(1),
              justifyContentCenter,
              alignSelfStretch,
              borderRadius(20),
            ]}
            alt="profile-photo"
            source={{ uri: value }}
            resizeMode="cover"
          />
        </>
      ) : (
        <View style={[flex(1), justifyContentCenter, alignItemsCenter]}>
          <Icon size={10} as={<MaterialIcons name="add-to-photos" />} />
        </View>
      )}
    </TouchableHighlight>
  );
};
