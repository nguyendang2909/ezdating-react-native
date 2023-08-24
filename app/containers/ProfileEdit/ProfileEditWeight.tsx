import { FontAwesome5 } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditWeightMenuItem: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.weight);

  return (
    <>
      <MenuItem
        titleTx="Weight"
        leftIcon={<FontAwesome5 name="weight" />}
        {...(value ? { value: `${value} kg` } : {})}
      />
    </>
  );
};
