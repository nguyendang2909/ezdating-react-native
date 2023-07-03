import { UserLookingFor, UserLookingFors } from 'app/constants';
import { translate, TxKeyPath } from 'app/i18n';
import {
  FormControl,
  Select,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

const lookingForList: { labelTx: TxKeyPath; value: UserLookingFor }[] = [
  {
    labelTx: 'Lover',
    value: UserLookingFors.lover,
  },
  {
    labelTx: 'Friend',
    value: UserLookingFors.friend,
  },
  {
    labelTx: 'Partner',
    value: UserLookingFors.partner,
  },
  {
    labelTx: 'Marriage',
    value: UserLookingFors.marriage,
  },
  {
    labelTx: 'One-night stand',
    value: UserLookingFors.oneNightStand,
  },
];

interface ISelectLookingFor {
  error?: string;
  isRequired?: boolean;
  onChange: (nickname: string) => void;
  value?: string;
}

export const LookingForFormControl: React.FC<ISelectLookingFor> = ({
  error,
  value,
  onChange,
  isRequired,
}) => {
  return (
    <>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
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
