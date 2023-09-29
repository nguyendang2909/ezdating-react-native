import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  UserRelationshipGoal,
  UserRelationshipGoals,
  UserRelationshipMessages,
} from 'app/constants';
import { useTranslate } from 'app/hooks/useFormatMessage';
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
  value?: UserRelationshipGoal;
};

export const RelationshipGoalFormControl: React.FC<FCProps> = ({
  error,
  value,
  onChange,
  isRequired,
}) => {
  const t = useTranslate();

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    const options = [
      t('Lover'),
      t('Friend'),
      t('Partner'),
      t('Marriage'),
      t('One-Night stand'),
      t('Cancel'),
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
            onChange(UserRelationshipGoals.boyGirlFriend);
            break;
          case 1:
            onChange(UserRelationshipGoals.getMarried);
            break;
          case 2:
            onChange(UserRelationshipGoals.makeFriends);
            break;
          case 3:
            onChange(UserRelationshipGoals.oneNightStand);
            break;
          case 4:
            onChange(UserRelationshipGoals.sexPartner);
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
            {t('What are you looking for here?')}
          </FormControl.Label>
          <Pressable onPress={handlePress}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={t('Please select')}
              value={value ? t(UserRelationshipMessages[value]) : ''}
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
