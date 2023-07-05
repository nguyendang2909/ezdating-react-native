import { useNavigation } from '@react-navigation/native';
import { Icon, IconButton } from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

export const ProfileSettingIconButton: React.FC = () => {
  const { navigate } = useNavigation();
  const handlePress = () => {
    navigate('ProfileSetting');
  };

  return (
    <>
      <IconButton
        onPress={handlePress}
        icon={<Icon size="2xl" as={<Feather name="settings" />} />}
      ></IconButton>
    </>
  );
};
