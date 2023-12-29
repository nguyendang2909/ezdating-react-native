import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  Box,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { SUBJECTS } from 'app/constants/teacher.constants';
import { useDisclose } from 'app/hooks';
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
import React, { useState } from 'react';

type FCProps = {
  error?: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
  value?: string;
};

export const LearningTargetFormControl: React.FC<FCProps> = ({
  error,
  value,
  onChange,
  isRequired,
}) => {
  const { formatMessage } = useMessages();

  const [isInit, setInit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (learningTarget: string) => {
    onClose();
    onChange(learningTarget);
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>{formatMessage('What is your learning target?')}</FormControl.Label>
          <Pressable onPress={handleOpen}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={formatMessage('Please select')}
              value={value}
              InputRightElement={<ChevronDownIcon />}
              onPressIn={handleOpen}
            ></Input>
          </Pressable>
          <View pb={2}>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </View>
        </Stack>
      </FormControl>

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Relationship goal')}
              </Heading>
            </Box>
            {SUBJECTS.map(e => {
              return (
                <ActionsheetItem
                  key={e}
                  onPress={() => {
                    handleChange(e);
                  }}
                >
                  <Text fontWeight={e === value ? 'bold' : undefined}>{e}</Text>
                </ActionsheetItem>
              );
            })}
          </ActionsheetContent>
        </Actionsheet>
      )}
    </>
  );
};
