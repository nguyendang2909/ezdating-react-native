import { useUpdateProfileMutation } from 'app/api';
import { FilterGenderActionSheet, MaterialCommunityIcons } from 'app/components';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { GENDER_MESSAGES, UserGender } from 'app/constants/constants';
import { useAppSelector, useDisclose, useMessages } from 'app/hooks';
import React from 'react';
import Toast from 'react-native-toast-message';

export const EditFilterGenderAuto: React.FC = () => {
  const { formatErrorMessage } = useMessages();
  const [updateProfile] = useUpdateProfileMutation();
  const currentFilterGender = useAppSelector(s => s.app.profile.filterGender);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = async (e: UserGender) => {
    try {
      await updateProfile({ filterGender: e }).unwrap();
    } catch (error) {
      Toast.show({ text1: formatErrorMessage(error) });
    }
  };

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(currentFilterGender ? { valueTx: GENDER_MESSAGES[currentFilterGender] } : {})}
        onPress={onOpen}
      />
      <FilterGenderActionSheet
        isOpen={isOpen}
        onClose={onClose}
        value={currentFilterGender}
        onChange={handleChange}
      />
    </>
  );
};
