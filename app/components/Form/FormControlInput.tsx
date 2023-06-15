import { FormControl, Input, Stack, WarningOutlineIcon } from 'native-base';
import React from 'react';

type FCProps = {
  label: string;
  onChange: (nickname: string) => void;
  value?: string;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  testID?: string;
};

export const FormControlInput: React.FC<FCProps> = ({
  label,
  onChange,
  value,
  error,
  maxLength,
  placeholder,
  testID,
}) => {
  return (
    <FormControl isRequired isInvalid={!!error}>
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
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  );
};
