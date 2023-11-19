import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'app/components';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { SCREENS } from 'app/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import React from 'react';

export const ProfileEditLocationMenuItem: React.FC = () => {
  const navigation = useNavigation();

  const { formatMessage } = useMessages();

  const state = useAppSelector(state => state.app.profile?.state);

  const locationText = `${state?.name}, ${state?.country?.native}`;

  const handleChange = () => {
    navigation.navigate(SCREENS.EDIT_INFO_LOCATION);
  };

  return (
    <>
      <MenuItem
        title={locationText || formatMessage('None')}
        leftIcon={<Ionicons name="location" />}
        onPress={handleChange}
      />
    </>
  );
};
