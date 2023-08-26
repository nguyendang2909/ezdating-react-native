import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { format } from 'date-fns';
import moment from 'moment';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditBirthdayMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const value = useAppSelector(state => state.app.profile.birthday);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = async (date: Date) => {
    hideDatePicker();

    onPress({ birthday: format(date, 'yyyy-MM-dd') });
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <MenuItem
        titleTx="Birthday"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { value: moment(value).format('YYYY-MM-DD') } : {})}
        onPress={showDatePicker}
      />
      <DateTimePickerModal
        testID="datePickerModal"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={value ? new Date(value) : undefined}
      />
    </>
  );
};
