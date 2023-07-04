import 'moment/min/locales';

import { translate } from 'app/i18n';
import moment from 'moment';
import {
  ChevronDownIcon,
  FormControl,
  Input,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type FCProps = {
  error?: string;
  onChange: (date: string) => void;
  value?: string;
  isRequired?: boolean;
};

export const BirthDayFormControl: FC<FCProps> = ({
  value,
  onChange,
  error,
  isRequired,
}) => {
  const [deviceLocale] = RNLocalize.getLocales();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date: Date) => {
    onChange(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>{translate('Birthday')}</FormControl.Label>
          <Input
            testID="birthday"
            size="lg"
            value={
              value
                ? moment(value, 'YYYY-MM-DD')
                    .locale(deviceLocale.languageCode)
                    .format('L')
                : ''
            }
            onPressIn={showDatePicker}
            isReadOnly
            variant="underlined"
            placeholder={translate('Please enter your w', {
              w: translate('birthday'),
            })}
            InputRightElement={<ChevronDownIcon />}
          ></Input>
          <View pb={2}>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {error}
            </FormControl.ErrorMessage>
          </View>
        </Stack>
      </FormControl>
      <DateTimePickerModal
        testID="datePickerModal"
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
