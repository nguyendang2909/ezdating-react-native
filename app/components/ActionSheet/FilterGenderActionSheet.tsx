import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  Box,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { ARR_GENDERS } from 'app/constants';
import { GENDER_MESSAGES, UserGender } from 'app/constants/constants';
import { useMessages } from 'app/hooks';
import { Gender } from 'app/types';
import { FC, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FilterGenderActionSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  value?: UserGender;
  onChange: (e: UserGender) => void;
};

export const FilterGenderActionSheet: FC<FilterGenderActionSheetProps> = ({
  isOpen,
  onClose,
  value,
  onChange,
}) => {
  const { formatMessage } = useMessages();
  const { bottom: bottomSafeHeight } = useSafeAreaInsets();
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setInit(true);
    }
  }, [isOpen]);

  const handleChange = (e: Gender) => {
    onChange(e);
    onClose();
  };

  if (!init) {
    return <></>;
  }

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
      <ActionsheetBackdrop />
      <ActionsheetContent zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Box mb={16}>
          <Heading size="sm" textAlign="center">
            {formatMessage('Show me')}
          </Heading>
        </Box>
        {ARR_GENDERS.map(e => {
          return (
            <ActionsheetItem
              key={e}
              onPress={() => {
                handleChange(e);
              }}
            >
              <Text fontWeight={e === value ? 'bold' : undefined}>
                {formatMessage(GENDER_MESSAGES[e])}
              </Text>
            </ActionsheetItem>
          );
        })}
        <Box mb={bottomSafeHeight} />
      </ActionsheetContent>
    </Actionsheet>
  );
};
