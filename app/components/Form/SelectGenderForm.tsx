import { Button, ButtonText, View } from '@gluestack-ui/themed';
import { ARR_GENDERS } from 'app/constants';
import { GENDER_MESSAGES, UserGender } from 'app/constants/constants';
import { useMessages } from 'app/hooks/useMessages';
import { Gender } from 'app/types';
import { FormControl, HStack, Stack, WarningOutlineIcon } from 'native-base';
import React, { FC } from 'react';

type FCProps = {
  onChange: (gender: UserGender) => void;
  error?: string;
  value?: UserGender;
  isRequired?: boolean;
};

export const SelectGenderFormControl: FC<FCProps> = ({ onChange, error, value, isRequired }) => {
  const { formatMessage } = useMessages();

  return (
    <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
      <Stack>
        <FormControl.Label>{formatMessage('Gender')}</FormControl.Label>
        <HStack space="sm">
          {ARR_GENDERS.map(item => {
            const variant = value === item ? 'solid' : 'outline';

            return (
              <SelectGenderItem
                key={item}
                variant={variant}
                item={item}
                value={value}
                onChange={onChange}
              />
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

type SelectGenderItemProps = {
  item: Gender;
  value?: Gender;
  variant: 'solid' | 'outline';
  onChange: (gender: UserGender) => void;
};

const SelectGenderItem: FC<SelectGenderItemProps> = ({ item, onChange, variant }) => {
  const { formatMessage } = useMessages();

  const handleChange = () => {
    onChange(item);
  };

  return (
    <View flex={1} key={item}>
      <Button variant={variant} onPress={handleChange}>
        <ButtonText>{formatMessage(GENDER_MESSAGES[item])}</ButtonText>
      </Button>
    </View>
  );
};
