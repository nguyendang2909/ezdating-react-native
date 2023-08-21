import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditNickname: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.nickname);

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('EditNickname');
  };

  return (
    <>
      <MenuItem
        titleTx="Nickname"
        leftIcon={<MaterialIcons name="person" />}
        {...(value ? { value: `${value}` } : {})}
        onPress={onPress}
      />
    </>
  );
};
