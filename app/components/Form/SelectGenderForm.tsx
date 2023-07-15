import { UserGender, UserGenders } from 'app/constants';
import { translate } from 'app/i18n';
import {
  Button,
  FormControl,
  HStack,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC } from 'react';

type FCProps = {
  onChange: (gender: UserGender) => void;
  error?: string;
  value?: UserGender;
  isRequired?: boolean;
};

export const SelectGenderFormControl: FC<FCProps> = ({
  onChange,
  error,
  value,
  isRequired,
}) => {
  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{translate('Gender')}</FormControl.Label>

        <HStack space="sm">
          {Object.values(UserGenders).map(item => {
            return (
              <View flex={1} key={item}>
                <Button
                  variant={value === item ? 'solid' : 'outline'}
                  w="full"
                  onPress={() => {
                    onChange(item);
                  }}
                >
                  {translate(`constants.genders.${item}`)}
                </Button>
              </View>
            );
          })}
        </HStack>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
