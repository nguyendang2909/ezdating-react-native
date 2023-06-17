import {
  alignItemsCenter,
  aspectRatio,
  backgroundColor,
  borderColor,
  borderRadius,
  flex,
  justifyContentCenter,
} from 'app/styles';
import { Icon, View } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const UploadPhotoCard: React.FC = () => {
  return (
    <View
      style={[
        borderColor('#d4d8de'),
        borderRadius(20),
        backgroundColor('#d4d8de'),
        aspectRatio(640 / 860),
      ]}
    >
      <View style={[flex(1), justifyContentCenter, alignItemsCenter]}>
        <Icon size={10} as={<MaterialIcons name="add-to-photos" />} />
      </View>
    </View>
  );
};
