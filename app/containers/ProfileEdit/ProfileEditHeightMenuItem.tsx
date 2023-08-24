import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditHeightMenuItem: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.weight);

  return (
    <>
      <MenuItem
        titleTx="Height"
        leftIcon={<MaterialCommunityIcons name="human-male-height" />}
        {...(value ? { value: `${value} kg` } : {})}
      />
    </>
  );
};
