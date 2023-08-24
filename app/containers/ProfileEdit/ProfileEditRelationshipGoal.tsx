import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

export const ProfileEditRelationshipGoalMenuItem: React.FC = () => {
  const relationshipGoal = useAppSelector(
    state => state.app.profile.relationshipGoal,
  );
  return (
    <>
      <MenuItem
        titleTx="Looking for"
        leftIcon={<MaterialIcons name="add-to-photos" />}
        {...(relationshipGoal
          ? { valueTx: `constants.userRelationshipGoals.${relationshipGoal}` }
          : {})}
      />
    </>
  );
};
