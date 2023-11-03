import { FilterGenderActionSheet, MaterialCommunityIcons } from 'app/components';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { GENDER_MESSAGES } from 'app/constants/constants';
import { useDisclose } from 'app/hooks';
import { Gender } from 'app/types';
import React from 'react';

type FCProps = {
  value?: Gender;
  onChange: (gender: Gender) => void;
};

export const EditFilterGenderMenuItem: React.FC<FCProps> = ({ value, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { valueTx: GENDER_MESSAGES[value] } : {})}
        onPress={onOpen}
      />

      <FilterGenderActionSheet
        isOpen={isOpen}
        onClose={onClose}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
