import { FormControl, Input, Stack, View, WarningOutlineIcon } from 'native-base';
import React from 'react';

type FCProps = {
  label: string;
  onChange: (nickname: string) => void;
  value?: string;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
  isRequired?: boolean;
};

export const FormControlInput: React.FC<FCProps> = ({
  label,
  onChange,
  value,
  error,
  maxLength,
  placeholder,
  testID,
  isRequired,
}) => {
  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{label}</FormControl.Label>
        <Input
          value={value}
          size="lg"
          testID={testID}
          variant="underlined"
          onChangeText={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        ></Input>
        <View pb={2}>
          <FormControl.ErrorMessage position="absolute" leftIcon={<WarningOutlineIcon size="xs" />}>
            {error}
          </FormControl.ErrorMessage>
        </View>
      </Stack>
    </FormControl>
  );
};
