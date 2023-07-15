import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditRelationshipStatus: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.lookingFor);
  return (
    <>
      <MenuItem
        titleTx="Relationship status"
        leftIcon={<MaterialIcons name="person" />}
        {...(value ? { valueTx: `constants.userLookingFors.${value}` } : {})}
      />
    </>
  );
};
