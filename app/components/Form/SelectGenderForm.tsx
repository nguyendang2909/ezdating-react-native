import { translate } from 'app/i18n';
import { flex } from 'app/styles';
import { EGender } from 'app/types/enums';
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
  onChange: (gender: EGender) => void;
  error?: string;
  value?: EGender;
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
              variant={value === EGender.male ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(EGender.male);
              }}
            >
              {translate('Male')}
            </Button>
          </View>

          <View style={flex(1)}>
            <Button
              testID="femaleButton"
              variant={value === EGender.female ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(EGender.female);
              }}
            >
              {translate('Female')}
            </Button>
          </View>

          <View style={flex(1)}>
            <Button
              testID="lgbtButton"
              variant={value === EGender.lgbt ? 'solid' : 'outline'}
              w="full"
              onPress={() => {
                onChange(EGender.lgbt);
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
