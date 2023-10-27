import { Icon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export const ProfileSettingIconButton: React.FC = () => {
  const { navigate } = useNavigation();
  const handlePress = () => {
    navigate('ProfileSetting');
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        {/*
        @ts-ignore */}
        <Icon color="$textDark600" as={Feather} name="settings" size={24} />
      </TouchableOpacity>
      {/* <Icon
        onPress={handlePress}
        icon={<Icon size="2xl" as={<Feather name="settings" />} />}
      ></Icon> */}
    </>
  );
};
