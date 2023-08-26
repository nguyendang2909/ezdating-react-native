import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditWeightMenuItem: React.FC = () => {
  const navigation = useNavigation();

  const value = useAppSelector(state => state.app.profile.weight);

  const handleChange = () => {
    navigation.navigate('EditInfoWeight');
  };

  return (
    <>
      <MenuItem
        titleTx="Weight"
        leftIcon={<FontAwesome5 name="weight" />}
        {...(value ? { value: `${value} kg` } : {})}
        onPress={handleChange}
      />
    </>
  );
};
