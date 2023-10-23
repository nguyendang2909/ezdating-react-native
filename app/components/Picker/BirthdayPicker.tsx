import { DATE_FORMATS } from 'app/constants';
import { getMaxBirthDateTime, getMinBirthDateTime } from 'app/utils';
import moment from 'moment';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type FCProps = {
  isOpen: boolean;
  onConfirm: (e: string) => void;
  onCancel: () => void;
  value?: string;
};

export const BirthdayPicker: React.FC<FCProps> = ({ isOpen, onCancel, onConfirm, value }) => {
  const maxDate = getMinBirthDateTime();
  const minDate = getMaxBirthDateTime();

  const handleConfirm = (date: Date) => {
    onCancel();
    onConfirm(moment(date).utc().format(DATE_FORMATS.DATE));
  };

  return (
    <DateTimePickerModal
      testID="datePickerModal"
      isVisible={isOpen}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={onCancel}
      date={value ? new Date(value) : maxDate}
      maximumDate={maxDate}
      minimumDate={minDate}
    />
  );
};
