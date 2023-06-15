import { EUserLookingFor } from 'app/constants';
import { translate, TxKeyPath } from 'app/i18n';
import {
  FormControl,
  Select,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

const lookingForList: { labelTx: TxKeyPath; value: EUserLookingFor }[] = [
  {
    labelTx: 'Lover',
    value: EUserLookingFor.lover,
  },
  {
    labelTx: 'Friend',
    value: EUserLookingFor.friend,
  },
  {
    labelTx: 'Partner',
    value: EUserLookingFor.partner,
  },
  {
    labelTx: 'Marriage',
    value: EUserLookingFor.marriage,
  },
  {
    labelTx: 'One-night stand',
    value: EUserLookingFor.oneNightStand,
  },
];

interface ISelectLookingFor {
  error?: string;
  value: string;
  onChange: (nickname: string) => void;
}

export const LookingForFormControl: React.FC<ISelectLookingFor> = ({
  error,
  value,
  onChange,
}) => {
  return (
    <>
      <FormControl>
        <Stack>
          <FormControl.Label>
            {translate('What are you looking for here?')}
          </FormControl.Label>
          <View>
            <Select
              size="lg"
              variant="underlined"
              placeholder={translate('Please select')}
              selectedValue={value}
              onValueChange={onChange}
            >
              {lookingForList.map(item => {
                return (
                  <Select.Item
                    key={item.value}
                    label={translate(item.labelTx)}
                    value={item.value}
                  ></Select.Item>
                );
              })}
            </Select>
          </View>

          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {error}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
    </>
  );
};
