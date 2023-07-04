import { useActionSheet } from '@expo/react-native-action-sheet';
import { UserLookingFor, UserLookingFors } from 'app/constants';
import { translate, TxKeyPath } from 'app/i18n';
import {
  ChevronDownIcon,
  FormControl,
  Input,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

const lookingFors: Record<UserLookingFor, TxKeyPath> = {
  [UserLookingFors.lover]: 'Lover',
  [UserLookingFors.friend]: 'Friend',
  [UserLookingFors.partner]: 'Partner',
  [UserLookingFors.marriage]: 'Marriage',
  [UserLookingFors.oneNightStand]: 'One-night stand',
};

type FCProps = {
  error?: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
  value?: UserLookingFor;
};

export const LookingForFormControl: React.FC<FCProps> = ({
  error,
  value,
  onChange,
  isRequired,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    const options = [
      translate('Lover'),
      translate('Friend'),
      translate('Partner'),
      translate('Marriage'),
      translate('One-night stand'),
      translate('Cancel'),
    ];
    const cancelButtonIndex = 5;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            onChange(UserLookingFors.lover);
            console.log(111);
            break;
          case 1:
            onChange(UserLookingFors.friend);
            break;
          case 2:
            onChange(UserLookingFors.partner);
            break;
          case 3:
            onChange(UserLookingFors.marriage);
            break;
          case 4:
            onChange(UserLookingFors.oneNightStand);
            break;
        }
      },
    );
  };

  return (
    <>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>
            {translate('What are you looking for here?')}
          </FormControl.Label>
          <View>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={translate('Please select')}
              value={value ? translate(lookingFors[value]) : ''}
              onPressIn={handlePress}
              InputRightElement={<ChevronDownIcon />}
            ></Input>
          </View>
          <View pb={2}>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {error}
            </FormControl.ErrorMessage>
          </View>
        </Stack>
      </FormControl>
    </>
  );
};
