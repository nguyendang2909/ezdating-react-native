import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditGenderMenuItem: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.gender);

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { valueTx: `constants.genders.${value}` } : {})}
      />
    </>
  );
};
