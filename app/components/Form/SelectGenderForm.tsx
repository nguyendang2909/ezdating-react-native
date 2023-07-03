import { UserGender, UserGenders } from 'app/constants';
import { translate } from 'app/i18n';
import { flex } from 'app/styles';
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
          <View style={flex(1)}>
            <Button
              testID="maleButton"
              variant={value === UserGenders.male ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(UserGenders.male);
              }}
            >
              {translate('Male')}
            </Button>
          </View>

          <View style={flex(1)}>
            <Button
              testID="femaleButton"
              variant={value === UserGenders.female ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(UserGenders.female);
              }}
            >
              {translate('Female')}
            </Button>
          </View>

          <View style={flex(1)}>
            <Button
              testID="lgbtButton"
              variant={value === UserGenders.lgbt ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(UserGenders.lgbt);
              }}
            >
              {translate('LGBT')}
            </Button>
          </View>
        </HStack>

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
