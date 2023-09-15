import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditHeightMenuItem: React.FC = () => {
  const navigation = useNavigation();

  const value = useAppSelector(state => state.app.profile?.height);

  const handleChange = () => {
    navigation.navigate('EditInfoHeight');
  };

  return (
    <>
      <MenuItem
        titleTx="Height"
        leftIcon={<MaterialCommunityIcons name="human-male-height" />}
        {...(value ? { value: `${value} cm` } : {})}
        onPress={handleChange}
      />
    </>
  );
};
