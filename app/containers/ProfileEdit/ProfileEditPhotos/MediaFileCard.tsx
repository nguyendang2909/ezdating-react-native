import { MaterialIcons } from 'app/components/Icon/Lib';
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
import { Icon, Image, Spinner, View } from 'native-base';
import React from 'react';
import { TouchableHighlight } from 'react-native';

type FCProps = {
  onPress: () => void;
  value?: string;
  isLoading?: boolean;
};

export const ProfileEditMediaFileCard: React.FC<FCProps> = ({
  onPress,
  value,
  isLoading,
}) => {
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
            opacity={isLoading ? 0.5 : undefined}
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
          {isLoading ? (
            <Spinner />
          ) : (
            <Icon size={10} as={<MaterialIcons name="add-to-photos" />} />
          )}
        </View>
      )}
    </TouchableHighlight>
  );
};
