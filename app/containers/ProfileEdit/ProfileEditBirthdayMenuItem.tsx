import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { format } from 'date-fns';
import moment from 'moment';
import { useDisclose } from 'native-base';
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditBirthdayMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const value = useAppSelector(state => state.app.profile.birthday);

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const showDatePicker = () => {
    setInit(true);
    onOpen();
  };

  const handleConfirm = async (date: Date) => {
    onClose();

    onPress({ birthday: format(date, 'yyyy-MM-dd') });
  };

  return (
    <>
      <MenuItem
        titleTx="Birthday"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { value: moment(value).format('YYYY-MM-DD') } : {})}
        onPress={showDatePicker}
      />

      {isInit && (
        <DateTimePickerModal
          testID="datePickerModal"
          isVisible={isOpen}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={onClose}
          date={value ? new Date(value) : undefined}
        />
      )}
    </>
  );
};
