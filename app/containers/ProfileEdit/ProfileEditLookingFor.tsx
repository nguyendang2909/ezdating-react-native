import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditLookingFor: React.FC = () => {
  const lookingFor = useAppSelector(state => state.app.profile.lookingFor);
  return (
    <>
      <MenuItem
        titleTx="Looking for"
        leftIcon={<MaterialIcons name="add-to-photos" />}
        {...(lookingFor
          ? { valueTx: `constants.userLookingFors.${lookingFor}` }
          : {})}
      />
    </>
  );
};
