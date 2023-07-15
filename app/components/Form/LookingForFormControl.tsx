import { useActionSheet } from '@expo/react-native-action-sheet';
import { UserLookingFor, UserLookingFors } from 'app/constants';
import { translate } from 'app/i18n';
import {
  ChevronDownIcon,
  FormControl,
  Input,
  Pressable,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

type FCProps = {
  error?: string;
  isRequired?: boolean;
  onChange: (value: number) => void;
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
        showSeparators: true,
        options,
        cancelButtonIndex,
        useModal: true,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            onChange(UserLookingFors.boyGirlFriend);
            break;
          case 1:
            onChange(UserLookingFors.getMarried);
            break;
          case 2:
            onChange(UserLookingFors.makeFriends);
            break;
          case 3:
            onChange(UserLookingFors.oneNightStand);
            break;
          case 4:
            onChange(UserLookingFors.sexPartner);
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
          <Pressable onPress={handlePress}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={translate('Please select')}
              value={
                value ? translate(`constants.userLookingFors.${value}`) : ''
              }
              InputRightElement={<ChevronDownIcon />}
              onPressIn={handlePress}
            ></Input>
          </Pressable>
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
