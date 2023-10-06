import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  UserRelationshipGoal,
  UserRelationshipGoalMessages,
  UserRelationshipGoals,
} from 'app/constants';
import { useMessages } from 'app/hooks/useMessages';
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
  const { formatMessage } = useMessages();

  const { showActionSheetWithOptions } = useActionSheet();

  const handlePress = () => {
    const options = [
      formatMessage('Lover'),
      formatMessage('Friend'),
      formatMessage('Partner'),
      formatMessage('Marriage'),
      formatMessage('One-Night stand'),
      formatMessage('Cancel'),
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
            {formatMessage('What are you looking for here?')}
          </FormControl.Label>
          <Pressable onPress={handlePress}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={formatMessage('Please select')}
              value={
                value ? formatMessage(UserRelationshipGoalMessages[value]) : ''
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
