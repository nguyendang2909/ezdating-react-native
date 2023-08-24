import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import moment from 'moment';
import React from 'react';

export const ProfileEditBirthdayMenuItem: React.FC = () => {
  const value = useAppSelector(state => state.app.profile.birthday);

  return (
    <>
      <MenuItem
        titleTx="Birthday"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { value: moment(value).format('YYYY-MM-DD') } : {})}
      />
    </>
  );
};
