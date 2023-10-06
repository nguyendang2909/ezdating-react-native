import { UserGender, UserGenderMessages, UserGenders } from 'app/constants';
import { useMessages } from 'app/hooks/useMessages';
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
  const { formatMessage } = useMessages();

  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{formatMessage('Gender')}</FormControl.Label>

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
                  {formatMessage(UserGenderMessages[item])}
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
